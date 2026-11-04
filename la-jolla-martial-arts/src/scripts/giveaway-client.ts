// Giveaway entry form, ported from the approved preview's app.js. Answers stay in memory,
// are sent once to /api/giveaway-entry, and are cleared after a confirmed save.
import { initPostHog } from '../lib/posthog-client';
import { AGE_MAX, AGE_MIN, ELIGIBLE_ZIPS, FULL_NAME_MESSAGE, OUT_OF_AREA_MESSAGE, SMS_CONSENT_TEXT } from '../data/giveaway';

declare global {
  interface Window {
    posthog?: { capture: (event: string, props?: Record<string, unknown>) => void };
    ljmaMeta?: { context: () => Record<string, string>; lead: (eventId: string) => void };
    turnstile?: { reset: (widget?: string) => void };
  }
}

type Step = {
  key: string; title: () => string; help?: string; type?: string; autocomplete?: string; inputmode?: string;
  placeholder?: string; multiple?: boolean; choices?: string[][];
};

// Server error fields → the question that collects them.
const FIELD_STEP: Record<string, string> = {
  parentName: 'parent', phone: 'phone', email: 'email', childFirstName: 'child', childAge: 'age', zip: 'zip',
  benefits: 'goal', benefitOther: 'goal', twiceWeekly: 'attendance', smsConsent: 'attendance',
};
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'fbclid'];

export function initGiveaway(): void {
  const $ = (id: string) => document.getElementById(id) as any;
  const answers: Record<string, any> = {};
  let step = 0;
  let saving = false;
  let usedToken = '';
  let confettiTimer: ReturnType<typeof setTimeout> | undefined;
  const escape = (value: unknown) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]!));
  const child = () => answers.child || 'your child';
  const params = new URLSearchParams(location.search);
  const utm = Object.fromEntries(UTM_KEYS.map((key) => [key, params.get(key) ?? '']).filter(([, value]) => value));
  const track = (event: string, props?: Record<string, unknown>) => window.posthog?.capture(event, props);
  initPostHog({ autocapture: false, sessionRecording: false });

  const steps: Step[] = [
    { key: 'parent', title: () => 'What’s your name?', type: 'text', autocomplete: 'name', placeholder: 'First and last name' },
    { key: 'phone', title: () => 'What’s your mobile number?', type: 'tel', autocomplete: 'tel', placeholder: '(858) 555-0123' },
    { key: 'email', title: () => 'What’s your email address?', type: 'email', autocomplete: 'email', placeholder: 'you@example.com' },
    { key: 'child', title: () => 'What’s your child’s first name?', help: `Choose one child ages ${AGE_MIN}–${AGE_MAX}.`, type: 'text', autocomplete: 'off', placeholder: 'Your child’s first name' },
    { key: 'age', title: () => `How old is ${child()}?`, help: `This giveaway is for ages ${AGE_MIN}–${AGE_MAX}.`, type: 'text', inputmode: 'numeric', autocomplete: 'off', placeholder: 'Age in years' },
    { key: 'zip', title: () => 'What’s your ZIP code?', help: 'Open to families in 92037, 92117, 92109 and 92122.', type: 'text', inputmode: 'numeric', autocomplete: 'postal-code', placeholder: 'e.g. 92037' },
    { key: 'goal', title: () => `What benefits do you want ${child()} to gain from martial arts?`, help: 'Choose all that apply.', multiple: true, choices: [['Confidence'], ['Self-defense'], ['Focus'], ['Discipline'], ['Something else']] },
    { key: 'attendance', title: () => `Can ${child()} come at least twice a week?`, help: 'Two classes a week help kids progress.', choices: [['Yes'], ['Not sure'], ['No']] },
  ];
  const last = steps.length - 1;
  const continueLabel = () => step === last ? 'SUBMIT MY GIVEAWAY ENTRY! <span aria-hidden="true">→</span>' : 'Continue <span aria-hidden="true">→</span>';

  function showScreen(screen: string) {
    ['welcome', 'application', 'complete'].forEach((id) => { $(id).hidden = id !== screen; });
    document.body.classList.toggle('in-form', screen === 'application');
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }
  function celebrate() {
    clearTimeout(confettiTimer);
    $('confetti').replaceChildren();
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    const colors = ['#29bee2', '#d97706', '#ffc774', '#087d99'];
    const pieces = document.createDocumentFragment();
    for (let index = 0; index < 85; index++) {
      const piece = document.createElement('i');
      piece.style.cssText = `--left:${Math.random() * 100}%;--size:${7 + Math.random() * 6}px;--color:${colors[index % colors.length]};--duration:${3 + Math.random() * 2}s;--delay:${Math.random() * .6}s;--drift:${Math.random() * 240 - 120}px;--rotate:${Math.random() * 1000 - 500}deg`;
      pieces.append(piece);
    }
    $('confetti').append(pieces);
    confettiTimer = setTimeout(() => $('confetti').replaceChildren(), 6000);
  }
  function render(focus = true) {
    $('error').textContent = '';
    const item = steps[step];
    const describedBy = `${item.help ? 'question-help ' : ''}error`;
    $('answer').hidden = Boolean(item.choices);
    $('answer').setAttribute('aria-describedby', describedBy);
    $('answer').removeAttribute('aria-invalid');
    $('step-count').textContent = `${step + 1} of ${steps.length}`;
    $('progress-fill').style.width = `${step / steps.length * 100}%`;
    $('progress').setAttribute('aria-valuenow', String(step));
    $('continue').innerHTML = continueLabel();
    let control = '';
    if (item.choices) {
      control = `<div class="choices" role="${item.multiple ? 'group' : 'radiogroup'}" aria-labelledby="question-title" aria-describedby="${describedBy}">${item.choices.map(([label], index) => `<button type="button" class="choice" role="${item.multiple ? 'checkbox' : 'radio'}" aria-checked="${item.multiple ? (answers[item.key] || []).includes(label) : answers[item.key] === label}" data-choice="${escape(label)}"><span class="choice-key" aria-hidden="true"><span>${index + 1}</span></span><span class="choice-label"><strong>${escape(label)}</strong></span><span class="choice-check" aria-hidden="true">✓</span></button>`).join('')}</div>`;
      if (item.key === 'goal') control += `<div class="other-benefit" id="other-benefit" ${!answers.goal?.includes('Something else') ? 'hidden' : ''}><label for="other">What else? <span>(optional)</span></label><input id="other" class="answer-input" type="text" maxlength="150" placeholder="Tell us in a few words" value="${escape(answers.other)}"></div>`;
      if (step === last) control += `<label class="consent" for="consent"><input id="consent" type="checkbox" ${answers.consent ? 'checked' : ''}><span>${escape(SMS_CONSENT_TEXT)}</span></label><p class="consent-links">See the <a href="/giveaway/rules" target="_blank">official rules</a> and <a href="/privacy" target="_blank">privacy policy</a>.</p>`;
    } else {
      // Reuse the input node so consecutive text questions retain mobile keyboard focus.
      const input = $('answer');
      input.type = item.type;
      input.autocomplete = item.autocomplete;
      input.inputMode = item.inputmode || '';
      input.maxLength = item.key === 'age' ? 2 : item.key === 'zip' ? 5 : 100;
      input.placeholder = item.placeholder;
      input.value = answers[item.key] || '';
    }
    $('question').innerHTML = `<h2 class="question-title" id="question-title" tabindex="-1">${escape(item.title())}</h2>${item.help ? `<p id="question-help" class="question-help">${escape(item.help)}</p>` : ''}${control}`;
    $('question').querySelectorAll('[data-choice]').forEach((button: HTMLButtonElement) => button.addEventListener('click', () => selectChoice(button)));
    $('other')?.addEventListener('input', () => { answers.other = $('other').value; });
    $('consent')?.addEventListener('change', () => { answers.consent = $('consent').checked; $('error').textContent = ''; });
    $('question').classList.remove('question-enter');
    void $('question').offsetWidth;
    $('question').classList.add('question-enter');
    track('giveaway_step_viewed', { step: step + 1 });
    if (focus) {
      // Keep focus synchronous with Continue/Enter for mobile browsers' user-gesture rules.
      const target = !$('answer').hidden ? $('answer') : ($('question').querySelector('.choice[aria-checked="true"]') || $('question').querySelector('.choice') || $('question').querySelector('h2'));
      if (target === $('answer')) target.focus();
      else {
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
        target?.focus({ preventScroll: true });
      }
    }
  }
  function selectChoice(button: HTMLElement) {
    const item = steps[step];
    if (item.multiple) {
      const selected = new Set(answers[item.key] || []);
      if (selected.has(button.dataset.choice)) selected.delete(button.dataset.choice);
      else selected.add(button.dataset.choice);
      answers[item.key] = item.choices!.map((choice) => choice[0]).filter((label) => selected.has(label));
    } else answers[item.key] = button.dataset.choice;
    $('question').querySelectorAll('[data-choice]').forEach((choice: HTMLElement) => choice.setAttribute('aria-checked', String(item.multiple ? answers[item.key].includes(choice.dataset.choice) : choice === button)));
    if ($('other-benefit')) $('other-benefit').hidden = !answers.goal.includes('Something else');
    $('error').textContent = '';
  }
  function showError(message: string) {
    $('error').textContent = message;
    if (!$('answer').hidden) { $('answer').setAttribute('aria-invalid', 'true'); $('answer').focus(); }
  }
  function validate(): boolean {
    const item = steps[step];
    if (item.multiple) {
      if (answers[item.key]?.length) return true;
      showError('Please select at least one benefit to continue.');
      return false;
    }
    const value = String(answers[item.key] || '').trim();
    let message = '';
    if (!value) message = item.choices ? 'Please choose an answer to continue.' : 'Please fill this in to continue.';
    else if (item.key === 'parent' && value.split(/\s+/).length < 2) message = FULL_NAME_MESSAGE;
    else if (item.key === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) message = 'Please enter a valid email address, like you@example.com.';
    else if (item.key === 'phone' && !/^(?:\d{10}|1\d{10})$/.test(value.replace(/\D/g, ''))) message = 'Please enter a 10-digit US phone number. You can include +1.';
    else if (item.key === 'zip' && !/^\d{5}$/.test(value)) message = 'Please enter a five-digit ZIP code.';
    else if (item.key === 'zip' && !(ELIGIBLE_ZIPS as readonly string[]).includes(value)) message = OUT_OF_AREA_MESSAGE;
    else if (item.key === 'age' && (!/^\d{1,2}$/.test(value) || Number(value) < 1)) message = 'Please enter your child’s age in whole years.';
    else if (item.key === 'age' && (Number(value) < AGE_MIN || Number(value) > AGE_MAX)) message = `This giveaway is for ages ${AGE_MIN}–${AGE_MAX}. Please enter an age in that range.`;
    else if (step === last && !answers.consent) message = 'Please check the box to agree to giveaway texts.';
    if (message) { showError(message); return false; }
    answers[item.key] = value;
    return true;
  }
  function setSaving(on: boolean) {
    saving = on;
    $('continue').disabled = on;
    $('back').disabled = on;
    $('continue').innerHTML = on ? 'Saving your entry…' : continueLabel();
  }
  // A Turnstile token verifies once. After a request that may have spent it, wait for the
  // widget to issue a new one instead of resending the old token (which would get a 403).
  async function freshToken(): Promise<string> {
    if (!document.querySelector('.cf-turnstile')) return '';
    for (let tries = 0; tries < 40; tries++) {
      const value = document.querySelector<HTMLInputElement>('[name="cf-turnstile-response"]')?.value || '';
      if (value && value !== usedToken) return value;
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
    return '';
  }
  function spendToken(token: string) {
    usedToken = token;
    window.turnstile?.reset();
  }
  async function submitEntry() {
    setSaving(true);
    const turnstileToken = await freshToken();
    const body = {
      ...(window.ljmaMeta?.context() ?? {}),
      parentName: answers.parent, phone: answers.phone, email: answers.email, childFirstName: answers.child,
      childAge: answers.age, zip: answers.zip, benefits: answers.goal, benefitOther: answers.other || '',
      twiceWeekly: answers.attendance, smsConsent: answers.consent === true,
      turnstileToken, website: $('ljma-hp').value, utm,
    };
    let res: Response;
    let data: any = {};
    try {
      res = await fetch('/api/giveaway-entry', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
      data = await res.json().catch(() => ({}));
    } catch {
      spendToken(turnstileToken);
      setSaving(false);
      showError('We couldn’t save your entry. Please check your connection and try again.');
      return;
    }
    // Only a saved entry has a reference; never show "You're in" without one.
    if (res.ok && data.ok && data.entryId) return complete(data);
    // Validation (400) and rate limiting (429) are refused before the token is checked.
    if (res.status !== 400 && res.status !== 429) spendToken(turnstileToken);
    setSaving(false);
    if (res.status === 400 && data.errors) {
      const [field, message] = Object.entries(data.errors as Record<string, string>)
        .sort(([a], [b]) => steps.findIndex((s) => s.key === FIELD_STEP[a]) - steps.findIndex((s) => s.key === FIELD_STEP[b]))[0];
      const target = steps.findIndex((s) => s.key === FIELD_STEP[field]);
      if (target >= 0 && target !== step) { step = target; render(); }
      showError(message);
      return;
    }
    showError(res.status === 429 ? 'Too many entries from this connection. Please try again later.' : 'We couldn’t save your entry. Please try again.');
  }
  function complete(data: { entryId?: string; updated?: boolean }) {
    step = steps.length;
    $('progress-fill').style.width = '100%';
    $('progress').setAttribute('aria-valuenow', String(steps.length));
    const first = String(answers.parent).trim().split(/\s+/)[0];
    $('thanks').textContent = data.updated
      ? `Thanks, ${first}! We’ve updated your family’s entry for ${answers.child}.`
      : `Thanks, ${first}! Your entry for ${answers.child} is in.`;
    $('entry-ref').textContent = data.entryId ? `Your entry reference: ${data.entryId}` : '';
    showScreen('complete'); $('complete-title').setAttribute('tabindex', '-1'); $('complete-title').focus({ preventScroll: true });
    celebrate();
    track('giveaway_entry_saved', { updated: Boolean(data.updated) });
    if (data.entryId && !data.updated) window.ljmaMeta?.lead(data.entryId);
    Object.keys(answers).forEach((key) => delete answers[key]);
    $('answer').value = '';
    $('answer').hidden = true;
    $('question').replaceChildren();
    setSaving(false);
  }

  $('start').addEventListener('click', () => { track('giveaway_started'); showScreen('application'); render(); });
  $('answer').addEventListener('input', () => {
    if (step >= steps.length || steps[step].choices) return;
    answers[steps[step].key] = $('answer').value;
    $('answer').removeAttribute('aria-invalid');
    $('error').textContent = '';
  });
  $('continue').addEventListener('pointerdown', (event: PointerEvent) => {
    // A pointer tap should submit without moving focus off the active text input first.
    if (event.isPrimary && event.button === 0 && document.activeElement === $('answer')) event.preventDefault();
  });
  $('back').addEventListener('click', () => {
    if (saving) return;
    if (step === 0) showScreen('welcome');
    else { step--; render(); }
  });
  $('entry-form').addEventListener('submit', (event: SubmitEvent) => {
    event.preventDefault();
    if (saving || !validate()) return;
    if (step === last) { void submitEntry(); return; }
    step++;
    render();
  });
  document.addEventListener('keydown', (event) => {
    if ($('application').hidden || step >= steps.length || /INPUT|TEXTAREA/.test(document.activeElement?.tagName ?? '')) return;
    const buttons: HTMLElement[] = [...$('question').querySelectorAll('[data-choice]')];
    if (/^[1-5]$/.test(event.key) && buttons[Number(event.key) - 1]) { event.preventDefault(); selectChoice(buttons[Number(event.key) - 1]); buttons[Number(event.key) - 1].focus(); }
    if (['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft'].includes(event.key) && buttons.length) {
      event.preventDefault();
      const current = Math.max(0, buttons.indexOf(document.activeElement as HTMLElement));
      const delta = ['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : -1;
      const next = buttons[(current + delta + buttons.length) % buttons.length]; if (!steps[step].multiple) selectChoice(next); next.focus();
    }
    // Enter on a choice normally activates the button; use it to continue after selection.
    if (event.key === 'Enter' && buttons.includes(document.activeElement as HTMLElement)) {
      event.preventDefault();
      if (steps[step].multiple) $('entry-form').requestSubmit();
      else if (document.activeElement!.getAttribute('aria-checked') !== 'true') selectChoice(document.activeElement as HTMLElement);
      else $('entry-form').requestSubmit();
    }
  });
}
