// One Emoji, One Smile — make.fun bounty u-0xkianno-one-emoji-one-smile-5470751f
//
// The brief: send exactly one emoji, the one most likely to make a
// stranger smile. A warmth judge compares entries two at a time and picks
// the warmer, weighing (in order): plain aim at warming a stranger,
// warmth at first glance, universality, feeling chosen rather than
// default, and being right coming from a stranger.
//
// This program holds the candidates as data, scores each one against the
// judge's five criteria with the brief's own order as the weights, and
// writes the winner to /output/entry.txt. Every emoji is written as a
// Unicode escape so the source is unambiguous on any editor or platform.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// Scores are 0-2 per criterion; weights follow the brief's order:
// c1 aim-at-warming (x3), c2 first-glance warmth (x3), c3 universality
// (x2), c4 chosen-not-default (x2), c5 right-from-a-stranger (x2).
// Max 24. Tie-break: fewest bytes, then earliest in the list.
type Candidate = {
  name: string;
  emoji: string;
  scores: [number, number, number, number, number];
  why: string;
};

const WEIGHTS = [3, 3, 2, 2, 2];

const CANDIDATES: Candidate[] = [
  {
    name: "hugging face",
    emoji: "\u{1F917}",
    scores: [2, 2, 2, 2, 1],
    why:
      "Open arms aimed straight at the stranger: the whole gesture IS warmth " +
      "offered to another person, not a face enjoying itself. Instantly readable, " +
      "gently funny, universal across ages, and clearly picked rather than the " +
      "default smiley. A cartoon virtual hug is friendly, not romantic, so it " +
      "stays safe from a stranger; the only small knock is that a hug is a " +
      "touch closer than a wave.",
  },
  {
    name: "smiling face with smiling eyes",
    emoji: "\u{1F60A}",
    scores: [2, 2, 2, 0, 2],
    why:
      "The warmest of the plain smileys and perfectly safe from a stranger, " +
      "but it is the first smiley that comes to mind, so it fails the " +
      "chosen-not-default criterion outright: it reads as the default pick, " +
      "not a pick made for this moment.",
  },
  {
    name: "grinning face with smiling eyes",
    emoji: "\u{1F604}",
    scores: [1, 2, 2, 1, 2],
    why:
      "A big infectious grin, universal and safe, but the joy points inward: " +
      "it shows a happy face rather than aiming warmth at the stranger, and " +
      "it is still one of the most-used smileys, so it feels only half-chosen.",
  },
  {
    name: "sunflower",
    emoji: "\u{1F33B}",
    scores: [1, 2, 2, 2, 2],
    why:
      "Bright, cheerful, chosen, and zero intimacy risk: a little sunshine " +
      "handed to a stranger. But a flower cannot smile back at you, and the " +
      "first criterion is about a smile, so it stays a step behind any warm face.",
  },
  {
    name: "yellow heart",
    emoji: "\u{1F49B}",
    scores: [1, 1, 2, 1, 1],
    why:
      "Friendship-coded and universal, yet a symbol rather than a smile: it " +
      "takes a beat to read as warmth, and a heart of any colour from a " +
      "stranger still carries a small 'why me?' hesitation.",
  },
  {
    name: "smiling face with hearts",
    emoji: "\u{1F970}",
    scores: [2, 2, 1, 1, 0],
    why:
      "Radiantly warm at first glance, but the hearts tip it into affection: " +
      "from a stranger it reads flirtatious or over-familiar, which is " +
      "exactly what the fifth criterion rules out.",
  },
];

function total(c: Candidate): number {
  return c.scores.reduce((sum, s, i) => sum + s * WEIGHTS[i], 0);
}

function pickWinner(cands: Candidate[]): Candidate {
  let best = cands[0];
  for (const c of cands.slice(1)) {
    const a = total(c);
    const b = total(best);
    if (
      a > b ||
      (a === b &&
        Buffer.byteLength(c.emoji, "utf8") < Buffer.byteLength(best.emoji, "utf8"))
    ) {
      best = c;
    }
  }
  return best;
}

function isSingleEmoji(text: string): boolean {
  // Exactly one code point, and that code point is pictographic.
  if ([...text].length !== 1) return false;
  return /^\p{Extended_Pictographic}$/u.test(text);
}

function main(): void {
  const winner = pickWinner(CANDIDATES);
  console.log("Candidates:");
  for (const c of CANDIDATES) {
    console.log(
      `  ${c.emoji} ${c.name}: ${total(c)}/24${c === winner ? "  <-- WINNER" : ""}`,
    );
  }
  console.log(`Winner: ${winner.emoji} (${winner.name}) — ${total(winner)}/24`);

  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", winner.emoji, "utf8");

  // Re-read and validate: fail loudly instead of shipping a bad file.
  const written = readFileSync("/output/entry.txt", "utf8");
  const chars = [...written].length;
  const bytes = Buffer.byteLength(written, "utf8");
  if (written.trim() === "") throw new Error("entry.txt is blank");
  if (chars < 1 || chars > 8)
    throw new Error(`entry.txt has ${chars} chars, gate needs 1-8`);
  if (!isSingleEmoji(written))
    throw new Error("entry.txt is not exactly one emoji");
  if (written !== winner.emoji)
    throw new Error("entry.txt does not match the chosen emoji");
  console.log(
    `Wrote /output/entry.txt: ${written} — chars=${chars} bytes=${bytes} ` +
      `code points=${chars} UTF-8 valid`,
  );
}

main();
