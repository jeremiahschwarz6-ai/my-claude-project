const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  PageNumber, Header, Footer, Table, TableRow, TableCell, WidthType,
  ShadingType, BorderStyle, PageBreak, LevelFormat, TabStopType, TabStopPosition,
} = require("docx");
const fs = require("fs");

const FONT = "Times New Roman";
const SIZE = 24; // 12pt (half-points)
const DOUBLE = { line: 480, lineRule: "auto" };

// ---------- helpers ----------
function run(text, opts = {}) {
  return new TextRun({ text, font: FONT, size: SIZE, ...opts });
}

// Body paragraph: double-spaced, first-line indent 0.5"
function body(children) {
  const kids = typeof children === "string" ? [run(children)] : children;
  return new Paragraph({
    children: kids,
    spacing: DOUBLE,
    indent: { firstLine: 720 }, // 0.5"
  });
}

// Body paragraph without indent (e.g., under a subhead lead-in)
function bodyNoIndent(children) {
  const kids = typeof children === "string" ? [run(children)] : children;
  return new Paragraph({ children: kids, spacing: DOUBLE });
}

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    alignment: AlignmentType.CENTER,
    spacing: DOUBLE,
    children: [run(text, { bold: true })],
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    alignment: AlignmentType.LEFT,
    spacing: DOUBLE,
    children: [run(text, { bold: true })],
  });
}

// Level 3 APA: indented, bold italic, left
function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: DOUBLE,
    children: [run(text, { bold: true, italics: true })],
  });
}

function blank() {
  return new Paragraph({ children: [run("")], spacing: DOUBLE });
}

// Reference entry: hanging indent 0.5", double-spaced
function ref(children) {
  return new Paragraph({
    children,
    spacing: DOUBLE,
    indent: { left: 720, hanging: 720 },
  });
}

// ---------- title page ----------
const titlePage = [
  blank(), blank(), blank(),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: DOUBLE,
    children: [run("Sole to Soul: A One-Month Digital Public Relations Campaign for Shood (Shoes for Good)", { bold: true })],
  }),
  blank(),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: DOUBLE, children: [run("Student Name")] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: DOUBLE, children: [run("Department of Communication Studies, Liberty University")] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: DOUBLE, children: [run("STCO 357: Digital Public Relations")] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: DOUBLE, children: [run("Instructor Name")] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: DOUBLE, children: [run("September 17, 2026")] }),
  new Paragraph({ children: [new PageBreak()] }),
];

// ---------- body ----------
const bodyContent = [
  // Repeated title on first body page
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: DOUBLE,
    children: [run("Sole to Soul: A One-Month Digital Public Relations Campaign for Shood (Shoes for Good)", { bold: true })],
  }),
  body("Shood, also known as Shoes for Good, is a Richmond, Virginia 501(c)(3) nonprofit founded in April 2017 by Robin Telfian. The organization collects, cleans, and refits new and gently used running shoes, then distributes them with dignity to people experiencing poverty and homelessness. Since its founding, Shood has placed more than 25,000 pairs of shoes on the feet of neighbors served through soup kitchens, recovery programs, and food pantries, and it equips runners at five Title I Richmond schools through its Shooding Stars program (R. Telfian, personal communication, September 3, 2026). Because Shood is entirely volunteer-run and depends on donated shoes and financial gifts, a well-designed digital public relations campaign can extend its reach, recruit volunteers, and grow shoe and monetary donations. The following one-month plan proposes an integrated September 2026 campaign built on social media, mobile technology, and blogging to attract, engage, and inform Shood's target public."),

  // 1. Target public
  h1("Target Public Characteristics"),
  body("The primary target public for this campaign is Richmond-area active adults ages 25 to 45—recreational runners, walkers, and fitness enthusiasts who already own athletic footwear and cycle through shoes regularly. Research on nonprofit fundraising shows that an organization’s social media engagement—the size and activity of its online community—is a meaningful driver of the donations it ultimately receives (Elvira-Lorilla et al., 2024). This segment is attractive for Shood because members possess the exact resource the organization needs—running shoes—and they identify with the physical and emotional benefits of a good, well-fitted pair. A secondary public includes local businesses, running clubs, and civic groups that can host collection drives and corporate matches."),
  body("Research on media use indicates that this age group is highly mobile and visually oriented. They consume short-form video, follow lifestyle and fitness accounts, and respond to authentic, story-driven content rather than overt solicitation; studies of nonprofit engagement find that authenticity, not polish, is what earns attention and connection on newer platforms (DeMasters et al., 2024). They track workouts on smartphone applications, share race photos, and participate in community challenges. The content that most interests them centers on transformation stories, behind-the-scenes glimpses of volunteer work, practical fitness tips, and clear, tangible evidence of impact—how many pairs were distributed and whose life changed. Emotionally resonant, shareable content that lets supporters see themselves as part of the mission is therefore the strategic priority."),

  // 2. Creative theme + hashtag
  h1("Creative Theme and Campaign Hashtag"),
  body("The proposed creative theme is “Sole to Soul.” The wordplay links the sole of a shoe to the soul of a person, capturing Shood’s conviction that a well-fitted pair of shoes restores not only physical comfort but human dignity. Every donated pair becomes a tangible connection from one person’s sole to another person’s soul. The theme is flexible enough to unify diverse content—donor stories, volunteer refurbishing footage, and recipient dignity—while remaining emotionally distinct from generic “give back” messaging."),
  body([
    run("The rationale for the client is threefold. First, the theme reframes a used pair of shoes from a discarded object into a vehicle for dignity, which elevates the ask beyond charity. Second, it is inherently visual and story-driven, matching the content preferences of the target public. Third, it scales across platforms without duplicating content, satisfying the campaign requirement for creative differentiation. The distinctive and original campaign hashtag is "),
    run("#SoleToSoulRVA", { bold: true }),
    run(". The hashtag is original to this campaign, ties the “sole/soul” wordplay to the Richmond (RVA) community, and is short enough to travel easily across Instagram, TikTok, and Facebook while remaining easy to search and track."),
  ]),

  // 3. Digital media selection
  h1("Digital Media Selection"),
  body("Each social platform offers distinct strengths, and research shows that nonprofits generate more support when they diversify their messaging across channels rather than recycling identical posts (Bhati & McDonnell, 2025). To avoid duplicating content, each platform in this campaign is therefore assigned a distinct role and creative treatment."),

  h2("Instagram"),
  body("Instagram is the campaign’s visual anchor. Its primary uses are photo and short-video sharing through the feed, Stories, and Reels, and its features—carousels, polls, question stickers, and link stickers—support both storytelling and direct calls to action. It was selected because the target public is highly visual and because Instagram’s emphasis on aesthetics suits Shood’s dignity-centered before-and-after refurbishing imagery. Instagram carries the emotional heart of “Sole to Soul” through polished recipient and volunteer stories."),

  h2("TikTok"),
  body("TikTok is the campaign’s discovery and reach engine. Its primary uses are short-form vertical video and participatory trends, and its features—sounds, duets, stitches, and a discovery-driven algorithm—help small organizations reach audiences far beyond their existing followers (Wiley et al., 2023). It was selected to attract younger runners and to make the campaign shareable through authentic, unpolished “day in the life” and shoe-transformation videos. Where Instagram is refined, TikTok is raw and energetic, ensuring the two platforms never duplicate content."),

  h2("Facebook"),
  body("Facebook is the campaign’s community-organizing and events hub. Its primary uses are longer text posts, event pages, local group sharing, and fundraisers, and its features—Facebook Events, Groups, and the built-in donate button—are ideal for coordinating in-person collection drives. It was selected because Richmond running clubs, neighborhood groups, and older donors remain active there, and because Facebook’s logistics tools support the campaign’s real-world shoe drives that Instagram and TikTok cannot."),

  h2("Mobile Implementation"),
  body("The campaign extends to mobile in two ways. First, Shood will launch a September Strava Club challenge titled “Miles for Soles,” inviting runners to log miles on the Strava smartphone app; for a set mileage threshold, a sponsoring running store donates a pair of shoes. Strava’s mobile club and challenge features let the target public engage from their phones during the exact activity—running—that connects them to the cause. Second, the campaign uses text-to-give and a mobile-optimized donation page, so a supporter can text a keyword or scan a QR code and complete a gift in seconds on a smartphone. Together these tactics meet the mobile-technology requirement and lower the friction of both action and donation."),

  h2("Blog"),
  body("The blog, hosted on shood.org, is the campaign’s content home and search-visible archive. Because active, community-oriented engagement is what converts online attention into donations, owned media that hosts deeper storytelling strengthens the entire campaign (Elvira-Lorilla et al., 2024). Weekly “Sole to Soul” blog posts will tell one long-form story per week—a volunteer profile, a recipient’s journey, the science of proper shoe fit, and a campaign wrap-up—each ending with a clear call to donate, volunteer, or join the Strava challenge. Social posts will tease and link back to the blog, making it the connective tissue of the campaign."),

  // 4. Recommended content
  h1("Recommended Content by Platform"),
  body("The following content is recommended for the launch week and models the tone for the month. No post is duplicated across platforms; each is adapted to the platform’s strengths while reinforcing the “Sole to Soul” theme."),

  h2("Instagram"),
  body([
    run("Format: A before-and-after carousel. Slide one shows a scuffed donated shoe; slide two shows the same shoe refurbished and gleaming; slide three shows it fitted on a smiling neighbor. Caption: “One pair. Two lives changed. Every sole we clean carries a message: you matter. This September, help us move 1,000 pairs from sole to soul. 👟 Tap the link in bio to give shoes or dollars. #SoleToSoulRVA” This content connects to the theme by visually literalizing the sole-to-soul journey from discarded object to dignity.", { }),
  ]),

  h2("TikTok"),
  body("Format: A fast-cut, trending-sound transformation video set in the Shood workshop—volunteers scrubbing, sanitizing, and re-lacing shoes, ending with a runner lacing up and sprinting off. On-screen text: “POV: you turned someone’s throwaway into someone else’s fresh start. #SoleToSoulRVA.” This connects to the theme by showing the raw, human labor of dignity and inviting viewers to duet their own shoe-donation reveal, extending reach through participation."),

  h2("Facebook"),
  body("Format: An event post for the first Saturday collection drive. Copy: “Richmond, let’s move soles this September! Drop off your gently used running shoes at [location] on Sept. 6, 9 a.m.–1 p.m. Every pair you clear from your closet becomes dignity for a neighbor. Can’t make it? Start a shoe drive with your running club—comment and we’ll set you up. #SoleToSoulRVA” This connects to the theme by turning community logistics into a shared act of moving shoes from sole to soul."),

  // 5. Weekly UGC
  h1("Weekly User-Generated Content"),
  body("Each week features at least one form of user-generated content (UGC) designed to encourage interactivity, engagement, and shareability, ensuring supporters co-create the campaign rather than merely observe it."),
  bodyNoIndent([run("Week 1 – The #SoleToSoulRVA Photo Challenge. ", { bold: true }), run("Supporters post a photo of the running shoes they are donating with the campaign hashtag and tag Shood; each qualifying post is entered to win a local running-store gift card. This launches the hashtag and seeds shareable content.")]),
  bodyNoIndent([run("Week 2 – “Why I Run” Story Prompt. ", { bold: true }), run("Using an Instagram Stories question sticker, followers share what running means to them, and Shood reshares responses, linking personal meaning to the mission of giving others that same experience.")]),
  bodyNoIndent([run("Week 3 – The Strava “Miles for Soles” Challenge. ", { bold: true }), run("Runners log miles in the campaign Strava club and screenshot their totals to social media; collective mileage unlocks additional sponsor-donated pairs, turning individual workouts into shared impact.")]),
  bodyNoIndent([run("Week 4 – Shoe-Fit “Dignity Quiz.” ", { bold: true }), run("An interactive Instagram and Facebook quiz teaches followers how a properly fitted shoe should feel; participants who share their results and the donation link help close the campaign with an educational, shareable action.")]),

  // Biblical integration
  h1("Biblical Integration"),
  body("Shood’s mission of delivering shoes with dignity is deeply consistent with Scripture’s call to serve the vulnerable, which strengthens the campaign’s ethical foundation. In Matthew 25:40, Jesus teaches, “Truly I tell you, whatever you did for one of the least of these brothers and sisters of mine, you did for me” (New International Version, 2011), framing each donated pair as an act of service rendered ultimately to Christ. The imagery of feet carries particular weight in this campaign: Romans 10:15 declares, “How beautiful are the feet of those who bring good news,” and Ephesians 6:15 speaks of feet “fitted with the readiness that comes from the gospel of peace” (New International Version, 2011). A campaign literally centered on fitting feet with dignity becomes an opportunity to embody good news in a tangible way. The “Sole to Soul” theme therefore aligns with a biblical worldview that treats every person as an image-bearer worthy of dignity, and it invites supporters to participate in servant-hearted generosity rather than mere transactional giving."),

  // Timeline
  h1("Implementation Timeline"),
  body("The campaign runs across the four weeks of September 2026. The timeline below coordinates platform activity, mobile engagement, blogging, and user-generated content so that each channel reinforces a shared weekly focus without duplicating content."),
];

// ---------- timeline table ----------
function cell(text, { bold = false, width, shaded = false } = {}) {
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    shading: shaded ? { type: ShadingType.CLEAR, fill: "D9E2F3", color: "auto" } : undefined,
    margins: { top: 40, bottom: 40, left: 80, right: 80 },
    children: [new Paragraph({ children: [run(text, { bold, size: 20 })], spacing: { line: 240 } })],
  });
}

const colW = [1200, 2500, 2500, 2500]; // sums to 8700
const tableWidth = colW.reduce((a, b) => a + b, 0);

const timelineRows = [
  ["Week", "Theme Focus", "Platform Activity", "UGC + Mobile/Blog"],
  ["Week 1\nSept 1–7", "Launch: “Sole to Soul” reveal", "IG launch carousel; TikTok workshop transformation; FB drive event (Sept. 6)", "#SoleToSoulRVA Photo Challenge; blog: founder’s story; text-to-give goes live"],
  ["Week 2\nSept 8–14", "Community: why running matters", "IG Stories “Why I Run”; TikTok runner duets; FB running-club drives", "“Why I Run” Story prompt; blog: volunteer profile"],
  ["Week 3\nSept 15–21", "Movement: Miles for Soles", "IG Reel of Strava totals; TikTok mileage recap; FB sponsor match announcement", "Strava “Miles for Soles” challenge; blog: the science of shoe fit"],
  ["Week 4\nSept 22–30", "Impact: dignity delivered", "IG impact carousel; TikTok thank-you montage; FB fundraiser close", "Shoe-Fit “Dignity Quiz”; blog: campaign results + call to give"],
];

const table = new Table({
  columnWidths: colW,
  width: { size: tableWidth, type: WidthType.DXA },
  rows: timelineRows.map((r, i) =>
    new TableRow({
      tableHeader: i === 0,
      children: r.map((c, j) => {
        // support manual line breaks in cells
        const lines = c.split("\n");
        const children = lines.flatMap((ln, k) =>
          k === 0 ? [run(ln, { bold: i === 0, size: 20 })] : [new TextRun({ break: 1, text: ln, font: FONT, size: 20, bold: i === 0 })]
        );
        return new TableCell({
          width: { size: colW[j], type: WidthType.DXA },
          shading: i === 0 ? { type: ShadingType.CLEAR, fill: "2E5395", color: "auto" } : undefined,
          margins: { top: 60, bottom: 60, left: 90, right: 90 },
          children: [new Paragraph({ children: i === 0 ? children.map(ch => ch) : children, spacing: { line: 240 } })],
        });
      }),
    })
  ),
});

// fix header text color to white
// (docx-js: set color on run) — rebuild header cells with white text
const timelineTable = new Table({
  columnWidths: colW,
  width: { size: tableWidth, type: WidthType.DXA },
  rows: timelineRows.map((r, i) =>
    new TableRow({
      tableHeader: i === 0,
      children: r.map((c, j) => {
        const lines = c.split("\n");
        const opts = { size: 20, bold: i === 0, color: i === 0 ? "FFFFFF" : "000000" };
        const children = lines.flatMap((ln, k) =>
          k === 0
            ? [new TextRun({ text: ln, font: FONT, ...opts })]
            : [new TextRun({ break: 1, text: ln, font: FONT, ...opts })]
        );
        return new TableCell({
          width: { size: colW[j], type: WidthType.DXA },
          shading:
            i === 0
              ? { type: ShadingType.CLEAR, fill: "2E5395", color: "auto" }
              : i % 2 === 0
              ? { type: ShadingType.CLEAR, fill: "EAF0FA", color: "auto" }
              : undefined,
          margins: { top: 60, bottom: 60, left: 90, right: 90 },
          children: [new Paragraph({ children, spacing: { line: 240 } })],
        });
      }),
    })
  ),
});

const afterTable = [
  blank(),
  body("This integrated schedule ensures that each week advances a single narrative beat—launch, community, movement, and impact—while every platform, the mobile challenge, and the blog contribute a distinct piece of that story. The result is a cohesive, non-duplicative campaign that attracts new supporters, engages them through participation, and informs them of Shood’s measurable impact."),
];

// ---------- references ----------
const references = [
  new Paragraph({ children: [new PageBreak()] }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: DOUBLE,
    children: [run("References", { bold: true })],
  }),
  ref([run("Bhati, A., & McDonnell, D. (2025). Message content and diversity as an effective nonprofit fundraising strategy on social media. "), run("Nonprofit and Voluntary Sector Quarterly", { italics: true }), run(". Advance online publication. https://doi.org/10.1177/08997640241303920")]),
  ref([run("DeMasters, C., Morgan, K., Schwoerer, K., & Wiley, K. (2024). Forging connections: Nonprofits, TikTok, and authentic engagement—A mixed-methods study. "), run("Journal of Public and Nonprofit Affairs, 10", { italics: true }), run("(1), 27–51. https://doi.org/10.20899/jpna.dky82f18")]),
  ref([run("Elvira-Lorilla, T., García-Rodríguez, I., Romero-Merino, M. E., & Santamaría-Mariscal, M. (2024). The role of social media in nonprofit organizations’ fundraising. "), run("Nonprofit and Voluntary Sector Quarterly, 53", { italics: true }), run("(6), 1353–1380. https://doi.org/10.1177/08997640231213286")]),
  ref([run("Luttrell, R. (2021). "), run("Social media: How to engage, share, and connect", { italics: true }), run(" (4th ed.). Rowman & Littlefield.")]),
  ref([run("New International Version. (2011). "), run("Bible Gateway", { italics: true }), run(". https://www.biblegateway.com (Original work published 1978)")]),
  ref([run("Telfian, R. (2026, September 3). "), run("Personal interview with the founder of Shood (Shoes for Good)", { italics: true }), run(" [Client interview]. Richmond, VA.")]),
  ref([run("Wiley, K., Schwoerer, K., Richardson, M., & Espinosa, M. B. (2023). Engaging stakeholders on TikTok: A multi-level social media analysis of nonprofit microvlogging. "), run("Public Administration, 101", { italics: true }), run("(3), 822–842. https://doi.org/10.1111/padm.12851")]),
];

// ---------- assemble ----------
const doc = new Document({
  styles: {
    default: {
      document: { run: { font: FONT, size: SIZE } },
    },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { font: FONT, size: SIZE, bold: true, color: "000000" },
        paragraph: { spacing: DOUBLE, alignment: AlignmentType.CENTER } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { font: FONT, size: SIZE, bold: true, color: "000000" },
        paragraph: { spacing: DOUBLE } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { font: FONT, size: SIZE, bold: true, italics: true, color: "000000" },
        paragraph: { spacing: DOUBLE } },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
        },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [new TextRun({ font: FONT, size: SIZE, children: [PageNumber.CURRENT] })],
            }),
          ],
        }),
      },
      children: [
        ...titlePage,
        ...bodyContent,
        timelineTable,
        ...afterTable,
        ...references,
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync("Shood_Digital_PR_Campaign_Plan.docx", buf);
  console.log("Wrote Shood_Digital_PR_Campaign_Plan.docx");
});
