# Realism review: forest_park_reel_A.mp4

Reviewer: independent realism QC. Method: 70 frames at 4 fps, all viewed tiled, with full-res crops of the laptop composite, the meeting hands, the tower and lean-back harnesses, every real clip, and the bottom corners of every shot (watermark check). Applies to B and C too; they differ only in the 0-2.5s caption.

## Verdict: PASS (no blockers; 7 minor issues, fixes listed below)

Nothing here would make a typical viewer stop and say "AI". The weakest points are the rope rigging in the two tower shots and the jump in look from the AI sunset shots to the real noon footage. Climbers and anyone who has been to the park would catch these.

## Clean checks
- **Hands/fingers:** office typing hands (1.5-4.0) have 5 fingers and sit correctly on the keyboard. Meeting hands holding the notebook and the gesturing hands in the background (4.0-6.5) are fine. The gloved hands behind the back (6.5-9.0) are fine. No extra or fused fingers seen.
- **Face consistency:** the same man in every AI shot: short dark hair, light beard, light grey button-down. The office shot shows him from behind and the tower shot from the back, so the meeting (4.0-6.5) and the lean-back (9.0-10.0) are the only face reads, and they match well enough.
- **Laptop composite (1.5-4.0):** the screen stays locked to the bezel through the slow push-in, with no wobble, slide or edge gaps. The perspective matches the lid angle. See issue 5 for the lighting.
- **No morphing or popping objects** in any AI shot at 4 fps.
- **No AI-tool watermark** in any corner of any shot.
- **No obvious children.** The zipline rider (11.7-12.6) is in a helmet, half-occluded and motion-blurred, and reads as an adult or older teen. I could not confirm an age; see issue 7.
- **No prominent third-party company logos.** The Jordan flag on the real tower (10.0-10.9) is not a brand. The small clothing marks are covered in issue 6.

## Issues

### 1. 6.5-9.0: tower rope is not anchored (minor, the most likely to be noticed)
The rope is tied with a loose knot at the dorsal D-ring and hangs slack between his legs down to the grating. It is anchored to nothing, and he stands at the open edge of the platform. A climber reads this as "not clipped in". A safety-led adventure brand should not show it.
**Fix:** regenerate or inpaint so the rope or lanyard runs taut from the dorsal ring up and out of frame to an overhead anchor. Alternatively, crop tighter (helmet to waist, landscape) so the rope tail and the grating are out of frame.

### 2. 9.0-10.0: lean-back rigging is AI-garbled (minor)
At full res, the rope runs from his right hand through a chain of 3-4 floating linked rings or carabiners in front of the belly. It reaches the left glove and drops away without passing through any belay device. Only one leg loop is visible. He is leaning back on a flat floor, not over an edge, so the pose is not abseiling. The silhouette and the 1-second hold hide most of this.
**Fix:** keep the shot under 1s and stay in silhouette (the current length is fine). Better: re-generate with "rope through a belay device on the harness front, anchored above, man leaning back over the platform edge", or crush the midtones so the hardware reads as a black shape.

### 3. 10.0: grade and location jump from AI to real (minor)
The cut goes from a warm orange sunset on a yellow steel tower with olive-grove valleys (6.5-10.0) to a harsh noon blue sky. The real tower (10.0-10.9) is wooden with a Jordan flag and is clearly a different structure. Anyone who knows the park sees that the AI tower is not theirs.
**Fix:** (a) warm the real clips (temp +, a little orange in the highlights, lift the blacks) and cool or desaturate the end of the sunset shot so the two meet halfway. (b) Add a 4-6 frame white or light-leak flash at 10.0 so the change reads as "the real day" by design. (c) Better: re-prompt the tower shots as a wooden platform tower in daylight to match the park.

### 4. 10.0-12.6: real footage is soft and over-compressed next to the crisp AI shots (minor)
The clap, hug and zipline clips are upscaled phone video. They show smeared detail, compression blocking on the trees and visible softness. Slowing the clap clip adds stutter.
**Fix:** add a light sharpen (unsharp 5:5:0.6) and a shared film grain across the whole reel (AI and real) so the textures match. Use optical-flow or frame-blend interpolation for the slowed clip instead of frame duplication.

### 5. 1.5-4.0: composited screen does not light the scene (minor)
The email screen is near-pure white at full brightness in a dark room. There is no glow on the hands, keyboard or the side of his face, and no reflection or glare on the glass. It reads slightly pasted on.
**Fix:** drop the screen to about 85% brightness with a slight blue tint. Add a soft screen-colored glow over the knuckles, keyboard and right cheek (a masked blend layer of about 10-15%). Optionally add a faint diagonal glare gradient over the screen.

### 6. 10.9-11.7: small clothing brand marks on real people (minor)
The man in the white T-shirt on the right has a small round logo badge on the chest, possibly a known apparel brand. There are small marks on the caps, trousers and sneakers. All are tiny, and incidental clothing marks are normally accepted.
**Fix:** to be fully clean, blur or patch the chest badge on the white T-shirt for about 24 frames. Otherwise accept.

### 7. Real clips (10.0-12.6): identifiable real people (minor or advisory; not realism)
Several real faces are clearly identifiable: the hug group, the clapping crowd and the zipline rider.
**Fix:** confirm the park has release or consent for paid or social use of these participants, especially the zipline rider, whose age cannot be confirmed from the frames. If not, swap in clips without readable faces.

### Note (story, not realism): 4.0-6.5
The caption says "he feels nobody sees him", but in the meeting shot he is speaking and the colleagues are looking at him and smiling. **Fix:** if the shot is regenerated, have him silent and looking down while the others talk among themselves.
