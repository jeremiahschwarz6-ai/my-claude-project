const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, AlignmentType, PageNumber,
  Header, PageBreak
} = require("docx");

const GREEN = "008000";
const FONT = "Times New Roman";

const green = (text) =>
  new Paragraph({
    spacing: { line: 480, before: 0, after: 0 },
    indent: { firstLine: 720 },
    children: [new TextRun({ text, color: GREEN })],
  });

const greenRuns = (runs) =>
  new Paragraph({
    spacing: { line: 480, before: 0, after: 0 },
    indent: { firstLine: 720 },
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

const ref = (runs) =>
  new Paragraph({
    spacing: { line: 480, before: 0, after: 0 },
    indent: { left: 720, hanging: 720 },
    children: runs.map(r => new TextRun({ text: r.t, italics: !!r.i })),
  });

const doc = new Document({
  creator: "STCO 348 Social Media Research Report",
  title: "Social Media Research Report: Splendid Spoon",
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
      h1("Social Media Research Report: Splendid Spoon"),

      // ================= 1 =================
      h2("1. Blogs, Wikis, and Forums"),
      green("Blogs, wikis, and forums are social media's oldest layer, sharing one trait: text-first, searchable, and durable. A blog is an author-owned chronological publication; a wiki is a collaboratively edited reference with no single author; a forum is a threaded discussion organized by topic rather than by person. Usage differs sharply. Blogs are institutional: 76% of business-to-consumer marketers publish on a company blog (Content Marketing Institute, 2026). Wikis are consulted, not joined; Wikipedia drew roughly 4.4 billion visits in July 2026, about 68% from Google organic search (Similarweb, 2026). Forums skew young and college-educated: 26% of U.S. adults use Reddit, up from 18% four years earlier (Pew Research Center, 2025). Timing follows function: people read blogs when searching, wikis when verifying, and forums when they distrust marketing and want a peer's answer. Notably, 77% of users add \"Reddit\" to Google searches seeking recommendations, up 191% year over year (Sprout Social, 2026)."),
      green("For Splendid Spoon the advantages are asymmetric. A blog is owned media that compounds, ranking in search at no cost per impression and answering what a subscription shopper types. Forums offer credibility that cannot be bought: 64% of Reddit users prefer transparent answers to promotion, and founder AMAs draw four times the engagement of standard posts (Sprout Social, 2026). The costs are real: blogs need sustained publishing before returns appear, forums punish anything reading as an ad, and no company can create its own Wikipedia entry, since notability requires independent coverage."),
      green("Splendid Spoon executes the blog well. \"The Spoonful\" publishes recipes, seven-day meal plans, and parent-focused meal hacks, precisely the search-intent content its audience looks for, and it archives the founder's story (Splendid Spoon, n.d.-a). Against the research above, the blog rates strong. Forums and wikis are weak: no visible Reddit presence despite heavy third-party discussion of meal delivery, and no Wikipedia article, so researchers meet reviews and competitors rather than a neutral reference. Grade: blogs A, forums D, wikis incomplete."),

      // ================= 2 =================
      h2("2. Social Networks"),
      green("A social network's organizing principle is the relationship between people; content exists mainly to sustain connection. Facebook and LinkedIn are the clearest cases, built on personal and professional ties respectively. Reach is large and generationally split: 71% of U.S. adults use Facebook, 52% visit it daily, usage peaks at 80% among adults aged 30 to 49, and women use it more heavily than men (Pew Research Center, 2025). People use networks continuously rather than at a moment of purchase intent, which makes them powerful for interruption and discovery but poor at answering a specific question. That is why mature networks now operate less as publishing channels than as targeting databases sold by the impression."),
      green("For Splendid Spoon the advantage is precision. Facebook's heaviest users are women aged 30 to 49, almost exactly the working-parent audience the brand targets, and paid targeting reaches them at scale. The drawbacks are cost and fragility: acquisition rents attention any competitor can outbid, and the audience arrives without purchase intent, so conversion leans on discounting."),
      green("This is at once the brand's strongest and most exposed channel. The Facebook page carries roughly 48,900 likes, and paid Meta social has been the primary acquisition engine, matching the audience data well. LinkedIn, at about 4,200 followers, is treated as a notice board; for a company fresh from a merger that needs talent and retail buyers, that is underused rather than missing. Grade: Facebook A for targeting but C for dependence, LinkedIn C."),

      // ================= 3 =================
      h2("3. Microblogs"),
      green("A microblog carries short, frequent, public posts reporting what a person or brand is doing or thinking; the unit of value is the update, not the relationship. X is the canonical example, Yammer its enterprise equivalent, and Pinterest a visual microblog whose unit is the saved pin. Audiences differ enormously. X has contracted and is now used by fewer Americans than Reddit's 26% (Pew Research Center, 2025), while Pinterest reports 631 million monthly active users and roughly 5 billion monthly searches (Searchlab, 2026). Behavior matters more than size. X is used in real time for reaction and news; Pinterest is used prospectively for planning, with users saving ideas one to three months ahead. Intent differs in kind too: about 93% of Pinterest users plan purchases there, and 86% use it while grocery shopping (Searchlab, 2026)."),
      green("The pros and cons point in opposite directions. Food and recipes are Pinterest's largest category, and a pin holds discovery value for months rather than the hours an Instagram post gets, suiting weekly meal planning almost perfectly. The cost is patience: Pinterest rewards volume and vertical formats, and returns accrue slowly. X is the reverse, demanding constant real-time attention with little purchase intent and carrying reputational risk for a food brand."),
      green("Splendid Spoon leaves its best-matched platform unused; no active Pinterest or X presence is evident. Skipping X is defensible given the effort-to-intent ratio. Skipping Pinterest is not: a subscription selling planned weekly eating to women who research purchases in advance describes the Pinterest user almost exactly. Grade: X not applicable, Pinterest F, the largest unforced omission in the mix."),

      // ================= 4 =================
      h2("4. Audio, Visual, and Video Content Sharing"),
      green("These platforms are organized around a media file rather than a person or post: YouTube, Vimeo, Instagram, Snapchat, TikTok, and podcasts on Spotify and Apple. Collectively they are America's most widely used category. YouTube reaches 84% of U.S. adults, with 48% using it daily; Instagram reaches 50%, and eight in ten adults under 30 use it compared with 19% of those 65 and older; TikTok reaches 37% (Pew Research Center, 2025). Audio has grown comparably: 58% of Americans aged 12 and older, roughly 167 million people, listened to a podcast in the past month, and 45% listen weekly (Edison Research, 2026). Usage is contextual. Long video is watched for instruction, short vertical video for discovery, and podcasts during commutes and chores, which is why host-read audio reaches listeners whose hands are occupied but whose attention is not."),
      green("For a food brand the advantage is inherent: food is visual and preparation demonstrable, so a two-minute meal is already a two-minute video, and host endorsement transfers trust to a skeptical buyer. The costs are production load and audience mismatch: short-form video demands continuous output, and the youngest, heaviest TikTok and Snapchat users can least afford a $9.99 to $13.49 meal."),
      green("Performance here is uneven. Instagram is the strongest owned channel at roughly 106,000 followers, used for food photography and post-merger product news, appropriate to the platform (Splendid Spoon, n.d.-b). Audio is handled well but rented: the company sponsors roughly 22 podcasts a year with tracked promo codes rather than producing its own show, a defensible trade at 11 to 50 employees. Video is the weak point: TikTok sits near 3,500 followers, about 3% of the Instagram audience, and no YouTube channel is evident, leaving the brand absent from the platform 84% of U.S. adults use. Grade: Instagram A, podcasts B, video D."),

      // ================= References =================
      new Paragraph({ children: [new PageBreak()] }),
      h1("References"),
      ref([{ t: "Content Marketing Institute. (2026). " }, { t: "B2C content marketing benchmarks, budgets, and trends", i: true }, { t: ". https://contentmarketinginstitute.com/" }]),
      ref([{ t: "Edison Research. (2026). " }, { t: "The Infinite Dial 2026", i: true }, { t: ". https://www.edisonresearch.com/the-infinite-dial-2026/" }]),
      ref([{ t: "Pew Research Center. (2025, November 20). " }, { t: "Americans' social media use 2025", i: true }, { t: ". https://www.pewresearch.org/internet/2025/11/20/americans-social-media-use-2025/" }]),
      ref([{ t: "Searchlab. (2026). " }, { t: "Pinterest statistics 2026: 80+ facts on reach, shopping and ads", i: true }, { t: ". https://searchlab.nl/en/statistics/pinterest-statistics-2026" }]),
      ref([{ t: "Similarweb. (2026). " }, { t: "Wikipedia.org traffic analytics, ranking and audience", i: true }, { t: ". https://www.similarweb.com/website/wikipedia.org/" }]),
      ref([{ t: "Splendid Spoon. (n.d.-a). " }, { t: "The Spoonful", i: true }, { t: " [Blog]. https://blog.splendidspoon.com/" }]),
      ref([{ t: "Splendid Spoon. (n.d.-b). " }, { t: "Splendid Spoon [@splendid.spoon]", i: true }, { t: " [Instagram profile]. Retrieved September 28, 2026, from https://www.instagram.com/splendid.spoon/" }]),
      ref([{ t: "Sprout Social. (2026). " }, { t: "Reddit statistics in 2026 and tactics to grow your brand", i: true }, { t: ". https://sproutsocial.com/insights/reddit-statistics/" }]),
    ],
  }],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync("Social_Media_Research_Report_Splendid_Spoon.docx", buf);
  console.log("wrote Social_Media_Research_Report_Splendid_Spoon.docx");
});
