# Generation log — «الاستقالة اللي ما وصلتك» (v3, produced 23/11/2026)

All generations on OpenArt (project "Personal Project", Uncategorized). Files downloaded to `work/gen/`.

## Character — Nano Banana Pro, text2image, 2K, 4:3, 3 images (chosen: `char_b.png`)
> Photorealistic character reference photo of a 29-year-old Jordanian man, office employee, slim build, short neat dark hair, light trimmed beard, warm brown eyes, quiet thoughtful expression, wearing a plain light-grey button-down shirt with sleeves slightly rolled and dark navy chinos. Full body standing on the left, and a head-and-shoulders close-up on the right, neutral soft daylight, plain light-grey studio backdrop, natural skin texture with pores, realistic hands with five fingers, shot on 50mm lens, sharp focus. No text, no logo, no watermark.

## Start frames — Nano Banana Pro, image2image, 2K, 9:16, 2 each
Refs: character (image1), IMG_6685/6689 platform, IMG_6686 view, IMG_6691 rappel pose, IMG_6694 sunset.
- **Office (used `s1_office_b`)**: over-the-shoulder, empty Amman office at night, laptop with plain white screen (for compositing), only light = screen glow.
- **Meeting (used `s3_meeting_a`)**: daytime meeting room, five colleagues talking animatedly, him at the near end, unnoticed, eyes on notebook.
- **Edge (used `s4_edge_a`)**: yellow steel tower platform from IMG_6685/6689, golden hour, from behind, black-yellow harness, white helmet, orange gloves, valley like IMG_6686.
- **Descent (used `s6_descent_b`)**: low angle, rappel start pose like IMG_6691, silhouette against sunset like IMG_6694.

## Video — Kling 3.0 image2video, pro, 3 s, no sound, 2 each
- Office (`v1_office_1` used): almost still, slow breath, fingers stop, slow push-in, screen stays plain white.
- Meeting (`v3_meeting_1` used): colleagues keep talking; he lifts his eyes, parts lips to speak, hesitates, looks down.
- Edge (`v4_edge_1` used): wind in shirt and rope, deep breath, looks down, slow push over shoulder.
- Descent (`v6_descent_2` used, first 1.0 s only): leans back on taut rope at the edge. Note: neither take showed a believable step-off, so only the lean-back moment is used.

## Audio
- Cheering: Veo 3.1 lite image2video with audio from a real clapping frame (`v5_cheer_veo.mp4`); **only the audio is used** (the picture had a flag artifact).
- Score: composed locally (`work/audio/score.wav`, numpy synthesis, rights-free).
- SFX: synthesized locally (`roomtone, heartbeat, whoosh, wind, boom, click`).
- Unused: Creative Claw cheering SFX + ElevenLabs music (generated, but its CDN is blocked by this environment's network).

## Credits spent (OpenArt, list prices before the 10% discount)
- Character 3 × 40 = 120
- Start frames 8 × 40 = 320
- Kling 3.0 pro 3 s: 8 × 105 = 840
- Veo 3.1 lite 720p 4 s with audio: 1 job
- Actual OpenArt spend: 1,228 credits (balance 20,480 → 19,252). Creative Claw: 11 of 100.

## Edit
Remotion project: `project/remotion` (`npx remotion render src/index.tsx ReelA ...`). Screen UI: `src/EmailUI.tsx`. Laptop-screen composite: python/OpenCV corner tracking (see session log) → `public/office_comp.mp4`.
