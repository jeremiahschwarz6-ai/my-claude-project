const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, AlignmentType, PageNumber,
  Header, PageBreak, LevelFormat
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

// Level 3 APA heading: flush left, bold italic — used for the three publics
const h3 = (text) =>
  new Paragraph({
    spacing: { line: 480, before: 0, after: 0 },
    children: [new TextRun({ text, bold: true, italics: true, color: GREEN })],
  });

const ref = (runs) =>
  new Paragraph({
    spacing: { line: 480, before: 0, after: 0 },
    indent: { left: 720, hanging: 720 },
    children: runs.map(r => new TextRun({ text: r.t, italics: !!r.i })),
  });

const doc = new Document({
  creator: "STCO 348 Consumer Research Report",
  title: "Consumer Research Report: Splendid Spoon",
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
      h1("Consumer Research Report: Splendid Spoon"),

      // ---- 1 ----
      h2("1. Three Potential Publics"),
      green("Splendid Spoon's ready-to-eat plant-based subscription can serve several distinct publics, but they buy for different reasons and at very different price tolerances."),
      h3("Public A: Time-Scarce Working Parents"),
      green("Demographically this public skews female, roughly 30 to 45, college-educated, partnered, with a child under 18 and household income above $100,000 in a metropolitan area. The scale is substantial: 73.9% of American mothers participated in the labor force in 2025, including 68.0% of mothers whose youngest child is under age six (U.S. Bureau of Labor Statistics [BLS], 2026). Psychographically, they are achievement-oriented and health-literate, and they experience convenience food as a small moral failure rather than a neutral choice; their binding constraint is time, not knowledge. Their lifestyle confirms it. Americans averaged only 43 minutes per day on food preparation and cleanup in 2025, while women who do cook average 71 minutes (BLS, 2026; \"Trends in Home Cooking,\" 2025). This public already buys the category: women are 58% of U.S. meal delivery users, and premium subscription use reaches 41% among households earning $100,000 or more (Gitnux, 2026)."),
      h3("Public B: GLP-1 Medication Users"),
      green("This public is older and medically motivated. About 11% of U.S. adults now use a GLP-1 medication for weight loss and 15% have done so, up from 3% in 2024, with use highest among adults aged 50 to 64 and women more likely than men (Gallup, 2026). Psychographically they are outcome-driven and compliance-minded, treating food as a clinical input rather than an indulgence, and they carry specific anxieties about muscle loss, nausea, and protein adequacy. Their lifestyle has measurably changed: 47% report eating smaller portions and 56% report healthier choices, while households cut grocery spending 5.3% within six months of starting treatment, shifting toward fresh produce and packaged protein (PwC, n.d.; Food Business News, 2026)."),
      h3("Public C: Sustainability-Driven Gen Z Flexitarians"),
      green("The youngest public is largest in the long run and weakest in the short run: roughly 18 to 28, urban, in school or early career, often living with family, and income-constrained. Psychographically, sustainability functions as a baseline expectation rather than a premium feature, and trust is built on transparency and authenticity; 54% say they would pay about 10% more for sustainable products (Innova Market Insights, n.d.). Their lifestyle is convenience-saturated: 64% eat out weekly or more often, and Gen Z accounts for 29% of U.S. meal delivery users (Innova Market Insights, n.d.; Gitnux, 2026)."),
      green("The three differ most in what they are actually purchasing. Public A buys time, Public B buys clinical control, and Public C buys identity. That distinction, far more than age, determines both price tolerance and message."),

      // ---- 2 ----
      h2("2. Overlap of Skill and Passion: The Content Tilt"),
      green("Splendid Spoon does one thing better than any direct competitor: it removes labor entirely. Daily Harvest still requires the customer to blend or bake, and Sakara Life requires surrender to a fixed menu, while Splendid Spoon arrives ready to eat. Its skill and passion overlap in its founder. Nicole Centeno is a French Culinary Institute-trained chef and a former research biologist, giving the company simultaneous authority over flavor and over nutrition science, and she built it after concluding, while working full time and pregnant, that the barrier to healthy eating is time rather than knowledge."),
      greenRuns([
        { t: "Joe Pulizzi defines the content tilt as \"that area of little to no competition on the web that actually gives you a chance to break through the noise and be relevant\" (Pulizzi, n.d.). Plant-based recipes are not that area, because that space is saturated, and neither is weight loss. Splendid Spoon's tilt is narrower: " },
        { t: "the plant-based weekday meal that requires no preparation at all", i: true },
        { t: ", owned at the specific moment of workday breakfast and lunch, when time is shortest and willpower is lowest." },
      ]),
      green("The evidence for this tilt sits in the company's own product architecture. The menu is weighted toward breakfast and lunch rather than family dinner; \"The Reset\" packages five light soups as a single-day protocol rather than a product; per-serving price falls as plan size rises, rewarding routine over trial; and the advertising names the stress of unplanned eating rather than an aspirational body. In practice the tilt should look like content owning the desk lunch: two-minute midday resets, founder-led explanations of why a bowl balances fiber and protein, and a \"one plant-based choice a day\" frame asking for a small repeatable commitment rather than a dietary conversion."),

      // ---- 3 ----
      h2("3. Hierarchy of Publics"),
      green("Ranked by product fit today, willingness to pay, and cost to serve, the hierarchy is as follows. Public A, time-scarce working parents, is the priority: the product fits without reformulation, the price matches the household income, and the founder narrative mirrors the audience's lived experience. Public B, GLP-1 users, is second. It is the fastest-growing opportunity, and small portioned meals suit a suppressed appetite, but the menu does not deliver the 25 to 35 grams of protein these consumers are told to prioritize, so capturing it requires product development, not messaging alone. Public C, Gen Z flexitarians, is third. It is the largest long-term pool and the most values-aligned, but a stated willingness to pay roughly 10% more cannot bridge the gap to a premium subscription; this public should be nurtured with content now and converted later, as income rises."),

      // ---- 4 ----
      h2("4. Selected Target Audience"),
      green("For the remainder of this project I will target Public A: time-scarce working parents, and specifically working mothers aged 30 to 45 in dual-income metropolitan households earning more than $100,000."),
      green("This audience benefits most because its constraint is precisely the constraint the product removes. These consumers are not short on nutritional knowledge; they are short on minutes. Nearly three-quarters of mothers are in the labor force, while national food preparation and cleanup time has compressed to 43 minutes a day (BLS, 2026). A service delivering a complete plant-based meal that needs two minutes and no decisions converts that constraint into relief, a benefit the other publics can get elsewhere more cheaply."),
      green("They are also the audience most likely to be attracted, which is a separate question from who benefits. They already buy this category: women are 58% of meal delivery subscribers, and premium use concentrates in households earning $100,000 or more (Gitnux, 2026). The brand's existing assets are pre-tuned to them, from a breakfast-and-lunch menu to a founder whose origin story is this consumer's daily problem. Choosing Public A means competing where Splendid Spoon is already strongest, rather than buying entry into a segment that would first require reformulating the food itself."),

      // ---- References ----
      new Paragraph({ children: [new PageBreak()] }),
      h1("References"),
      ref([{ t: "Food Business News. (2026). " }, { t: "GLP-1 users cut food spending by 5.3%", i: true }, { t: ". https://www.foodbusinessnews.net/articles/29532-glp-1-users-cut-food-spending-by-53" }]),
      ref([{ t: "Gallup. (2026). " }, { t: "In U.S., GLP-1 usage reaches new high", i: true }, { t: ". https://news.gallup.com/poll/712157/glp-usage-reaches-new-high.aspx" }]),
      ref([{ t: "Gitnux. (2026). " }, { t: "Meal prep industry statistics", i: true }, { t: ". https://gitnux.org/meal-prep-industry-statistics/" }]),
      ref([{ t: "Innova Market Insights. (n.d.). " }, { t: "Gen Z food trends, global sustainability and wellness insights", i: true }, { t: ". https://www.innovamarketinsights.com/trends/gen-z-food-trends-global-market-overview/" }]),
      ref([{ t: "PwC. (n.d.). " }, { t: "GLP-1 consumer trends in food, apparel and wellness", i: true }, { t: ". https://www.pwc.com/us/en/industries/consumer-markets/library/glp-1-consumer-trends.html" }]),
      ref([{ t: "Pulizzi, J. (n.d.). " }, { t: "What is a content tilt?", i: true }, { t: " The Tilt. https://www.thetilt.com/audience/what-is-content-tilt" }]),
      ref([{ t: "Trends in home cooking among United States adults from 2003 to 2023: Analysis of American Time Use Survey food preparation. (2025). " }, { t: "Current Developments in Nutrition", i: true }, { t: ". https://cdn.nutrition.org/article/S2475-2991(25)02991-9/fulltext" }]),
      ref([{ t: "U.S. Bureau of Labor Statistics. (2026). " }, { t: "Labor force participation rate was 73.9 percent for mothers and 93.7 percent for fathers in 2025", i: true }, { t: ". https://www.bls.gov/opub/ted/2026/labor-force-participation-rate-was-73-9-percent-for-mothers-and-93-7-percent-for-fathers-in-2025.htm" }]),
    ],
  }],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync("Consumer_Research_Report_Splendid_Spoon.docx", buf);
  console.log("wrote Consumer_Research_Report_Splendid_Spoon.docx");
});
