# 3D Property Walkthrough — Townhome #571

A room-by-room cinematic walkthrough generated with Higgsfield (Kling 3.0 Turbo,
image-to-video) directly from the listing photos in `listing_photos/`, so every
shot keeps the exact layout, staging, and look of the listing.

## Final video (24s, 1280×720)

**https://d8j0ntlcm91z4.cloudfront.net/user_3CECn5vZpEffDgEWHcsYzdJTdOo/hf_20260717_023724_cee0036e-26f5-4406-82cd-ccd2dade7273.mp4**

## Tour order & individual room clips (4s each)

| # | Room | Source photo | Clip |
|---|------|--------------|------|
| 1 | Exterior approach | `listing_photos/image40.jpg` | [clip](https://d8j0ntlcm91z4.cloudfront.net/user_3CECn5vZpEffDgEWHcsYzdJTdOo/hf_20260717_023433_4ebf3866-1214-45ed-89fd-71e35edbf0fc.mp4) |
| 2 | Living room → kitchen | `listing_photos/image55.jpg` | [clip](https://d8j0ntlcm91z4.cloudfront.net/user_3CECn5vZpEffDgEWHcsYzdJTdOo/hf_20260717_023453_b6f6f14c-04b9-4c14-9f52-22b6cfd2f0db.mp4) |
| 3 | Kitchen island | `listing_photos/image39.jpg` | [clip](https://d8j0ntlcm91z4.cloudfront.net/user_3CECn5vZpEffDgEWHcsYzdJTdOo/hf_20260717_023501_f7922352-052d-40ba-b196-079955aeb9eb.mp4) |
| 4 | Dining → balcony | `listing_photos/image17.jpg` | [clip](https://d8j0ntlcm91z4.cloudfront.net/user_3CECn5vZpEffDgEWHcsYzdJTdOo/hf_20260717_023511_d1edc01e-0c81-4705-b4c4-e32dfcede3ee.mp4) |
| 5 | Primary bedroom | `listing_photos/image10.jpg` | [clip](https://d8j0ntlcm91z4.cloudfront.net/user_3CECn5vZpEffDgEWHcsYzdJTdOo/hf_20260717_023521_cb5692ac-f52f-4d1f-b644-9a26f6dbc898.mp4) |
| 6 | Rooftop terrace (finale) | `listing_photos/image19.jpg` | [clip](https://d8j0ntlcm91z4.cloudfront.net/user_3CECn5vZpEffDgEWHcsYzdJTdOo/hf_20260717_023529_5deea23c-a144-497e-9354-117c29fbb411.mp4) |

Extra source photos staged in `listing_photos/` for optional future clips:
front door (`image23.jpg`), entry stairs (`image47.jpg`), kitchen range
(`image37.jpg`), balcony (`image29.jpg`), primary bath (`image48.jpg`),
office (`image64.jpg`).

## How it was made

1. Extracted the 67 listing photos from the uploaded `work_stuff.docx`.
2. Selected one hero photo per room and imported each into Higgsfield
   (`media_import_url` from this repo's raw GitHub URLs).
3. Generated a 4-second, 720p image-to-video clip per room with
   `kling3_0_turbo`, using each listing photo as the start frame and a slow
   gimbal dolly prompt so geometry, furniture, and lighting stay true to the
   photo.
4. Stitched the six clips in tour order with Higgsfield's assembly tool
   (`explainer_video`, no audio) into the final MP4.
