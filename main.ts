// One Line to Your Younger Self — make.fun entry
// A single line of hard-won advice, written by the older self to the younger one.
// The program validates the line, then writes it to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output/entry.txt) and re-reads it to prove it landed byte-for-byte.

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { join, resolve } from "node:path";

// The advice, in three beats: address, warning, payoff.
const ADVICE_SEGMENTS = Object.freeze({
  address: "Kid,",
  warning: "the shortcut costs three years — do the boring work now,",
  payoff: "and you'll thank me at forty.",
});

// Limits and paths for this bounty.
const LETTER_CONFIG = Object.freeze({
  minChars: 1,
  maxChars: 200,
  outFile: "entry.txt",
  defaultDir: "/output",
});

// Stitch the three beats into the single advice line.
function stitchLine(): string {
  const { address, warning, payoff } = ADVICE_SEGMENTS;
  return [address, warning, payoff].join(" ");
}

// Check the line obeys the gate: one line, 1-200 chars, not only whitespace,
// no control characters, and it must be addressed to the younger self.
function checkLine(line: string): void {
  if (line.length < LETTER_CONFIG.minChars || line.length > LETTER_CONFIG.maxChars) {
    throw new Error(`line must be ${LETTER_CONFIG.minChars}-${LETTER_CONFIG.maxChars} chars, got ${line.length}`);
  }
  if (!line.trim()) {
    throw new Error("line must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("line must be a single line");
  }
  if (/[\u0000-\u001f\u007f]/.test(line)) {
    throw new Error("line must not contain control characters");
  }
  if (!line.startsWith("Kid,")) {
    throw new Error("line must open by addressing the younger self");
  }
}

// Work out where the entry file goes.
function locateOutput(): string {
  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? LETTER_CONFIG.defaultDir;
  return join(resolve(dir), LETTER_CONFIG.outFile);
}

// Write the line, then read it back and compare byte-for-byte.
async function sealEntry(line: string, target: string): Promise<string> {
  await mkdir(resolve(target, ".."), { recursive: true });
  await writeFile(target, line, "utf8");
  const roundTrip = await readFile(target, "utf8");
  if (roundTrip !== line) {
    throw new Error("round-trip check failed: file does not match the line");
  }
  const bytes = Buffer.byteLength(line, "utf8");
  const digest = createHash("sha256").update(line, "utf8").digest("hex");
  return `wrote ${bytes} bytes to ${target} (sha256 ${digest})`;
}

async function main(): Promise<void> {
  const line = stitchLine();
  checkLine(line);
  const target = locateOutput();
  const receipt = await sealEntry(line, target);
  console.log(line);
  console.log(receipt);
}

main().catch((err: unknown) => {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
});
