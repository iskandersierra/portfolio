/**
 * remove-watermark.mjs
 *
 * Covers a rectangular watermark in the bottom-right corner of an image by
 * sampling the nearby background colour and painting over that region, then
 * converts the result to any output format Sharp supports (WebP, PNG, AVIF…).
 *
 * Usage:
 *   node scripts/remove-watermark.mjs <src> <dst> [options]
 *
 * Arguments:
 *   src            Source image path (any format Sharp accepts)
 *   dst            Output path — output format is inferred from the extension
 *
 * Options:
 *   --patch-w N    Width  of the fill patch in pixels (default: 320)
 *   --patch-h N    Height of the fill patch in pixels (default: 160)
 *   --quality N    Lossy quality for output format, 1-100  (default: 85)
 *   --keep         Keep the source file instead of deleting it after conversion
 *   --help         Print this help and exit
 *
 * Examples:
 *   # Remove Gemini badge, output WebP at default quality, delete PNG source:
 *   node scripts/remove-watermark.mjs public/img/source.png public/img/out.webp
 *
 *   # Larger badge area, AVIF output, keep source:
 *   node scripts/remove-watermark.mjs source.png out.avif --patch-w 400 --patch-h 200 --quality 80 --keep
 */

import sharp from 'sharp';
import { unlink } from 'node:fs/promises';
import { parseArgs } from 'node:util';

// ── CLI parsing ────────────────────────────────────────────────────────────────

const { values: opts, positionals } = parseArgs({
  args: process.argv.slice(2),
  allowPositionals: true,
  options: {
    'patch-w':  { type: 'string', default: '320' },
    'patch-h':  { type: 'string', default: '160' },
    'quality':  { type: 'string', default: '85'  },
    'keep':     { type: 'boolean', default: false },
    'help':     { type: 'boolean', default: false },
  },
});

const HELP = `
Usage: node scripts/remove-watermark.mjs <src> <dst> [options]

Arguments:
  src            Source image path (any format Sharp accepts)
  dst            Output path — format is inferred from the file extension

Options:
  --patch-w N    Width  of the fill patch in pixels (default: 320)
  --patch-h N    Height of the fill patch in pixels (default: 160)
  --quality N    Lossy output quality 1-100             (default: 85)
  --keep         Keep source file after conversion
  --help         Show this help
`.trim();

if (opts.help) {
  console.log(HELP);
  process.exit(0);
}

if (positionals.length < 2) {
  console.error('Error: <src> and <dst> are required.\n');
  console.error(HELP);
  process.exit(1);
}

const [src, dst] = positionals;
const patchW   = parseInt(opts['patch-w'], 10);
const patchH   = parseInt(opts['patch-h'], 10);
const quality  = parseInt(opts['quality'],  10);
const keepSrc  = opts['keep'];

// ── Validate ───────────────────────────────────────────────────────────────────

if ([patchW, patchH, quality].some(Number.isNaN)) {
  console.error('Error: --patch-w, --patch-h, and --quality must be integers.');
  process.exit(1);
}

// ── Process ────────────────────────────────────────────────────────────────────

const meta = await sharp(src).metadata();
const { width, height } = meta;

// Sample a 10×10 block just inside the patch boundary so the fill blends naturally
const sampleX = Math.max(0, width  - patchW - 10);
const sampleY = Math.max(0, height - patchH - 10);

const { data } = await sharp(src)
  .extract({ left: sampleX, top: sampleY, width: 10, height: 10 })
  .raw()
  .toBuffer({ resolveWithObject: true });

const r = data[0], g = data[1], b = data[2];
console.log(`Image:       ${width}×${height}`);
console.log(`Patch:       ${patchW}×${patchH} px, bottom-right corner`);
console.log(`Fill colour: rgb(${r},${g},${b})  (sampled at ${sampleX},${sampleY})`);

const patch = await sharp({
  create: {
    width:      patchW,
    height:     patchH,
    channels:   4,
    background: { r, g, b, alpha: 255 },
  },
}).png().toBuffer();

await sharp(src)
  .composite([{ input: patch, left: width - patchW, top: height - patchH }])
  .toFormat(dst.split('.').pop(), { quality })
  .toFile(dst);

console.log('Written:', dst);

if (!keepSrc) {
  await unlink(src);
  console.log('Deleted:', src);
}
