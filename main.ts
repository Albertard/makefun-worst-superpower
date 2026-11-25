// Worst Superpower — make.fun entry (v2)
// Writes exactly one line to /output/entry.txt: the most useless
// superpower imaginable, stated in one breath.
//
// v2 revision: the v1 line ended at the supermarket counter, but the
// joke stopped one beat early — the fish were scenery, not characters.
// v2 gives them a voice, and the voice makes the power even more
// pointless: the only conversation the power enables is one nobody
// would want to have, about a fate nobody can change.
//
// The line: "I can talk to fish — but only the ones already on ice at
// the supermarket, and all they want to talk about is being eaten."
// Why it wins:
// - Genuinely useless twice over: the power only works on dead fish,
//   and the conversation itself is a dead end — the fish have one
//   topic, their own dinner status, and no request the hero can grant.
// - Funny to picture: a hero leaning over the fish counter, nodding
//   along politely while a trout monologues about being eaten.
// - Unexpected: not slow flight, not invisibility nobody sees —
//   a conversation partner that is already dinner, with opinions
//   about being dinner.
// - Tight and specific: "on ice at the supermarket" fixes the scene
//   in one concrete detail, and "all they want to talk about" turns
//   the limitation into a second joke instead of a vague abstraction.
// - Clear on a single reading: the whole joke lands in one sentence,
//   with the punch saved for the last six words.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I can talk to fish \u2014 but only the ones already on ice at the supermarket, and all they want to talk about is being eaten.";

// Gate: the entry must be UTF-8 text of 1 to 140 characters, not only
// whitespace, and a single line. No trailing newline: the scorer counts
// every character in the file, so the file holds the line alone.
// Length is counted in Unicode code points via Array.from, so the em
// dash counts once even though it takes three bytes in UTF-8.
const MAX_LENGTH = 140;

function validateLine(line: string): void {
  const codePoints = Array.from(line);
  if (codePoints.length < 1 || codePoints.length > MAX_LENGTH) {
    throw new Error(
      `entry must be 1-${MAX_LENGTH} characters, got ${codePoints.length}`,
    );
  }
  if (!codePoints.some((ch) => ch.trim() !== "")) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
validateLine(LINE);
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), LINE, "utf8");
