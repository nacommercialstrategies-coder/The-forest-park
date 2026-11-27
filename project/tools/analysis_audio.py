"""Rights-free sports-analysis score + SFX for the «Analysis» reel (20 s), synthesized.
Usage: python3 project/tools/analysis_audio.py OUT.wav"""
import sys, wave
import numpy as np

SR = 48000; D = 20.0; N = int(SR * D)
out = np.zeros((N, 2)); rng = np.random.default_rng(7)
BPM = 120; BEAT = 60 / BPM
mtof = lambda m: 440 * 2 ** ((m - 69) / 12)

def add(x, t0, v=1.0, pan=0.0):
    i = int(t0 * SR)
    if i >= N: return
    e = min(N, i + len(x)); x = x[: e - i] * v
    out[i:e, 0] += x * (1 - pan); out[i:e, 1] += x * (1 + pan)

def env(n, a=0.002, d=8.0):
    t = np.arange(n) / SR
    return np.minimum(1, t / a) * np.exp(-t * d)

def kick():
    n = int(0.35 * SR); t = np.arange(n) / SR
    return np.sin(2 * np.pi * (48 + 110 * np.exp(-t * 28)) * t) * env(n, 0.001, 9)

def clap():
    n = int(0.22 * SR); x = rng.standard_normal(n)
    e = sum(np.exp(-np.maximum(0, np.arange(n) / SR - o) * 60) * (np.arange(n) / SR >= o) for o in (0, 0.011, 0.022))
    return np.convolve(x * e, np.ones(6) / 6, 'same') * 0.6

def hat(open_=False):
    n = int((0.18 if open_ else 0.05) * SR); x = rng.standard_normal(n)
    x = x - np.convolve(x, np.ones(4) / 4, 'same')
    return x * env(n, 0.0005, 14 if open_ else 70)

def bass(m, dur):
    n = int(dur * SR); t = np.arange(n) / SR; f = mtof(m)
    x = np.tanh(2.2 * (np.sin(2 * np.pi * f * t) + 0.35 * np.sin(2 * np.pi * 2 * f * t)))
    return x * np.minimum(1, t / 0.005) * np.minimum(1, (dur - t) / 0.03)

def stab(notes, dur=0.3):
    n = int(dur * SR); t = np.arange(n) / SR
    x = sum(sum(np.sin(2 * np.pi * mtof(m) * k * t * (1 + 0.003 * (k - 1))) / k for k in range(1, 7)) for m in notes)
    return x / len(notes) * env(n, 0.003, 7)

def whoosh(dur=0.45, up=True):
    n = int(dur * SR); x = rng.standard_normal(n); t = np.arange(n) / SR
    shape = np.sin(np.pi * t / dur) ** 2
    k = int(30 + 200 * (t[-1] / dur)); y = np.convolve(x, np.ones(18) / 18, 'same')
    sweep = (t / dur) if up else (1 - t / dur)
    return (y * (1 - sweep) + (x - y) * sweep) * shape * 0.9

def blip(f=1760, dur=0.08):
    n = int(dur * SR); t = np.arange(n) / SR
    return np.sin(2 * np.pi * f * t) * env(n, 0.001, 40)

def impact():
    n = int(1.6 * SR); t = np.arange(n) / SR
    low = np.sin(2 * np.pi * (36 + 80 * np.exp(-t * 12)) * t) * np.exp(-t * 2.5)
    noise = rng.standard_normal(n) * np.exp(-t * 7) * 0.4
    return np.tanh(1.6 * (low + noise))

# --- music: intro tension (0-2.5), groove 2.5-15, half-time 15-17, final hit 17
prog = [45, 45, 41, 43]  # A, A, F, G (minor, driving)
for b in np.arange(0, D, BEAT):
    bar = int(b // (4 * BEAT)); beat = int(round(b / BEAT)) % 4
    if b < 2.5:
        if beat in (0, 2): add(kick(), b, 0.55)
        add(hat(), b + BEAT / 2, 0.18, 0.3)
        continue
    if b >= 19.4: break
    half = 15.0 <= b < 17.0
    if not half or beat == 0: add(kick(), b, 0.9)
    if beat in (1, 3) and not half: add(clap(), b, 0.5, -0.1)
    if not half:
        add(hat(), b + BEAT / 2, 0.25, 0.35); add(hat(), b, 0.12, -0.35)
        if beat == 3: add(hat(True), b + BEAT / 2, 0.15, 0.4)
    root = prog[bar % 4]
    if b < 17.0:
        for s in (0, 0.75, 1.5):
            add(bass(root, BEAT * 0.45), b + s * BEAT / 1.5 if s else b, 0.28)
    if beat == 0 and b < 17.0:
        add(stab([root + 24, root + 27, root + 31]), b, 0.22, 0.2)

# riser into the result
rt = np.arange(int(1.4 * SR)) / SR
add(rng.standard_normal(len(rt)) * (rt / 1.4) ** 2.2 * 0.35, 15.6, 1)
# final chord after the impact
for m in (57, 64, 69, 72, 76):
    n = int(3.0 * SR); t = np.arange(n) / SR
    add(sum(np.sin(2 * np.pi * mtof(m) * k * t) / k ** 1.4 for k in range(1, 6)) * np.minimum(1, t / 0.02) * np.exp(-t * 0.9) * 0.08, 17.0)

# --- SFX synced to picture
for t in (2.5, 5.5, 7.2, 9.0, 10.6, 12.0, 15.0):
    add(whoosh(0.4), t - 0.22, 0.55)
add(impact(), 17.0, 0.95)
for t, f in ((0.47, 1760), (0.6, 2350), (5.5 + 0.13, 1760), (7.2 + 0.0, 1320), (9.0 + 0.0, 1760), (10.6 + 0.07, 2350),
             (12.2, 1760), (12.47, 1760), (17.47, 2640), (17.73, 1320)):
    add(blip(f), t, 0.32, 0.2)
# checklist ticks (5.5 s + 8 frames, every 6 frames)
for i in range(4):
    add(blip(2900, 0.05), 5.5 + (8 + i * 6) / 30, 0.25, -0.2)
# height gauge ticks 2.7-4.2
for t in np.arange(2.7, 4.2, 0.1):
    add(blip(3400, 0.025), t, 0.12, 0.3)
# crowd clapping texture 12-15
for t in np.arange(12.05, 15.0, 0.045):
    add(clap(), t + rng.uniform(-0.02, 0.02), rng.uniform(0.08, 0.2), rng.uniform(-0.8, 0.8))

# reverb + glue
ir = rng.standard_normal(int(1.2 * SR)) * np.exp(-np.arange(int(1.2 * SR)) / SR * 4.5) * 0.015
mix = out + np.stack([np.convolve(out[:, c], ir)[:N] for c in range(2)], 1) * 0.7
fade = np.ones(N); fade[-int(0.8 * SR):] = np.linspace(1, 0, int(0.8 * SR)); mix *= fade[:, None]
mix = np.tanh(mix / np.max(np.abs(mix)) * 1.3) / np.tanh(1.3) * 0.9
with wave.open(sys.argv[1], 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix * 32767).astype(np.int16).tobytes())
