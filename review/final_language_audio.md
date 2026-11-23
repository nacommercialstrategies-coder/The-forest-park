# Final language and audio QC: Forest Park reel (A / B / C)

Reviewer: independent final language and audio reviewer (did not make the reel).
Files: `deliver/forest_park_reel_{A,B,C}.mp4` and `_sfx_only` versions (1080x1920, 30 fps, 17.9 s, AAC 48 kHz stereo), `deliver/caption.txt`, text sources `Reel.tsx` and `EmailUI.tsx`.
Method: 72 frames per variant at 4 fps, tiled, with every caption, the hooks, the end card, the disclosure label and the bottom UI cropped at full resolution. Luminance was sampled inside the caption plates. Audio was checked with ebur128 (true peak), astats, 1/2/10/20 ms RMS envelopes, a 2.5 kHz high-pass envelope, sample-difference checks at each cut, a digital-silence scan and a spectrogram from 9.5 to 14.5 s.

## Verdict: **PASS**, no blockers

Every item from the previous round is fixed or within tolerance. What remains below is polish and does not block publishing.

## Previous-round fixes, verified

| Request | Result |
|---|---|
| Dark plates behind captions | Present (rgba 0,0,0,0.42). Inside the plate, background luminance is 113–123 on the bright meeting and morning shots, about 4.2–4.8:1 against white before the text shadow. Sunset and descent shots are about 7:1. |
| Hug caption slower and shorter | «يوم واحد… / رجّعله إحساس الفريق.»: 5 words in 48 frames (0.32 s per word; 0.25 s per word fully opaque) |
| Longer end card | 87 frames (2.9 s). 10 words, 0.29 s per word |
| Buttons and toast above the bottom 420 px | «إرسال»/«حذف المسودة» bottom edge at y ≈ 1470–1485. Toast «تم حذف المسودة» at y ≈ 1255–1320. All above 1500. |
| «هلّق» → «هسّا» in B | Done: «ممكن يكون هسّا / بكتب استقالته.» |
| C no longer repeats the salary line | Done: «الاستقالة… / ما بتيجي / فجأة.» |
| «يصرخ» → «ينادي» | Done: «والكل صار ينادي باسمه.» |
| Jordanian forms | «بكتب», «وضلّ…», «رجّعله», «لسا», «هسّا» |
| DM CTA | «ابعتلنا «فريق» بالخاص» on the end card and in the caption |
| Email body | «أتقدّم إليكم باستقالتي من العمل، / شاكراً لكم حسن تعاونكم طوال الفترة الماضية.» is correct formal Arabic |
| Louder delete click | Onset at 13.800 s, the same frame as the cursor press (frame 414). In the >2.5 kHz band it peaks about 24 dB above the bed (-14 vs -38 dB), so it is clearly audible. |
| Cheer fade-in, no gap | The cheer is continuous from 9.955 to 13.05 s with no dropout. The fade-in is about 3 ms (see M6). |

## Measurements

| Item | A (music) | A_sfx_only | Target | Status |
|---|---|---|---|---|
| Integrated loudness | -14.0 LUFS, LRA 3.4 | -16.0 LUFS, LRA 12.9 | A: -14 | PASS |
| True peak | -1.5 dBTP | -1.4 dBTP | < -1 dBTP | PASS |
| Clipping | flat factor 0, sample peak -1.88 dBFS | flat factor 0, peak -1.83 dBFS | none | PASS |
| A/B/C audio | identical PCM (md5 match). The three sfx_only files are also identical. | | | OK |
| Clicks at 1.5/4.0/6.5/9.0/10.0/11.0/12.6/15.0 s | sample-difference ratio 2.5–4.9× the local median, with no step discontinuities. At 12.6 s the rise is a 10 ms SFX swell, not a click. | no clicks; fades into and out of silence are smooth | none | PASS |
| Cheer sync | onset 9.955 s, 1.4 frames before the 10.0 s cut to the arms-up/clapping shot (a pre-lap) | same | ~10.0 s | PASS |
| Delete click sync | 13.800 s, on cursor press frame 414 (13.80–13.90 s) | 13.800 s | ~13.8 s | PASS |
| Ending | music falls from -16.6 dB (16.9 s) to -51.6 dB (17.8 s) under the end-card fade at 17.7–17.9 s | silent after 13.90 s | clean | PASS |

## Language check, every on-screen string

| Time | Text | Spelling/shaping | Words/line (max) | s/word |
|---|---|---|---|---|
| 0–2.5 A | في موظف بشركتك… / كاتب استقالته / وما بعتها لسا. | OK | 3 | 0.36 |
| 0–2.5 B | أحسن موظف عندك… / ممكن يكون هسّا / بكتب استقالته. | OK, shadda renders | 3 | 0.36 |
| 0–2.5 C | الاستقالة… / ما بتيجي / فجأة. | OK (hamza on alef in «فجأة») | 2 | 0.62 |
| 2.5–4.0 | مش عشان الراتب… | OK | 3 | 0.50 |
| 4.0–6.5 | عشان حاسس إنه / ما حدا شايفه. | OK | 3 | 0.50 |
| 6.5–9.0 | لحد ما إجا يوم… | OK | 4 | 0.62 |
| 9.0–11.0 | والكل صار ينادي باسمه. | OK | 4 | 0.50 |
| 11.0–12.6 | يوم واحد… / رجّعله إحساس الفريق. | OK | 3 | 0.32 |
| 12.6–15.0 | وضلّ… / بدل ما يروح. | OK | 3 | 0.60 |
| 15.0–17.9 | قبل ما تخسر أحسن موظفينك… / طلّعهم من المكتب / ابعتلنا «فريق» بالخاص | OK, «» point outward | 5 | 0.29 |
| UI | البريد · رسالة جديدة · إلى: الموارد البشرية · الموضوع: استقالة · تحية طيبة، · إرسال · حذف المسودة · تم حذف المسودة | OK | – | – |
| All | قصة تمثيلية (disclosure, every frame) | OK | – | – |

- No tofu glyphs. Letter joining is correct, including the lam-alef ligatures, shadda on «هسّا», «رجّعله», «وضلّ», «طلّعهم» and «أتقدّم», and tanween on «شاكراً». RTL order is correct and the ellipsis sits at the logical end of each line.
- Dialect: natural Ammani/Jordanian throughout. There are no Shami-coast (هلّق), Egyptian or Gulf markers.
- Tense: present-tense framing (كاتب، حاسس، ما حدا شايفه) moves into a past-tense resolution (إجا، صار ينادي، رجّعله، ضلّ). This is a coherent storytelling shift.
- Safe zones: nothing in the top 250 px (the label starts at y 262, captions at y ≥ 270). The widest caption plate («والكل صار ينادي باسمه.») spans x 85–915, inside the 930 limit. Only the decorative blue mail-icon square crosses x 930. Nothing important is below y 1500.

## Blockers

None.

## Minor notes (polish, non-blocking)

**M1: the disclosure label crowds hook line 1 (0–2.5 s, A and B).** «قصة تمثيلية» (y 262–292, x 85–225) sits right against the ellipsis of «في موظف بشركتك…» and «أحسن موظف عندك…» (x ≈ 215). The two do not overlap, but on a phone the label reads as if it is glued to the hook. Fix: in `Reel.tsx`, change the hook `<Caption … y={270} …>` to `y={305}`. C is not affected because its line is narrow.

**M2: plate contrast on the bright shots is borderline.** The meeting shot (4.0–6.5 s) measures 4.2:1 inside the plate, and the morning screen (12.6–15.0 s) about 4.5:1. The heavy text shadow means it reads fine. For margin, raise the plate alpha from `rgba(0,0,0,0.42)` to `rgba(0,0,0,0.55)`.

**M3: wording polish at 11.0–12.6 s.** «رجّعله إحساس الفريق.» is correct but slightly translated in tone. The idiomatic phrase is «روح الفريق», which also echoes the caption («بيرجّع للفريق روحه»). Suggested: «يوم واحد… / رجّعله روح الفريق.» It is the same word count.

**M4: end card punctuation is inconsistent.** Every caption line ends with «.» or «…» except «طلّعهم من المكتب». Optional fix: «طلّعهم من المكتب.»

**M5: the bottom margin is tight.** The send and delete buttons end at y ≈ 1470–1485, only 15–30 px above the 1500 line. This passes. If anyone moves the mail UI down, it will fail.

**M6: the cheer attack is very fast.** It rises from -33 to -3 dB in about 3 ms at 9.955 s. It sounds like a crowd attack rather than a click, so this is acceptable. A 10 ms fade would be safer on phone speakers. The cheer also carries 0.45 s past the 12.6 s cut onto the morning-desk shot. As a sound bridge this is acceptable. For a cleaner change of place, fade it out over 12.6–12.8 s.

**M7: sfx_only has stretches of digital silence.** These run 4.22–6.38 s (meeting shot), 13.11–13.80 s, and 13.90–17.9 s (the whole end card). This is fine for its purpose, layering under trending Instagram audio. If anyone posts sfx_only without added audio, it will sound dead. A -45 dB room-tone bed would fix that.

**M8: the hug caption is at the reading limit.** Five words are fully opaque for 1.23 s, which is 0.25 s per word, exactly at the threshold. It passes on total display time (0.32 s per word). Do not add words to it.

**M9: the hook C bridge is a slight leap.** «الاستقالة… ما بتيجي فجأة.» → «مش عشان الراتب…» works, but the link is implicit. No change needed. This is a note for A/B/C test interpretation.

**M10: prefix style differs between video and caption.** On screen, B uses the reduced form «بكتب». The caption uses «بيرجّع / بيخلّيك / بيظهر». Both are normal in Amman, so no change is required.

## caption.txt

The text is correct and in natural Jordanian. The hook quotes in «الملفات» match the on-screen hooks exactly. Polish:

- «برامج Team Building بـ +15 تجربة وسط 260,000 م² من الطبيعة.»: «بـ +15» with a tatweel, then a space, then an LTR plus sign is awkward and may display as «15+» on some clients. Suggested: «برامج Team Building فيها أكتر من 15 تجربة، وسط 260,000 م² من الطبيعة.»
- `#عمان` is shared with Oman (عُمان) content. Add `#عمان_الأردن` or `#Amman` alongside it.
- «ابعتلنا «فريق» بالخاص ونبعتلك البرنامج» is fine. «وبنبعتلك» is a touch more conversational (optional).
- The pinned comment «شو اللي بيخلّيك تضل بشغلك غير الراتب؟» is natural. Keep it.
