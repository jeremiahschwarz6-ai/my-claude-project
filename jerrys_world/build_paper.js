const {
  Document, Packer, Paragraph, TextRun, AlignmentType, PageBreak,
  Header, PageNumber, Footer, LevelFormat,
} = require('docx');
const fs = require('fs');

// APA 7 student paper. Times New Roman 12, double-spaced, 1" margins.
const FONT = 'Times New Roman';
const SIZE = 24; // half-points => 12pt

function p(children, opts = {}) {
  return new Paragraph({
    alignment: opts.align || AlignmentType.LEFT,
    spacing: { line: 480, after: 0, before: 0 }, // double spacing
    indent: opts.firstLine ? { firstLine: 720 } : (opts.hanging ? { left: 720, hanging: 720 } : undefined),
    children,
  });
}

function run(text, opts = {}) {
  return new TextRun({ text, font: FONT, size: SIZE, bold: !!opts.bold, italics: !!opts.italics });
}

// running head / page number header (right aligned page number)
const header = new Header({
  children: [new Paragraph({
    alignment: AlignmentType.RIGHT,
    children: [new TextRun({ font: FONT, size: SIZE, children: [PageNumber.CURRENT] })],
  })],
});

// ---- Title page ----
const titlePage = [
  // push title to about 1/3 down the page
  p([run('')]), p([run('')]), p([run('')]),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { line: 480 },
    children: [run('The Biblical Worldview and Its Answers to Five Enduring Questions', { bold: true })],
  }),
  p([run('')], { align: AlignmentType.CENTER }),
  p([run('[Your Full Name]')], { align: AlignmentType.CENTER }),
  p([run('Department of Religion, Liberty University')], { align: AlignmentType.CENTER }),
  p([run('RLGN 104: Christian Life and Biblical Worldview')], { align: AlignmentType.CENTER }),
  p([run('Professor')], { align: AlignmentType.CENTER }),
  p([run('August 31, 2026')], { align: AlignmentType.CENTER }),
  new Paragraph({ children: [new PageBreak()] }),
];

// ---- Part 1 ----
const contentTitle = new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { line: 480 },
  children: [run('The Biblical Worldview and Its Answers to Five Enduring Questions', { bold: true })],
});

const part1Heading = new Paragraph({
  alignment: AlignmentType.LEFT,
  spacing: { line: 480 },
  children: [run('Part 1: What Is a Worldview?', { bold: true })],
});

const part1Body = p([
  run('A worldview is the comprehensive framework of fundamental beliefs and assumptions through which a person interprets reality and orders daily life. Sire (2020) describes it as “a commitment, a fundamental orientation of the heart” that shapes how one understands the basic constitution of reality (p. 20). It functions like a set of lenses, coloring how one perceives origin, purpose, truth, and value. A Biblical Worldview is that framework formed and governed by the truth claims of Scripture, taking the Bible as the authoritative lens for understanding God, humanity, and creation. Félix-Jäger and Shin (2023) present the Christian worldview as a holistic, Spirit-formed vision of reality centered on God, in which faith reshapes every dimension of life rather than remaining a private belief. It is God-centered, coherent, and life-encompassing, treating the triune God as the foundation of all knowledge, meaning, and morality.'),
]);
const part1Count = p([run('141 words', { italics: true })]);

// ---- Part 2 ----
const part2Heading = new Paragraph({
  alignment: AlignmentType.LEFT,
  spacing: { line: 480 },
  children: [run('Part 2: The Biblical Worldview’s Answers to Five Questions', { bold: true })],
});

const q1 = new Paragraph({ spacing: { line: 480 }, children: [run('The Question of Origin', { bold: true, italics: true })] });
const q1b = p([
  run('The Biblical Worldview holds that the universe is neither eternal nor accidental but was created by God, who spoke it into existence. Scripture opens with the declaration that God created the heavens and the earth (Genesis 1:1), and the New Testament affirms that all things were made through the pre-existent Word, Jesus Christ (John 1:3; Colossians 1:16). Humanity did not arise by undirected processes; God formed the first man from the dust and gave him life by His own breath (Genesis 2:7), creating human beings as male and female in His image (Genesis 1:27). Origin is therefore intentional, purposeful, and personal.'),
]);

const q2 = new Paragraph({ spacing: { line: 480 }, children: [run('The Question of Identity', { bold: true, italics: true })] });
const q2b = p([
  run('To be human is to bear the image of God, a status that sets humanity apart from the rest of creation. God made humankind in His own image and likeness and granted them dominion over the animals and the earth (Genesis 1:26–27). The psalmist marvels that God made humans “a little lower than the angels” and crowned them with glory and honor (Psalm 8:5–6). Humans are thus more valuable than other living things, not because of superior strength but because of God-given worth and responsibility. Identity is received from the Creator rather than self-defined, and every person possesses inherent dignity as an image-bearer.'),
]);

const q3 = new Paragraph({ spacing: { line: 480 }, children: [run('The Question of Meaning/Purpose', { bold: true, italics: true })] });
const q3b = p([
  run('Humanity’s purpose is to glorify God and to enjoy a loving relationship with Him. God declares that His people were created for His glory (Isaiah 43:7), and believers are instructed to do everything—even ordinary acts like eating and drinking—for the glory of God (1 Corinthians 10:31). Jesus summarizes the chief human calling as loving God wholeheartedly and loving one’s neighbor as oneself (Matthew 22:37–39). Ultimate meaning is not found in wealth, achievement, or self-fulfillment but in knowing, worshiping, and obeying the Creator. Purpose is therefore relational and God-centered, giving significance to every sphere of human life.'),
]);

const q4 = new Paragraph({ spacing: { line: 480 }, children: [run('The Question of Morality', { bold: true, italics: true })] });
const q4b = p([
  run('In the Biblical Worldview, right and wrong are defined by the holy character and revealed will of God rather than by shifting human opinion. God gave objective moral commands, summarized in the Ten Commandments (Exodus 20:1–17), and He calls people to act justly, love mercy, and walk humbly with Him (Micah 6:8). Because humans are made in God’s image, His moral law is written on the human conscience, so that even those without the written law have an internal witness of right and wrong (Romans 2:14–15). Morality is thus absolute and grounded in God’s unchanging nature, not merely cultural preference or personal feeling.'),
]);

const q5 = new Paragraph({ spacing: { line: 480 }, children: [run('The Question of Destiny', { bold: true, italics: true })] });
const q5b = p([
  run('Human beings are appointed to die once and afterward to face God’s judgment (Hebrews 9:27). Death is not annihilation but a transition to an eternal existence. Those who trust in Jesus Christ receive eternal life and dwell forever in God’s presence (John 3:16; John 14:2–3), while those who reject Him face eternal separation from God (Revelation 20:11–15). Destiny is therefore determined by one’s response to Christ in this life. This hope of resurrection and eternal fellowship with God shapes how believers live and motivates them to share the gospel with gentleness and respect.'),
]);

const part2Count = p([run('495 words', { italics: true })]);

// ---- References ----
const refTitle = new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { line: 480 },
  children: [run('References', { bold: true })],
});
const ref1 = p([
  run('Félix-Jäger, S., & Shin, Y. (2023). '),
  run('Renewing Christian worldview: A holistic approach for Spirit-filled Christians', { italics: true }),
  run('. Baker Academic.'),
], { hanging: true });
const ref2 = p([
  run('Sire, J. W. (2020). '),
  run('The universe next door: A basic worldview catalog', { italics: true }),
  run(' (6th ed.). InterVarsity Press.'),
], { hanging: true });
const ref3 = p([
  run('Zondervan. (2011). '),
  run('Holy Bible: New International Version', { italics: true }),
  run('. (Original work published 1978)'),
], { hanging: true });

const doc = new Document({
  styles: {
    default: {
      document: { run: { font: FONT, size: SIZE } },
    },
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
      },
    },
    headers: { default: header },
    children: [
      ...titlePage,
      contentTitle,
      part1Heading,
      part1Body,
      part1Count,
      part2Heading,
      q1, q1b,
      q2, q2b,
      q3, q3b,
      q4, q4b,
      q5, q5b,
      part2Count,
      new Paragraph({ children: [new PageBreak()] }),
      refTitle,
      ref1, ref2, ref3,
    ],
  }],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(__dirname + '/Biblical_Worldview_Essay.docx', buf);
  console.log('written');
});
