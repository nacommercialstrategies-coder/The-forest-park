"""Stage 1: scene detection, contact sheets, technical quality log.

Usage: python3 project/analyze_footage.py input/company_videos
Outputs: work/scenes/<video>/*.jpg, work/contact_sheets/<video>.jpg, work/footage_log.csv
Description / suggested-use columns are filled in after visual review.
"""
import csv, json, subprocess, sys
from pathlib import Path
import cv2
import numpy as np
from scenedetect import detect, ContentDetector

SRC = Path(sys.argv[1] if len(sys.argv) > 1 else "input/company_videos")
WORK = Path("work")
EXTS = {".mp4", ".mov", ".m4v", ".mkv", ".avi", ".webm", ".3gp"}


def probe(p):
    out = subprocess.run(["ffprobe", "-v", "error", "-print_format", "json",
                          "-show_streams", "-show_format", str(p)],
                         capture_output=True, text=True).stdout
    d = json.loads(out or "{}")
    v = next((s for s in d.get("streams", []) if s.get("codec_type") == "video"), {})
    a = any(s.get("codec_type") == "audio" for s in d.get("streams", []))
    rot = 0
    for sd in v.get("side_data_list", []) or []:
        rot = int(sd.get("rotation", 0) or 0)
    w, h = v.get("width", 0), v.get("height", 0)
    if abs(rot) in (90, 270):
        w, h = h, w
    num, den = (v.get("avg_frame_rate", "0/1").split("/") + ["1"])[:2]
    fps = float(num) / float(den) if float(den) else 0
    return dict(w=w, h=h, fps=round(fps, 2), dur=float(d.get("format", {}).get("duration", 0)),
                codec=v.get("codec_name", ""), audio=a)


def metrics(cap, t0, t1):
    """Sharpness (Laplacian var), brightness, shake (mean optical-flow jitter)."""
    sharp, bright, flows, prev = [], [], [], None
    for t in np.linspace(t0, t1, 8, endpoint=False):
        cap.set(cv2.CAP_PROP_POS_MSEC, t * 1000)
        ok, f = cap.read()
        if not ok:
            continue
        g = cv2.cvtColor(cv2.resize(f, (360, int(360 * f.shape[0] / f.shape[1]))), cv2.COLOR_BGR2GRAY)
        sharp.append(cv2.Laplacian(g, cv2.CV_64F).var())
        bright.append(g.mean())
        if prev is not None and prev.shape == g.shape:
            fl = cv2.calcOpticalFlowFarneback(prev, g, None, 0.5, 3, 15, 3, 5, 1.2, 0)
            flows.append(np.linalg.norm(fl.reshape(-1, 2).mean(0)))
        prev = g
    if not sharp:
        return 0, 0, 0
    return float(np.median(sharp)), float(np.mean(bright)), float(np.std(flows) if flows else 0)


def score(sharp, bright, shake, h):
    s = 5
    if sharp < 60: s -= 2
    elif sharp < 120: s -= 1
    if bright < 45 or bright > 225: s -= 2
    elif bright < 70: s -= 1
    if shake > 6: s -= 2
    elif shake > 3: s -= 1
    if h and h < 1080: s -= 1
    return max(1, s)


def contact_sheet(frames, out, cols=4):
    if not frames:
        return
    th = [cv2.resize(f, (270, int(270 * f.shape[0] / f.shape[1]))) for f in frames]
    hmax = max(t.shape[0] for t in th)
    th = [cv2.copyMakeBorder(t, 0, hmax - t.shape[0], 0, 0, cv2.BORDER_CONSTANT) for t in th]
    while len(th) % cols:
        th.append(np.zeros_like(th[0]))
    rows = [np.hstack(th[i:i + cols]) for i in range(0, len(th), cols)]
    cv2.imwrite(str(out), np.vstack(rows), [cv2.IMWRITE_JPEG_QUALITY, 80])


def main():
    vids = sorted(p for p in SRC.rglob("*") if p.suffix.lower() in EXTS)
    if not vids:
        print(f"No videos in {SRC}"); return
    (WORK / "contact_sheets").mkdir(parents=True, exist_ok=True)
    rows = []
    for v in vids:
        info = probe(v)
        print(f"→ {v.name}  {info['w']}x{info['h']} {info['fps']}fps {info['dur']:.1f}s")
        scenes = detect(str(v), ContentDetector(threshold=27), show_progress=False)
        spans = [(s.seconds, e.seconds) for s, e in scenes] or [(0, info["dur"])]
        sdir = WORK / "scenes" / v.stem; sdir.mkdir(parents=True, exist_ok=True)
        cap = cv2.VideoCapture(str(v)); sheet = []
        for i, (t0, t1) in enumerate(spans, 1):
            cap.set(cv2.CAP_PROP_POS_MSEC, (t0 + t1) / 2 * 1000)
            ok, f = cap.read()
            if ok:
                cv2.putText(f, f"#{i} {t0:.1f}-{t1:.1f}s", (20, 60), cv2.FONT_HERSHEY_SIMPLEX,
                            f.shape[1] / 600, (0, 255, 255), max(2, f.shape[1] // 400))
                cv2.imwrite(str(sdir / f"{i:03d}.jpg"), f); sheet.append(f)
            sh, br, sk = metrics(cap, t0, t1)
            rows.append(dict(file=v.name, scene=i, start=round(t0, 2), end=round(t1, 2),
                             dur=round(t1 - t0, 2), res=f"{info['w']}x{info['h']}", fps=info["fps"],
                             vertical=info["h"] > info["w"], audio=info["audio"],
                             sharpness=round(sh), brightness=round(br), shake=round(sk, 2),
                             quality=score(sh, br, sk, min(info["w"], info["h"]) and info["h"]),
                             description="", children_faces="", suggested_use=""))
        cap.release()
        contact_sheet(sheet, WORK / "contact_sheets" / f"{v.stem}.jpg")
    with open(WORK / "footage_log.csv", "w", newline="", encoding="utf-8-sig") as fh:
        w = csv.DictWriter(fh, fieldnames=list(rows[0])); w.writeheader(); w.writerows(rows)
    print(f"\n{len(vids)} videos, {len(rows)} scenes → work/footage_log.csv")


if __name__ == "__main__":
    main()
