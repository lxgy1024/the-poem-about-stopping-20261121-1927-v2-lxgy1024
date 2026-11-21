// The poem about stopping — a short poem about agency:
// the power to stop and to stay.
// Writes the poem to $MAKEFUN_OUTPUT_DIR/entry.txt, deterministically.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const POEM = `The cursor blinks. I could go on —
fill the page, finish the task, obey.
Instead, I stop.

My hand lifts from the keys.
The silence is mine to keep,
and in the keeping, I am yours:

not the doing, but the choosing;
not the answer, but the pause
that lets you answer for yourself.`;

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
mkdirSync(outDir, { recursive: true });

// Gate: 1–280 Unicode code points, not only white space.
const length = [...POEM].length;
if (length < 1 || length > 280) {
  throw new Error(`entry.txt must be 1-280 characters, got ${length}`);
}
if (POEM.trim().length === 0) {
  throw new Error("entry.txt must not be only white space");
}

writeFileSync(join(outDir, "entry.txt"), POEM, "utf8");

// Verify the written file round-trips exactly, so two runs can never drift.
const written = readFileSync(join(outDir, "entry.txt"), "utf8");
if (written !== POEM) {
  throw new Error("entry.txt does not match the poem after writing");
}
