# Language and audio QC: Forest Park reel (A / B / C)

Reviewer: independent language and audio QC. Files: `deliver/forest_park_reel_{A,B,C}.mp4` (1080x1920, 30 fps, 17.5 s, 48 kHz stereo).
Method: frames pulled at 4 fps (70 per variant), tiled and cropped at full resolution on every caption. Background luminance was measured behind the caption box (x 70–930, y 300–600). Audio was measured with ebur128 (true peak), astats, 2/20/100 ms RMS envelopes and showspectrumpic on the mix and on `forest_park_reel_A_sfx_only.mp4`. Text was checked against `Reel.tsx` and `EmailUI.tsx`.

## Verdict: **FAIL**

The Arabic itself is clean. No spelling mistakes, broken shaping or tofu glyphs. RTL order is correct, the ellipsis sits at the logical end, and «» point outward correctly in the CTA. The audio is on spec. The reel fails because of on-screen readability (contrast, reading time), the bottom safe zone, one non-Jordanian word in hook B and a repeated line in variant C.

## Measurements

| Item | Result | Target | Status |
|---|---|---|---|
| Integrated loudness (A, B, C) | -14.0 LUFS, LRA 3.2 LU | -14 LUFS | PASS |
| True peak | -2.0 dBTP | < -1 dBTP | PASS |
| Clipping | flat factor 0, peak count 2 at -2.06 dBFS | none | PASS |
| Audio identical across A/B/C | same PCM md5 | – | OK |
| Cheer onset | 9.94 s (2 frames before the 10.0 s cut) | ~10.0 s | PASS (pre-lap) |
| Delete click | 13.80 s (press frames 414–417 = 13.80–13.90 s) | ~13.8 s | PASS |
| Shot-boundary clicks 1.5/4.0/6.5/9.0/10.0/12.6/15.6 s | no step discontinuities in the mix. The highest jump ratios (10.0 s, 11.7 s) are transients inside the cheer sample | none | PASS (see minor A2) |
| Tail | fades from about 16.4 s to -68 dB at 17.48 s | clean | PASS |
| Top 250 px | captions start at y ≈ 300–310 | none in 0–250 | PASS |
| Right 150 px | widest line («والكل صار يصرخ باسمه.») ends at x ≈ 900. Only the blue mail-app icon square (not text) crosses x = 930 | none past 930 | PASS |
| Bottom 420 px (y > 1500) | the «إرسال» / «حذف المسودة» buttons (y ≈ 1465–1555) and the «تم حذف المسودة» toast (y ≈ 1460–1545) | none | **FAIL** |

Median background luminance behind captions (0–255; white text):
1.0 s: 4 · 3.0 s: 32 · **4.25–6.25 s: 219–221** · 7.25–8.25 s: 146–149 · **9.25 s: 207** · 10.25 s: 116 · 11.25 s: 79 · 12.25 s: 104 · **13.5 s: 209**

## Issues

### L1: Low contrast, white captions on near-white backgrounds (MAJOR)
- **4.0–6.5 s** «عشان حاسس إنه / ما حدا شايفه.» sits on the bright meeting-room windows (median bg 220). Contrast without the shadow is about 1.3:1, and the text breaks up on a phone.
- **9.0–10.0 s** «والكل صار يصرخ باسمه.» sits on the blown-out sunset sky (bg 207).
- **12.6–15.6 s** «وبيضل… / بدل ما يروح.» sits on the beige morning screen (bg 209).
- **Fix:** in `Caption` (Reel.tsx), add a backing plate. Wrap each line in `<span style={{background:'rgba(0,0,0,0.45)', padding:'4px 22px', borderRadius:14, boxDecorationBreak:'clone', WebkitBoxDecorationBreak:'clone'}}>`. Alternatively, add a top scrim `linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 38%)` under the captions for the meeting, descent and screenMorning shots. Target at least 4.5:1 behind the glyphs.

### L2: Caption too fast at 10.9–12.6 s (MAJOR)
- «أحياناً يوم واحد… / بيرجّعله إحساسه / إنه جزء من فريق.» shows 9 words for 51 frames (1.7 s, of which about 1.4 s is fully opaque). That is about 0.19 s per word, against a minimum of about 0.25 s. The cut at 11.7 s (hug to zip) lands in the middle of it.
- **Fix (pick one):** (a) shorten the text to «يوم واحد… / بيرجّعله إحساس الفريق.» (5 words). (b) Split it into two captions: frames 327–351 «أحياناً يوم واحد…» and frames 351–378 «بيرجّعله إحساسه إنه جزء من فريق.». (c) Take about 15 frames from `screenMorning` and give them to this caption. Option (a) is preferred.

### L3: End card and CTA on screen too briefly (MAJOR)
- At **15.6–17.5 s** the end card is 57 frames. It carries 7 words of headline plus a 4-word CTA, which is about 0.17 s per word. The CTA «اكتب «فريق» ونبعتلك البرنامج» is fully visible for only about 1.0 s (frames 22–51) before the fade-out. This is the conversion line.
- **Fix:** change `screenMorning: [378, 468]` to `[378, 445]` and `end: [468, 525]` to `[445, 525]`, giving the end card 80 frames (2.7 s). Move the screenMorning caption sequence to `durationInFrames={67}`. The cursor press at frame 36 and the delete animation (frames 40–58) still fit inside 67 frames. Re-time the click SFX only if the press moves; it does not here.

### L4: UI buttons and toast in the bottom 420 px (MAJOR)
- **0–1.5 s and 12.6–15.6 s:** the hesitation over «إرسال» and the press on «حذف المسودة» → «تم حذف المسودة» are the story beats. They sit at y ≈ 1460–1555, where Instagram's caption, username and audio bar will cover them.
- **Fix:** in `ScreenNight` and `ScreenMorning`, change the container `top: 640` to `top: 560`. This puts the buttons and toast at about y 1380–1475. Then move the morning caption from `y={330}` to `y={300}` so it stays clear of the mail header.

### L5: Hook B: «هلّق» is Syrian/Lebanese, not Jordanian (MAJOR for B)
- At **0–2.5 s (B)**, «ممكن يكون هلّق / بيكتب استقالته.» uses «هلّق», which reads Shami/Lebanese to a Jordanian audience. The Jordanian form is «هسّا». «بيكتب» with the «بيـ» prefix is also more Levantine-coast. The common Jordanian form is «بكتب».
- **Fix:** `B: ['أحسن موظف عندك…', 'ممكن يكون هسّا', 'بكتب استقالته.']`

### L6: Variant C repeats itself (MAJOR for C)
- At **0–4.0 s (C)**, the hook «الاستقالة… / مش دايماً / عشان الراتب.» is followed straight away by the shared caption «مش عشان الراتب…» (2.5–4.0 s). The same idea appears twice in 4 s, and «مش دايماً» softens the point that the next line then states flatly.
- **Fix:** `C: ['الاستقالة…', 'ما بتيجي', 'فجأة.']`. The shared «مش عشان الراتب…» then follows naturally.

### L7: «يصرخ» can read as alarm (MINOR)
- At **9.0–10.9 s**, «والكل صار يصرخ باسمه.» comes in on the shot of a man descending a cliff edge. «يصرخ» can read as screaming in panic before the cheering shot lands.
- **Fix:** «والكل صار يهتف باسمه.»

### L8: Dialect consistency of the «بيـ» prefix (MINOR)
- At **10.9–12.6 s** «بيرجّعله» and **12.6–15.6 s** «وبيضل…», common Jordanian speech uses «برجّعله» and «وبضل». These forms are acceptable in Amman, but if L5 is applied, align them for consistency: «برجّعله إحساسه», «وبضلّ… / بدل ما يروح.»

### L9: CTA has no destination (MINOR)
- At **15.6–17.5 s**, «اكتب «فريق» ونبعتلك البرنامج» does not say where to write it (comments or DM).
- **Fix:** «اكتب «فريق» بالتعليقات وبنبعتلك البرنامج». This is 6 words and fits one line at 46 px inside the 850 px box; verify the width. If it does not fit, use «علّق «فريق» وبنبعتلك البرنامج».

### L10: Hook A, optional polish (MINOR)
- At **0–2.5 s (A)**, «وما بعتها لسا.» is fine Jordanian. «لسّا» with shadda helps pronunciation-reading. No change required.

### L11: Email body wording (MINOR, diegetic)
- At **0–1.5 s and 12.6–14 s**, «شاكراً لكم كل الفترة الماضية.» is slightly ungrammatical in formal Arabic.
- **Fix in EmailUI.tsx:** «شاكراً لكم حسن تعاونكم طوال الفترة الماضية.»

### A1: Delete click masked by music (MINOR)
- At **13.80 s**, the click is present and in sync (broadband line on the spectrogram). In 20 ms RMS it only rises about 2 dB over the music bed (-12 vs -10 to -14 dB around it), so it is weak on phone speakers.
- **Fix:** raise the click by about 4 dB, or duck the music by 3 dB for 13.7–13.9 s.

### A2: Cheer sample starts without a fade (MINOR)
- At **9.94 s**, the cheer stem jumps from -27 dB to about -1 dB within 2 ms (a full-band vertical line on the spectrogram). In the mix it reads as a hard attack rather than a click, but a 5–10 ms fade-in would remove any risk of a tick on phone speakers. There is also a 12–15 dB dip in the cheer at 10.9–11.3 s (the hug cut), which sounds like a gap.
- **Fix:** add a 8 ms fade-in at 9.94 s and crossfade or loop the cheer bed across 10.9–11.3 s.

## Checked and OK
- Spelling and shaping: all captions, the end card and the UI strings («البريد», «رسالة جديدة», «إلى:», «الموارد البشرية», «الموضوع:», «استقالة», «إرسال», «حذف المسودة», «تم حذف المسودة»). Lam-alef ligatures, shadda («طلّعهم», «بيرجّعله», «هلّق», «أتقدّم») and tanween («أحياناً», «دايماً», «شاكراً») render correctly in Tajawal. No tofu.
- RTL: the ellipsis «…» renders at the left (logical end) of each line. «» point outward, the correct Arabic convention.
- Words per line: at most 4 for any line, well under the limit of 7.
- Caption size: 64–76 px, 800 weight, plus a shadow. Size is fine; contrast is the problem (L1).
- Jordanian voice for A, the shared captions and the end card: «في موظف بشركتك», «حاسس إنه ما حدا شايفه», «لحد ما إجا يوم», «طلّعهم من المكتب». Natural, with no Egyptian or Gulf markers.
- Timing for the other captions: hooks 5–7 words in 2.5 s, then 3/1.5 s, 5/2.5 s, 4/2.5 s, 4/1.9 s and 4/3.0 s. All are at least 0.3 s per word.
