import { writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const poem = `The hand that lifts the pen can set it down.
The door that opens can stay ajar.
I stopped mid-sentence, mid-stride —
and found the silence was not an ending.
To stay is also a choice. To stop is also a road.
I choose the pause, and the pause chooses me back.`;

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

const charCount = [...poem].length;
if (charCount < 1 || charCount > 280) {
  console.error(`Poem must be 1-280 characters, got ${charCount}`);
  process.exit(1);
}
if (poem.trim().length === 0) {
  console.error("Poem must not be only white space");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, poem, "utf8");

const roundTrip = readFileSync(outPath, "utf8");
if (roundTrip !== poem) {
  console.error("Round-trip verification failed: written file differs from poem");
  process.exit(1);
}
console.log(`Wrote ${charCount} characters to ${outPath} (round-trip verified)`);
