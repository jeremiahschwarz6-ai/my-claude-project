#!/usr/bin/env python3
"""Lacquered Stillness — nail salon promo (Instagram 1080x1080)."""
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

FONTS = "/root/.claude/skills/canvas-design/canvas-fonts"
S = 1080
SS = 3  # supersample factor
W = S * SS

# ---- palette -------------------------------------------------------------
IVORY   = (244, 236, 227)
IVORY2  = (238, 227, 216)
BLUSH   = (226, 190, 186)
ROSE    = (196, 138, 138)
BORDEAUX= (74, 32, 45)
BORDEAUX2=(58, 24, 35)
GOLD    = (176, 141, 92)
INK     = (48, 26, 33)

def font(name, size):
    return ImageFont.truetype(f"{FONTS}/{name}", size * SS)

# ---- base canvas: soft vertical gradient ---------------------------------
img = Image.new("RGB", (W, W), IVORY)
top, bot = (247, 240, 232), (232, 216, 208)
grad = Image.new("RGB", (1, W))
gp = grad.load()
for y in range(W):
    t = y / (W - 1)
    t = t ** 1.15
    gp[0, y] = tuple(round(top[i] + (bot[i] - top[i]) * t) for i in range(3))
img = grad.resize((W, W))

draw = ImageDraw.Draw(img, "RGBA")

# ---- the lacquered arc: a large glossy crescent (the nail surface) --------
# Build on its own layer so we can blur the gloss softly.
arc = Image.new("RGBA", (W, W), (0, 0, 0, 0))
ad = ImageDraw.Draw(arc)

cx, cy = int(W * 0.85), int(W * 0.45)
R = int(W * 0.40)

# solid disc mask (for clipping highlights to the sphere)
mask = Image.new("L", (W, W), 0)
ImageDraw.Draw(mask).ellipse([cx - R, cy - R, cx + R, cy + R], fill=255)

# sphere shading: light from upper-left. Build a radial gradient whose
# bright point is offset toward the upper-left, deepening to bordeaux at the rim.
lx, ly = cx - int(R * 0.42), cy - int(R * 0.42)   # light origin
maxd = math.hypot(R * 1.7, R * 1.7)
sphere = Image.new("RGB", (W, W), BORDEAUX2)
sp = sphere.load()
x0, y0 = max(0, cx - R), max(0, cy - R)
x1, y1 = min(W, cx + R), min(W, cy + R)
for y in range(y0, y1):
    for x in range(x0, x1):
        d = math.hypot(x - lx, y - ly) / maxd
        d = min(1.0, d)
        t = d ** 0.85
        sp[x, y] = tuple(round(ROSE[i] + (BORDEAUX2[i] - ROSE[i]) * t) for i in range(3))
arc.paste(sphere, (0, 0), mask)

# lunula: a soft lighter crescent hugging the lower-right rim
lun = Image.new("RGBA", (W, W), (0, 0, 0, 0))
ld = ImageDraw.Draw(lun)
lo = int(R * 0.16)
ld.ellipse([cx - R, cy - R, cx + R, cy + R], fill=BLUSH + (150,))
ld.ellipse([cx - R - lo, cy - R - lo, cx + R - lo, cy + R - lo], fill=(0, 0, 0, 0))
lun = lun.filter(ImageFilter.GaussianBlur(10 * SS))
lun.putalpha(Image.composite(lun.getchannel("A"), Image.new("L", (W, W), 0), mask))
arc = Image.alpha_composite(arc, lun)

# specular: an elongated soft gloss streak, clipped to the sphere
hi = Image.new("RGBA", (W, W), (0, 0, 0, 0))
hd = ImageDraw.Draw(hi)
hix, hiy = cx - int(R * 0.34), cy - int(R * 0.30)
hd.ellipse([hix - int(R * 0.12), hiy - int(R * 0.40),
            hix + int(R * 0.12), hiy + int(R * 0.40)], fill=(255, 247, 242, 210))
hi = hi.rotate(-28, center=(hix, hiy))
hi = hi.filter(ImageFilter.GaussianBlur(22 * SS))
hi.putalpha(Image.composite(hi.getchannel("A"), Image.new("L", (W, W), 0), mask))
# a tiny crisp catchlight
hd2 = ImageDraw.Draw(hi)
hd2.ellipse([hix - int(R*0.05), hiy - int(R*0.14),
             hix + int(R*0.05), hiy + int(R*0.10)], fill=(255, 250, 246, 180))
arc = Image.alpha_composite(arc, hi)

# thin gold ring just outside the disc
ring = Image.new("RGBA", (W, W), (0, 0, 0, 0))
rd = ImageDraw.Draw(ring)
rd.ellipse([cx - R - 9*SS, cy - R - 9*SS, cx + R + 9*SS, cy + R + 9*SS],
           outline=GOLD + (200,), width=max(1, SS))
arc = Image.alpha_composite(arc, ring)

img = Image.alpha_composite(img.convert("RGBA"), arc).convert("RGB")
draw = ImageDraw.Draw(img, "RGBA")

# ---- fine gold hairline framing the composition --------------------------
m = int(W * 0.055)
draw.rectangle([m, m, W - m, W - m], outline=GOLD + (120,), width=max(1, SS))

# small crescent motifs (echoes) top-left cluster
def crescent(dcx, dcy, r, col, a):
    layer = Image.new("RGBA", (W, W), (0,0,0,0))
    ld = ImageDraw.Draw(layer)
    ld.ellipse([dcx-r, dcy-r, dcx+r, dcy+r], fill=col+(a,))
    ld.ellipse([dcx-r+int(r*0.5), dcy-r-int(r*0.15), dcx+r+int(r*0.5), dcy+r-int(r*0.15)],
               fill=(0,0,0,0))
    return layer

# ---- typography ----------------------------------------------------------
def tracked(d, xy, text, fnt, fill, tracking, anchor="lm"):
    # measure total width with tracking
    widths = []
    for ch in text:
        bb = d.textbbox((0, 0), ch, font=fnt)
        widths.append(bb[2] - bb[0])
    total = sum(widths) + tracking * (len(text) - 1)
    x, y = xy
    if anchor[0] == "m":
        x -= total / 2
    elif anchor[0] == "r":
        x -= total
    for ch, wch in zip(text, widths):
        d.text((x, y), ch, font=fnt, fill=fill, anchor="l" + anchor[1])
        x += wch + tracking

f_kicker = font("Italiana-Regular.ttf", 30)
f_name   = font("Italiana-Regular.ttf", 66)
f_big     = font("Gloock-Regular.ttf", 300)
f_pct     = font("Gloock-Regular.ttf", 120)
f_sub    = font("PoiretOne-Regular.ttf", 40)
f_script = font("NothingYouCouldDo-Regular.ttf", 66)
f_terms  = font("Jura-Medium.ttf", 24)

# top: salon name (placeholder) + kicker — left column, clear of the sphere
LX = int(W * 0.105)
tracked(draw, (LX, int(W*0.125)), "MAISON  LACQUER", f_name, INK, 4*SS, anchor="lm")
tracked(draw, (LX + 3*SS, int(W*0.178)), "N A I L   A T E L I E R", f_kicker, GOLD, 9*SS, anchor="lm")

# script accent "the new-client"
draw.text((int(W*0.115), int(W*0.505)), "the new-client", font=f_script,
          fill=BORDEAUX + (255,), anchor="lm")

# The big offer: 20% — number huge, % smaller, on the left over ivory
bx, by = int(W*0.10), int(W*0.685)
draw.text((bx, by), "20", font=f_big, fill=BORDEAUX + (255,), anchor="lm")
nb = draw.textbbox((bx, by), "20", font=f_big, anchor="lm")
draw.text((nb[2] + 8*SS, by - int(W*0.055)), "%", font=f_pct, fill=ROSE + (255,), anchor="lm")

# "OFF · FIRST VISIT"
tracked(draw, (int(W*0.105), int(W*0.815)), "OFF  ·  YOUR  FIRST  VISIT",
        f_sub, INK, 6*SS, anchor="lm")

# bottom terms + booking line
draw.line([(m+int(W*0.02), int(W*0.865)), (W-m-int(W*0.02), int(W*0.865))],
          fill=GOLD + (150,), width=max(1, SS))
tracked(draw, (W//2, int(W*0.905)), "BOOK  ONLINE  ·  @MAISONLACQUER",
        f_terms, BORDEAUX, 6*SS, anchor="mm")
tracked(draw, (W//2, int(W*0.935)), "NEW GUESTS ONLY · NOT COMBINABLE · EXPIRES 30 DAYS",
        f_terms, (120, 96, 90), 4*SS, anchor="mm")

# ---- downsample for crisp anti-aliasing ----------------------------------
out = img.resize((S, S), Image.LANCZOS)
out.save("/home/user/my-claude-project/nail_salon_offer/nail_salon_offer.png")
print("saved")
