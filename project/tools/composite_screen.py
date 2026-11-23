"""Track the laptop's white screen in the office clip and composite the email UI onto it.
Usage: python3 project/tools/composite_screen.py work/gen/v1_office_1.mp4 work/gen/email_texture.png work/gen/office_comp_raw.mp4"""
import sys, cv2, numpy as np
vid, texp, outp = sys.argv[1:4]
tex = cv2.imread(texp).astype(np.float32)
cap = cv2.VideoCapture(vid); fps = cap.get(5); frames = []; quads = []
while True:
    ok, f = cap.read()
    if not ok: break
    g = cv2.cvtColor(f, cv2.COLOR_BGR2GRAY); _, m = cv2.threshold(g, 200, 255, cv2.THRESH_BINARY)
    cs, _ = cv2.findContours(m, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE); c = max(cs, key=cv2.contourArea)
    ap = cv2.approxPolyDP(c, 0.02 * cv2.arcLength(c, True), True).reshape(-1, 2).astype(np.float32)
    assert len(ap) == 4, 'screen not found as a quad'
    idx = np.argsort(ap[:, 1]); top = ap[idx[:2]]; bot = ap[idx[2:]]
    tl, tr = top[np.argsort(top[:, 0])]; bl, br = bot[np.argsort(bot[:, 0])]
    quads.append([tl, tr, br, bl]); frames.append(f)
Q = np.array(quads); Qs = np.array([Q[max(0, i - 2):i + 3].mean(0) for i in range(len(Q))])
h, w = frames[0].shape[:2]; out = cv2.VideoWriter(outp, cv2.VideoWriter_fourcc(*'mp4v'), fps, (w, h))
src = np.float32([[0, 0], [1600, 0], [1600, 1000], [0, 1000]])
yy, xx = np.mgrid[0:h, 0:w]
for f, q in zip(frames, Qs):
    c = q.mean(0); M = cv2.getPerspectiveTransform(src, ((q - c) * 0.985 + c).astype(np.float32))
    wp = cv2.GaussianBlur(cv2.warpPerspective(tex, M, (w, h), flags=cv2.INTER_AREA), (3, 3), 0)
    mk = cv2.GaussianBlur(cv2.warpPerspective(np.ones((1000, 1600), np.float32), M, (w, h)), (3, 3), 0)[..., None]
    e = wp * 0.84 * np.array([1.0, 0.96, 0.90])
    base = f.astype(np.float32) * (1 - mk) + e * mk
    base += cv2.GaussianBlur(e * mk, (0, 0), 60) * 0.55 * np.array([1.0, 0.97, 0.92])
    gl = np.exp(-((xx - yy * 0.45 + 150) ** 2) / (2 * 40 ** 2))[..., None] * mk * 10
    out.write(np.clip(base + gl, 0, 255).astype(np.uint8))
out.release()
