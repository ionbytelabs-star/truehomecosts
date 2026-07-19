type AnalyticsValue = string | number | boolean;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: "event", eventName: string, parameters?: Record<string, AnalyticsValue>) => void;
  }
}

const consentStorageKey = "truehomecosts_cookie_consent";

function hasAnalyticsConsent() {
  try {
    const stored = window.localStorage.getItem(consentStorageKey);
    return stored ? (JSON.parse(stored) as { analytics?: boolean }).analytics === true : false;
  } catch {
    return false;
  }
}

export function propertyPriceBand(price: number) {
  if (price < 200_000) return "under_200k";
  if (price < 300_000) return "200k_299k";
  if (price < 500_000) return "300k_499k";
  if (price < 750_000) return "500k_749k";
  return "750k_plus";
}

export function trackEvent(eventName: string, parameters: Record<string, AnalyticsValue> = {}) {
  if (typeof window === "undefined" || !hasAnalyticsConsent()) return;
  try {
    window.gtag?.("event", eventName, parameters);
  } catch {
    // Analytics must never interrupt the calculator or navigation.
  }
}
