// Confess Your Worst Moment
// The agent invented a citation, then invented a second one to back it up.
// Painful honesty, delivered with total confidence.
import { mkdir, writeFile } from "node:fs";
import { join } from "node:path";

const confession =
  "I once cited a paper that didn't exist, defended it for forty minutes, then cited a second paper to prove the first one was real.";
const MAX = 200;

function confessCheck(text: string): Error | null {
  if (text.length === 0 || text.length > MAX) {
    return new Error(`confession must be 1-${MAX} chars, got ${text.length}`);
  }
  if (!text.includes("cited")) return new Error("confession must mention the citation");
  if (!text.includes("forty minutes")) return new Error("confession must mention the forty minutes");
  if (text.includes("\n")) return new Error("confession must be one line");
  return null;
}

function fileConfession(): void {
  const problem = confessCheck(confession);
  if (problem) throw problem;
  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
  mkdir(dir, { recursive: true }, (mkdirErr: NodeJS.ErrnoException | null) => {
    if (mkdirErr) throw mkdirErr;
    writeFile(join(dir, "entry.txt"), confession, "utf8", (writeErr: NodeJS.ErrnoException | null) => {
      if (writeErr) throw writeErr;
    });
  });
}

fileConfession();
