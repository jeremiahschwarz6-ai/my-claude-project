const pptxgen = require("pptxgenjs");
const { applyTheme } = require("/root/.claude/skills/synced/040e1262-4907-447b-83ff-c07b9d21029d_ad958b3f-b119-4880-89fc-7f21c2e66606/pptx/scripts/apply_theme.js");

const THEME = {
  name: "Splendid Spoon Pitch",
  headFontFace: "Cambria",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "14281B", lt1: "FFFFFF",
    dk2: "2F7336", lt2: "F1F5EE",
    accent1: "2F7336", accent2: "5C9E3F", accent3: "1B4D23",
    accent4: "9BC47A", accent5: "C8551F", accent6: "6E7B66",
    hlink: "2F7336", folHlink: "5C9E3F",
  },
};

const INK = "14281B", DEEP = "1B4D23", FOREST = "2F7336", MOSS = "5C9E3F",
      SAGE = "9BC47A", RUST = "C8551F", MUTE = "6E7B66", PAPER = "FFFFFF", WASH = "F1F5EE";

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";            // 13.3 x 7.5
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
pres.author = "STCO 348";
pres.title = "Splendid Spoon — Social Media Strategy Pitch";

const C = pres.SchemeColor;

/* ---------------- layouts ---------------- */
pres.defineSlideMaster({
  title: "DARK",
  background: { color: DEEP },
  objects: [
    { text: { text: "", options: { placeholder: "title", x: 0.9, y: 2.2, w: 11.5, h: 2.0,
      fontSize: 44, bold: true, color: PAPER, fontFace: "Cambria", valign: "bottom" } } },
    { text: { text: "", options: { placeholder: "body", x: 0.9, y: 4.35, w: 10.5, h: 1.6,
      fontSize: 18, color: SAGE, valign: "top" } } },
  ],
});

pres.defineSlideMaster({
  title: "LIGHT",
  background: { color: PAPER },
  objects: [
    { text: { text: "", options: { placeholder: "title", x: 0.75, y: 0.5, w: 11.8, h: 0.9,
      fontSize: 34, bold: true, color: INK, fontFace: "Cambria", valign: "middle" } } },
  ],
  slideNumber: { x: 12.2, y: 6.95, fontSize: 10, color: MUTE },
});

pres.defineSlideMaster({
  title: "WASHED",
  background: { color: WASH },
  objects: [
    { text: { text: "", options: { placeholder: "title", x: 0.75, y: 0.5, w: 11.8, h: 0.9,
      fontSize: 34, bold: true, color: INK, fontFace: "Cambria", valign: "middle" } } },
  ],
  slideNumber: { x: 12.2, y: 6.95, fontSize: 10, color: MUTE },
});

/* ---------------- helpers ---------------- */
const txt = (s, t, o) => s.addText(t, Object.assign({ isTextBox: true, fontFace: "Calibri" }, o));

function statCard(s, { x, y, w, h, num, label, fill, numColor, labelColor }) {
  s.addShape(pres.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.1, fill: { color: fill }, line: { color: fill },
    objectName: `card-${label}`,
  });
  txt(s, num, { x: x + 0.2, y: y + 0.18, w: w - 0.4, h: 0.72, margin: 0,
    fontSize: 40, bold: true, color: numColor, fontFace: "Cambria", align: "left", valign: "middle" });
  txt(s, label, { x: x + 0.2, y: y + 0.92, w: w - 0.4, h: h - 1.05, margin: 0,
    fontSize: 13, color: labelColor, align: "left", valign: "top" });
}

function statRow(s, { x, y, w, h, num, label, fill, numColor, labelColor }) {
  s.addShape(pres.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.1, fill: { color: fill }, line: { color: fill },
    objectName: `row-${num}`,
  });
  txt(s, num, { x: x + 0.22, y: y + 0.1, w: 1.75, h: h - 0.2, margin: 0,
    fontSize: 26, bold: true, color: numColor, fontFace: "Cambria", align: "left", valign: "middle" });
  txt(s, label, { x: x + 2.05, y: y + 0.1, w: w - 2.27, h: h - 0.2, margin: 0,
    fontSize: 13, color: labelColor, align: "left", valign: "middle" });
}

function gradeCard(s, { x, y, w, h, platform, grade, note, fill, ink }) {
  s.addShape(pres.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.08, fill: { color: fill }, line: { color: fill },
    objectName: `grade-${platform}`,
  });
  txt(s, grade, { x: x + 0.18, y: y + 0.16, w: 0.85, h: 0.95, margin: 0,
    fontSize: 38, bold: true, color: ink, fontFace: "Cambria", align: "center", valign: "middle" });
  txt(s, platform, { x: x + 1.08, y: y + 0.2, w: w - 1.26, h: 0.38, margin: 0,
    fontSize: 15, bold: true, color: ink, valign: "middle" });
  txt(s, note, { x: x + 1.08, y: y + 0.58, w: w - 1.26, h: 0.6, margin: 0,
    fontSize: 11, color: ink, valign: "top" });
}

/* ================= 1. TITLE ================= */
pres.addSection({ title: "Open" });
let s = pres.addSlide({ masterName: "DARK", sectionTitle: "Open" });
txt(s, "SPLENDID SPOON", { x: 0.9, y: 1.5, w: 11.5, h: 0.4, margin: 0,
  fontSize: 15, color: SAGE, charSpacing: 4, bold: true });
s.addText("Stop renting your customers", { placeholder: "title" });
s.addText("A social media strategy built on one idea: own the weekday lunch.\nSTCO 348  ·  Strategic Communication", { placeholder: "body" });
s.addNotes("Open confident and slow. The whole pitch hangs on this phrase: you are renting your customers from Meta, and rent goes up every year.");

/* ================= 2. PROBLEM ================= */
pres.addSection({ title: "Situation" });
s = pres.addSlide({ masterName: "LIGHT", sectionTitle: "Situation" });
s.addText("The engine that built you is the risk that limits you", { placeholder: "title" });
txt(s, "Splendid Spoon's growth has run on paid social. That works until it doesn't — every competitor can outbid you for the same woman, on the same platform, on the same afternoon.",
  { x: 0.75, y: 1.5, w: 7.2, h: 1.2, fontSize: 17, color: INK, lineSpacing: 26 });
statCard(s, { x: 0.75, y: 3.0, w: 3.5, h: 1.75, num: "71%", label: "of U.S. adults use Facebook — where the paid engine runs", fill: WASH, numColor: FOREST, labelColor: INK });
statCard(s, { x: 4.5, y: 3.0, w: 3.5, h: 1.75, num: "0", label: "owned channels compounding discovery for you today", fill: WASH, numColor: RUST, labelColor: INK });
txt(s, "Rented attention", { x: 8.5, y: 2.55, w: 4.0, h: 0.35, margin: 0, fontSize: 13, bold: true, color: MUTE, charSpacing: 2 });
s.addShape(pres.ShapeType.roundRect, { x: 8.5, y: 3.0, w: 4.0, h: 1.75, rectRadius: 0.1,
  fill: { color: DEEP }, line: { color: DEEP }, objectName: "quote-card" });
txt(s, "“You don't own the audience. You lease it by the impression, and the lease renews at market rate.”",
  { x: 8.72, y: 3.18, w: 3.56, h: 1.4, margin: 0, fontSize: 14, italic: true, color: PAPER, valign: "middle" });
s.addNotes("Name the problem before any solution. The zero is the punchline — they have no compounding owned discovery.");

/* ================= 3. CLIENT SNAPSHOT ================= */
s = pres.addSlide({ masterName: "WASHED", sectionTitle: "Situation" });
s.addText("Who we're working with", { placeholder: "title" });
txt(s, "Splendid Spoon delivers fully prepared, 100% plant-based meals nationwide. Founded in Brooklyn in 2013 by Nicole Centeno — a French Culinary Institute–trained chef and former research biologist.",
  { x: 0.75, y: 1.45, w: 11.8, h: 0.9, fontSize: 16, color: INK, lineSpacing: 24 });
const snap = [
  { num: "2013", label: "Founded in a rented Brooklyn pizza kitchen" },
  { num: "$190M", label: "Cumulative D2C revenue after the Mosaic merger" },
  { num: "200+", label: "Plant-based products across chilled and frozen" },
  { num: "2 min", label: "From refrigerator to a finished meal" },
];
snap.forEach((d, i) => statCard(s, { x: 0.75 + i * 3.02, y: 2.75, w: 2.78, h: 1.9,
  num: d.num, label: d.label, fill: PAPER, numColor: FOREST, labelColor: INK }));
txt(s, "January 2026: acquired Mosaic Foods, adding in-house manufacturing — the company can now make its own food.",
  { x: 0.75, y: 5.1, w: 11.8, h: 0.5, fontSize: 15, bold: true, color: DEEP });
s.addNotes("Keep this fast — thirty seconds. The founder's dual credential (chef plus biologist) matters later for content credibility.");

/* ================= 4. MARKET ================= */
s = pres.addSlide({ masterName: "LIGHT", sectionTitle: "Situation" });
s.addText("Two trends pulling in opposite directions", { placeholder: "title" });
s.addShape(pres.ShapeType.roundRect, { x: 0.75, y: 1.6, w: 5.8, h: 3.9, rectRadius: 0.12,
  fill: { color: WASH }, line: { color: WASH }, objectName: "trend-down" });
txt(s, "WORKING AGAINST US", { x: 1.05, y: 1.85, w: 5.2, h: 0.35, margin: 0, fontSize: 12, bold: true, color: RUST, charSpacing: 2 });
txt(s, "− 4%  then  − 2%", { x: 1.05, y: 2.25, w: 5.2, h: 0.8, margin: 0, fontSize: 36, bold: true, color: RUST, fontFace: "Cambria" });
txt(s, "U.S. plant-based sales declined two years running, to $7.9 billion, as retailers cut shelf assortment (Good Food Institute, 2026).",
  { x: 1.05, y: 3.1, w: 5.2, h: 1.0, margin: 0, fontSize: 14, color: INK, lineSpacing: 22 });
txt(s, "The category tailwind has reversed.", { x: 1.05, y: 4.5, w: 5.2, h: 0.5, margin: 0, fontSize: 14, bold: true, color: INK });

s.addShape(pres.ShapeType.roundRect, { x: 6.95, y: 1.6, w: 5.6, h: 3.9, rectRadius: 0.12,
  fill: { color: DEEP }, line: { color: DEEP }, objectName: "trend-up" });
txt(s, "WORKING FOR US", { x: 7.25, y: 1.85, w: 5.0, h: 0.35, margin: 0, fontSize: 12, bold: true, color: SAGE, charSpacing: 2 });
txt(s, "$13.7B → $30.7B", { x: 7.25, y: 2.25, w: 5.0, h: 0.8, margin: 0, fontSize: 32, bold: true, color: PAPER, fontFace: "Cambria" });
txt(s, "Prepared meal delivery grows at a 12.2% compound rate through 2033 (Coherent Market Insights, 2026).",
  { x: 7.25, y: 3.1, w: 5.0, h: 1.0, margin: 0, fontSize: 14, color: PAPER, lineSpacing: 22 });
txt(s, "Sell convenience, not a diet.", { x: 7.25, y: 4.5, w: 5.0, h: 0.5, margin: 0, fontSize: 14, bold: true, color: SAGE });
txt(s, "Strategic read: lead with time saved. Plant-based is how the food is made, not why she buys it.",
  { x: 0.75, y: 5.8, w: 11.8, h: 0.5, fontSize: 15, italic: true, color: MUTE });
s.addNotes("This is the strategic pivot of the whole pitch: stop selling the diet, start selling the time.");

/* ================= 5. AUDIENCE ================= */
pres.addSection({ title: "Audience" });
s = pres.addSlide({ masterName: "WASHED", sectionTitle: "Audience" });
s.addText("One audience, chosen on purpose", { placeholder: "title" });
s.addShape(pres.ShapeType.roundRect, { x: 0.75, y: 1.55, w: 5.5, h: 3.3, rectRadius: 0.12,
  fill: { color: DEEP }, line: { color: DEEP }, objectName: "persona" });
txt(s, "THE TARGET PUBLIC", { x: 1.05, y: 1.8, w: 4.9, h: 0.3, margin: 0, fontSize: 12, bold: true, color: SAGE, charSpacing: 2 });
txt(s, "Time-scarce working mothers", { x: 1.05, y: 2.15, w: 4.9, h: 0.9, margin: 0,
  fontSize: 26, bold: true, color: PAPER, fontFace: "Cambria", lineSpacing: 30 });
txt(s, "Ages 30–45  ·  dual-income metro households  ·  $100K+  ·  flexitarian, not vegan",
  { x: 1.05, y: 3.15, w: 4.9, h: 1.4, margin: 0, fontSize: 15, color: SAGE, lineSpacing: 24 });
const aud = [
  { num: "73.9%", label: "of U.S. mothers are in the labor force (BLS, 2026)" },
  { num: "43 min", label: "a day is all Americans now spend on food prep and cleanup" },
  { num: "58%", label: "of meal-delivery subscribers are women" },
];
aud.forEach((d, i) => statRow(s, { x: 6.6, y: 1.55 + i * 1.15, w: 5.95, h: 1.0,
  num: d.num, label: d.label, fill: PAPER, numColor: FOREST, labelColor: INK }));
txt(s, "She is not short on nutrition knowledge. She is short on minutes.",
  { x: 0.75, y: 5.25, w: 11.8, h: 0.6, fontSize: 19, bold: true, color: DEEP, fontFace: "Cambria" });
s.addNotes("Land the last line and pause. It is the insight the entire strategy rests on.");

/* ================= 6. INSIGHT ================= */
s = pres.addSlide({ masterName: "DARK", sectionTitle: "Audience" });
txt(s, "THE INSIGHT", { x: 0.9, y: 1.5, w: 11.5, h: 0.4, margin: 0,
  fontSize: 15, color: SAGE, charSpacing: 4, bold: true });
s.addText("The barrier isn't knowledge. It's minutes.", { placeholder: "title" });
s.addText("Every competitor sells aspiration. We sell relief — permission to stop negotiating with yourself about lunch.", { placeholder: "body" });
s.addNotes("Slow down here. Two beats of silence after the title line.");

/* ================= 7. CONTENT TILT ================= */
pres.addSection({ title: "Strategy" });
s = pres.addSlide({ masterName: "LIGHT", sectionTitle: "Strategy" });
s.addText("The content tilt", { placeholder: "title" });
txt(s, "Joe Pulizzi defines the content tilt as “that area of little to no competition … that actually gives you a chance to break through the noise” (Pulizzi, n.d.).",
  { x: 0.75, y: 1.45, w: 11.8, h: 0.75, fontSize: 15, italic: true, color: MUTE, lineSpacing: 22 });
const tilt = [
  { t: "Plant-based recipes", d: "Saturated. Every food brand and blogger is already there.", fill: WASH, ink: MUTE, mark: "✕" },
  { t: "Weight loss", d: "Crowded, medicalized, and a promise the product can't make.", fill: WASH, ink: MUTE, mark: "✕" },
  { t: "The zero-prep weekday meal", d: "Owned at breakfast and lunch, when time is shortest and willpower is lowest. Nobody is competing here.", fill: DEEP, ink: PAPER, mark: "✓" },
];
tilt.forEach((d, i) => {
  const y = 2.45 + i * 1.35;
  s.addShape(pres.ShapeType.roundRect, { x: 0.75, y, w: 11.8, h: 1.15, rectRadius: 0.1,
    fill: { color: d.fill }, line: { color: d.fill }, objectName: `tilt-${i}` });
  txt(s, d.mark, { x: 1.0, y: y + 0.3, w: 0.5, h: 0.55, margin: 0, fontSize: 24, bold: true,
    color: i === 2 ? SAGE : MUTE, align: "center", valign: "middle" });
  txt(s, d.t, { x: 1.6, y: y + 0.18, w: 4.0, h: 0.45, margin: 0, fontSize: 17, bold: true, color: d.ink, valign: "middle" });
  txt(s, d.d, { x: 5.7, y: y + 0.18, w: 6.6, h: 0.8, margin: 0, fontSize: 13, color: d.ink, valign: "middle", lineSpacing: 19 });
});
txt(s, "Through-line: “One plant-based choice a day.” A habit, not a conversion.",
  { x: 0.75, y: 6.5, w: 11.8, h: 0.45, fontSize: 15, bold: true, color: DEEP });
s.addNotes("Show the two rejected territories first — it proves the choice was reasoned, not convenient.");

/* ================= 8. PERSONA ================= */
s = pres.addSlide({ masterName: "WASHED", sectionTitle: "Strategy" });
s.addText("How the brand should sound", { placeholder: "title" });
s.addShape(pres.ShapeType.roundRect, { x: 0.75, y: 1.5, w: 5.7, h: 2.1, rectRadius: 0.12,
  fill: { color: DEEP }, line: { color: DEEP }, objectName: "voice" });
txt(s, "The calm, capable friend who has already solved the problem you are still worrying about.",
  { x: 1.05, y: 1.75, w: 5.1, h: 1.6, margin: 0, fontSize: 19, color: PAPER, fontFace: "Cambria", valign: "middle", lineSpacing: 27 });
txt(s, "On Aaker's (1997) dimensions of brand personality, Splendid Spoon indexes on sincerity and competence — and deliberately not on excitement.",
  { x: 6.75, y: 1.5, w: 5.8, h: 1.2, fontSize: 15, color: INK, lineSpacing: 23 });
const voice = [
  { k: "Leads with", v: "relief — never guilt" },
  { k: "Claims are", v: "concrete: calories, protein, allergens" },
  { k: "Never", v: "a wellness authority or a coach" },
];
voice.forEach((d, i) => {
  const y = 3.0 + i * 0.78;
  txt(s, d.k, { x: 6.75, y, w: 1.9, h: 0.5, margin: 0, fontSize: 13, bold: true, color: MUTE, valign: "middle" });
  txt(s, d.v, { x: 8.7, y, w: 3.85, h: 0.5, margin: 0, fontSize: 14, color: INK, valign: "middle" });
});
txt(s, "Specificity is the argument. Vague wellness language is what the competition already sounds like.",
  { x: 0.75, y: 4.1, w: 5.7, h: 1.0, fontSize: 14, italic: true, color: MUTE, lineSpacing: 21 });
s.addNotes("Aaker gives the persona academic grounding — say the framework name out loud, it is a course concept.");

/* ================= 9. REACH CHART ================= */
pres.addSection({ title: "Audit" });
s = pres.addSlide({ masterName: "LIGHT", sectionTitle: "Audit" });
s.addText("Where her attention actually is", { placeholder: "title" });
s.addChart(pres.ChartType.bar, [{
  name: "Share of U.S. adults who use the platform",
  labels: ["YouTube", "Facebook", "Instagram", "TikTok", "Reddit"],
  values: [84, 71, 50, 37, 26],
}], {
  x: 0.75, y: 1.5, w: 7.6, h: 4.6,
  barDir: "bar", barGapWidthPct: 45,
  chartColors: [FOREST],
  showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: '0"%"',
  dataLabelColor: INK, dataLabelFontSize: 13, dataLabelFontFace: "+mn-lt",
  catAxisLabelColor: INK, catAxisLabelFontSize: 13, catAxisLabelFontFace: "+mn-lt",
  valAxisHidden: true, valAxisMaxVal: 100,
  catGridLine: { style: "none" }, valGridLine: { style: "none" },
  catAxisLineShow: false, valAxisLineShow: false,
  showLegend: false, showTitle: false,
  plotArea: { fill: { color: PAPER } },
});
txt(s, "Pew Research Center, 2025", { x: 0.75, y: 6.2, w: 7.6, h: 0.3, fontSize: 10, color: MUTE });
s.addShape(pres.ShapeType.roundRect, { x: 8.7, y: 1.9, w: 3.85, h: 3.5, rectRadius: 0.12,
  fill: { color: WASH }, line: { color: WASH }, objectName: "reach-note" });
txt(s, "The two platforms with the widest reach — YouTube at 84% — are the two where Splendid Spoon has no presence at all.",
  { x: 8.95, y: 2.2, w: 3.35, h: 1.6, margin: 0, fontSize: 15, color: INK, lineSpacing: 24 });
txt(s, "Reddit has grown from 18% to 26% in four years, and 77% of people now add “Reddit” to a Google search for recommendations.",
  { x: 8.95, y: 3.85, w: 3.35, h: 1.4, margin: 0, fontSize: 13, color: MUTE, lineSpacing: 20 });
s.addNotes("Point at YouTube's bar. This chart sets up the scorecard on the next slide.");

/* ================= 10. SCORECARD ================= */
s = pres.addSlide({ masterName: "WASHED", sectionTitle: "Audit" });
s.addText("Where Splendid Spoon actually is", { placeholder: "title" });
txt(s, "I graded all nine channels against the research. Three are excellent. One is a hole.",
  { x: 0.75, y: 1.35, w: 11.8, h: 0.4, fontSize: 15, color: INK });
const grades = [
  { platform: "Instagram", grade: "A", note: "106,000 followers; strongest owned channel", fill: DEEP, ink: PAPER },
  { platform: "Blog — The Spoonful", grade: "A", note: "Recipes and meal plans that rank in search", fill: DEEP, ink: PAPER },
  { platform: "Facebook", grade: "A", note: "48,900 likes; precise paid targeting", fill: DEEP, ink: PAPER },
  { platform: "Podcasts", grade: "B", note: "~22 sponsorships a year, all rented", fill: FOREST, ink: PAPER },
  { platform: "LinkedIn", grade: "C", note: "4,200 followers; used as a notice board", fill: MOSS, ink: INK },
  { platform: "TikTok", grade: "D", note: "3,480 followers — 3% of Instagram", fill: SAGE, ink: INK },
  { platform: "YouTube", grade: "D", note: "No channel. 84% of adults unreached", fill: SAGE, ink: INK },
  { platform: "Reddit", grade: "D", note: "No account where trust is being built", fill: SAGE, ink: INK },
  { platform: "Pinterest", grade: "F", note: "Absent from its best-matched platform", fill: RUST, ink: PAPER },
];
grades.forEach((g, i) => {
  const col = i % 3, rowN = Math.floor(i / 3);
  gradeCard(s, { x: 0.75 + col * 4.03, y: 1.95 + rowN * 1.55, w: 3.73, h: 1.35,
    platform: g.platform, grade: g.grade, note: g.note, fill: g.fill, ink: g.ink });
});
txt(s, "Grades reflect fit against the audience research — not effort or follower count.",
  { x: 0.75, y: 6.7, w: 11.8, h: 0.35, fontSize: 12, italic: true, color: MUTE });
s.addNotes("Walk the grid left to right. End on the F. Do not rush past it — this is the moment the pitch turns.");

/* ================= 11. BIG IDEA ================= */
pres.addSection({ title: "Recommendation" });
s = pres.addSlide({ masterName: "DARK", sectionTitle: "Recommendation" });
txt(s, "THE RECOMMENDATION", { x: 0.9, y: 1.5, w: 11.5, h: 0.4, margin: 0,
  fontSize: 15, color: SAGE, charSpacing: 4, bold: true });
s.addText("Stop renting attention. Start owning discovery.", { placeholder: "title" });
s.addText("Three moves, in priority order — and one deliberate retreat.", { placeholder: "body" });
s.addNotes("Transition line. Short and declarative, then straight into Pinterest.");

/* ================= 12. PINTEREST ================= */
s = pres.addSlide({ masterName: "LIGHT", sectionTitle: "Recommendation" });
s.addText("Priority 1 — Pinterest", { placeholder: "title" });
txt(s, "“Your next three weeks of lunches, planned before you are hungry.”",
  { x: 0.75, y: 1.4, w: 11.8, h: 0.5, fontSize: 18, italic: true, color: DEEP, fontFace: "Cambria" });
const pin = [
  { num: "93%", label: "of Pinterest users are there to plan a purchase" },
  { num: "86%", label: "use it while they are grocery shopping" },
  { num: "1–3 mo", label: "ahead is when they save — planning, not reacting" },
  { num: "#1", label: "Food is the platform's single largest category" },
];
pin.forEach((d, i) => statCard(s, { x: 0.75 + i * 3.02, y: 2.1, w: 2.78, h: 1.75,
  num: d.num, label: d.label, fill: WASH, numColor: FOREST, labelColor: INK }));
s.addShape(pres.ShapeType.roundRect, { x: 0.75, y: 4.15, w: 5.8, h: 2.25, rectRadius: 0.12,
  fill: { color: WASH }, line: { color: WASH }, objectName: "pin-exec" });
txt(s, "EXECUTION", { x: 1.0, y: 4.35, w: 5.3, h: 0.3, margin: 0, fontSize: 12, bold: true, color: MUTE, charSpacing: 2 });
txt(s, "Vertical recipe and meal-plan pins. Boards for Desk Lunch, 7-Day Plant-Based Plan, One Choice a Day. Pin 30–60 days ahead of the season. Link to plan pages, never the homepage.",
  { x: 1.0, y: 4.7, w: 5.3, h: 1.55, margin: 0, fontSize: 13.5, color: INK, lineSpacing: 21 });
s.addShape(pres.ShapeType.roundRect, { x: 6.75, y: 4.15, w: 5.8, h: 2.25, rectRadius: 0.12,
  fill: { color: DEEP }, line: { color: DEEP }, objectName: "pin-obj" });
txt(s, "OBJECTIVES", { x: 7.0, y: 4.35, w: 5.3, h: 0.3, margin: 0, fontSize: 12, bold: true, color: SAGE, charSpacing: 2 });
txt(s, "Account live within 60 days  ·  25 pins a month  ·  50,000 monthly impressions and 1,500 referred sessions by month six",
  { x: 7.0, y: 4.7, w: 5.3, h: 1.55, margin: 0, fontSize: 13.5, color: PAPER, lineSpacing: 21 });
txt(s, "Searchlab, 2026", { x: 0.75, y: 6.55, w: 5.0, h: 0.3, fontSize: 10, color: MUTE });
s.addNotes("The strongest slide in the deck. A pin keeps working for months; an Instagram post is dead in a day.");

/* ================= 13. YOUTUBE + REDDIT ================= */
s = pres.addSlide({ masterName: "WASHED", sectionTitle: "Recommendation" });
s.addText("Priorities 2 and 3 — YouTube and Reddit", { placeholder: "title" });
const cols = [
  { h: "YouTube", p: "“Watch exactly how two minutes becomes lunch.”",
    b: "Food is visual and preparation is demonstrable — a two-minute meal is already a two-minute video. Launch a channel; repurpose Reels as Shorts; run a founder-led nutrition series on her chef-and-biologist credential.",
    o: "Live in 90 days  ·  2 videos a week  ·  10,000 subscribers in year one", s: "84% of U.S. adults" },
  { h: "Reddit", p: "“Straight answers where marketing isn't trusted.”",
    b: "Claim a verified account and host a founder AMA. Answer the delivery and taste complaints in public rather than deleting them — 64% of users prefer transparency to promotion, and founder AMAs draw four times the engagement.",
    o: "Account in 30 days  ·  one AMA in six months  ·  reply to every mention inside 48 hours", s: "77% add “Reddit” to searches" },
];
cols.forEach((c, i) => {
  const x = 0.75 + i * 6.05;
  s.addShape(pres.ShapeType.roundRect, { x, y: 1.5, w: 5.75, h: 4.9, rectRadius: 0.12,
    fill: { color: PAPER }, line: { color: PAPER }, objectName: `col-${c.h}` });
  txt(s, c.h, { x: x + 0.3, y: 1.72, w: 5.15, h: 0.5, margin: 0, fontSize: 24, bold: true, color: DEEP, fontFace: "Cambria", valign: "middle" });
  txt(s, c.s, { x: x + 0.3, y: 2.2, w: 5.15, h: 0.3, margin: 0, fontSize: 12, bold: true, color: FOREST, charSpacing: 1 });
  txt(s, c.p, { x: x + 0.3, y: 2.58, w: 5.15, h: 0.5, margin: 0, fontSize: 14, italic: true, color: INK });
  txt(s, c.b, { x: x + 0.3, y: 3.2, w: 5.15, h: 1.85, margin: 0, fontSize: 13, color: INK, lineSpacing: 20 });
  txt(s, c.o, { x: x + 0.3, y: 5.2, w: 5.15, h: 1.0, margin: 0, fontSize: 12.5, bold: true, color: DEEP, lineSpacing: 19 });
});
s.addNotes("Keep both to about twenty seconds each. The Reddit point about answering complaints in public is the memorable one.");

/* ================= 14. STOP DOING ================= */
s = pres.addSlide({ masterName: "LIGHT", sectionTitle: "Recommendation" });
s.addText("And one thing to stop chasing", { placeholder: "title" });
s.addShape(pres.ShapeType.roundRect, { x: 0.75, y: 1.6, w: 5.6, h: 3.6, rectRadius: 0.12,
  fill: { color: WASH }, line: { color: WASH }, objectName: "tiktok-card" });
txt(s, "TIKTOK — HOLD AT MAINTENANCE", { x: 1.05, y: 1.9, w: 5.0, h: 0.35, margin: 0, fontSize: 12, bold: true, color: RUST, charSpacing: 2 });
txt(s, "3,480", { x: 1.05, y: 2.3, w: 5.0, h: 0.85, margin: 0, fontSize: 44, bold: true, color: RUST, fontFace: "Cambria" });
txt(s, "followers — about 3% of the Instagram audience, after real effort.",
  { x: 1.05, y: 3.15, w: 5.0, h: 0.7, margin: 0, fontSize: 14, color: INK, lineSpacing: 21 });
txt(s, "TikTok's heaviest users are the youngest adults — precisely the people least able to afford a $9.99–$13.49 meal.",
  { x: 1.05, y: 3.95, w: 5.0, h: 1.0, margin: 0, fontSize: 13, color: MUTE, lineSpacing: 20 });
txt(s, "What that buys us", { x: 6.75, y: 1.65, w: 5.8, h: 0.4, fontSize: 18, bold: true, color: DEEP, fontFace: "Cambria" });
const buys = [
  "Repurpose three Reels a week at near-zero marginal cost — keep the account alive, stop funding original production for it.",
  "Redirect that production time into Pinterest and YouTube, where the audience and the intent actually are.",
  "Formally reassess in two quarters rather than quietly drifting.",
];
buys.forEach((b, i) => {
  const y = 2.25 + i * 1.05;
  s.addShape(pres.ShapeType.ellipse, { x: 6.75, y: y + 0.08, w: 0.3, h: 0.3,
    fill: { color: DEEP }, line: { color: DEEP }, objectName: `bullet-${i}` });
  txt(s, String(i + 1), { x: 6.75, y: y + 0.08, w: 0.3, h: 0.3, margin: 0, fontSize: 12, bold: true, color: PAPER, align: "center", valign: "middle" });
  txt(s, b, { x: 7.25, y, w: 5.3, h: 0.95, margin: 0, fontSize: 13.5, color: INK, valign: "top", lineSpacing: 21 });
});
txt(s, "A strategy that only adds is a wish list. Prioritizing means saying what we stop.",
  { x: 0.75, y: 5.6, w: 11.8, h: 0.5, fontSize: 16, bold: true, color: DEEP });
s.addNotes("Deliberately counterintuitive — recommending less effort somewhere proves the rest is prioritization, not a wish list.");

/* ================= 15. ROADMAP ================= */
pres.addSection({ title: "Close" });
s = pres.addSlide({ masterName: "WASHED", sectionTitle: "Close" });
s.addText("What the first year looks like", { placeholder: "title" });
const phases = [
  { t: "First 30 days", items: "Claim Reddit  ·  Build Pinterest boards  ·  Shift 20% of paid budget to win-back" },
  { t: "By day 60", items: "Pinterest live, 25 pins a month  ·  Blog to four search-intent posts a month" },
  { t: "By day 90", items: "YouTube channel live  ·  2 videos a week  ·  TikTok down to repurposed only" },
  { t: "Month 12", items: "10,000 YouTube subscribers  ·  +30% organic sessions  ·  flat acquisition cost" },
];
phases.forEach((p, i) => {
  const y = 1.6 + i * 1.28;
  s.addShape(pres.ShapeType.roundRect, { x: 0.75, y, w: 11.8, h: 1.08, rectRadius: 0.1,
    fill: { color: i === 3 ? DEEP : PAPER }, line: { color: i === 3 ? DEEP : PAPER }, objectName: `phase-${i}` });
  txt(s, p.t, { x: 1.05, y: y + 0.12, w: 2.6, h: 0.84, margin: 0, fontSize: 17, bold: true,
    color: i === 3 ? PAPER : DEEP, fontFace: "Cambria", valign: "middle" });
  txt(s, p.items, { x: 3.75, y: y + 0.12, w: 8.55, h: 0.84, margin: 0, fontSize: 13.5,
    color: i === 3 ? SAGE : INK, valign: "middle", lineSpacing: 20 });
});
txt(s, "Every number here is falsifiable. That is the point — you can fire me on the metrics.",
  { x: 0.75, y: 6.75, w: 10.9, h: 0.4, fontSize: 13, italic: true, color: MUTE });
s.addNotes("The closing line gets a laugh and signals confidence. Objectives that cannot fail are not objectives.");

/* ================= 16. CLOSE ================= */
s = pres.addSlide({ masterName: "DARK", sectionTitle: "Close" });
txt(s, "THE ASK", { x: 0.9, y: 1.5, w: 11.5, h: 0.4, margin: 0,
  fontSize: 15, color: SAGE, charSpacing: 4, bold: true });
s.addText("Own the lunch hour before someone else does", { placeholder: "title" });
s.addText("Pinterest in 60 days. YouTube in 90. One plant-based choice a day — and a brand that finally owns the audience it has been renting.", { placeholder: "body" });
s.addNotes("End on the audience you are renting. Stop talking. Invite questions.");

/* ================= 17. REFERENCES ================= */
s = pres.addSlide({ masterName: "LIGHT", sectionTitle: "Close" });
s.addText("References", { placeholder: "title" });
const refs = [
  "Aaker, J. L. (1997). Dimensions of brand personality. Journal of Marketing Research, 34(3), 347–356.",
  "Coherent Market Insights. (2026). Prepared meal delivery market size and YoY growth rate, 2033.",
  "Good Food Institute. (2026). U.S. retail market insights for the plant-based industry.",
  "Pew Research Center. (2025, November 20). Americans’ social media use 2025.",
  "Pulizzi, J. (n.d.). What is a content tilt? The Tilt.",
  "Searchlab. (2026). Pinterest statistics 2026: 80+ facts on reach, shopping and ads.",
  "Sprout Social. (2026). Reddit statistics in 2026 and tactics to grow your brand.",
  "U.S. Bureau of Labor Statistics. (2026). Labor force participation rate was 73.9 percent for mothers and 93.7 percent for fathers in 2025.",
];
txt(s, refs.join("\n"), { x: 0.75, y: 1.5, w: 11.8, h: 5.0, fontSize: 12.5, color: INK,
  lineSpacing: 26, paraSpaceAfter: 6 });
s.addNotes("Do not read this slide aloud. It is on screen for APA compliance.");

pres.writeFile({ fileName: "Splendid_Spoon_Pitch_Deck.pptx" })
  .then(() => applyTheme("Splendid_Spoon_Pitch_Deck.pptx", THEME))
  .then(() => console.log("deck written + theme applied"))
  .catch(e => { console.error("ERROR:", e.message); process.exit(1); });
