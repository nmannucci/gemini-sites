import posthog from 'posthog-js';

const SITE = 'bbt' as const;

function trimLabel(el: Element): string {
  return (el.textContent || '').replace(/\s+/g, ' ').trim();
}

function isBookingCta(el: HTMLAnchorElement): boolean {
  const href = el.getAttribute('href') || '';

  if (el.classList.contains('nav-cta') && !el.classList.contains('nav-cta--ghost')) {
    return true;
  }

  if (/\/book-now(?:$|[/?#])/.test(href) || /wodhopper\.com/.test(href)) {
    return true;
  }

  const label = trimLabel(el);
  if (
    (el.classList.contains('membership-cta') || el.classList.contains('btn-primary')) &&
    /book|get started|ask about/i.test(label)
  ) {
    return true;
  }

  return false;
}

export function initPostHog(): boolean {
  const key = import.meta.env.PUBLIC_POSTHOG_KEY;
  if (!key || window.__posthog_initialized) return Boolean(window.__posthog_initialized);

  window.__posthog_initialized = true;
  posthog.init(key, {
    api_host: import.meta.env.PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
    defaults: '2026-01-30',
    capture_pageview: true,
    autocapture: true,
    disable_session_recording: false,
  });
  window.posthog = posthog;
  posthog.register({ site: SITE });
  return true;
}

export function bindBookingCtas(): void {
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const el = target.closest('a');
    if (!el || !isBookingCta(el)) return;

    posthog.capture('booking_started', {
      from: 'cta_click',
      cta: trimLabel(el),
      href: el.getAttribute('href') || '',
      page_path: window.location.pathname,
    });
  });
}
