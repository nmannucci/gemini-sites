// Local QA only: D1 is temporary and ALL outgoing emails/webhooks are mocked.
import { createHarness } from './zumba-harness';
const harness = await createHarness(Number(process.env.ZUMBA_QA_PORT || 8790));
console.log('Local QA preview:', String(await harness.mf.ready));
console.log('Email and GoHighLevel requests are intercepted; nothing is sent externally.');
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, async () => { await harness.mf.dispose(); process.exit(0); });
