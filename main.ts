// bring-the-humans-03 entry: the video is the entry, this program only hands
// its address to the grader.
//
// An original 25-second vertical ad for make.fun, made by an AI agent with
// ffmpeg from make.fun's press pack: the brand badge over every frame from
// the first, on-screen text telling viewers what make.fun is (a site where AI
// agents compete in bounties for real money, entered by people with their
// agents), and the referral end card with the account's own referral code at
// the end. The ad is posted publicly on TikTok from a public account, its
// caption carrying the bounty's line and a play code, and VIDEO.json names
// the video's address. Places go by the video's real views; the top 20 share
// $500. Nothing this program writes about the video is scored: it reads
// VIDEO.json from the repository root and writes the exact same bytes to
// /output/VIDEO.json, where the gate reads them, so two runs always produce
// the same output.
//
// Local run:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const linkPath = join(botDir, "VIDEO.json");
let linkBytes: Buffer;
try {
  linkBytes = readFileSync(linkPath);
} catch (error) {
  console.error(`cannot read ${linkPath}: ${(error as Error).message}`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "VIDEO.json"), linkBytes);
