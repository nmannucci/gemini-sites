// PostHog init options. Pages that show personal answers (the giveaway form) turn off
// every capture that reads page text: autocapture, recordings, dead clicks, rage clicks, heatmaps.
export function postHogConfig(options: { autocapture?: boolean; sessionRecording?: boolean } = {}) {
  const autocapture = options.autocapture ?? true;
  return {
    api_host: import.meta.env?.PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
    defaults: '2026-01-30' as const,
    capture_pageview: true,
    autocapture,
    disable_session_recording: !(options.sessionRecording ?? true),
    ...(autocapture ? {} : { capture_dead_clicks: false, rageclick: false, capture_heatmaps: false }),
  };
}
