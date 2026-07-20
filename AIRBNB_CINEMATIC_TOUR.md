# Cinematic 3D Walkthrough — Airbnb #52400404 (Spanish-style bungalow)

One continuous cinematic tour built with Higgsfield (Kling 3.0 Pro + Seedance 2.0),
generated room-by-room from the actual listing photos so every shot matches the
real layout and look. No narration. Drone in → walk the whole home → drone out.

## Final master (1080p)
https://d2ol7oe51mr4n9.cloudfront.net/user_3CECn5vZpEffDgEWHcsYzdJTdOo/7f43d0f1-66ca-4fb2-b69e-1f644d75820f.mp4

Local copy: `airbnb_video/cinematic_tour_1080p.mp4`

## Shot list (10 × 5s, chained start→end frames)
1. Aerial drone descent onto the white stucco / turquoise-arch bungalow (Seedance 2.0)
2. Up the tiled steps, through the front door, into the sunroom
3. Sunroom → living room (vaulted ceiling, gray sofa)
4. Living room → farmhouse dining table
5. Dining → navy-blue chef's kitchen
6. Kitchen → primary bedroom (iron bed, sage accents)
7. Primary → mint-green guest bedroom
8. Guest bedroom → sunny yellow bath (double vanity, soaking tub)
9. Bath → private back patio
10. Drone ascent finale rising over the roofline and neighborhood

## How it was made
- Listing photos pulled from the shared Google Doc via a GitHub Actions fetch step
  (`.github/workflows/fetch_photos.yml`) into `airbnb_photos/`.
- Each room imported into Higgsfield; clips generated with Kling 3.0 Pro using the
  previous room's photo as the start frame and the next room's photo as the end frame,
  producing real doorway transitions. Drone bookends generated separately.
- Clips concatenated + normalized to 1080p24 with ffmpeg
  (`.github/workflows/stitch_videos.yml`).
- 4K (2160p) master produced with Topaz video upscale.
