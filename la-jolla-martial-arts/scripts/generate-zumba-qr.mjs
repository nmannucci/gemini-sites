import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import QRCode from 'qrcode';
import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

const url = 'https://lajollatkd.com/zumba/waiver';
const svg = await QRCode.toString(url, { type: 'svg', errorCorrectionLevel: 'M', margin: 4, width: 640 });
await writeFile(new URL('../public/assets/lavel-waiver-qr.svg', import.meta.url), svg);
const png = await QRCode.toDataURL(url, { errorCorrectionLevel: 'M', margin: 4, width: 1200 });
await writeFile(new URL('../public/assets/lavel-waiver-qr.png', import.meta.url), Buffer.from(png.split(',')[1], 'base64'));
const pdf = await PDFDocument.create();
pdf.setTitle('LAVEL Fitness - Sign your class waiver');
pdf.registerFontkit(fontkit);
// Exact families/weights used by the Zumba page, embedded so printing cannot substitute fonts.
const embed = async (name) => pdf.embedFont(await readFile(new URL(`./assets/fonts/${name}`, import.meta.url)), { subset: true });
const font = await embed('Archivo-Regular.ttf');
const bold = await embed('Archivo-Bold.ttf');
const display = await embed('BebasNeue-Regular.ttf');
const page = pdf.addPage([612, 792]);
const gold = rgb(.65, .48, .15), ink = rgb(.043, .035, .024);
const cream = rgb(.969, .937, .878), paleGold = rgb(.953, .824, .478), muted = rgb(.38, .32, .24);
const center = (text, y, size, face = font, color = ink) => page.drawText(text, { x: (612 - face.widthOfTextAtSize(text, size)) / 2, y, size, font: face, color });
const trackedCenter = (text, y, size, spacing, color) => {
  const width = bold.widthOfTextAtSize(text, size) + (text.length - 1) * spacing;
  let x = (612 - width) / 2;
  for (const char of text) { page.drawText(char, { x, y, size, font: bold, color }); x += bold.widthOfTextAtSize(char, size) + spacing; }
};
// All artwork stays inside a 1/3-inch printer margin; the QR keeps its white quiet zone.
page.drawRectangle({ x: 24, y: 24, width: 564, height: 744, color: cream, borderColor: gold, borderWidth: 1 });
page.drawRectangle({ x: 24, y: 630, width: 564, height: 138, color: ink });
const wordmark = await pdf.embedPng(await readFile(new URL('../public/assets/lavel-wordmark-print.png', import.meta.url)));
page.drawImage(wordmark, { x: 181, y: 669, width: 250, height: 250 / 3 });
trackedCenter('ZUMBA / GROUP FITNESS', 648, 10, 2.1, paleGold);
page.drawLine({ start: { x: 24, y: 630 }, end: { x: 588, y: 630 }, color: gold, thickness: 3 });
trackedCenter('BEFORE YOUR FIRST CLASS', 601, 9, 1.4, gold);
center('SIGN YOUR', 554, 55, display);
center('CLASS WAIVER.', 510, 55, display);
center('Scan with your phone camera to get started.', 485, 11, font, muted);
page.drawRectangle({ x: 168, y: 201, width: 276, height: 276, color: rgb(1, 1, 1) });
const image = await pdf.embedPng(png);
page.drawImage(image, { x: 177, y: 210, width: 258, height: 258 });
center('lajollatkd.com/zumba/waiver', 189, 13, bold);
center('Read. Sign with your finger. Submit.', 167, 10, font, muted);
page.drawLine({ start: { x: 156, y: 150 }, end: { x: 456, y: 150 }, color: gold, thickness: .6 });
center('Classes for ages 16+.', 130, 10, bold);
center('Parent or guardian must also sign for ages 16-17.', 115, 9, font, muted);
page.drawRectangle({ x: 24, y: 24, width: 564, height: 68, color: ink });
page.drawLine({ start: { x: 24, y: 92 }, end: { x: 588, y: 92 }, color: gold, thickness: 1.5 });
center('Questions? Text Lavel: 619-722-0725', 64, 11, bold, paleGold);
center('La Jolla Martial Arts / 7680 Girard Ave / Basement level', 44, 9, font, cream);
const pdfPath = fileURLToPath(new URL('../public/assets/lavel-waiver-door-sign.pdf', import.meta.url));
await writeFile(pdfPath, await pdf.save());
// The web/print preview is rendered from this exact PDF, keeping both designs identical.
let fontDirectory;
try {
  const env = { ...process.env };
  // Bundled Poppler on macOS needs an explicit system-font path and writable cache.
  if (process.platform === 'darwin' && !env.FONTCONFIG_FILE) {
    fontDirectory = await mkdtemp(join(tmpdir(), 'lavel-print-fonts-'));
    env.FONTCONFIG_FILE = join(fontDirectory, 'fonts.conf');
    await writeFile(env.FONTCONFIG_FILE, `<?xml version="1.0"?><!DOCTYPE fontconfig SYSTEM "urn:fontconfig:fonts.dtd"><fontconfig><dir>/System/Library/Fonts</dir><dir>/Library/Fonts</dir><cachedir>${fontDirectory}/cache</cachedir></fontconfig>`);
  }
  execFileSync('pdftoppm', ['-singlefile', '-png', '-r', '150', pdfPath, fileURLToPath(new URL('../public/assets/lavel-waiver-door-sign', import.meta.url))], { env });
} finally {
  if (fontDirectory) await rm(fontDirectory, { recursive: true, force: true });
}
console.log(`Generated QR, branded US Letter PDF and matching print preview for ${url}`);
