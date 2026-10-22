import { pacificDate, participantAge, validSignature, type Signature } from '../data/zumba-waiver';

export function initWaiverForm(): void {
  const form = document.querySelector<HTMLFormElement>('#waiver-form');
  if (!form) return;
  const error = document.querySelector<HTMLParagraphElement>('#waiver-error')!;
  const progress = document.querySelector<HTMLParagraphElement>('#waiver-progress')!;
  const fields = document.querySelector<HTMLFieldSetElement>('#waiver-fields')!;
  const guardian = document.querySelector<HTMLFieldSetElement>('#guardian-fields')!;
  const dob = form.elements.namedItem('dateOfBirth') as HTMLInputElement;
  const signingDate = document.querySelector<HTMLInputElement>('#signingDate')!;
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  const ageError = document.querySelector<HTMLParagraphElement>('#age-error')!;
  const ageSubmitNotice = document.querySelector<HTMLParagraphElement>('#age-submit-notice')!;
  const requestId = crypto.randomUUID();
  const today = pacificDate(); signingDate.value = today; dob.max = today;
  const fail = (message: string) => { error.textContent = message; error.hidden = false; error.scrollIntoView({ block: 'center', behavior: 'smooth' }); };

  function pad(id: string) {
    const canvas = document.querySelector<HTMLCanvasElement>(`#${id}`)!;
    const ctx = canvas.getContext('2d')!;
    let strokes: Signature = [], active: Array<[number, number]> | null = null;
    const render = () => {
      const rect = canvas.getBoundingClientRect(); if (!rect.width) return;
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.round(rect.width * ratio); canvas.height = Math.round(rect.height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0); ctx.strokeStyle = '#21190f'; ctx.lineWidth = 2.2; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      for (const stroke of strokes) { ctx.beginPath(); stroke.forEach(([x, y], index) => { if (index) ctx.lineTo(x * rect.width, y * rect.height); else ctx.moveTo(x * rect.width, y * rect.height); }); ctx.stroke(); }
    };
    const point = (e: PointerEvent): [number, number] => { const r = canvas.getBoundingClientRect(); return [Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)), Math.max(0, Math.min(1, (e.clientY - r.top) / r.height))]; };
    canvas.addEventListener('pointerdown', (e) => {
      if (fields.disabled || !e.isPrimary || e.button !== 0 || strokes.length >= 200) return;
      e.preventDefault(); canvas.setPointerCapture(e.pointerId); active = [point(e)]; strokes.push(active);
    });
    canvas.addEventListener('pointermove', (e) => {
      if (!active || fields.disabled || !canvas.hasPointerCapture(e.pointerId)) return;
      e.preventDefault();
      if (active.length >= 6000 || strokes.reduce((sum, s) => sum + s.length, 0) >= 12000) return;
      const next = point(e); const last = active[active.length - 1];
      if (Math.hypot(next[0] - last[0], next[1] - last[1]) < .001) return;
      active.push(next); render();
    });
    const end = () => { if (active && active.length < 2) strokes = strokes.filter((s) => s !== active); active = null; render(); };
    canvas.addEventListener('pointerup', end); canvas.addEventListener('pointercancel', end); canvas.addEventListener('lostpointercapture', end);
    document.querySelector<HTMLButtonElement>(`[data-clear="${id}"]`)!.addEventListener('click', () => { strokes = []; active = null; render(); });
    new ResizeObserver(render).observe(canvas);
    return { strokes: () => strokes, aspectRatio: () => canvas.getBoundingClientRect().width / canvas.getBoundingClientRect().height };
  }
  const participantPad = pad('participant-signature'); const guardianPad = pad('guardian-signature');
  const updateGuardian = () => {
    const age = participantAge(dob.value, pacificDate());
    const needsGuardian = age !== null && age >= 16 && age < 18;
    guardian.hidden = !needsGuardian; guardian.disabled = !needsGuardian;
    const tooYoung = age !== null && age < 16;
    ageError.hidden = !tooYoung; ageSubmitNotice.hidden = !tooYoung;
    submit.disabled = tooYoung || fields.disabled;
    dob.setCustomValidity(tooYoung ? 'Participants must be 16 or older to join the Zumba classes.' : '');
    if (tooYoung) dob.setAttribute('aria-invalid', 'true'); else dob.removeAttribute('aria-invalid');
    return age;
  };
  dob.addEventListener('input', updateGuardian);
  dob.addEventListener('change', updateGuardian);
  form.addEventListener('submit', async (e) => {
    e.preventDefault(); if (fields.disabled) return;
    error.hidden = true; const age = updateGuardian(); signingDate.value = pacificDate();
    if (age !== null && age < 16) { dob.focus(); dob.reportValidity(); return; }
    if (!form.checkValidity()) { fail('Your waiver has not been submitted. Please complete all required fields and agree to the waiver.'); form.reportValidity(); return; }
    if (!validSignature(participantPad.strokes())) { fail('Please draw your signature inside the signature box.'); return; }
    if (!guardian.disabled && !validSignature(guardianPad.strokes())) { fail('A parent or guardian must also draw their signature.'); return; }
    const data = Object.fromEntries(new FormData(form));
    const payload = { ...data, requestId, waiverVersion: form.dataset.waiverVersion, photoOptOut: data.photoOptOut === 'on', agreed: data.agreed === 'on', signature: participantPad.strokes(), signatureAspectRatio: participantPad.aspectRatio(), guardianName: data.guardianName || '', guardianSignature: guardian.disabled ? null : guardianPad.strokes(), guardianSignatureAspectRatio: guardian.disabled ? null : guardianPad.aspectRatio() };
    fields.disabled = true; submit.textContent = 'Saving your waiver…'; progress.textContent = 'Saving your signed waiver. Please stay on this page until you see your confirmation.';
    try {
      const res = await fetch('/api/zumba-waiver', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) });
      const result = await res.json() as { ok?: boolean; id?: string; signingDate?: string; confirmationUrl?: string; error?: string };
      if (!res.ok || !result.ok) throw new Error(result.error || 'Could not save your waiver. Please try again.');
      if (!result.confirmationUrl?.startsWith('/zumba/waiver/confirmation?')) throw new Error('Your waiver was saved, but we could not open its confirmation. Please contact Lavel before submitting again.');
      window.location.assign(result.confirmationUrl);
    } catch (err) {
      fields.disabled = false;
      // Reapply the guardian's disabled state after enabling the outer fieldset.
      updateGuardian(); progress.textContent = ''; submit.textContent = 'Sign & Submit Waiver';
      fail(err instanceof Error ? err.message : 'Could not save your waiver. Please try again or text Lavel at 619-722-0725.');
    }
  });
}
