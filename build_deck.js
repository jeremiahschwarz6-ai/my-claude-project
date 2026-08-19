const pptxgen = require("pptxgenjs");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const sharp = require("sharp");
const Fa = require("react-icons/fa");

// ---------- palette ----------
const NAVY = "1E2A44";   // primary dark
const NAVY2 = "27334F";  // slightly lighter panel
const CORAL = "FF6B4A";  // accent
const GOLD = "F4B740";   // secondary accent
const INK = "24303F";    // body text on light
const MUTED = "6B7688";  // captions
const LIGHT = "F3F6FB";  // light card bg
const WHITE = "FFFFFF";
const HEADFONT = "Cambria";
const BODYFONT = "Calibri";

// ---------- icon rasterizer ----------
async function iconPng(Icon, hex, size = 256) {
  let svg = renderToStaticMarkup(React.createElement(Icon, { size, color: `#${hex}` }));
  svg = svg.replace(/currentColor/g, `#${hex}`);
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

async function main() {
  const I = {}; // white icons for coral circles
  const iconDefs = {
    shoe: Fa.FaShoePrints, users: Fa.FaUsers, bullseye: Fa.FaBullseye,
    hashtag: Fa.FaHashtag, lightbulb: Fa.FaLightbulb, instagram: Fa.FaInstagram,
    tiktok: Fa.FaTiktok, facebook: Fa.FaFacebookF, mobile: Fa.FaMobileAlt,
    strava: Fa.FaStrava, blog: Fa.FaPenNib, calendar: Fa.FaCalendarAlt,
    cross: Fa.FaCross, heart: Fa.FaHandHoldingHeart, comment: Fa.FaCommentDots,
    chart: Fa.FaChartLine, camera: Fa.FaCamera, run: Fa.FaRunning,
    map: Fa.FaMapSigns, book: Fa.FaBookOpen, quote: Fa.FaQuoteLeft,
  };
  for (const [k, C] of Object.entries(iconDefs)) I[k] = await iconPng(C, "FFFFFF");
  const INAVY = {}; // navy icons for light circles (unused mostly)
  for (const [k, C] of Object.entries(iconDefs)) INAVY[k] = await iconPng(C, NAVY);

  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE"; // 13.33 x 7.5
  pres.defineSlideMaster({ title: "LIGHT", background: { color: WHITE } });
  const W = 13.33, H = 7.5;

  // ---------- helpers ----------
  function iconCircle(slide, x, y, d, icon, { circle = CORAL, pad = 0.22 } = {}) {
    slide.addShape(pres.ShapeType.ellipse, { x, y, w: d, h: d, fill: { color: circle } });
    slide.addImage({ data: icon, x: x + pad, y: y + pad, w: d - pad * 2, h: d - pad * 2 });
  }
  function title(slide, text, { color = NAVY, y = 0.5 } = {}) {
    slide.addText(text, { x: 0.6, y, w: 12.1, h: 0.9, fontFace: HEADFONT, fontSize: 34, bold: true, color, align: "left" });
  }
  function kicker(slide, text, color = CORAL) {
    slide.addText(text.toUpperCase(), { x: 0.62, y: 0.28, w: 12, h: 0.35, fontFace: BODYFONT, fontSize: 12, bold: true, color, charSpacing: 3 });
  }
  function bullets(items, opts = {}) {
    return items.map((t, i) => ({ text: t, options: { bullet: { code: "2022", indent: 18 }, color: opts.color || INK, fontSize: opts.fontSize || 17, fontFace: BODYFONT, paraSpaceAfter: 10, breakLine: true } }));
  }
  function card(slide, x, y, w, h, fill = LIGHT) {
    slide.addShape(pres.ShapeType.roundRect, { x, y, w, h, rectRadius: 0.12, fill: { color: fill }, line: { type: "none" }, shadow: { type: "outer", color: "9AA6B8", opacity: 0.35, blur: 8, offset: 3, angle: 90 } });
  }
  const newLight = () => { const s = pres.addSlide({ masterName: "LIGHT" }); return s; };
  const newDark = () => { const s = pres.addSlide(); s.background = { color: NAVY }; return s; };

  // ============ SLIDE 1: TITLE ============
  {
    const s = newDark();
    // decorative large translucent circle
    s.addShape(pres.ShapeType.ellipse, { x: 9.7, y: -1.6, w: 5.4, h: 5.4, fill: { color: NAVY2 } });
    s.addShape(pres.ShapeType.ellipse, { x: 11.2, y: 3.9, w: 3.6, h: 3.6, fill: { color: CORAL, transparency: 82 } });
    iconCircle(s, 0.9, 0.85, 1.5, I.shoe, { pad: 0.42 });
    s.addText("STCO 357  •  DIGITAL PUBLIC RELATIONS", { x: 0.95, y: 2.55, w: 11, h: 0.4, fontFace: BODYFONT, fontSize: 14, bold: true, color: GOLD, charSpacing: 3 });
    s.addText("Sole to Soul", { x: 0.9, y: 2.95, w: 11.5, h: 1.3, fontFace: HEADFONT, fontSize: 66, bold: true, color: WHITE });
    s.addText("A One-Month Digital PR Campaign for Shood (Shoes for Good)", { x: 0.95, y: 4.25, w: 10.5, h: 0.6, fontFace: BODYFONT, fontSize: 21, color: "CBD5E6" });
    s.addText("#SoleToSoulRVA", { x: 0.95, y: 5.0, w: 6, h: 0.6, fontFace: HEADFONT, fontSize: 24, bold: true, italic: true, color: CORAL });
    s.addText([
      { text: "Student Name", options: { bold: true } },
      { text: "     |     September 17, 2026     |     Presented to Shood Leadership", options: {} },
    ], { x: 0.95, y: 6.35, w: 11.5, h: 0.5, fontFace: BODYFONT, fontSize: 15, color: "AAB6CC" });
    s.addNotes("Good morning, and thank you for having me. My name is [Student Name], and today—September 17, 2026—I'm excited to walk you through 'Sole to Soul,' a one-month digital public relations campaign built specifically for Shood. Over the next few minutes I'll share who we're trying to reach, the creative idea and hashtag that ties everything together, the exact digital channels we'll use and why, sample content, how supporters will participate each week, our September timeline, and the faith foundation beneath it all. My goal is a plan you can picture launching on day one.");
  }

  // ============ SLIDE 2: OVERVIEW / AGENDA ============
  {
    const s = newLight();
    kicker(s, "Campaign at a Glance");
    title(s, "Meet Shood — and Today's Roadmap");
    // left: Meet Shood card
    card(s, 0.6, 1.7, 5.7, 5.1, NAVY);
    iconCircle(s, 0.95, 2.05, 1.0, I.heart, { pad: 0.28 });
    s.addText("Meet Shood", { x: 2.15, y: 2.2, w: 4, h: 0.7, fontFace: HEADFONT, fontSize: 24, bold: true, color: WHITE });
    s.addText(bullets([
      "Richmond nonprofit, founded 2017",
      "25,000+ pairs delivered with dignity",
      "Running shoes cleaned and restored",
      "Serves neighbors facing poverty",
      "100% volunteer-run",
    ], { color: "E6ECF7", fontSize: 17 }), { x: 1.0, y: 3.25, w: 5.0, h: 3.3 });
    // right: roadmap rows
    const road = [
      ["bullseye", "Target public & insights"],
      ["lightbulb", "Creative theme & hashtag"],
      ["mobile", "Channels, mobile & blog"],
      ["comment", "Content & weekly engagement"],
      ["calendar", "Timeline & biblical integration"],
    ];
    let ry = 1.85;
    road.forEach(([ic, tx]) => {
      iconCircle(s, 6.85, ry, 0.72, I[ic], { pad: 0.19 });
      s.addText(tx, { x: 7.75, y: ry + 0.02, w: 5.0, h: 0.68, fontFace: BODYFONT, fontSize: 18, bold: true, color: INK, valign: "middle" });
      ry += 1.02;
    });
    s.addNotes("Before we dive in, a quick reminder of who we're serving. Shood is a Richmond-based nonprofit founded in 2017 that collects, cleans, and refits running shoes, then delivers them with dignity to people experiencing poverty and homelessness—more than 25,000 pairs so far, all through volunteers. That mission of dignity is the north star for everything you'll see today. On the right is our roadmap: we'll move from the audience, to the creative idea, to the channels and content, and finish with the timeline and the biblical foundation.");
  }

  // ============ SLIDE 3: TARGET PUBLIC — PSYCHOGRAPHICS ============
  {
    const s = newLight();
    kicker(s, "Target Public");
    title(s, "Who We're Reaching");
    // stat callouts row
    const stats = [["25–45", "Age range"], ["RVA", "Greater Richmond"], ["Runners", "Active lifestyle"]];
    let sx = 0.6;
    stats.forEach(([n, l]) => {
      card(s, sx, 1.75, 3.75, 1.5, LIGHT);
      s.addText(n, { x: sx, y: 1.85, w: 3.75, h: 0.9, align: "center", fontFace: HEADFONT, fontSize: 40, bold: true, color: CORAL });
      s.addText(l, { x: sx, y: 2.72, w: 3.75, h: 0.45, align: "center", fontFace: BODYFONT, fontSize: 14, color: MUTED });
      sx += 4.0;
    });
    s.addText("Psychographics", { x: 0.62, y: 3.55, w: 8, h: 0.5, fontFace: HEADFONT, fontSize: 22, bold: true, color: NAVY });
    // two columns of bullets
    s.addText(bullets([
      "Health-minded and community-driven",
      "Value dignity and second chances",
      "Give when personally connected",
    ]), { x: 0.7, y: 4.15, w: 6.0, h: 2.6 });
    s.addText(bullets([
      "Cycle through running shoes often",
      "Digitally savvy and mobile-first",
      "Motivated by local, tangible impact",
    ]), { x: 6.9, y: 4.15, w: 6.0, h: 2.6 });
    s.addNotes("Our primary public is Richmond-area active adults roughly 25 to 45—recreational runners, walkers, and fitness enthusiasts. Psychographically, they're health-minded and community-oriented, they respond to values like dignity and second chances, and research on nonprofit fundraising shows they give when they feel a personal connection to the cause. Practically, they matter to Shood for one very concrete reason: they own and regularly replace the exact resource we need—running shoes. They're also digitally savvy and mobile-first, which shapes every channel decision that follows.");
  }

  // ============ SLIDE 4: TARGET PUBLIC — MEDIA & CONTENT ============
  {
    const s = newLight();
    kicker(s, "Target Public");
    title(s, "How They Engage");
    card(s, 0.6, 1.75, 5.85, 5.0, LIGHT);
    iconCircle(s, 0.95, 2.1, 0.9, I.mobile, { pad: 0.25 });
    s.addText("Media They Use", { x: 2.0, y: 2.25, w: 4, h: 0.6, fontFace: HEADFONT, fontSize: 21, bold: true, color: NAVY });
    s.addText(bullets([
      "Instagram & TikTok daily",
      "Facebook community groups",
      "Strava for running",
      "Smartphone, always on",
    ]), { x: 1.05, y: 3.2, w: 5.1, h: 3.2 });
    card(s, 6.85, 1.75, 5.85, 5.0, NAVY);
    iconCircle(s, 7.2, 2.1, 0.9, I.camera, { pad: 0.25 });
    s.addText("Content They Love", { x: 8.25, y: 2.25, w: 4, h: 0.6, fontFace: HEADFONT, fontSize: 21, bold: true, color: WHITE });
    s.addText(bullets([
      "Authentic transformation stories",
      "Behind-the-scenes volunteering",
      "Practical fitness tips",
      "Real, measurable impact",
    ], { color: "E6ECF7" }), { x: 7.3, y: 3.2, w: 5.1, h: 3.2 });
    s.addNotes("This audience lives on their phones. They scroll Instagram and TikTok daily, belong to Richmond Facebook groups, and track their workouts on Strava—which becomes important later. When it comes to what actually holds their attention, studies of nonprofit engagement find that authenticity beats polish: they want real transformation stories, honest behind-the-scenes glimpses of the volunteer work, useful fitness tips, and clear evidence of impact—how many pairs went out and whose life changed. So our content strategy leads with emotion and proof, not solicitation.");
  }

  // ============ SLIDE 5: CREATIVE THEME (DARK) ============
  {
    const s = newDark();
    s.addShape(pres.ShapeType.ellipse, { x: 10.4, y: 4.4, w: 4.4, h: 4.4, fill: { color: CORAL, transparency: 85 } });
    kicker(s, "Creative Theme", GOLD);
    title(s, "The Big Idea: Sole to Soul", { color: WHITE });
    iconCircle(s, 0.75, 2.05, 1.4, I.shoe, { pad: 0.4 });
    s.addText("“From one sole to another soul.”", { x: 2.5, y: 2.15, w: 10, h: 1.1, fontFace: HEADFONT, fontSize: 30, italic: true, bold: true, color: CORAL });
    s.addText(bullets([
      "Shoe's sole meets human soul",
      "Reframes giving as restored dignity",
      "Inherently visual and story-driven",
      "Scales across platforms — no duplicate content",
    ], { color: "E6ECF7", fontSize: 19 }), { x: 0.85, y: 3.7, w: 11.5, h: 3.0 });
    s.addNotes("Here's the creative heart of the campaign: 'Sole to Soul.' It's a deliberate play on words—the sole of a shoe meeting the soul of a person. That single idea captures Shood's conviction that a well-fitted pair restores not just physical comfort but human dignity. Strategically it does three things for you: it reframes a donated shoe from a discarded object into a vehicle for dignity, it's naturally visual and story-driven so it matches how our audience consumes media, and it flexes across every platform so we never have to repeat the same post twice—which the assignment and good practice both require.");
  }

  // ============ SLIDE 6: HASHTAG ============
  {
    const s = newLight();
    kicker(s, "Campaign Hashtag");
    title(s, "One Rallying Cry");
    card(s, 0.6, 1.8, 12.13, 2.0, NAVY);
    iconCircle(s, 1.05, 2.15, 1.3, I.hashtag, { pad: 0.36 });
    s.addText("#SoleToSoulRVA", { x: 2.7, y: 2.15, w: 10, h: 1.3, fontFace: HEADFONT, fontSize: 52, bold: true, color: WHITE, valign: "middle" });
    const why = [
      ["lightbulb", "Original to this campaign"],
      ["heart", "Links soles to souls"],
      ["map", "Roots it in Richmond"],
      ["chart", "Short, searchable, shareable"],
    ];
    let wx = 0.6;
    why.forEach(([ic, tx]) => {
      card(s, wx, 4.15, 2.86, 2.55, LIGHT);
      iconCircle(s, wx + 0.9, 4.45, 1.05, I[ic], { pad: 0.28 });
      s.addText(tx, { x: wx + 0.2, y: 5.6, w: 2.46, h: 0.95, align: "center", fontFace: BODYFONT, fontSize: 15, bold: true, color: INK, valign: "top" });
      wx += 3.04;
    });
    s.addNotes("Every campaign needs one rallying cry, and ours is hashtag Sole to Soul R-V-A. It's original—it isn't borrowed from an existing slogan—and it does a lot of work in a few characters. It carries the sole-to-soul wordplay, it plants the flag firmly in Richmond with 'RVA,' and it's short enough to travel cleanly across Instagram, TikTok, and Facebook while staying easy to search and track. Consistency matters here: this exact hashtag appears on every post, every week, so all the individual pieces ladder up to one measurable conversation.");
  }

  // ============ SLIDE 7: DIGITAL MEDIA MIX ============
  {
    const s = newLight();
    kicker(s, "Digital Media");
    title(s, "Five Channels, One Story");
    const ch = [
      ["instagram", "Instagram", "Visual heart of the campaign"],
      ["tiktok", "TikTok", "Reach & discovery engine"],
      ["facebook", "Facebook", "Community drives & events"],
      ["strava", "Mobile / Strava", "Run, log, and give"],
      ["blog", "Blog", "Deeper stories, search home"],
    ];
    // top row 3, bottom row 2 (centered)
    const positions = [
      [0.6, 1.8], [4.62, 1.8], [8.64, 1.8],
      [2.61, 4.35], [6.63, 4.35],
    ];
    ch.forEach((c, i) => {
      const [x, y] = positions[i];
      card(s, x, y, 3.75, 2.35, LIGHT);
      iconCircle(s, x + 0.32, y + 0.32, 1.0, I[c[0]], { pad: 0.27 });
      s.addText(c[1], { x: x + 1.45, y: y + 0.42, w: 2.2, h: 0.75, fontFace: HEADFONT, fontSize: 19, bold: true, color: NAVY, valign: "middle" });
      s.addText(c[2], { x: x + 0.3, y: y + 1.45, w: 3.15, h: 0.75, fontFace: BODYFONT, fontSize: 15, color: MUTED });
    });
    s.addNotes("Now the media mix. Rather than repeat one message everywhere, each channel gets a distinct job—research shows nonprofits raise more when they diversify content instead of recycling it. Instagram is our visual heart. TikTok is the discovery engine that reaches beyond our followers. Facebook is the community hub that organizes real-world shoe drives. Mobile shows up through a Strava running challenge plus text-to-give. And the blog on shood.org is the campaign's home for deeper storytelling. The next slides take each one in turn—its primary uses and why it earned a place in the plan.");
  }

  // ============ Platform detail slide factory ============
  function platformSlide({ kick, name, icon, uses, why, accent = CORAL }) {
    const s = newLight();
    kicker(s, kick);
    title(s, name);
    iconCircle(s, 11.15, 0.28, 1.35, icon, { circle: accent, pad: 0.38 });
    card(s, 0.6, 1.9, 5.9, 4.6, LIGHT);
    s.addText("Primary Uses & Features", { x: 1.0, y: 2.2, w: 5.2, h: 0.55, fontFace: HEADFONT, fontSize: 20, bold: true, color: NAVY });
    s.addText(bullets(uses), { x: 1.0, y: 2.9, w: 5.2, h: 3.4 });
    card(s, 6.83, 1.9, 5.9, 4.6, NAVY);
    s.addText("Why We Selected It", { x: 7.25, y: 2.2, w: 5.2, h: 0.55, fontFace: HEADFONT, fontSize: 20, bold: true, color: WHITE });
    s.addText(bullets(why, { color: "E6ECF7" }), { x: 7.25, y: 2.9, w: 5.2, h: 3.4 });
    return s;
  }

  // ============ SLIDE 8: INSTAGRAM ============
  platformSlide({
    kick: "Digital Media  •  Social Network 1", name: "Instagram", icon: I.instagram,
    uses: ["Feed, Stories, and Reels", "Carousels, polls, question stickers", "Link sticker drives action"],
    why: ["Audience is highly visual", "Aesthetic fit for dignity imagery", "Carries polished before-and-after stories"],
  }).addNotes("Instagram is the visual anchor of the campaign. Its primary uses are photo and short-video sharing through the feed, Stories, and Reels, and its features—carousels, polls, question stickers, and the link sticker—support both storytelling and a direct call to action. We chose it because our target public is highly visual, and Instagram's emphasis on aesthetics is a perfect match for Shood's before-and-after refurbishing imagery. This is where the emotional heart of 'Sole to Soul' lives, through polished recipient and volunteer stories.");

  // ============ SLIDE 9: TIKTOK ============
  platformSlide({
    kick: "Digital Media  •  Social Network 2", name: "TikTok", icon: I.tiktok, accent: NAVY,
    uses: ["Short vertical video", "Duets, stitches, trending sounds", "Discovery-driven algorithm"],
    why: ["Reaches beyond our followers", "Attracts younger runners", "Rewards raw authenticity"],
  }).addNotes("TikTok is our discovery and reach engine. Its primary uses are short-form vertical video and participatory trends, and features like duets, stitches, and trending sounds—paired with its discovery algorithm—help small organizations reach far beyond their existing followers. We selected it to attract younger runners and to make the campaign shareable through authentic, unpolished 'day in the life' and shoe-transformation videos. Where Instagram is refined, TikTok is raw and energetic—so the two never duplicate each other's content.");

  // ============ SLIDE 10: FACEBOOK ============
  platformSlide({
    kick: "Digital Media  •  Social Network 3", name: "Facebook", icon: I.facebook,
    uses: ["Events and Groups", "Fundraisers and donate button", "Longer community posts"],
    why: ["Local Richmond community hub", "Reaches running clubs, older donors", "Organizes real-world drives"],
  }).addNotes("Facebook is our community-organizing and events hub. Its primary uses are longer posts, event pages, local group sharing, and built-in fundraisers with a donate button—exactly the tools we need to coordinate in-person collection drives. We chose it because Richmond running clubs, neighborhood groups, and many of our older donors are still very active there. Facebook handles the real-world logistics—the Saturday drives—that Instagram and TikTok simply can't.");

  // ============ SLIDE 11: MOBILE ============
  {
    const s = newLight();
    kicker(s, "Digital Media  •  Mobile Technology");
    title(s, "Mobile: Meet Them Moving");
    card(s, 0.6, 1.9, 5.9, 4.6, LIGHT);
    iconCircle(s, 0.95, 2.25, 1.0, I.strava, { pad: 0.27 });
    s.addText("Strava: “Miles for Soles”", { x: 2.1, y: 2.4, w: 4.2, h: 0.7, fontFace: HEADFONT, fontSize: 18, bold: true, color: NAVY, valign: "middle" });
    s.addText(bullets([
      "Log miles in the app",
      "Join the September club",
      "Mileage unlocks donated shoes",
    ]), { x: 1.0, y: 3.4, w: 5.2, h: 2.9 });
    card(s, 6.83, 1.9, 5.9, 4.6, NAVY);
    iconCircle(s, 7.2, 2.25, 1.0, I.mobile, { pad: 0.27 });
    s.addText("Text-to-Give & QR", { x: 8.35, y: 2.4, w: 4.2, h: 0.7, fontFace: HEADFONT, fontSize: 18, bold: true, color: WHITE, valign: "middle" });
    s.addText(bullets([
      "Text a keyword to give",
      "Scan a QR code anywhere",
      "Mobile page, gift in seconds",
    ], { color: "E6ECF7" }), { x: 7.25, y: 3.4, w: 5.2, h: 2.9 });
    s.addNotes("Mobile shows up in two ways, both designed to meet supporters exactly where they already are. First, a September Strava club challenge called 'Miles for Soles': runners log their miles on the Strava app, and once the group crosses a mileage threshold, a sponsoring running store donates a pair of shoes. It turns the very activity that connects them to the cause—running—into fundraising. Second, text-to-give and a QR code linked to a mobile-optimized donation page, so a supporter can complete a gift in seconds from their phone. Together these lower the friction of both action and donation.");
  }

  // ============ SLIDE 12: BLOG ============
  {
    const s = newLight();
    kicker(s, "Digital Media  •  Blogging");
    title(s, "Blog: The Campaign Home");
    iconCircle(s, 11.15, 0.28, 1.35, I.blog, { pad: 0.38 });
    card(s, 0.6, 1.95, 12.13, 2.15, LIGHT);
    s.addText("Hosted on shood.org — the search-visible archive that ties every channel together", { x: 1.0, y: 2.15, w: 11.3, h: 1.7, fontFace: BODYFONT, fontSize: 20, italic: true, color: INK, valign: "middle" });
    const posts = [
      ["Depth social can't hold", "book"],
      ["One long story weekly", "comment"],
      ["Social posts link back", "chart"],
      ["Every post ends in action", "heart"],
    ];
    let px = 0.6;
    posts.forEach(([tx, ic]) => {
      card(s, px, 4.35, 2.86, 2.35, WHITE);
      iconCircle(s, px + 0.9, 4.6, 1.05, I[ic], { pad: 0.28 });
      s.addText(tx, { x: px + 0.15, y: 5.75, w: 2.56, h: 0.85, align: "center", fontFace: BODYFONT, fontSize: 15, bold: true, color: INK });
      px += 3.04;
    });
    s.addNotes("The blog on shood.org is the campaign's content home and its search-visible archive. Nonprofits use owned media to provide the depth that social platforms can't, and because active, community-oriented content is what converts online attention into donations, the blog strengthens the entire campaign. Each week we'll publish one long-form story—a volunteer profile, a recipient's journey, the science of proper shoe fit, and a campaign wrap-up—each ending with a clear call to donate, volunteer, or join the Strava challenge. Our social posts tease and link back here, making the blog the connective tissue of the plan.");
  }

  // ============ SLIDE 13: CONTENT IN ACTION ============
  {
    const s = newLight();
    kicker(s, "Content Examples");
    title(s, "Content That Connects to the Theme");
    const cc = [
      ["instagram", "Instagram", "Before / after shoe carousel", "“One pair, two lives changed.”"],
      ["tiktok", "TikTok", "Workshop transformation video", "“Throwaway to fresh start.”"],
      ["facebook", "Facebook", "Saturday drive event post", "“Clear your closet, give dignity.”"],
    ];
    let cx = 0.6;
    cc.forEach(([ic, name, ex, cap]) => {
      card(s, cx, 1.85, 3.91, 4.7, LIGHT);
      iconCircle(s, cx + 0.35, 2.2, 1.0, I[ic], { pad: 0.27 });
      s.addText(name, { x: cx + 1.5, y: 2.35, w: 2.3, h: 0.7, fontFace: HEADFONT, fontSize: 20, bold: true, color: NAVY, valign: "middle" });
      s.addText(ex, { x: cx + 0.35, y: 3.45, w: 3.2, h: 0.8, fontFace: BODYFONT, fontSize: 16, bold: true, color: INK });
      s.addText(cap, { x: cx + 0.35, y: 4.35, w: 3.2, h: 1.6, fontFace: HEADFONT, fontSize: 17, italic: true, color: CORAL });
      cx += 4.06;
    });
    s.addText("Every post literalizes the journey: a discarded sole becomes a message of dignity to another soul.", { x: 0.6, y: 6.75, w: 12.1, h: 0.5, align: "center", fontFace: BODYFONT, fontSize: 14, italic: true, color: MUTED });
    s.addNotes("Here's how the theme shows up in real content, adapted to each platform so nothing is duplicated. On Instagram, a before-and-after carousel: a scuffed donated shoe, then the same shoe refurbished, then fitted on a smiling neighbor—captioned 'one pair, two lives changed.' On TikTok, a fast-cut transformation video from the workshop set to a trending sound—'throwaway to fresh start'—that invites viewers to duet their own donation reveal. On Facebook, an event post for the first Saturday drive: 'clear your closet, give dignity.' Each one literalizes the sole-to-soul journey, and each carries the hashtag.");
  }

  // ============ SLIDE 14: UGC BY WEEK ============
  {
    const s = newLight();
    kicker(s, "User-Generated Content");
    title(s, "How Supporters Co-Create Each Week");
    const wk = [
      ["1", "Photo Challenge", "Post your donation shoes", "camera"],
      ["2", "“Why I Run”", "Share your story sticker", "comment"],
      ["3", "Miles for Soles", "Screenshot your Strava totals", "run"],
      ["4", "Dignity Quiz", "Test your shoe-fit know-how", "lightbulb"],
    ];
    let wx = 0.6;
    wk.forEach(([n, t, d, ic]) => {
      card(s, wx, 1.9, 2.94, 4.6, LIGHT);
      s.addShape(pres.ShapeType.ellipse, { x: wx + 1.07, y: 2.2, w: 0.8, h: 0.8, fill: { color: CORAL } });
      s.addText("W" + n, { x: wx + 1.07, y: 2.2, w: 0.8, h: 0.8, align: "center", valign: "middle", fontFace: HEADFONT, fontSize: 18, bold: true, color: WHITE });
      iconCircle(s, wx + 0.97, 3.2, 1.0, I[ic], { circle: NAVY, pad: 0.27 });
      s.addText(t, { x: wx + 0.1, y: 4.35, w: 2.74, h: 0.7, align: "center", fontFace: HEADFONT, fontSize: 18, bold: true, color: NAVY });
      s.addText(d, { x: wx + 0.15, y: 5.05, w: 2.64, h: 1.2, align: "center", fontFace: BODYFONT, fontSize: 14, color: MUTED });
      wx += 3.04;
    });
    s.addNotes("Every week has at least one piece of user-generated content, so supporters co-create the campaign rather than just watch it. Week one is the hashtag Sole to Soul R-V-A photo challenge: post a picture of the shoes you're donating and you're entered to win a running-store gift card. Week two is a 'Why I Run' story prompt on Instagram Stories, and we reshare the responses. Week three is the Strava 'Miles for Soles' challenge, where runners screenshot their totals. And week four is an interactive shoe-fit 'Dignity Quiz' that teaches how a proper fit should feel. Each one is interactive, shareable, and on-theme.");
  }

  // ============ SLIDE 15: TIMELINE (DARK) ============
  {
    const s = newDark();
    kicker(s, "Implementation Timeline", GOLD);
    title(s, "September 2026 at a Glance", { color: WHITE });
    const tl = [
      ["1", "Sept 1–7", "Launch", "Reveal + photo challenge"],
      ["2", "Sept 8–14", "Community", "“Why I Run” stories"],
      ["3", "Sept 15–21", "Movement", "Miles for Soles"],
      ["4", "Sept 22–30", "Impact", "Results + Dignity Quiz"],
    ];
    let tx = 0.6;
    tl.forEach(([n, dt, ph, sub], i) => {
      card(s, tx, 2.15, 2.94, 3.9, NAVY2);
      s.addShape(pres.ShapeType.ellipse, { x: tx + 1.07, y: 2.5, w: 0.8, h: 0.8, fill: { color: CORAL } });
      s.addText(n, { x: tx + 1.07, y: 2.5, w: 0.8, h: 0.8, align: "center", valign: "middle", fontFace: HEADFONT, fontSize: 20, bold: true, color: WHITE });
      s.addText(dt, { x: tx + 0.1, y: 3.5, w: 2.74, h: 0.4, align: "center", fontFace: BODYFONT, fontSize: 13, bold: true, color: GOLD });
      s.addText(ph, { x: tx + 0.1, y: 3.95, w: 2.74, h: 0.6, align: "center", fontFace: HEADFONT, fontSize: 21, bold: true, color: WHITE });
      s.addText(sub, { x: tx + 0.2, y: 4.65, w: 2.54, h: 1.2, align: "center", fontFace: BODYFONT, fontSize: 14, color: "C6D0E2" });
      if (i < 3) s.addText("→", { x: tx + 2.78, y: 3.55, w: 0.5, h: 0.6, align: "center", fontFace: BODYFONT, fontSize: 26, bold: true, color: CORAL });
      tx += 3.04;
    });
    s.addText("Each week: one narrative beat, coordinated across every channel — never duplicated.", { x: 0.6, y: 6.45, w: 12.1, h: 0.5, align: "center", fontFace: BODYFONT, fontSize: 15, italic: true, color: "AEB9CE" });
    s.addNotes("Here's how it all sequences across September. Week one launches the theme—the Instagram reveal carousel, the TikTok workshop video, the first Saturday drive on the 6th, and the photo challenge, with text-to-give going live. Week two shifts to community and the 'Why I Run' stories, plus running-club drives. Week three builds momentum with the Strava 'Miles for Soles' challenge and a sponsor match. Week four closes on impact—an impact carousel, a thank-you montage, the fundraiser close, and the Dignity Quiz. Each week owns a single narrative beat—launch, community, movement, impact—so every channel reinforces the same focus without repeating content.");
  }

  // ============ SLIDE 16: BIBLICAL INTEGRATION (DARK) ============
  {
    const s = newDark();
    s.addShape(pres.ShapeType.ellipse, { x: 10.6, y: -1.4, w: 4.6, h: 4.6, fill: { color: NAVY2 } });
    kicker(s, "Biblical Integration", GOLD);
    title(s, "Faith in Action", { color: WHITE });
    iconCircle(s, 0.75, 1.95, 1.4, I.cross, { pad: 0.42 });
    s.addText("A campaign about fitting feet with dignity is the gospel made tangible.", { x: 2.5, y: 2.0, w: 10.2, h: 1.25, fontFace: HEADFONT, fontSize: 23, italic: true, color: CORAL, valign: "middle" });
    const verses = [
      ["“The least of these… you did for me.”", "Matthew 25:40"],
      ["“How beautiful are the feet that bring good news.”", "Romans 10:15"],
      ["“Feet fitted with the gospel of peace.”", "Ephesians 6:15"],
    ];
    let vy = 3.6;
    verses.forEach(([q, ref]) => {
      s.addText([
        { text: q + "  ", options: { fontFace: HEADFONT, fontSize: 18, italic: true, color: WHITE } },
        { text: "— " + ref, options: { fontFace: BODYFONT, fontSize: 15, bold: true, color: GOLD } },
      ], { x: 0.85, y: vy, w: 11.7, h: 0.7, valign: "middle" });
      vy += 0.85;
    });
    s.addText("Every person is an image-bearer worthy of dignity — service, not transaction.", { x: 0.85, y: 6.3, w: 11.7, h: 0.6, fontFace: BODYFONT, fontSize: 16, bold: true, color: "D9E1F0" });
    s.addNotes("Finally, the foundation beneath all of it. Shood's mission of delivering shoes with dignity is deeply consistent with Scripture. In Matthew 25:40, Jesus says that whatever we did for the least of these, we did for Him—so each donated pair is service rendered ultimately to Christ. The imagery of feet is striking for this campaign: Romans 10:15 calls beautiful the feet that bring good news, and Ephesians 6:15 speaks of feet fitted with the gospel of peace. A campaign literally centered on fitting feet with dignity becomes a way to embody that good news. The 'Sole to Soul' theme treats every person as an image-bearer worthy of dignity—inviting servant-hearted generosity rather than transactional giving.");
  }

  // ============ SLIDE 17: REFERENCES ============
  {
    const s = newLight();
    kicker(s, "References");
    title(s, "References (APA 7th ed.)");
    const refs = [
      "Bhati, A., & McDonnell, D. (2025). Message content and diversity as an effective nonprofit fundraising strategy on social media. Nonprofit and Voluntary Sector Quarterly. Advance online publication. https://doi.org/10.1177/08997640241303920",
      "DeMasters, C., Morgan, K., Schwoerer, K., & Wiley, K. (2024). Forging connections: Nonprofits, TikTok, and authentic engagement—A mixed-methods study. Journal of Public and Nonprofit Affairs, 10(1), 27–51. https://doi.org/10.20899/jpna.dky82f18",
      "Elvira-Lorilla, T., García-Rodríguez, I., Romero-Merino, M. E., & Santamaría-Mariscal, M. (2024). The role of social media in nonprofit organizations’ fundraising. Nonprofit and Voluntary Sector Quarterly, 53(6), 1353–1380. https://doi.org/10.1177/08997640231213286",
      "Luttrell, R. (2021). Social media: How to engage, share, and connect (4th ed.). Rowman & Littlefield.",
      "New International Version. (2011). Bible Gateway. https://www.biblegateway.com (Original work published 1978)",
      "Telfian, R. (2026, September 3). Personal interview with the founder of Shood (Shoes for Good) [Client interview]. Richmond, VA.",
      "Wiley, K., Schwoerer, K., Richardson, M., & Espinosa, M. B. (2023). Engaging stakeholders on TikTok: A multi-level social media analysis of nonprofit microvlogging. Public Administration, 101(3), 822–842. https://doi.org/10.1111/padm.12851",
    ];
    s.addText(refs.map((t) => ({ text: t, options: { fontSize: 13, fontFace: BODYFONT, color: INK, paraSpaceAfter: 10, breakLine: true, indentLevel: 0 } })), { x: 0.7, y: 1.75, w: 12.0, h: 5.4, valign: "top" });
    s.addNotes("These are the sources behind the plan, formatted in APA 7th edition. The scholarly research—Wiley and colleagues, DeMasters, Elvira-Lorilla, and Bhati and McDonnell—was published between 2023 and 2025 and grounds our claims about nonprofit engagement, authenticity on TikTok, and fundraising. The Luttrell textbook, the Bible, and the client interview with Shood's founder complete the required set. This reference slide sits outside the required slide count. Thank you—I'm glad to take any questions.");
  }

  await pres.writeFile({ fileName: "Shood_Campaign_Presentation.pptx" });
  console.log("Wrote Shood_Campaign_Presentation.pptx");
}

main().catch((e) => { console.error(e); process.exit(1); });
