# Final review: POV hook version (independent)

Files: `deliver/forest_park_reel_A.mp4` (whole reel at 4 fps, plus 30 fps strips at 1.4–2.2 s, 7.2–8.7 s and 8.4–10.4 s), first 2.5 s of `_B` and `_C`, `cover_A/B/C.jpg`, the `_sfx_only` mixes (for audio), and `work/refs/R01–R05` (real tower).
Frames and crops: `/tmp/claude-0/-home-user-The-forest-park/2318261a-9c4a-5d4f-a417-9711f6e2f1ae/scratchpad/qc_pov/`

## Verdict: FAIL (2 blockers, both cheap to fix, no regeneration needed)

The specs, loudness, Arabic text, safe zones and the B/C variants all pass. Two picture problems remain. The first is in the hook itself, which is the part the client asked about. The second hides the only real proof of the tower.

## Blockers

### B1. 1.95–2.2 s (A, B and C): the rope dissolves in the left hand, in the last frames of the hook
- At 1.4–1.9 s the left glove lets go and swings open-palmed, and the rope passes straight past it without being held.
- At 1.95–2.2 s the left rope breaks into translucent, flickering dashes and then re-forms. This is a classic Veo morph, and it falls in the most-watched 2 seconds.
- An open hand off the rope at the edge is also a poor safety image for an adventure park that sells to HR.
- **Fix:** cut the hook at about 1.90 s. Either retime the flash into the email at 1.9 s, or freeze or slow (0.5x) the 1.6–1.85 s frames to fill out to 2.2 s.
- Better still: use 0.0–1.4 s plus a 0.8 s slowed hold of 0.6–1.0 s. In that section both hands are on the rope and the feet sit at the edge with debris.
- Re-check that no frame after 1.9 s shows the left rope.

### B2. 7.3–8.6 s: in the REAL tower shot, the climber is covered by text and his head is cut off
- The «لحد ما وقف هون…» box sits right across his hips and legs.
- The crop cuts his head off at the top of the frame, so only the helmet tip shows.
- This is the only real footage of the park's tower. It is the shot that proves "the tower is the real one", and "هون" points at him. Right now the viewer sees a text bar where the person should be.
- **Fix:**
  - Move this caption down to about y 1150–1300, over the plain planks. That is still above the 420 px bottom zone.
  - Re-crop or scale the source down about 10–15% so the head and railing are inside the frame. Keep the top 250 px for the IG header: pad with sky if needed.

## Checks that pass
- **Specs:** 1080x1920, 30 fps, 18.0 s, AAC 48 kHz stereo. A, B and C are identical outside 0–2.2 s.
- **Loudness:** A, B and C each measure −14.2 LUFS integrated, true peak −1.7 dBTP, LRA 5.4. The sfx_only versions measure −16.2 LUFS and −1.6 dBTP, which is fine for a bed under a trending sound.
- **Audio events** (band energy, checked on the sfx_only stem and the full mix):
  - 0–2.2 s: heartbeat thumps in 30–120 Hz at about 0.0, 0.85 and 1.7 s. Breath and scrape bursts in 2–7 kHz at 0.1–0.5, 0.75–0.95, 1.2–1.6 and 2.2 s. These stay audible in the full mix: the music adds almost nothing above 4 kHz.
  - 8.6–10.3 s: breath bursts at 8.6–9.1 and 9.6–9.9 s, with heartbeat thumps.
  - Cheer onset at 10.25 s, the loudest low-band moment.
  - Delete click: a sharp transient at 14.8 s, synced with the cursor on «حذف المسودة».
- **Hook in the first second:** strong. A top-down POV from the edge, feet at the lip with wood debris, orange ropes, tiny people on the sand far below, and the hook text readable within about 0.5 s. All three hook texts work. C («شو اللي بيوصّل موظف… لحافة 60 متر؟») is the most curiosity-driven, and A is the shortest to read.
- **Arabic:** spelling, joining and RTL are correct on every line, in natural Jordanian dialect:
  - «60 متر… وواقف على الحافة.»
  - «قبل يومين… كان كاتب استقالته.»
  - «مش عشان الراتب…»
  - «عشان حاسس إنه ما حدا شايفه.»
  - «لحد ما وقف هون…»
  - «والفريق كله تحت بينادي باسمه.»
  - «يوم واحد… رجّعله روح الفريق.»
  - «وضلّ… بدل ما يروح.»
  - End card: «قبل ما تخسر أحسن موظفينك… طلّعهم من المكتب.» and «ابعتلنا «فريق» بالخاص».
  - The mail UI («إلى: الموارد البشرية», «الموضوع: استقالة», «تم حذف المسودة») is correct.
- **Safe zones:**
  - All captions sit between about y 330 and 600. The «قصة تمثيلية» tag is at about y 270 on the left.
  - Mail UI buttons are at about y 1380, and the end-card CTA at about y 1040.
  - Nothing important is in the top 250, bottom 420 or right 150 px.
  - Only the garbled harness belt in the descent shot sits in the bottom zone (see minor note 2).
- **Story without sound:** clear. Edge → "two days earlier he wrote his resignation" → not the salary → feels unseen → "until he stood here" → the team calls his name → hug → the draft is deleted → CTA.
- **Real tower match:**
  - The real shot (7.3 s) and the AI base shot (10.3 s) both show the tapered slatted face with yellow edge beams, matching R01/R02.
  - The hook's sandy base with tyres and people matches R05.
- **People:** no extra or missing people. Faces are stable in the meeting, cheer and hug. In the hug, only men touch, and the women clap apart in modest dress.
- **Covers:** 1080x1920. Each cover shows the hook frame with its own text, and the text stays inside the 4:5 grid crop.

## Minor notes (polish)
1. **8.6–10.3 s, the POV "descent" does not read as a descent.**
   - The frame is almost static.
   - The legs stick out horizontally above the planks without touching the wall.
   - No hand is on the rope, and the people below stay the same size.
   - Fix: add a slow downward drift or push-in (5–8% scale-up toward the people below) and a little handheld shake. Or use the 2D camera move from the 0.0–1.0 s hook clip.
2. **8.6–10.3 s, the harness belt at the bottom (y ≈ 1830–1920) is a smeared blue/white AI texture.**
   - It is mostly under the IG caption area, but visible when paused.
   - Fix: crop the bottom about 120 px (scale 1.07) or blur that strip slightly.
3. **0–2.2 s, the hook tower's side edges are plain grey wood.**
   - The real tower, shown 5 s later at 7.3 s, has yellow/orange edge beams.
   - Fix (optional): tint the left edge beam in the first 2 s to yellow/orange.
   - The dense pines are more than the real, drier site has, but they are acceptable for "Forest Park".
4. **Heartbeat tempo is calm (~70 bpm).** For fear, raise it to about 100–120 bpm in 0–2.2 s and keep it fast in 8.6–10.3 s. Keep the 2–7 kHz breaths as they are.
5. **Check the "60 متر" claim.**
   - In R01 and R03 the tower looks like roughly 7–8 storeys.
   - Confirm the real height with the park before publishing. All three hooks, the covers and the caption say 60 m, so a wrong figure would be a factual and advertising-claim risk.
6. **15.5–18.0 s, the CTA is fully visible only from about 15.75 to 17.6 s (≈1.9 s).** If the length can grow, add a 0.5–1.0 s hold before the fade.
7. **Hero continuity is loose:**
   - The meeting face (5.4 s) and the hug face (12.3 s) are not clearly the same man.
   - The hook POV wears a navy jacket, while the hug hero wears a grey vest with no jacket.
   - The text carries the story, so this is acceptable.
8. **The white flash transitions at 7.3 s and 8.6 s** each last about 2 frames and are fine. Make sure the 8.6 s flash does not hide the start of the descent breath (it currently starts at about 8.6 s, which is OK).
9. **Cover A** writes «60 متر..» with two dots, while the video uses «…». Make them match.
