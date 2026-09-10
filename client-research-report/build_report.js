const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, AlignmentType, PageNumber,
  Header, PageBreak, LevelFormat, Table, TableRow, TableCell, WidthType,
  BorderStyle, VerticalAlign
} = require("docx");

const GREEN = "008000";
const FONT = "Times New Roman";

const green = (text, opts = {}) =>
  new Paragraph({
    spacing: { line: 480, before: 0, after: 0 },
    indent: opts.noIndent ? undefined : { firstLine: 720 },
    children: [new TextRun({ text, color: GREEN })],
  });

const greenRuns = (runs, opts = {}) =>
  new Paragraph({
    spacing: { line: 480, before: 0, after: 0 },
    indent: opts.noIndent ? undefined : { firstLine: 720 },
    children: runs.map(r => new TextRun({ text: r.t, color: GREEN, italics: !!r.i, bold: !!r.b })),
  });

const bulletLead = (label, text) =>
  new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { line: 480, before: 0, after: 0 },
    children: [
      new TextRun({ text: label, color: GREEN, bold: true }),
      new TextRun({ text: text, color: GREEN }),
    ],
  });

const h1 = (text) =>
  new Paragraph({
    spacing: { line: 480, before: 0, after: 0 },
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text, bold: true })],
  });

const h2 = (text) =>
  new Paragraph({
    spacing: { line: 480, before: 0, after: 0 },
    children: [new TextRun({ text, bold: true })],
  });

const ref = (runs) =>
  new Paragraph({
    spacing: { line: 480, before: 0, after: 0 },
    indent: { left: 720, hanging: 720 },
    children: runs.map(r => new TextRun({ text: r.t, italics: !!r.i })),
  });

const blank = () => new Paragraph({ spacing: { line: 480 }, children: [new TextRun("")] });

// ---------- comparison table ----------
const COLS = [1740, 2540, 2540, 2540];
const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const line = { style: BorderStyle.SINGLE, size: 6, color: "000000" };

const tcell = (text, i, bold = false, bottom = noBorder) =>
  new TableCell({
    width: { size: COLS[i], type: WidthType.DXA },
    verticalAlign: VerticalAlign.TOP,
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    borders: { top: noBorder, bottom, left: noBorder, right: noBorder },
    children: [new Paragraph({
      spacing: { line: 240, before: 0, after: 0 },
      children: [new TextRun({ text, bold, color: GREEN, size: 20 })],
    })],
  });

const trow = (cells, bold = false, bottom = noBorder) =>
  new TableRow({ children: cells.map((c, i) => tcell(c, i, bold, bottom)) });

const comparisonTable = new Table({
  columnWidths: COLS,
  width: { size: 9360, type: WidthType.DXA },
  borders: {
    top: line, bottom: line, left: noBorder, right: noBorder,
    insideHorizontal: noBorder, insideVertical: noBorder,
  },
  rows: [
    trow(["Comparison", "Splendid Spoon", "Daily Harvest", "Sakara Life"], true, line),
    trow(["Founded", "2013; Nicole Centeno", "2015; Rachel Drori", "2011; Tingle & DuBoise"]),
    trow(["Promise", "Effortless plant-based", "Convenient frozen produce", "Organic food as medicine"]),
    trow(["Form", "Ready to eat; heat 2 min", "Frozen; blend or bake", "Fresh, fully prepared"]),
    trow(["Price", "$9.99-$13.49/item", "$5.99-$11.99/item", "$26-$34/meal"]),
    trow(["Menu", "Choose from 50+", "A la carte", "Fixed, chef-curated"]),
    trow(["Key event", "Bought Mosaic Foods, 2026", "2022 recall; 15% layoffs", "~$150M revenue, 2021"]),
  ],
});

const doc = new Document({
  creator: "STCO 348 Client Research Report",
  title: "Client Research Report: Splendid Spoon",
  numbering: {
    config: [{
      reference: "bullets",
      levels: [{
        level: 0, format: LevelFormat.BULLET, text: "•",
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } },
      }],
    }],
  },
  styles: {
    default: {
      document: {
        run: { font: FONT, size: 24, color: "000000" },
        paragraph: { spacing: { line: 480, before: 0, after: 0 } },
      },
    },
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
      },
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          spacing: { line: 240 },
          children: [new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 24 })],
        })],
      }),
    },
    children: [
      // ===== TITLE PAGE =====
      blank(), blank(), blank(),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { line: 480 },
        children: [new TextRun({ text: "Client Research Report: Splendid Spoon", bold: true })] }),
      blank(),
      ...["Student Name",
          "Department of Strategic Communication, University Name",
          "STCO 348: Strategic Communication",
          "Instructor Name",
          "September 10, 2026"].map(t =>
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { line: 480 }, children: [new TextRun(t)] })),
      new Paragraph({ children: [new PageBreak()] }),

      // ===== BODY =====
      h1("Client Research Report: Splendid Spoon"),

      h2("1. Client"),
      green("Splendid Spoon, Inc. is a direct-to-consumer subscription service delivering fully prepared, 100% plant-based meals nationwide. Unlike meal kits such as HelloFresh, it ships food already cooked, needing about two minutes of heating. The menu spans smoothies, wellness shots, soups, grain bowls, and noodle bowls, all gluten-free and dairy-free, across more than 50 rotating options priced at roughly $9.99 to $13.49 in weekly plans of 6, 12, or 18 meals (BarBend, 2026). After acquiring Mosaic Foods in January 2026, it offers more than 200 refrigerated and frozen products (Splendid Spoon, 2026). It sells recovered time as much as calories."),

      h2("2. History and Demographics"),
      greenRuns([
        { t: "Founder Nicole Centeno is a French Culinary Institute-trained chef and a former research biologist published in " },
        { t: "Nutrition and Metabolism", i: true },
        { t: " (Splendid Spoon, n.d.). That pairing of culinary and scientific credibility shapes the brand. The idea came in 2012, while she was working at Cond\u00e9 Nast and pregnant with her first child, when she concluded that the barrier to healthy eating is not knowledge but time (Bliss, 2019). She attended culinary school while employed full time and ran pop-ups before launching in 2013 from a rented pizza kitchen in Brooklyn (Splendid Spoon, n.d.)." },
      ]),
      green("The defining decision came in 2015. After grocers refused shelf space, the company abandoned wholesale for online subscription, turning a distribution failure into direct relationships and recurring revenue (Splendid Spoon, n.d.). A $3.26 million Series A followed in 2017 and a $12 million Series B in 2022, led by Nicoya with Danone Manifesto Ventures and Alexis Ohanian (Food Business News, 2022). In 2021 Centeno adopted a co-CEO structure with Elise Densborn, a former customer who joined as a consultant in 2018 (Stanford eCorner, 2023)."),
      green("The company remains small, roughly 11 to 50 employees in Brooklyn, women-owned and operated, with more than 20,000 subscribers reported at its Series B (PR Newswire, 2022). In January 2026 it acquired Mosaic Foods with backing from Gather Ventures, forming a vertically integrated business with over $190 million in cumulative revenue (Nosh, 2026). No customer demographics are published, but the price point, breakfast-and-lunch focus, and podcast placements indicate college-educated professional women roughly 28 to 45 in metropolitan areas, flexitarian rather than vegan."),

      h2("3. Psychographics and Brand"),
      greenRuns([
        { t: "By Aaker's (1997) dimensions of brand personality, Splendid Spoon indexes on " },
        { t: "sincerity", i: true },
        { t: " and " },
        { t: "competence", i: true },
        { t: ", with light sophistication, but not excitement or ruggedness. It personifies as a calm, capable friend who has already solved the problem you are still worrying about, where Sakara Life reads as a wellness authority." },
      ]),
      green("Its appeals split along the routes of the Elaboration Likelihood Model (Petty & Cacioppo, 1986). The affective appeal dominates and is unusual: rather than selling aspiration, the advertising names the stress of eating badly under time pressure and offers relief from decision-making (Panoramata, n.d.). The cognitive appeal justifies the premium through verifiable claims: fully plant-based and gluten-free, 350 to 500 calorie portions, developed with chefs and nutritionists (BarBend, 2026). The founder's dual credentials act as a source-credibility cue."),
      green("This is known through triangulation: owned media states the claims, analyses of the brand's advertising document a copy-forward strategy (Panoramata, n.d.), and reviewers corroborate the nutrition while disputing taste (Trustpilot, n.d.). The promise is that eating well requires no planning, shopping, cooking, or willpower, and it is fragile, because it invites comparison against takeout on taste and groceries on price."),

      h2("4. Touchpoints"),
      green("The mix favors measurable digital direct response. Channels include paid social on Meta; lifecycle email on Klaviyo carrying offers as large as $100 off; host-read podcast sponsorships across roughly 22 shows in one year; an affiliate program paying about $24.00 per subscription; a two-sided referral offer worth $20 to $25; an Instagram community near 106,000 followers; earned media in Forbes and TechCrunch; the delivered box; and customer service (Getlasso, 2025; Panoramata, n.d.)."),
      green("Paid social and email are used most. The most efficient, though, appear to be podcast and affiliate placements, because the company attaches unique tracking codes to host reads and pays affiliates only per conversion; no brand renews 22 sponsorships without supporting attribution data (Getlasso, 2025). The decisive impression forms at the doorstep: reports of broken bottles, jumbled boxes, and missing items suggest the most intimate touchpoint is also the least consistent (Trustpilot, n.d.)."),

      h2("5. Competition"),
      green("The closest competitors are Daily Harvest and Sakara Life, both New York-founded, plant-based, women-led subscription businesses. Daily Harvest scaled far larger, reaching a $1.1 billion valuation in 2021, but ships frozen food the customer must still prepare, so it does not match Splendid Spoon on convenience; its 2022 recall after roughly 470 illness reports, and the layoffs that followed, damaged category trust (U.S. Food and Drug Administration, 2022; Fortune, 2022). Sakara Life sells transformation rather than convenience, offering organic \"food as medicine\" on a fixed menu (Sternlicht, 2021). Splendid Spoon ranks first on convenience and dietary accessibility, midpoint on price, and third on scale (My Subscription Addiction, n.d.)."),
      new Paragraph({ spacing: { line: 480 }, children: [new TextRun({ text: "Table 1", bold: true, color: GREEN })] }),
      new Paragraph({ spacing: { line: 480 }, children: [new TextRun({ text: "Competitive Comparison of Splendid Spoon and Two Primary Competitors", italics: true, color: GREEN })] }),
      comparisonTable,
      new Paragraph({ spacing: { line: 240, before: 100 }, children: [new TextRun({ text: "Note. Compiled from BarBend (2026), Fortune (2022), My Subscription Addiction (n.d.), Nosh (2026), and Sternlicht (2021).", italics: true, color: GREEN, size: 20 })] }),

      h2("6. SWOT Analysis"),
      h2("Strengths"),
      bulletLead("Vertical integration. ", "The Mosaic acquisition added in-house manufacturing, closing the company's largest structural gap (Nosh, 2026)."),
      bulletLead("Convenience advantage. ", "Fully ready-to-eat, unlike frozen rivals needing prep."),
      bulletLead("Credible founder and investors. ", "A chef-scientist founder and Danone Manifesto Ventures supply authenticity and access (Food Business News, 2022)."),
      h2("Weaknesses"),
      bulletLead("Price. ", "At $9.99-$13.49 per meal, it costs more than cooking and much takeout."),
      bulletLead("Inconsistent quality. ", "Bland bowls and damaged boxes undercut the promise."),
      bulletLead("Small scale and discounting. ", "With 11 to 50 employees and heavy promotions, margin and resilience are thin (PR Newswire, 2022)."),
      h2("Opportunities"),
      bulletLead("GLP-1 consumers. ", "These users need small, gentle, high-protein meals; the format fits, and reformulating opens a growing segment (MealFan, 2026)."),
      bulletLead("Retail and foodservice. ", "Manufacturing reopens the channel that closed in 2015."),
      bulletLead("Category growth. ", "Prepared meal delivery is projected to grow from $13.72 billion in 2026 to $30.72 billion by 2033 (Coherent Market Insights, 2026)."),
      h2("Threats"),
      bulletLead("Plant-based contraction. ", "U.S. plant-based sales fell 4% then 2% across 2023 to 2025, to $7.9 billion (Good Food Institute, 2026)."),
      bulletLead("Better-funded rivals. ", "Factor and CookUnity compete on price and protein."),
      bulletLead("Food-safety risk. ", "Daily Harvest's recall shows one failure can be existential."),

      // ===== REFERENCES =====
      new Paragraph({ children: [new PageBreak()] }),
      h1("References"),
      ref([{ t: "Aaker, J. L. (1997). Dimensions of brand personality. " }, { t: "Journal of Marketing Research, 34", i: true }, { t: "(3), 347-356. https://doi.org/10.1177/002224379703400304" }]),
      ref([{ t: "BarBend. (2026). " }, { t: "Splendid Spoon review (2026)", i: true }, { t: ". https://barbend.com/splendid-spoon-review/" }]),
      ref([{ t: "Bliss, S. (2019, March 31). One mom's rollercoaster startup journey through life's struggles to success. " }, { t: "Forbes", i: true }, { t: ". https://www.forbes.com/sites/sarabliss/2019/03/31/one-moms-rollercoaster-startup-journey-through-lifes-struggles-to-success/" }]),
      ref([{ t: "Coherent Market Insights. (2026). " }, { t: "Prepared meal delivery market size and YoY growth rate, 2033", i: true }, { t: ". https://www.coherentmarketinsights.com/industry-reports/prepared-meal-delivery-market" }]),
      ref([{ t: "Food Business News. (2022, February 9). " }, { t: "Splendid Spoon raises $12 million in Series B funding", i: true }, { t: ". https://www.foodbusinessnews.net/articles/20645-splendid-spoon-raises-12-million-in-series-b-funding" }]),
      ref([{ t: "Fortune. (2022, August 13). " }, { t: "How Daily Harvest bungled its lentil crumbles recall", i: true }, { t: ". https://fortune.com/2022/08/13/daily-harvest-lentil-crumbles-gallbladder-recall-stumbles/" }]),
      ref([{ t: "Getlasso. (2025). " }, { t: "Splendid Spoon affiliate program: Commission and program details", i: true }, { t: ". https://getlasso.co/affiliate/splendid-spoon/" }]),
      ref([{ t: "Good Food Institute. (2026). " }, { t: "U.S. retail market insights for the plant-based industry", i: true }, { t: ". https://gfi.org/marketresearch/" }]),
      ref([{ t: "MealFan. (2026). " }, { t: "Best GLP-1 meal delivery 2026: Protein-first picks tested", i: true }, { t: ". https://mealfan.com/glp-1-meal-delivery/" }]),
      ref([{ t: "My Subscription Addiction. (n.d.). " }, { t: "Splendid Spoon, Daily Harvest or Sakara Life: Which meal plan should you be on?", i: true }, { t: " https://www.mysubscriptionaddiction.com/which-plant-based-meal-delivery-service-is-right-for-you-splendid-spoon-daily-harvest-or-sakara-life" }]),
      ref([{ t: "Nosh. (2026, January 6). " }, { t: "Splendid Spoon buys Mosaic Foods in deal backed by Gather Ventures", i: true }, { t: ". https://www.nosh.com/news/2026/splendid-spoon-buys-mosaic-foods-in-deal-backed-by-gather-ventures/" }]),
      ref([{ t: "Panoramata. (n.d.). " }, { t: "Splendid Spoon: Food ecommerce marketing strategy example", i: true }, { t: ". https://www.panoramata.co/marketing-strategy-brand/splendid-spoon" }]),
      ref([{ t: "Petty, R. E., & Cacioppo, J. T. (1986). " }, { t: "Communication and persuasion: Central and peripheral routes to attitude change", i: true }, { t: ". Springer-Verlag." }]),
      ref([{ t: "PR Newswire. (2022, February 9). " }, { t: "Splendid Spoon raises $12 million in Series B funding led by Nicoya", i: true }, { t: ". https://www.prnewswire.com/news-releases/splendid-spoon-raises-12-million-in-series-b-funding-led-by-nicoya-301478840.html" }]),
      ref([{ t: "Splendid Spoon. (n.d.). " }, { t: "The story behind how Nicole Centeno founded Splendid Spoon", i: true }, { t: ". https://blog.splendidspoon.com/the-story-behind-how-nicole-centeno-founded-splendid-spoon/" }]),
      ref([{ t: "Splendid Spoon. (2026, January). " }, { t: "Splendid Spoon and Mosaic Foods merge to make ready-made foods better for you", i: true }, { t: ". https://blog.splendidspoon.com/splendid-spoon-and-mosaic-foods-merge-to-make-ready-made-foods-better-for-you/" }]),
      ref([{ t: "Stanford eCorner. (2023). " }, { t: "Elise Densborn (Splendid Spoon): From customer to co-CEO", i: true }, { t: " [Audio podcast episode]. Stanford University. https://ecorner.stanford.edu/podcasts/elise-densborn-splendid-spoon-from-customer-to-co-ceo/" }]),
      ref([{ t: "Sternlicht, A. (2021, March 24). How two childhood friends built Sakara Life into a $150-million-a-year plant-based powerhouse. " }, { t: "Forbes", i: true }, { t: ". https://www.forbes.com/sites/alexandrasternlicht/2021/03/24/how-two-childhood-friends-built-sakara-life-into-a-150-million-a-year-plant-based-powerhouse/" }]),
      ref([{ t: "Trustpilot. (n.d.). " }, { t: "Splendid Spoon reviews", i: true }, { t: ". Retrieved September 10, 2026, from https://www.trustpilot.com/review/splendidspoon.com" }]),
      ref([{ t: "U.S. Food and Drug Administration. (2022, June 23). " }, { t: "Daily Harvest issues voluntary recall of French Lentil + Leek Crumbles due to potential health risk", i: true }, { t: ". https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts/daily-harvest-issues-voluntary-recall-french-lentil-leek-crumbles-due-potential-health-risk" }]),
    ],
  }],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync("Client_Research_Report_Splendid_Spoon.docx", buf);
  console.log("wrote docx");
});
