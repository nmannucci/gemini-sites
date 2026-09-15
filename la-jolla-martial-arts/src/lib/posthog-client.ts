import posthog from 'posthog-js';

const SITE = 'lj' as const;

function trimLabel(el: Element): string {
  return (el.textContent || '').replace(/\s+/g, ' ').trim();
}

function isBookingCta(el: HTMLAnchorElement): boolean {
  const href = el.getAttribute('href') || '';
  const path = href.split('?')[0].split('#')[0];
  const hash = href.includes('#') ? href.slice(href.indexOf('#')).split('?')[0] : '';

  if (
    el.classList.contains('nav-cta') ||
    el.classList.contains('mobile-menu-cta') ||
    el.classList.contains('cb-sched')
  ) {
    return true;
  }

  const bookingHash = hash === '#contact' || hash === '#schedule';
  const bookingPath = path === '/contact' || path.endsWith('/contact');
  return el.classList.contains('btn-primary') && (bookingHash || bookingPath);
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

  if (window.__ljma_booking_completed) {
    posthog.capture('booking_completed', {
      source: 'thank-you',
      page_path: window.location.pathname,
    });
  }

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
