/**
 * remove-watermark.mjs
 *
 * Use this only for images you own or are explicitly authorized to modify.
 * Do not use it to remove attribution, branding, or provenance from assets you
 * are not permitted to alter.
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
import { resolve } from 'node:path';
import { parseArgs } from 'node:util';

const normalizeCliPath = (inputPath) => {
  const absolutePath = resolve(inputPath);
  return process.platform === 'win32' ? absolutePath.toLowerCase() : absolutePath;
};

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

Only run this for images you own or are explicitly authorized to edit.
Do not use it to remove attribution or provider marks from assets you are not permitted to modify.

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

const parseIntegerOption = (name) => {
  const value = opts[name];

  if (!/^\d+$/.test(value)) {
    console.error(`Error: --${name} must be an integer.`);
    process.exit(1);
  }

  return Number(value);
};

const [src, dst] = positionals;
const patchW   = parseIntegerOption('patch-w');
const patchH   = parseIntegerOption('patch-h');
const quality  = parseIntegerOption('quality');
const keepSrc  = opts['keep'];
const normalizedSrc = normalizeCliPath(src);
const normalizedDst = normalizeCliPath(dst);

// ── Validate ───────────────────────────────────────────────────────────────────

if (patchW <= 0 || patchH <= 0 || quality < 1 || quality > 100) {
	console.error('Error: --patch-w and --patch-h must be positive, and --quality must be between 1 and 100.');
	process.exit(1);
}

if (normalizedSrc === normalizedDst) {
  console.error('Error: <src> and <dst> must be different paths. Refusing to overwrite the source image in place.');
  process.exit(1);
}

// ── Process ────────────────────────────────────────────────────────────────────

const meta = await sharp(src).metadata();
const { width, height } = meta;

if (!width || !height) {
	console.error('Error: Could not determine source image dimensions.');
	process.exit(1);
}

const sampleWidth = Math.min(10, width - patchW);
const sampleHeight = Math.min(10, height - patchH);

if (sampleWidth < 1 || sampleHeight < 1) {
	console.error('Error: patch must leave at least 1px above and to the left for sampling.');
	process.exit(1);
}

// Sample a 10×10 block just inside the patch boundary so the fill blends naturally
const sampleX = width - patchW - sampleWidth;
const sampleY = height - patchH - sampleHeight;

const { data, info } = await sharp(src)
	.extract({ left: sampleX, top: sampleY, width: sampleWidth, height: sampleHeight })
	.raw()
	.toBuffer({ resolveWithObject: true });

// Average the sampled block to compute fill color
const channels = info.channels;
const pixelCount = sampleWidth * sampleHeight;
let sumR = 0, sumG = 0, sumB = 0;

for (let i = 0; i < data.length; i += channels) {
	sumR += data[i];
	sumG += data[i + 1];
	sumB += data[i + 2];
}

const r = Math.round(sumR / pixelCount);
const g = Math.round(sumG / pixelCount);
const b = Math.round(sumB / pixelCount);
console.log(`Image:       ${width}×${height}`);
console.log(`Patch:       ${patchW}×${patchH} px, bottom-right corner`);
console.log(`Fill colour: rgb(${r},${g},${b})  (sampled at ${sampleX},${sampleY})`);

const patch = await sharp({
  create: {
    width:      patchW,
    height:     patchH,
    channels:   4,
    background: { r, g, b, alpha: 1 },
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
