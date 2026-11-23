# Marketing QC: «الاستقالة اللي ما وصلتك» (Reels A / B / C)

Reviewer: independent marketing QC  
Files checked: `deliver/forest_park_reel_A.mp4`, `_B.mp4`, `_C.mp4` (each 17.5 s, 1080x1920, 30 fps), `deliver/cover.jpg`, `deliver/caption.txt`  
Method: frames extracted at 4 fps (70 per version) and viewed as tiles, with sound off. Full-res checks at 0.0 s, 0.27 s, 6.7 s, 17.2 s and the end card. A PSNR diff shows that B and C are identical to A from about 2.4 s onward. Only the hook cards differ.

## Verdict: **FAIL**: not ready to post as is

The concept, the sound-off storytelling and the payoff are strong. Two things stop posting as is: (1) the right to use the real people from a past event in an ad is not confirmed, and (2) Meta's AI disclosure for the photorealistic AI-generated hero shots has not been handled. There are also two quick edit fixes: the CTA is on screen too briefly, and the CTA wording disagrees with the caption. None of this needs a reshoot.

## What works
- **Hook (sound off):** at 0.25 s the overlay «في موظف بشركتك… كاتب استقالته وما بعتها لسا.» sits over a resignation email (إلى: الموارد البشرية / الموضوع: استقالة) with the cursor hovering over «إرسال». The situation is clear within 1 s, with no audio needed.
- **The story reads without sound.** Each beat has its own card: مش عشان الراتب → ما حدا شايفه → لحد ما إجا يوم (tower edge) → الكل صار يصرخ باسمه → يوم واحد بيرجّعله إحساسه → وبيضل بدل ما يروح. Every card stays up for about 1.5–2.5 s, which is enough to read.
- **The payoff is clear.** At 13.0–14.25 s the cursor moves from «إرسال» to «حذف المسودة», the email fades out, a «تم حذف المسودة» toast appears, and the copy «وبيضل… بدل ما يروح.» confirms it.
- **Curiosity holds.** The open loop ("will he hit send?") only resolves at 13–14 s, so viewers have a reason to stay.
- **Dignity:** no manager is shown or named. The email goes to HR in polite formal Arabic, and the company is not blamed. There is nothing religious, political or insulting, and no price appears anywhere.
- **Brand:** the logo is the correct official mark (the white version of `input/brand/logo_source.jpg`, including "Dr. Ibrahim ALSwielmeen") on a brand-green card. It is visible from 15.25 s to the end, so it covers the last 2 s.
- **Length** of 17.5 s fits the account's best-performing format (under 20 s).
- **Safety image:** the hero wears a helmet, a harness and gloves on the tower. The challenge looks real but responsible.

## Issues

| # | Time | Severity | Issue | Concrete fix |
|---|------|----------|-------|--------------|
| 1 | 10.0–12.5 s | **HIGH (blocker)** | There are three real clips from a past company event: the clapping group, the hug of four men with clear faces, and a woman in hijab on the zipline, filmed close-up with her face visible. These identifiable people are cut into a fictional resignation story, which implies they took part in it, and the video is a paid-intent sales ad. `caption.txt` itself says permission is unconfirmed. In the Jordanian context, showing an identifiable woman in an ad without consent is the highest risk. | Before posting, get written consent from the client company (and ideally from the people shown). If you can't, replace these shots with park footage that shows no identifiable faces: backs, helmets, wide shots, or staff/actors who signed releases. At minimum, swap the zipline close-up (11.75–12.4 s) for a wide shot. |
| 2 | 1.5–10.0 s (office, meeting, tower edge, rappel) | **HIGH (blocker)** | The hero and his colleagues are photorealistic AI-generated people (Nano Banana + Kling, per `work/prompts.md`), presented with no disclosure. Meta asks for the "AI info" label on realistic AI video. Posting undisclosed risks a label being added automatically or reduced reach, and a backlash in the comments if people spot it ("fake employee"). | Turn on **"Add AI label"** when uploading. Add a small on-screen tag «قصة تمثيلية» (about 28 px, 60% opacity, bottom-left) from 1.5 to 10 s, or on the first card. Add «القصة تمثيلية» as the last line of the caption. |
| 3 | 15.25–17.5 s | MEDIUM | The CTA pill «اكتب «فريق» ونبعتلك البرنامج» is only fully visible from about 16.2 s, roughly 1.3 s before the video loops. That is too short for the core action of a sales reel, and most viewers will see it only once. | Lengthen the end card to about 3 s (total ≈ 18.5 s, still under 20 s). Bring the CTA in together with the headline at 15.3 s, not after it. Optionally add a small «فريق ✉️» sticker from 13 s. |
| 4 | 15.25 s + caption | MEDIUM | The CTA channel is inconsistent. The brief says the CTA drives **DMs**, the video only says «اكتب «فريق»», and the caption says «اكتب «فريق» **بالتعليقات**». A comment CTA only works if every comment gets a DM reply. | Pick one channel. Recommended: «ابعتلنا «فريق» بالخاص» in both the video and the caption. Or keep comments but turn on comment-to-DM auto-reply (ManyChat or Meta's auto-reply) before posting. |
| 5 | 10.0 s | LOW–MEDIUM | Continuity break: the hero rappels alone at sunset (9.0–10.0 s), then the cut goes to a different group, in midday light, cheering. The line «والكل صار يصرخ باسمه» never shows him with the team, so the emotional peak (he is "seen") is told but not shown. | Grade the real clips warmer to match the golden hour, and put a quick cut of the hero's (AI) face/helmet reacting before the cheer. Or soften the copy to «والفريق كلّه صار يشجّعه.» |
| 6 | 0.00 s (first frame) | LOW | Frame 0 has the hook text at 0% opacity (it fades in until about 0.25 s). In the feed preview and in the first sound-off moment, the very first frame shows only a UI card with no text. | Make the hook text fully visible from frame 0 (no fade-in). |
| 7 | 17.5 → 0.0 s (loop) | LOW | The loop is a hard cut from the green end card to the black email screen. The story start makes the replay acceptable, but it doesn't flow. | Optionally end with 0.3 s of the email card coming back with the cursor on «إرسال» (that matches frame 0), so the loop reads as "it could happen again". |
| 8 | 6.5–9.0 s | LOW | A dinosaur statue (a real park prop) shows clearly in the lower-left of the tower shot. It pulls a corporate audience toward a "kids' park" impression. | Crop or reposition about 10% to the right, or accept it. |
| 9 | 14.0–15.2 s | LOW | The «تم حذف المسودة» toast is small, about 26 px on a 1080 px canvas. It reads on a phone, but only just. | Scale the toast to about 140% or zoom the email card in during the delete. |
| 10 | Hook C, 0–2.4 s → 2.4 s | MEDIUM (C only) | Hook C («الاستقالة… مش دايماً عشان الراتب.») is followed straight away by the card «مش عشان الراتب…», so the line repeats. Hook C also gives away the twist ("not salary") in the first second. | If C is kept, change its second card to «…عشان حاسس إنه ما حدا شايفه» and cut the duplicate card. Otherwise drop C from the test. |
| 11 | Cover | LOW | The cover is effective: a dark, moody office, the laptop showing the resignation email, and the hook A text large and centered, so it is readable in the 4:5 grid crop. But it carries hook A's text. If B wins the trial, the cover won't match. | Prepare a cover for B too: the same image with B's line. |

Not issues: no price, no manager, no religion or politics. The Jordanian flag on the tower (10.0 s) is a neutral national symbol and acceptable. "أحياناً يوم واحد…" is hedged, so it doesn't promise a guaranteed outcome. The end line «قبل ما تخسر أحسن موظفينك» is persuasive but not a factual claim.

## Hook ranking for the Trial Reels test

1. **B**: «أحسن موظف عندك… ممكن يكون هلّق بيكتب استقالته.» It speaks directly to the buyer's fear (CEO/HR), ties back to the end line «أحسن موظفينك», and "هلّق" adds urgency. Most likely to drive Sends to HR and managers. **Post first.**
2. **A**: «في موظف بشركتك… كاتب استقالته وما بعتها لسا.» A clear open loop that matches the email visual exactly. It reads slightly more neutral/observational, and employees may share it more readily. A strong control.
3. **C**: «الاستقالة… مش دايماً عشان الراتب.» It reads like an opinion, not a story, gives the twist away, and repeats the next card (issue 10). Weakest.

Test plan: run B and A as Trial Reels (C only if it's fixed). Judge after 24–48 h by 3-second hold and Sends, then by «فريق» DMs.

## Required before posting (checklist)
- [ ] Written consent for the real event footage, or replace it (issue 1)
- [ ] Meta AI label on, plus a «قصة تمثيلية» tag (issue 2)
- [ ] End card at about 3 s with the CTA in at 15.3 s (issue 3)
- [ ] One CTA channel (DM) in both the video and the caption, or set up comment-to-DM (issue 4)
- [ ] Hook text visible at frame 0 (issue 6)
