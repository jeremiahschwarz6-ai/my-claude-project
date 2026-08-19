const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  PageNumber, Header, Footer, LevelFormat, Tab, TabStopType, TabStopPosition,
} = require("docx");
const fs = require("fs");

const FONT = "Times New Roman";
const SIZE = 24; // 12pt (half-points)
const DOUBLE = { line: 480, lineRule: "auto" }; // double spacing

// Helper: a normal double-spaced body paragraph
function body(text, opts = {}) {
  return new Paragraph({
    spacing: DOUBLE,
    indent: opts.firstLine ? { firstLine: 720 } : undefined,
    alignment: opts.align || AlignmentType.LEFT,
    children: [new TextRun({ text, font: FONT, size: SIZE, bold: opts.bold })],
  });
}

// Helper: a run-based paragraph (mixed formatting)
function runs(children, opts = {}) {
  return new Paragraph({
    spacing: DOUBLE,
    indent: opts.firstLine ? { firstLine: 720 } : undefined,
    alignment: opts.align || AlignmentType.LEFT,
    children,
  });
}

function tr(text, opts = {}) {
  return new TextRun({ text, font: FONT, size: SIZE, bold: opts.bold, italics: opts.italics });
}

const pageNumberHeader = new Header({
  children: [
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      children: [new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: SIZE })],
    }),
  ],
});

// ---------- TITLE PAGE ----------
const titlePage = [
  new Paragraph({ spacing: { before: 0, after: 0, ...DOUBLE }, children: [tr("")] }),
  new Paragraph({ spacing: DOUBLE, children: [tr("")] }),
  new Paragraph({ spacing: DOUBLE, children: [tr("")] }),
  new Paragraph({ spacing: DOUBLE, children: [tr("")] }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: DOUBLE,
    children: [tr("Artificial Intelligence as a Crisis Communication Partner: Generating and", { bold: true })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: DOUBLE,
    children: [tr("Evaluating an Internal Employee Memo for a Data Breach", { bold: true })],
  }),
  new Paragraph({ spacing: DOUBLE, children: [tr("")] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: DOUBLE, children: [tr("Jeremiah Schwarz")] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: DOUBLE, children: [tr("Department of Strategic Communication")] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: DOUBLE, children: [tr("STCO 372: Crisis Communication")] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: DOUBLE, children: [tr("Professor")] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: DOUBLE, children: [tr("August 19, 2026")] }),
];

// ---------- SECTION 1: AI-GENERATED INTERNAL MEMO ----------
const memoSection = [
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: DOUBLE,
    children: [tr("AI-Generated Internal Employee Memo", { bold: true })],
    heading: HeadingLevel.HEADING_1,
  }),
  new Paragraph({
    spacing: DOUBLE,
    children: [tr("Prompt provided to the large language model (ChatGPT): ", { bold: true }),
      tr("“You are the internal communications lead for Meridian Health Systems, a mid-sized regional healthcare provider. We have just confirmed a data breach. Draft an internal memo to all employees. Tone: calm, transparent, and empathetic. Key facts: unauthorized access to an employee database was detected on August 18; names, Social Security numbers, and direct-deposit banking information for current staff may be affected; the affected server has been isolated; law enforcement and a forensic firm have been engaged; free credit monitoring will be offered. Goal: inform employees quickly, reduce panic, give clear next steps, and preserve trust. Keep it under 400 words.”", { italics: true })],
  }),
  new Paragraph({ spacing: DOUBLE, children: [tr("———", { bold: true })], alignment: AlignmentType.CENTER }),
  // Memo header block
  runs([tr("MEMORANDUM", { bold: true })], { align: AlignmentType.CENTER }),
  runs([tr("TO: ", { bold: true }), tr("All Meridian Health Systems Employees")]),
  runs([tr("FROM: ", { bold: true }), tr("Dana Whitfield, Chief Executive Officer")]),
  runs([tr("DATE: ", { bold: true }), tr("August 19, 2026")]),
  runs([tr("RE: ", { bold: true }), tr("Important Update Regarding a Data Security Incident")]),
  new Paragraph({ spacing: DOUBLE, children: [tr("")] }),
  body("Team,"),
  body("I am writing to inform you directly and promptly about a serious matter. On August 18, 2026, our security team detected unauthorized access to an internal database that stores employee records. I want you to hear this from me first, and I want to be clear about what we know, what we are doing, and how we will support you."),
  body("Based on our review so far, the affected system contained employee information that may include names, Social Security numbers, and direct-deposit banking details. We have not confirmed that this information has been misused, but we are treating it with the seriousness it deserves. As soon as the intrusion was detected, we isolated the affected server, engaged an independent cybersecurity forensics firm, and notified federal law enforcement. Our investigation is active and ongoing."),
  body("Protecting you is our priority. In the coming days, the company will provide every current employee with two years of free credit monitoring and identity-protection services, along with step-by-step enrollment instructions. In the meantime, we encourage you to monitor your bank and credit-card statements and to report anything unusual."),
  body("I recognize that news like this is unsettling, and I am sorry for the worry it may cause you and your families. You have trusted us with your personal information, and we take the responsibility of protecting it seriously. We are committed to keeping you informed with honest, timely updates as our investigation continues — even when we do not yet have every answer."),
  body("A dedicated employee support line (1-800-555-0199) and email inbox (security-support@meridianhealth.example) are now open to answer your questions. A virtual all-staff briefing will be held tomorrow at 10:00 a.m., with a recording available afterward for those who cannot attend."),
  body("Thank you for your patience, your professionalism, and your continued care for the patients who depend on us. We will get through this together."),
  new Paragraph({ spacing: DOUBLE, children: [tr("")] }),
  body("With respect and gratitude,"),
  body("Dana Whitfield"),
  body("Chief Executive Officer, Meridian Health Systems"),
];

// ---------- SECTION 2: ANALYSIS ----------
const analysisSection = [
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: DOUBLE,
    children: [tr("Analysis: AI as a Crisis Communication Partner", { bold: true })],
    heading: HeadingLevel.HEADING_1,
  }),
  runs([
    tr("Effective crisis communication depends on being timely, consistent, clear, and empathetic (Chapter 10), and the AI-generated memo demonstrates why large language models have become valuable drafting partners. The model’s greatest strength is "),
    tr("speed", { bold: true }),
    tr(". Within seconds it produced a structured, publishable first draft — the single most difficult hurdle in the “golden hour” of a crisis, when a communication vacuum invites rumor and speculation. The output was also "),
    tr("clear and consistent", { bold: true }),
    tr(": it followed a logical arc (what happened, what we know, what we are doing, what you should do), used plain language over jargon, and maintained one calm, authoritative voice that could be reused across channels to keep messaging aligned."),
  ], { firstLine: true }),
  runs([
    tr("The AI also handled "),
    tr("tone", { bold: true }),
    tr(" competently, opening with transparency and closing with an apology and reassurance. Consistency is another documented best practice, and the draft’s single, unified voice makes it easy to keep every channel — email, the all-staff briefing, and the support line — telling the same story. Yet this is precisely where "),
    tr("human oversight becomes critical", { bold: true }),
    tr(". AI simulates empathy by pattern-matching sympathetic phrasing; it does not feel remorse or accountability. Employees can often sense the difference between genuine leadership contrition and formulaic reassurance, and misjudged sincerity can deepen distrust rather than repair it. A leader must personalize the message, verify that the promised support (credit monitoring, timelines, hotlines) is real and deliverable, and ensure the apology reflects authentic organizational ownership."),
  ], { firstLine: true }),
  runs([
    tr("Legal and factual nuance is a second area demanding human review. The model confidently stated specific facts — which data fields were affected, that law enforcement was engaged, a two-year monitoring offer — but an LLM cannot know these details and may "),
    tr("hallucinate", { bold: true }),
    tr(" plausible-sounding specifics. In a real breach, premature or inaccurate disclosures can trigger regulatory liability under laws such as HIPAA or state breach-notification statutes. Legal counsel, HR, and IT security must verify every factual claim before release."),
  ], { firstLine: true }),
  runs([
    tr("Finally, the "),
    tr("ethical limitations", { bold: true }),
    tr(" are significant. AI has no accountability, no confidentiality guarantee if sensitive facts are entered into a public tool, and no capacity for moral judgment about how much to disclose and when. It should therefore be treated as a "),
    tr("first-draft accelerator, not a decision-maker", { bold: true }),
    tr(". It can also over-reassure — smoothing over uncertainty an organization is legally obligated to acknowledge. The optimal model is collaborative: AI supplies speed, structure, and clarity, while humans supply verified facts, legal compliance, ethical judgment, and the genuine sincerity that no algorithm can manufacture. Used this way, AI strengthens a crisis response; used unsupervised, it risks amplifying the very harm it was meant to contain."),
  ], { firstLine: true }),
];

// ---------- REFERENCES ----------
const referencesSection = [
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: DOUBLE,
    children: [tr("References", { bold: true })],
    heading: HeadingLevel.HEADING_1,
  }),
  new Paragraph({
    spacing: DOUBLE,
    indent: { hanging: 720, left: 720 },
    children: [
      tr("OpenAI. (2026). "),
      tr("ChatGPT ", { italics: true }),
      tr("(August 19 version) [Large language model]. https://chat.openai.com"),
    ],
  }),
];

const doc = new Document({
  styles: {
    default: {
      document: { run: { font: FONT, size: SIZE } },
    },
    paragraphStyles: [
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { font: FONT, size: SIZE, bold: true },
        paragraph: { spacing: DOUBLE, alignment: AlignmentType.CENTER },
      },
    ],
  },
  sections: [
    // Title page (no header page number visible per common APA student style; APA 7 does show page number, keep it)
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
        },
      },
      headers: { default: pageNumberHeader },
      children: titlePage,
    },
    // Body
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
        },
      },
      headers: { default: pageNumberHeader },
      children: [...memoSection, ...analysisSection, ...referencesSection],
    },
  ],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync("AI_Crisis_Communication_Memo_Analysis.docx", buf);
  console.log("Document written.");
});
