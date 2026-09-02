const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  PageNumber, Header, Footer, TabStopType, TabStopPosition,
} = require("docx");
const fs = require("fs");

// ---- Content: the five worldview answers (these are what the word count covers) ----
const body = {
  origin:
    "The worldview examined in this paper is Hinduism, one of the world’s oldest and most internally diverse religious traditions, which resists any single account of creation (Long, 2024). Rather than a decisive beginning, many Hindu texts present the cosmos as beginningless and cyclical, endlessly created, sustained, and dissolved across immense ages before arising once more (Medhananda, 2025). Underlying and pervading this universe is Brahman, the ultimate and formless reality from which all things proceed. The Rig Veda’s celebrated “Hymn of Creation” even questions whether anyone can truly know how the world arose, treating origins as sacred mystery rather than settled fact (Long, 2024).",
  identity:
    "For Hinduism, the essence of a human being is the atman, an eternal, uncreated self that is ultimately one with Brahman—a unity captured in the Upanishadic teaching tat tvam asi, “that you are” (Long, 2024). Because all living beings share in the same essential self and are bound within the same cycle of rebirth, humans are not categorically more valuable than other creatures; this conviction supports the ethic of ahimsa, or non-harm, toward all life (Lehtonen, 2023). Human birth is nonetheless regarded as rare and precious, since only human beings possess the capacity to pursue liberation.",
  meaning:
    "Human purpose in Hinduism centers on realizing one’s true nature and moving toward moksha, release from bondage and reunion with the divine (Medhananda, 2025). Classical tradition frames life around four legitimate aims, the purusharthas: dharma (duty), artha (prosperity), kama (pleasure), and moksha (liberation), with liberation understood as the highest; to pursue them, individuals fulfill the duties proper to their stage and station in life and may follow paths of knowledge, devotion, or selfless action toward the ultimate goal (Long, 2024).",
  morality:
    "Right and wrong are determined chiefly by dharma, the cosmic and moral order that sustains the universe and prescribes appropriate conduct. Dharma is contextual, varying according to one’s social role (varna) and stage of life (ashrama), and it is articulated in authoritative texts such as the Vedas, the Dharmashastras, and the Bhagavad Gita (Long, 2024). Governing this moral order is the law of karma, by which every action bears fruit, shaping one’s circumstances both in this life and in the lives to come (Lehtonen, 2023).",
  destiny:
    "At death the atman does not perish but is reborn into a new existence, a process called samsara, the cycle of birth, death, and rebirth driven by accumulated karma (Lehtonen, 2023). One’s moral record determines the conditions of the next life, so death is understood as a transition rather than an end. This cycle continues until the self attains moksha and is finally freed from rebirth (Medhananda, 2025)—whether understood as complete absorption into Brahman or as blissful communion with the divine, an interpretation that varies among the Hindu schools (Long, 2024).",
};

// ---- Word count of the five answers ----
const wordCount = Object.values(body)
  .join(" ")
  .split(/\s+/)
  .filter(Boolean).length;
console.log("Body word count:", wordCount);

const TNR = "Times New Roman";
const runOpts = { font: TNR, size: 24 }; // 24 half-points = 12pt

function t(text, opts = {}) {
  return new TextRun({ text, ...runOpts, ...opts });
}

// Double-spaced body paragraph, first-line indent 0.5"
function bodyPara(text) {
  return new Paragraph({
    spacing: { line: 480, after: 0 }, // 480 = double spacing
    indent: { firstLine: 720 },       // 720 DXA = 0.5"
    children: [t(text)],
  });
}

// Centered, bold line (for title-page & headings)
function centerBold(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { line: 480, after: 0 },
    children: [t(text, { bold: true })],
  });
}
function center(text, opts = {}) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { line: 480, after: 0 },
    children: [t(text, opts)],
  });
}
function blank() {
  return new Paragraph({ spacing: { line: 480, after: 0 }, children: [t("")] });
}

// Reference entry with hanging indent
function refPara(children) {
  return new Paragraph({
    spacing: { line: 480, after: 0 },
    indent: { left: 720, hanging: 720 },
    children,
  });
}

const pageHeader = new Header({
  children: [
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      children: [new TextRun({ children: [PageNumber.CURRENT], font: TNR, size: 24 })],
    }),
  ],
});

// ---- Title page (APA 7 student) ----
const titlePage = [
  blank(), blank(), blank(),
  centerBold("The Hindu Worldview: Answering the Five Worldview Questions"),
  blank(),
  center("Jeremiah Schwarz"),
  center("School of Divinity, Liberty University"),
  center("RLGN 104: Christian Life and Biblical Worldview"),
  center("[Instructor Name]"),
  center("September 2, 2026"),
  new Paragraph({ children: [new TextRun({ text: "", break: 1 })], pageBreakBefore: false }),
];

// ---- Content page ----
const content = [
  new Paragraph({
    pageBreakBefore: true,
    alignment: AlignmentType.CENTER,
    spacing: { line: 480, after: 0 },
    children: [t("The Hindu Worldview: Answering the Five Worldview Questions", { bold: true })],
  }),
  bodyPara(body.origin),
  bodyPara(body.identity),
  bodyPara(body.meaning),
  bodyPara(body.morality),
  bodyPara(body.destiny),
  new Paragraph({
    spacing: { line: 480, after: 0 },
    children: [t(`Word Count: ${wordCount}`, { bold: true })],
  }),
];

// ---- References page ----
const references = [
  new Paragraph({
    pageBreakBefore: true,
    alignment: AlignmentType.CENTER,
    spacing: { line: 480, after: 0 },
    children: [t("References", { bold: true })],
  }),
  refPara([
    t("Lehtonen, T. (2023). Belief in karma: The belief-inducing power of a collection of ideas and practices with a long history. "),
    t("Religions, 14", { italics: true }),
    t("(1), Article 52. https://doi.org/10.3390/rel14010052"),
  ]),
  refPara([
    t("Long, J. D. (2024). "),
    t("Discovering Indian philosophy: An introduction to Hindu, Jain and Buddhist thought", { italics: true }),
    t(". Bloomsbury Academic."),
  ]),
  refPara([
    t("Medhananda, S. (2025). "),
    t("Karma and rebirth in Hinduism", { italics: true }),
    t(". Cambridge University Press."),
  ]),
];

const doc = new Document({
  styles: {
    default: {
      document: { run: { font: TNR, size: 24 } },
    },
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 }, // US Letter
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }, // 1"
        },
      },
      headers: { default: pageHeader },
      children: [...titlePage, ...content, ...references],
    },
  ],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(__dirname + "/Hindu_Worldview_Paper.docx", buf);
  console.log("Wrote Hindu_Worldview_Paper.docx");
});
