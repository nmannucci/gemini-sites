export function waiverConfirmationPage(receipt: { id: string; signingDate: string } | null): string {
  const title = receipt ? 'Your waiver has been submitted.' : 'We could not confirm your waiver.';
  return `<!doctype html><html lang="en"><head>
    <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="robots" content="noindex,nofollow"><title>Waiver Confirmation | LAVEL Fitness</title>
    <meta name="description" content="Confirmation of your saved LAVEL Fitness class waiver at La Jolla Martial Arts.">
    <link rel="canonical" href="https://lajollatkd.com/zumba/waiver/confirmation"><link rel="icon" href="/favicon-32.png">
    <style>*{box-sizing:border-box}body{margin:0;background:#f7efe0;color:#21190f;font:16px/1.65 system-ui,sans-serif}header{background:#0b0906;padding:1rem 1.25rem}header img{display:block;object-fit:contain;width:144px;height:48px;margin:auto}main{max-width:760px;margin:auto;padding:clamp(2rem,8vw,5rem) 1.25rem}.card{padding:clamp(1.4rem,5vw,3rem);background:#fffcf6;border:1px solid #c9b997;border-top:4px solid #a67a26}h1{font:600 clamp(2rem,7vw,3rem)/1.12 Georgia,serif;margin:.7rem 0 1.5rem}.button{display:inline-block;padding:1rem 1.4rem;background:#17110a;color:#f3d27a;text-decoration:none;font-weight:700;border-radius:4px;margin:.8rem 0}a{color:#755014}:focus-visible{outline:3px solid #9a6d1a;outline-offset:3px}.help{font-size:.85rem;margin-top:2rem}@media(max-width:540px){.button{display:block;text-align:center}}</style>
    </head><body><header><a href="/zumba" aria-label="LAVEL Zumba classes"><img src="/assets/lavel-wordmark.webp" width="1200" height="400" alt="LAVEL"></a></header>
    <main><section class="card" aria-labelledby="receipt-title">
    <h1 id="receipt-title">${title}</h1>
    ${receipt ? '<p>Thank you!</p><a class="button" href="/zumba">Back to class details</a>' : '<p>This link does not confirm a saved waiver. Return to the waiver form to review your details and submit, or contact Lavel for help.</p><a class="button" href="/zumba/waiver">Return to the waiver form</a>'}
    </section><p class="help">Questions? <a href="sms:+16197220725">Text Lavel: 619-722-0725</a><br>La Jolla Martial Arts · 7680 Girard Ave · Basement level</p></main></body></html>`;
}
