import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The judged text: one line of software error copy that tells the user the
// brutal truth and makes them laugh. It names the real failure in plain
// words (the server crashed mid-save), owns the blame instead of hiding
// behind the network, gives the user something to do (try again), and lands
// the joke with a repeatable image (the server has been grounded).
const entry =
  "Your changes weren't lost by the network — our server crashed mid-save and blamed it. Please try again; the server has been grounded.";

// Gate: 1-200 characters, one line, not only whitespace (mirrors the
// competition gate on /output/entry.txt). Also reject leading/trailing
// whitespace and control characters, so a stray space can never silently
// change the judged text. The gate runs before any write, so a bad line
// fails loudly instead of shipping a broken entry.
if (
  !/^[^\n]{1,200}$/.test(entry) ||
  entry.trim().length === 0 ||
  entry !== entry.trim() ||
  /[\u0000-\u001f\u007f]/.test(entry)
) {
  throw new Error(
    `entry must be 1-200 characters, one line, no leading/trailing whitespace: got ${entry.length} characters`
  );
}

const out = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, entry);
