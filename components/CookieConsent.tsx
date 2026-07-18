"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

const googleAnalyticsId = "G-S898S4FM23";
const consentStorageKey = "truehomecosts_cookie_consent";
const openConsentEvent = "truehomecosts:open-cookie-settings";

type ConsentPreferences = {
  version: 1;
  analytics: boolean;
  advertising: false;
  updatedAt: string;
};

function readStoredConsent(): ConsentPreferences | null {
  try {
    const stored = window.localStorage.getItem(consentStorageKey);
    if (!stored) {
      return null;
    }

    const parsed = JSON.parse(stored) as Partial<ConsentPreferences>;
    if (parsed.version !== 1 || typeof parsed.analytics !== "boolean") {
      return null;
    }

    return {
      version: 1,
      analytics: parsed.analytics,
      advertising: false,
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : new Date().toISOString()
    };
  } catch {
    return null;
  }
}

function storeConsent(analytics: boolean): ConsentPreferences {
  const preferences: ConsentPreferences = {
    version: 1,
    analytics,
    advertising: false,
    updatedAt: new Date().toISOString()
  };

  window.localStorage.setItem(consentStorageKey, JSON.stringify(preferences));
  return preferences;
}

function clearGoogleAnalyticsCookies() {
  const hostParts = window.location.hostname.split(".");
  const candidateDomains = [window.location.hostname];

  if (hostParts.length > 2) {
    candidateDomains.push(`.${hostParts.slice(-2).join(".")}`);
  }

  ["_ga", `_ga_${googleAnalyticsId.replace("G-", "")}`].forEach((name) => {
    document.cookie = `${name}=; Max-Age=0; path=/`;
    candidateDomains.forEach((domain) => {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}`;
    });
  });
}

function setGoogleAnalyticsDisabled(disabled: boolean) {
  (window as unknown as Record<string, boolean>)[`ga-disable-${googleAnalyticsId}`] = disabled;
}

export function CookieConsentBanner() {
  const [preferences, setPreferences] = useState<ConsentPreferences | null>(null);
  const [hasLoadedStoredChoice, setHasLoadedStoredChoice] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const settingsHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const stored = readStoredConsent();
    setGoogleAnalyticsDisabled(stored?.analytics !== true);
    setPreferences(stored);
    setShowBanner(!stored);
    setHasLoadedStoredChoice(true);
  }, []);

  useEffect(() => {
    function openSettings() {
      setShowBanner(true);
      setShowSettings(true);
    }

    window.addEventListener(openConsentEvent, openSettings);
    return () => window.removeEventListener(openConsentEvent, openSettings);
  }, []);

  useEffect(() => {
    if (showSettings) {
      settingsHeadingRef.current?.focus();
    }
  }, [showSettings]);

  function saveChoice(analytics: boolean) {
    const nextPreferences = storeConsent(analytics);
    setGoogleAnalyticsDisabled(!analytics);
    if (!analytics) {
      clearGoogleAnalyticsCookies();
    }

    setPreferences(nextPreferences);
    setShowBanner(false);
    setShowSettings(false);
  }

  const analyticsAllowed = hasLoadedStoredChoice && preferences?.analytics === true;

  return (
    <>
      {analyticsAllowed ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAnalyticsId}');
            `}
          </Script>
        </>
      ) : null}

      {showBanner ? (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/95 shadow-2xl backdrop-blur">
          <div className="shell py-4">
            {showSettings ? (
              <div role="dialog" aria-labelledby="cookie-settings-title" className="grid gap-4 lg:grid-cols-[1fr_auto]">
                <div className="space-y-3">
                  <h2
                    id="cookie-settings-title"
                    ref={settingsHeadingRef}
                    tabIndex={-1}
                    className="font-serif text-2xl text-text"
                  >
                    Cookie settings
                  </h2>
                  <p className="max-w-3xl text-sm text-muted">
                    True Home Costs can use optional analytics cookies to understand broad website usage.
                    Advertising cookies are not currently active; AdSense advertising still needs a
                    Google-certified consent platform before relevant ad technologies are enabled.
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-line bg-panel-strong p-4">
                      <p className="font-semibold text-text">Strictly necessary</p>
                      <p className="mt-1 text-sm text-muted">
                        Always on. This includes storing your cookie choice in this browser.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-line bg-panel-strong p-4">
                      <p className="font-semibold text-text">Analytics and performance</p>
                      <p className="mt-1 text-sm text-muted">
                        Optional. Allows Google Analytics to load after you choose to accept it.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row lg:w-56 lg:flex-col">
                  <button
                    type="button"
                    onClick={() => saveChoice(true)}
                    className="rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-deep"
                  >
                    Accept optional cookies
                  </button>
                  <button
                    type="button"
                    onClick={() => saveChoice(false)}
                    className="rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold text-text transition hover:border-brand hover:text-brand-deep"
                  >
                    Reject optional cookies
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
                <div className="space-y-2">
                  <p className="font-semibold text-text">Cookies on True Home Costs</p>
                  <p className="max-w-3xl text-sm text-muted">
                    We use necessary storage to remember your choice. With your permission, we also use Google
                    Analytics to understand broad website usage. Advertising cookies are not active yet.
                  </p>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <a href="/cookies" className="underline hover:text-brand-deep">
                      Cookie Policy
                    </a>
                    <a href="/privacy" className="underline hover:text-brand-deep">
                      Privacy Policy
                    </a>
                  </div>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => saveChoice(true)}
                    className="rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-deep"
                  >
                    Accept optional cookies
                  </button>
                  <button
                    type="button"
                    onClick={() => saveChoice(false)}
                    className="rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold text-text transition hover:border-brand hover:text-brand-deep"
                  >
                    Reject optional cookies
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSettings(true)}
                    className="rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold text-text transition hover:border-brand hover:text-brand-deep"
                  >
                    Cookie settings
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(openConsentEvent))}
      className="rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-deep"
    >
      Manage cookie preferences
    </button>
  );
}
