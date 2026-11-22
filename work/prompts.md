# Generation prompts — «مين بينزل أول» (v1)

Global look (append to every prompt):
> Shot on a cinema camera, 35mm/50mm prime, shallow depth of field, golden hour 45 minutes before sunset, warm low sun from camera-left, soft haze, natural skin texture, real fabric and webbing detail, subtle film grain, photorealistic, no text, no logos, no watermark. Vertical 9:16.

Negative (where supported):
> cartoon, CGI look, plastic skin, extra fingers, deformed hands, warped rope, floating harness, text, letters, logo, watermark, children.

Location truth (from real photos — do not invent):
- Platform: yellow-painted steel tower top, grey safety mesh railing, chain hand-line, wooden/steel deck. Refs: `IMG_6685`, `IMG_6689`, `IMG_6691`, `IMG_6686`.
- View below: dry Jordanian hills, olive groves in rows, scattered pines, sandy ground with tyres. NOT a dense pine forest. Refs: `IMG_6686`, `R04_drone_valley`.
- Equipment: yellow/black full-body harness, orange or grey work gloves, white/grey climbing helmet, blue-grey static rope. Refs: `IMG_6685`, `IMG_6689`.
- Sunset palette: `IMG_6694`.

## Characters (text_to_image → pick one each → reuse as element/reference)

All: Jordanian, smart-casual office clothes under harness, helmets on for platform shots. Respectful, never mocked.

- **C1 المدير** — man, ~50, short salt-and-pepper beard, calm confident eyes, navy quarter-zip, grey trousers. Warm, wise presence.
- **C2 أبو المحاسبة** — man, ~45, round friendly face, thin glasses, slightly heavy build, light-blue shirt with rolled sleeves, beige chinos. Overconfident-but-lovable.
- **C3 الموظف الجديد** — man, ~24, slim, clean-shaven, white t-shirt, black jeans, white sneakers. Nervous, polite.

Prompt template: `Photorealistic full-body and close portrait reference sheet of {description}, wearing a yellow-black climbing harness and white helmet, standing on a sunny outdoor platform, neutral expression, front / three-quarter / side views, natural light.`

## Shots (image_to_image start frame → image_to_video)

| # | Time | Start-frame refs | Video prompt |
|---|------|------------------|--------------|
| S1 | 0.0–2.0 | IMG_6691, IMG_6685 | POV looking straight down over the edge of the yellow steel platform: three pairs of shoes (C1 brown leather boots, C2 beige loafers, C3 white sneakers) at the very edge, harness straps visible; ground and olive groves 60 m below. A small pebble rolls off the edge and falls. Wind moves trouser fabric. Slight handheld breathing motion. |
| S2 | 2.0–3.5 | IMG_6686, R03_drone_towers, IMG_6694 | Drone slowly orbits the top of the yellow steel tower at golden hour, three small figures in harnesses standing at the edge, dry hills and olive groves below, sun flare. Smooth, cinematic. |
| S3 | 3.5–5.5 | IMG_6686 + C1–C3 | Wide shot from behind three people in harnesses and helmets at the platform edge, backs to camera, facing the valley at sunset. Subtle wind, they shift weight nervously. Faces not visible. |
| S4 | 5.5–7.0 | IMG_6685 floor area | Low close-up at deck level: C2's beige loafer steps confidently onto the last plank at the edge, toes over the drop, valley far below. He pauses. |
| S5 | 7.0–8.5 | IMG_6689 + C2 | Medium side shot: C2 looks down, freezes, then steps back two quick steps, palms raised, comic "no no, later" gesture, embarrassed smile. Natural body motion. |
| S6 | 8.5–10.0 | IMG_6689 + C1 | Over-the-shoulder from behind C1: he walks steadily to the edge, stops, and turns his head back toward the team. |
| S7 | 10.0–11.0 | C1 + C3 | Medium close-up of C1: calm knowing smile, raises hand and points to C3 off-frame. Mouth closed (line added in audio). |
| S8 | 11.0–12.0 | IMG_6685 harness detail + C3 | Macro: C3's gloved hands clip a steel carabiner onto the harness belay loop, gate snaps shut. Shallow focus. |
| S9 | 12.0–13.5 | IMG_6691 + C3 | Low angle from below the platform: C3 leans back over the edge on the rope like IMG_6691, then steps off and begins to rappel down, silhouette against the golden sunset sky. Rope taut, realistic physics. |

Real footage (graded to golden hour):
- S10 13.5–15.0 — `company_01.mp4` 41.5–42.1 s (team in harnesses clapping) or AI from `IMG_6690`.
- S11 15.0–16.0 — `company_01.mp4` 47.6–49.8 s (zipline joy), 23.4–24.2 s (hug).

## Audio

- «إنت. يلا.» — vidIQ voiceover, male Arabic voice; test Mazen Lawand and Haytham, pick by ear.
- End line «The Forest Park… فريقك بيستاهل» — Mazen Lawand.
- Music + SFX (wind, heartbeat, whoosh, carabiner click, cheering) — generated / library, rights-free.
