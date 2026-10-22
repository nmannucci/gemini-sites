import type { PDFFont } from 'pdf-lib';
import { WAIVER_TITLE, type Signature, type SignedWaiver } from '../data/zumba-waiver';

export async function createWaiverPdf(record: SignedWaiver): Promise<Uint8Array> {
  const { PDFDocument, StandardFonts, rgb } = await import('pdf-lib');
  const pdf = await PDFDocument.create();
  pdf.setTitle('Signed LAVEL Fitness participant waiver');
  pdf.setAuthor('LAVEL Fitness');
  pdf.setCreationDate(new Date(record.signedAt));
  pdf.setModificationDate(new Date(record.signedAt));
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const ink = rgb(.12, .1, .07), gold = rgb(.56, .39, .1);
  // Standard PDF fonts cover Western names; the attached UTF-8 record retains all characters.
  const safe = (text: string) => Array.from(text.normalize('NFC')).map((c) => {
    try { font.encodeText(c); return c; } catch { return '?'; }
  }).join('');
  const wrap = (text: string, face: PDFFont, size: number, width: number): string[] => {
    const lines: string[] = []; let line = '';
    for (const word of safe(text).split(/\s+/)) {
      if (face.widthOfTextAtSize(line ? `${line} ${word}` : word, size) <= width) { line = line ? `${line} ${word}` : word; continue; }
      if (line) lines.push(line);
      line = '';
      for (const char of word) {
        if (face.widthOfTextAtSize(line + char, size) > width) { lines.push(line); line = ''; }
        line += char;
      }
    }
    if (line) lines.push(line);
    return lines;
  };
  const page = pdf.addPage([612, 792]);
  let y = 746;
  for (const line of wrap(WAIVER_TITLE, bold, 16, 524)) { page.drawText(line, { x: 44, y, size: 16, font: bold, color: ink }); y -= 21; }
  page.drawText(`Version ${record.waiverVersion} | Signed ${record.signingDate} (Pacific Time)`, { x: 44, y: y - 7, size: 9, font, color: gold });
  y -= 34;
  for (const paragraph of record.waiverText.split('\n').slice(1)) {
    for (const line of wrap(paragraph, font, 10, 524)) { page.drawText(line, { x: 44, y, size: 10, font, color: ink }); y -= 14; }
    y -= 10;
  }
  if (y < 42) throw new Error('Waiver text exceeds its PDF page');
  let details = pdf.addPage([612, 792]); y = 746;
  details.drawText('LAVEL FITNESS | SIGNED PARTICIPANT RECORD', { x: 44, y, size: 14, font: bold, color: ink }); y -= 33;
  const fields = [
    ['Full name', record.fullName], ['Phone', record.phone], ['Email', record.email], ['Date of birth', record.dateOfBirth],
    ['Emergency contact', record.emergencyName], ['Emergency phone', record.emergencyPhone],
    ['Military / veteran', record.militaryVeteran], ['Photo / video opt-out', record.photoOptOut ? "Yes - Please don't show me in photos/videos" : 'No'],
    ['Agreement', 'I have read and agree to the waiver above'], ['Signing date', `${record.signingDate} (Pacific Time)`],
    ['Signed at', record.signedAt], ['Record ID', record.id],
  ];
  for (const [label, value] of fields) {
    const lines = wrap(value, font, 10, 350);
    if (y - lines.length * 13 < 60) { details = pdf.addPage([612, 792]); y = 746; }
    details.drawText(label, { x: 44, y, size: 9, font: bold, color: gold });
    for (const line of lines) { details.drawText(line, { x: 204, y, size: 10, font, color: ink }); y -= 13; }
    y -= 8;
  }
  function signatureBox(signature: Signature, aspectRatio: number, label: string) {
    const labelLines = wrap(label, bold, 10, 524);
    const needed = labelLines.length * 14 + 98 + 45;
    if (y - needed < 45) { details = pdf.addPage([612, 792]); y = 746; }
    for (const line of labelLines) { details.drawText(line, { x: 44, y, size: 10, font: bold, color: ink }); y -= 14; }
    const top = y - 6, h = 98;
    details.drawRectangle({ x: 44, y: top - h, width: 524, height: h, borderWidth: .6, borderColor: gold });
    const width = Math.min(512, 86 * aspectRatio), height = width / aspectRatio;
    const left = 50 + (512 - width) / 2, signatureTop = top - 6 - (86 - height) / 2;
    for (const stroke of signature) for (let i = 1; i < stroke.length; i++) {
      details.drawLine({ start: { x: left + stroke[i - 1][0] * width, y: signatureTop - stroke[i - 1][1] * height }, end: { x: left + stroke[i][0] * width, y: signatureTop - stroke[i][1] * height }, thickness: 1.5, color: ink });
    }
    y = top - h - 25;
  }
  signatureBox(record.signature, record.signatureAspectRatio, 'Participant signature');
  if (record.guardianSignature) signatureBox(record.guardianSignature, record.guardianSignatureAspectRatio!, `Parent / guardian: ${record.guardianName}`);
  const pages = pdf.getPages();
  pages.forEach((p, index) => p.drawText(`${index + 1} / ${pages.length} - Record ${record.id}`, { x: 44, y: 26, size: 8, font, color: gold }));
  return pdf.save();
}
