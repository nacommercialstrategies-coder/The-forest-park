"""Rights-free underscore, synthesized. Usage: python3 project/tools/score.py OUT.wav DURATION_S"""
import sys, numpy as np, wave
out_path = sys.argv[1]; D = float(sys.argv[2]); SR = 48000; N = int(SR * D); out = np.zeros((N, 2))
rng = np.random.default_rng(3)
mtof = lambda m: 440 * 2 ** ((m - 69) / 12)
def piano(m, t0, dur=2.5, v=0.5, pan=0):
    n = int(dur * SR); t = np.arange(n) / SR; f = mtof(m)
    x = sum(a * np.sin(2 * np.pi * f * k * t * (1 + 0.0004 * k)) * np.exp(-t * (2.2 + k * 1.3)) for k, a in [(1, 1), (2, .45), (3, .2), (4, .1)])
    x *= np.minimum(1, t / 0.004) * v; i = int(t0 * SR); e = min(N, i + n)
    out[i:e, 0] += x[:e - i] * (1 - pan) * 0.8; out[i:e, 1] += x[:e - i] * (1 + pan) * 0.8
def pad(notes, t0, t1, v=0.12, att=1.5):
    i0, i1 = int(t0 * SR), min(N, int(t1 * SR)); t = np.arange(i1 - i0) / SR
    env = np.minimum(1, t / att) * np.minimum(1, t[::-1] / 1.0)
    for m in notes:
        for dt, ch in ((-0.06, 0), (0.06, 1)):
            f = mtof(m) * (1 + dt / 100); s = sum(np.sin(2 * np.pi * f * k * t) / k for k in range(1, 6))
            out[i0:i1, ch] += s * env * v / len(notes)
# tension drone for the cold open (0-1.6s)
tt = np.arange(int(2.3 * SR)) / SR
drone = (np.sin(2 * np.pi * 41.2 * tt) + 0.5 * np.sin(2 * np.pi * 82.4 * tt * 1.003)) * (0.6 + 0.4 * np.sin(2 * np.pi * 2.2 * tt)) * np.minimum(1, tt / 0.15) * np.minimum(1, (2.3 - tt) / 0.2)
out[:len(tt), 0] += drone * 0.5; out[:len(tt), 1] += drone * 0.5
for k, (m, t) in enumerate([(57, 2.25), (64, 2.85), (69, 3.45), (72, 4.3), (64, 5.0), (69, 5.7), (71, 6.4), (64, 7.0)]): piano(m, t, v=.45, pan=(-.3 if k % 2 else .3))
pad([45, 52, 57], 2.2, 7.6, v=.10)
pad([53, 57, 60, 65], 7.3, 9.4, v=.18, att=1.0); pad([55, 59, 62, 67], 8.8, 10.4, v=.24, att=0.8)
for m, t in [(65, 7.4), (69, 7.9), (72, 8.4), (67, 8.9), (71, 9.4), (74, 9.8), (79, 10.1)]: piano(m, t, v=.4)
rt = np.arange(int(2.8 * SR)) / SR; riser = rng.standard_normal(len(rt)) * (rt / 2.8) ** 2.5 * 0.18
i0 = int(7.5 * SR); out[i0:i0 + len(rt), 0] += riser; out[i0:i0 + len(rt), 1] += riser
pad([48, 55, 60, 64, 67], 10.3, D, v=.28, att=.15)
for m, t in [(72, 10.3), (76, 10.9), (79, 11.5), (77, 12.2), (76, 12.8), (72, 13.6), (67, 14.4), (72, 15.2), (76, 16.0)]:
    if t < D - 0.5: piano(m, t, v=.5)
for t in np.arange(10.3, D - 1.0, 0.6):
    n = int(.3 * SR); tt = np.arange(n) / SR; k = np.sin(2 * np.pi * (50 + 40 * np.exp(-tt * 20)) * tt) * np.exp(-tt * 9) * .35; i = int(t * SR); out[i:i + n] += k[:, None][:N - i]
ir = rng.standard_normal(int(1.8 * SR)) * np.exp(-np.arange(int(1.8 * SR)) / SR * 3.2) * .02
mix = out + np.stack([np.convolve(out[:, c], ir)[:N] for c in range(2)], 1) * .9
fade = np.ones(N); fade[-int(1.2 * SR):] = np.linspace(1, 0, int(1.2 * SR)); mix *= fade[:, None]
mix /= np.max(np.abs(mix)) * 1.12
with wave.open(out_path, 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix * 32767).astype(np.int16).tobytes())
