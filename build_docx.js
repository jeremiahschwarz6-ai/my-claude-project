const {
  Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel,
  PageNumber, Header, Footer, PageBreak, LevelFormat, convertInchesToTwip,
} = require("docx");
const fs = require("fs");

const FONT = "Times New Roman";
const SIZE = 24; // 12pt in half-points
const DOUBLE = { line: 480, lineRule: "auto" };

// Helper: a normal body paragraph, double-spaced, first-line indent 0.5"
function body(children) {
  return new Paragraph({
    spacing: DOUBLE,
    indent: { firstLine: convertInchesToTwip(0.5) },
    children,
  });
}
function run(text, opts = {}) {
  return new TextRun({ text, font: FONT, size: SIZE, ...opts });
}
// Level 1 APA heading: centered, bold
function h1(text) {
  return new Paragraph({
    spacing: DOUBLE,
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text, font: FONT, size: SIZE, bold: true })],
  });
}
// centered plain line (title page)
function centered(text, opts = {}) {
  return new Paragraph({
    spacing: DOUBLE,
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text, font: FONT, size: SIZE, ...opts })],
  });
}
function blank() {
  return new Paragraph({ spacing: DOUBLE, children: [new TextRun({ text: "", font: FONT, size: SIZE })] });
}
// reference entry with hanging indent
function ref(children) {
  return new Paragraph({
    spacing: DOUBLE,
    indent: { left: convertInchesToTwip(0.5), hanging: convertInchesToTwip(0.5) },
    children,
  });
}

const pageNumHeader = new Header({
  children: [
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      children: [new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: SIZE })],
    }),
  ],
});

// ---------- TITLE PAGE ----------
const titlePage = [
  blank(), blank(), blank(),
  centered("Internal Organizational Communication Plan: Foundation", { bold: true }),
  centered("Shood (Shoes for Good)", { bold: true }),
  blank(),
  centered("Jeremiah Schwarz"),
  centered("School of Communication and the Arts, Liberty University"),
  centered("STCO 372: Internal Organizational Communication"),
  centered("[Instructor Name]"),
  centered("July 26, 2026"),
  new Paragraph({ children: [new PageBreak()] }),
];

// ---------- BODY ----------
const bodyPages = [
  // Repeated title as the heading of the first body page (APA 7)
  new Paragraph({
    spacing: DOUBLE,
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: "Internal Organizational Communication Plan: Foundation", font: FONT, size: SIZE, bold: true })],
  }),

  h1("Introduction"),
  body([run("Shood, also known as Shoes for Good, is a Richmond, Virginia–based 501(c)(3) nonprofit organization that collects, cleans, and redistributes new and gently used running shoes to economically disadvantaged individuals throughout the greater Richmond area (Shood, n.d.). The organization is powered almost entirely by volunteers, who refurbish donated shoes and then personally size and fit guests at community giveaways. I chose Shood as the focus of this internal communication plan because it represents a category of organization whose success depends completely on the coordinated effort of people who are not paid to show up. Unlike a corporation that can rely on employment contracts to secure participation, Shood depends on the sustained enthusiasm of volunteers who give their time freely. That reality makes internal communication not a mere support function but the very engine of the organization, which is precisely what makes it a compelling subject for study.")]),

  h1("Organization"),
  body([run("Shood was founded in June 2017 by Robin Watson Telfian, a Kentucky native and avid runner who was moved to action after a February 2017 conversation with a patron named David at the Red Door RVA Soup Kitchen about his worn-out shoes (Richmond Free Press, 2021). Telfian recognized a striking contrast: recreational runners typically retire their shoes after 300 to 500 miles and cycle through roughly three pairs each year, while individuals experiencing poverty may walk 10 to 15 miles a day in shoes that no longer fit or protect them (Fleet Feet, n.d.). From that insight, Shood was born with a mission to provide well-fitted running shoes to those in need and to deliver them with dignity. In its first three and a half years, the organization distributed more than 6,000 pairs of shoes, and it has since surpassed 25,000 pairs delivered locally (Shood, n.d.).")]),
  body([run("Today, Shood operates through a team of volunteers who clean, sanitize, and refurbish donated running shoes until they look nearly new, and who then size and guide guests at monthly “Shood Shares” hosted at soup kitchens, churches, recovery programs, and food pantries across Richmond. The organization also supplies Title I middle and high school running programs with shoes and track spikes and operates a shoe-recycling initiative with collection bins throughout the city. Its current internal communication processes reflect its small size and volunteer character. Coordination happens largely through email announcements, a public-facing social media presence, group text and messaging threads, face-to-face direction at events, and word of mouth, with the founder serving as the central hub through which most information passes.")]),
  body([run("The central challenge Shood faces in pursuing more motivated involvement is volunteer engagement and retention. Because volunteers are unpaid, their participation is voluntary and easily interrupted by competing personal and professional demands. Without consistent, meaningful communication that connects each volunteer’s effort to the mission and to visible impact, enthusiasm can fade, event turnout becomes difficult to predict, and a small core of highly committed people absorbs a disproportionate share of the work—an arrangement that leads directly to burnout and turnover. Sustaining and growing the organization’s reach therefore depends less on recruiting new shoes than on keeping people communicating, connected, and motivated.")]),

  h1("Internal Communications"),
  body([run("Measured honestly, Shood communicates with genuine warmth but not always with consistency. Its strengths are real. The mission is exceptionally clear, the relationships among volunteers are personal, and the feedback loop at events is immediate and powerful: volunteers witness the impact of their work the moment a guest walks away in shoes that fit. Scholars note that this kind of direct line of sight between effort and organizational purpose is a defining feature of effective internal communication, which is fundamentally about fostering a shared understanding and a sense of belonging rather than simply transmitting messages (Welch & Jackson, 2007).")]),
  body([run("The weaknesses, however, stem from the same informality that makes the culture feel personal. Communication is largely top-down and hub-and-spoke, flowing outward from the founder rather than circulating among volunteers, which creates a single point of failure and limits opportunities for two-way dialogue. The reliance on scattered channels—email, social media, and text—means there is no centralized, reliable place where volunteers know to look for information, and the cadence of communication is inconsistent. New volunteers, in particular, can feel obstructed from the details they need to participate confidently, and there is little formal mechanism for surfacing their questions or ideas. Currently, information is collected informally: through conversations at events, engagement metrics on social media, and observed turnout. These methods are inexpensive and immediate, but they capture only the voices of those already present and miss the volunteers who have quietly drifted away.")]),
  body([run("I would not rely on these methods alone. Research consistently shows that employees and members place high value on being listened to, not merely informed, and that two-way, symmetrical communication is strongly associated with engagement and trust (Ruck & Welch, 2012). Leadership communication that is open and responsive further strengthens these outcomes (Men, 2014). I would therefore recommend that Shood adopt a lightweight volunteer-communication platform to centralize scheduling and announcements, publish a brief monthly volunteer newsletter that shares impact stories and upcoming needs, and introduce short periodic feedback surveys so that volunteers have a structured, two-way channel to be heard.")]),

  h1("Desirable Outcomes"),
  body([run("The business need behind this plan is organizational capacity and sustainability. Shood’s ability to fulfill its mission is directly limited by the number of engaged, returning volunteers available to refurbish shoes and staff Shood Shares. Volunteer labor is, in effect, the organization’s bottom line: every retained and motivated volunteer expands the number of guests who can be served with dignity, while every volunteer lost shrinks that capacity and shifts more strain onto the remaining core. If the desired internal communication plan is achieved, the organization would be different in a tangible way—turnout at events would be more predictable, the founder would no longer be a bottleneck, and volunteers would feel like co-owners of the mission rather than occasional helpers.")]),
  body([run("Organizational (SMART) outcome: By June 30, 2027, increase the active volunteer retention rate from an estimated baseline of 55% to 70%, and increase average monthly Shood Share volunteer turnout by 20% over the prior year, as measured by event sign-in records. Communication (SMART) objective: By March 31, 2027, ensure that at least 80% of active volunteers report they feel well-informed about upcoming events and the organization’s impact—up from a baseline established in a January 2027 survey—as measured by a follow-up survey using a 5-point Likert scale, following the launch of a monthly volunteer newsletter and a centralized two-way messaging channel by December 2026. Together, these outcomes connect an achievable communication change to a measurable improvement in the organization’s ability to serve its community.")]),

  h1("Audience"),
  body([run("Shood’s internal audience is more varied than its size might suggest. It includes a small core of highly committed volunteers who anchor nearly every event; a larger pool of episodic or occasional volunteers who participate when schedules allow; the founder and any board or leadership members who set direction; and community partners such as soup kitchens, churches, and schools whose staff coordinate closely with Shood. Each group brings a distinct mindset. Core volunteers are mission-driven and identity-invested but are vulnerable to burnout; episodic volunteers are enthusiastic but loosely connected and easily distracted by competing commitments; partners are supportive but need dependable logistical information to plan around.")]),
  body([run("As a result of stronger internal communication, I want these audiences to think that their individual time and effort make a measurable, visible difference to real people in their community. I want them to feel valued, informed, and genuinely part of a shared community rather than interchangeable helpers. And I want them to do three concrete things: sign up and return consistently, respond to and engage with organizational communications, and invite others into the work by recruiting new volunteers. Aligning the think, feel, and do dimensions of each audience segment is what will convert goodwill into the reliable, motivated involvement the organization needs.")]),

  h1("Conclusion"),
  body([run("Shood is a small but remarkably effective Richmond nonprofit that has delivered tens of thousands of pairs of shoes to people in need by turning the discarded gear of runners into dignity for the vulnerable. Its internal communication today is warm, mission-clear, and personal, but it is also informal, founder-centered, and largely one-directional, which puts sustained volunteer engagement at risk. By centralizing communication, adding a monthly newsletter, and opening structured two-way feedback, Shood can pursue clear SMART outcomes—higher volunteer retention and turnout, and a stronger sense of being informed and valued among its people. Strengthening how Shood communicates internally is ultimately the same as strengthening its capacity to fulfill its mission, and it provides the foundation on which the remainder of this internal communication plan will be built.")]),

  new Paragraph({ children: [new PageBreak()] }),
];

// ---------- REFERENCES ----------
const references = [
  h1("References"),
  ref([run("Fleet Feet. (n.d.). "), run("The right fit with dignity: Robin Telfian’s nonprofit gives shoes to those in need", { italics: true }), run(". https://www.fleetfeet.com/blog/robin-telfian")]),
  ref([run("Men, L. R. (2014). Why leadership matters to internal communication: Linking transformational leadership, symmetrical communication, and employee outcomes. "), run("Journal of Public Relations Research, 26", { italics: true }), run("(3), 256–279. https://doi.org/10.1080/1062726X.2014.908719")]),
  ref([run("Richmond Free Press. (2021, January 28). "), run("Personality: Robin Watson Telfian", { italics: true }), run(". Richmond Free Press. http://richmondfreepress.com/news/2021/jan/28/personality-robin-watson-telfian/")]),
  ref([run("Ruck, K., & Welch, M. (2012). Valuing internal communication: Management and employee perspectives. "), run("Public Relations Review, 38", { italics: true }), run("(2), 294–302. https://doi.org/10.1016/j.pubrev.2011.12.016")]),
  ref([run("Shood. (n.d.). "), run("Our mission", { italics: true }), run(". https://www.shood.org/our-mission")]),
  ref([run("Welch, M., & Jackson, P. R. (2007). Rethinking internal communication: A stakeholder approach. "), run("Corporate Communications: An International Journal, 12", { italics: true }), run("(2), 177–198. https://doi.org/10.1108/13563280710744847")]),
];

const doc = new Document({
  styles: {
    default: {
      document: { run: { font: FONT, size: SIZE } },
    },
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: {
            top: convertInchesToTwip(1), bottom: convertInchesToTwip(1),
            left: convertInchesToTwip(1), right: convertInchesToTwip(1),
          },
        },
      },
      headers: { default: pageNumHeader },
      children: [...titlePage, ...bodyPages, ...references],
    },
  ],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync("Shood_Internal_Communication_Plan_Foundation.docx", buf);
  console.log("wrote docx");
});
