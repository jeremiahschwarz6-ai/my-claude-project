# Video assets

Two videos were generated with Higgsfield, color-graded to the night→dawn
palette, and are referenced live from the Higgsfield CDN in `lib/site.ts`
(`video.sells` and `video.ambient`). They load fine on the deployed site.

**For permanence**, download them into this folder and switch to the local
paths — the build environment's egress policy blocked the CDN host, so they
couldn't be committed automatically:

1. Open the two URLs in `lib/site.ts` (`video.sells`, `video.ambient`) in a
   browser and save them here as:
   - `video-that-sells.mp4` (9:16 short-form clip)
   - `ambient-loop.mp4` (16:9 ambient loop)
2. In `lib/site.ts`, point `video.sells` at `video.sellsLocal` (and
   `video.ambient` at `video.ambientLocal`), or set the
   `NEXT_PUBLIC_VIDEO_SELLS_URL` / `NEXT_PUBLIC_VIDEO_AMBIENT_URL` env vars.

Optional: produce a WebM (VP9) fallback and a poster frame with ffmpeg:

```
ffmpeg -i video-that-sells.mp4 -c:v libvpx-vp9 -b:v 0 -crf 34 -an video-that-sells.webm
ffmpeg -i video-that-sells.mp4 -vf "select=eq(n\,0)" -q:v 3 poster-sells.jpg
```

Then add the `<source>` for the WebM and set `poster="/video/poster-sells.jpg"`
in `components/VideoThatSells.tsx`.
