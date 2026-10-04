const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, AlignmentType, PageNumber, Header,
  Table, TableRow, TableCell, WidthType, BorderStyle, VerticalAlign,
  PageOrientation, ShadingType
} = require("docx");

const GREEN = "008000";
const FONT = "Times New Roman";
const TOTAL = 13680;                 // 9.5" of text across a landscape page
const MATRIX = [1500, 2750, 3350, 3600, 2480];
const INFO   = [2400, 11280];

const line = { style: BorderStyle.SINGLE, size: 4, color: "000000" };
const allBorders = { top: line, bottom: line, left: line, right: line };

// one paragraph inside a table cell
const cellPara = (text, { bold = false, color = GREEN, size = 18, italics = false, space = 0 } = {}) =>
  new Paragraph({
    spacing: { line: 240, before: space, after: 0 },
    children: [new TextRun({ text, bold, italics, color, size, font: FONT })],
  });

// a cell holding one or more lines
const cell = (lines, width, opts = {}) =>
  new TableCell({
    width: { size: width, type: WidthType.DXA },
    verticalAlign: VerticalAlign.TOP,
    borders: allBorders,
    margins: { top: 60, bottom: 60, left: 90, right: 90 },
    shading: opts.shade ? { type: ShadingType.CLEAR, fill: opts.shade, color: "auto" } : undefined,
    children: (Array.isArray(lines) ? lines : [lines]).map((t, i) =>
      cellPara(t, { ...opts, space: i === 0 ? 0 : 40 })),
  });

// ---------- header block (Client / Goals / Consumer Needs / Theme) ----------
const infoRow = (label, lines) =>
  new TableRow({
    children: [
      cell(label, INFO[0], { bold: true, color: "000000" }),
      cell(lines, INFO[1]),
    ],
  });

const infoTable = new Table({
  columnWidths: INFO,
  width: { size: TOTAL, type: WidthType.DXA },
  borders: { ...allBorders, insideHorizontal: line, insideVertical: line },
  rows: [
    infoRow("Client –", [
      "Splendid Spoon, Inc. — a direct-to-consumer subscription delivering fully prepared, 100% plant-based, gluten-free and dairy-free meals (smoothies, soups, grain and noodle bowls) nationwide. Founded 2013 in Brooklyn by Nicole Centeno; acquired Mosaic Foods in January 2026, adding in-house manufacturing and a combined lineup of 200+ products.",
    ]),
    infoRow("Goals for Using Social Media –", [
      "1. Reduce dependence on paid acquisition by building owned, compounding discovery (Pinterest, blog, YouTube) rather than renting attention on Meta.",
      "2. Own the content tilt — the plant-based weekday meal that requires no preparation — at breakfast and lunch, where competitors are not competing.",
      "3. Raise retention and reduce churn, since in a subscription the second month is worth more than the first.",
      "4. Repair the trust gap created by mixed reviews of taste and delivery by showing the product honestly and answering criticism in public.",
    ]),
    infoRow("Consumer Needs –", [
      "Target public: time-scarce working parents, primarily women 30–45 in dual-income metropolitan households earning $100,000+.",
      "• Recovered time and fewer decisions — the barrier is minutes, not nutrition knowledge; 73.9% of U.S. mothers are in the labor force and national food-prep time has compressed to 43 minutes a day (U.S. Bureau of Labor Statistics, 2026).",
      "• Relief rather than aspiration — permission to stop negotiating with themselves about lunch.",
      "• Proof of taste and reliable delivery, the two things reviewers most often criticize.",
      "• Justification for a $9.99–$13.49 per-meal price against both groceries and takeout.",
      "• Allergen and dietary confidence for households managing restrictions.",
    ]),
    infoRow("Theme/Brand Personae –", [
      "Persona: the calm, capable friend who has already solved the problem you are still worrying about — not a wellness authority, not a coach.",
      "On Aaker’s (1997) dimensions the brand indexes on sincerity and competence with light sophistication, and deliberately not on excitement or ruggedness.",
      "Voice: warm, specific, and unhurried. Leads with relief, never guilt. Claims are concrete (calories, protein, allergens) because specificity is the argument.",
      "Through-line: “One plant-based choice a day” — a small repeatable habit, not a dietary conversion.",
    ]),
  ],
});

// ---------- channel matrix ----------
const headerRow = new TableRow({
  tableHeader: true,
  children: ["Channel", "Unique Promise", "Execution", "Justification", "Objectives"]
    .map((t, i) => cell(t, MATRIX[i], { bold: true, color: "000000", shade: "E8E8E8" })),
});

const row = (channel, promise, execution, justification, objectives) =>
  new TableRow({
    children: [
      cell(channel, MATRIX[0], { bold: true }),
      cell(promise, MATRIX[1], { italics: true }),
      cell(execution, MATRIX[2]),
      cell(justification, MATRIX[3]),
      cell(objectives, MATRIX[4]),
    ],
  });

const matrix = new Table({
  columnWidths: MATRIX,
  width: { size: TOTAL, type: WidthType.DXA },
  borders: { ...allBorders, insideHorizontal: line, insideVertical: line },
  rows: [
    headerRow,

    row("Pinterest (priority)",
      "“Your next three weeks of lunches, planned before you are hungry.”",
      ["Launch a brand account. Vertical recipe and meal-plan pins; boards for “Desk Lunch,” “7-Day Plant-Based Plan,” and “One Choice a Day.” Pin seasonally 30–60 days ahead; link pins to plan pages, not the homepage."],
      ["Food and recipes are Pinterest’s largest category; 93% of users plan purchases there and 86% use it while grocery shopping, saving ideas one to three months ahead (Searchlab, 2026). A pin holds discovery value for months. The brand is currently absent — the single largest unforced gap in the mix."],
      ["Account live within 60 days; 25 pins/month; 50,000 monthly impressions and 1,500 referred sessions by month 6."]),

    row("Instagram",
      "“Proof the food looks as good as the claim.”",
      ["Four Reels per week showing a two-minute meal end to end; creator and subscriber UGC reposts; founder-led “why this bowl works” explainers; post-merger product news."],
      ["Instagram reaches 50% of U.S. adults (Pew Research Center, 2025) and is the brand’s strongest owned channel at roughly 106,000 followers (Splendid Spoon, n.d.). Food is visual and preparation is demonstrable, so the product is native to the format."],
      ["4 Reels/week; +15% followers over two quarters; +20% saves and shares, the metrics that signal planning intent."]),

    row("Blog — “The Spoonful”",
      "“The answer to the question you just typed into Google.”",
      ["Four search-intent posts per month: 7-day plans, allergen guides, protein-per-meal breakdowns, cost-per-meal comparisons, and a GLP-1 FAQ. Maintain the founder-story archive."],
      ["76% of B2C marketers publish on a company blog (Content Marketing Institute, 2026). Owned media compounds, ranks in search, and carries no cost per impression — the direct hedge against rising paid acquisition costs."],
      ["4 posts/month; +30% organic sessions in 12 months; top-10 ranking for 15 target search terms."]),

    row("YouTube",
      "“Watch exactly how two minutes becomes lunch.”",
      ["Launch a channel. 60–90 second demonstrations and Shorts repurposed from Reels; a founder nutrition-science series trading on her background as a chef and research biologist."],
      ["YouTube reaches 84% of U.S. adults and 48% use it daily, the widest reach of any platform (Pew Research Center, 2025). No channel currently exists, so the brand is absent from the largest audience available to it."],
      ["Channel live within 90 days; 2 videos/week; 10,000 subscribers and 250,000 views in year 1."]),

    row("Facebook",
      "“An offer that finds you at the moment planning failed.”",
      ["Continue paid targeting to women 30–49; shift budget share toward retargeting lapsed and paused subscribers; open a private subscriber community group for recipes and service recovery."],
      ["71% of U.S. adults use Facebook and 52% visit daily, with use peaking at 80% among adults 30–49 and women using it more heavily — almost exactly the target public (Pew Research Center, 2025)."],
      ["Hold customer acquisition cost flat year over year; move 20% of spend to retention and win-back; grow the group to 5,000 members."]),

    row("Podcast sponsorship",
      "“A trusted voice vouching for the food.”",
      ["Maintain roughly 22 host-read sponsorships per year with unique tracked promo codes; pilot a six-episode owned series built on the content tilt."],
      ["58% of Americans 12+ listened to a podcast in the past month and 45% listen weekly (Edison Research, 2026). Host-read endorsement converts a brand claim into a trusted person’s testimonial, and codes make it measurable."],
      ["Maintain or improve cost per acquisition by code; 25% of new subscribers from tracked audio; ship the 6-episode pilot."]),

    row("TikTok",
      "“Discovery for the next generation of this audience.”",
      ["Hold at maintenance. Repurpose three Instagram Reels per week; seed creators rather than funding original production."],
      ["TikTok reaches 37% of U.S. adults, but its heaviest users are the youngest and least able to afford a $9.99–$13.49 meal (Pew Research Center, 2025). The account sits near 3,500 followers, about 3% of the Instagram audience — evidence the fit is weak."],
      ["3 repurposed posts/week at near-zero marginal cost; formally reassess in two quarters."]),

    row("Reddit",
      "“Straight answers where marketing is not trusted.”",
      ["Claim a verified brand account; host a founder AMA in meal-prep and plant-based communities; reply transparently to delivery and taste complaints rather than deleting or ignoring them."],
      ["26% of U.S. adults use Reddit and 77% of people now append “Reddit” to Google searches for recommendations, up 191% year over year; 64% prefer transparency to promotion and founder AMAs draw four times the engagement of standard posts (Pew Research Center, 2025; Sprout Social, 2026)."],
      ["Account claimed within 30 days; one founder AMA within 6 months; respond to 100% of brand mentions within 48 hours."]),

    row("LinkedIn",
      "“The company behind the bowl.”",
      ["Two posts per week on the Mosaic integration, manufacturing and sustainability progress, hiring, and retail/foodservice capability."],
      ["At roughly 4,200 followers the page is used as a corporate notice board. Post-merger the company needs talent and wholesale buyers, and vertical integration has reopened the retail channel that rejected it in 2015."],
      ["2 posts/week; double followers in 12 months; 10 qualified retail or foodservice leads."]),
  ],
});

// ---------- document ----------
const body = (text, opts = {}) =>
  new Paragraph({
    spacing: { line: 240, before: opts.before || 0, after: 0 },
    children: [new TextRun({ text, font: FONT, size: 18, bold: !!opts.bold, italics: !!opts.italics, color: opts.color || "000000" })],
  });

const ref = (runs) =>
  new Paragraph({
    spacing: { line: 240, before: 60, after: 0 },
    indent: { left: 360, hanging: 360 },
    children: runs.map(r => new TextRun({ text: r.t, italics: !!r.i, font: FONT, size: 18 })),
  });

const doc = new Document({
  creator: "STCO 348 Social Media Strategy Report",
  title: "Social Media Strategy Report: Splendid Spoon",
  styles: { default: { document: { run: { font: FONT, size: 24 } } } },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840, orientation: PageOrientation.LANDSCAPE },
        margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 },
      },
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          spacing: { line: 240 },
          children: [new TextRun({ text: "STCO 348          ", italics: true, font: FONT, size: 20 }),
                     new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 20 })],
        })],
      }),
    },
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { line: 240, after: 160 },
        children: [new TextRun({ text: "SOCIAL MEDIA STRATEGY REPORT", bold: true, font: FONT, size: 24 })],
      }),
      infoTable,
      new Paragraph({ spacing: { line: 240, before: 160, after: 80 }, children: [new TextRun("")] }),
      matrix,
      body("References", { bold: true, before: 240 }),
      ref([{ t: "Aaker, J. L. (1997). Dimensions of brand personality. " }, { t: "Journal of Marketing Research, 34", i: true }, { t: "(3), 347–356." }]),
      ref([{ t: "Content Marketing Institute. (2026). " }, { t: "B2C content marketing benchmarks, budgets, and trends", i: true }, { t: ". https://contentmarketinginstitute.com/" }]),
      ref([{ t: "Edison Research. (2026). " }, { t: "The Infinite Dial 2026", i: true }, { t: ". https://www.edisonresearch.com/the-infinite-dial-2026/" }]),
      ref([{ t: "Pew Research Center. (2025, November 20). " }, { t: "Americans’ social media use 2025", i: true }, { t: ". https://www.pewresearch.org/internet/2025/11/20/americans-social-media-use-2025/" }]),
      ref([{ t: "Searchlab. (2026). " }, { t: "Pinterest statistics 2026", i: true }, { t: ". https://searchlab.nl/en/statistics/pinterest-statistics-2026" }]),
      ref([{ t: "Splendid Spoon. (n.d.). " }, { t: "Splendid Spoon [@splendid.spoon]", i: true }, { t: " [Instagram profile]. Retrieved October 4, 2026, from https://www.instagram.com/splendid.spoon/" }]),
      ref([{ t: "Sprout Social. (2026). " }, { t: "Reddit statistics in 2026 and tactics to grow your brand", i: true }, { t: ". https://sproutsocial.com/insights/reddit-statistics/" }]),
      ref([{ t: "U.S. Bureau of Labor Statistics. (2026). " }, { t: "Labor force participation rate was 73.9 percent for mothers and 93.7 percent for fathers in 2025", i: true }, { t: ". https://www.bls.gov/opub/ted/2026/" }]),
    ],
  }],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync("Social_Media_Strategy_Report_Splendid_Spoon.docx", buf);
  console.log("wrote Social_Media_Strategy_Report_Splendid_Spoon.docx");
});
