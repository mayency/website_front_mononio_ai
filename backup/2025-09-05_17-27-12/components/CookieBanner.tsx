"use client";

import { useState, useEffect } from 'react';
import { X, Cookie, Shield, ChevronDown, ChevronUp } from 'lucide-react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    // בדיקה אם המשתמש כבר נתן הסכמה
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    } else {
      // טעינת העדפות קיימות
      try {
        const savedPrefs = JSON.parse(consent);
        setPreferences(savedPrefs);
        applyCookiePreferences(savedPrefs);
      } catch {
        setShowBanner(true);
      }
    }
  }, []);

  const applyCookiePreferences = (prefs: CookiePreferences) => {
    // Google Analytics
    if (prefs.analytics) {
      // @ts-ignore
      window.gtag?.('consent', 'update', {
        'analytics_storage': 'granted'
      });
    } else {
      // @ts-ignore
      window.gtag?.('consent', 'update', {
        'analytics_storage': 'denied'
      });
    }

    // Marketing cookies (Facebook Pixel, Google Ads, etc.)
    if (prefs.marketing) {
      // @ts-ignore
      window.gtag?.('consent', 'update', {
        'ad_storage': 'granted',
        'ad_personalization': 'granted'
      });
    } else {
      // @ts-ignore
      window.gtag?.('consent', 'update', {
        'ad_storage': 'denied',
        'ad_personalization': 'denied'
      });
    }
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    
    localStorage.setItem('cookieConsent', JSON.stringify(allAccepted));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setPreferences(allAccepted);
    applyCookiePreferences(allAccepted);
    setShowBanner(false);
    
    // שליחת אירוע למעקב
    // @ts-ignore
    window.gtag?.('event', 'cookie_consent', {
      'consent_type': 'accept_all'
    });
  };

  const handleAcceptSelected = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    applyCookiePreferences(preferences);
    setShowBanner(false);
    
    // @ts-ignore
    window.gtag?.('event', 'cookie_consent', {
      'consent_type': 'accept_selected',
      'analytics': preferences.analytics,
      'marketing': preferences.marketing,
      'functional': preferences.functional
    });
  };

  const handleRejectAll = () => {
    const rejected = {
      necessary: true, // חובה להשאיר
      analytics: false,
      marketing: false,
      functional: false,
    };
    
    localStorage.setItem('cookieConsent', JSON.stringify(rejected));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setPreferences(rejected);
    applyCookiePreferences(rejected);
    setShowBanner(false);
    
    // @ts-ignore
    window.gtag?.('event', 'cookie_consent', {
      'consent_type': 'reject_all'
    });
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-[9998] backdrop-blur-sm" />
      
      {/* Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Cookie className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      הגדרות פרטיות וקוקיות
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      אנו מכבדים את פרטיותך ומאפשרים לך לשלוט במידע שנאסף
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleRejectAll}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  aria-label="סגור"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                אנו משתמשים בקוקיות (עוגיות) כדי לשפר את חוויית הגלישה שלך, להציג תוכן ופרסומות מותאמים אישית, 
                ולנתח את התנועה באתר. בהתאם לחוק הגנת הפרטיות (תיקון 13), אנו מבקשים את הסכמתך המפורשת לשימוש בקוקיות.
              </p>

              {/* Cookie Types Toggle */}
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="mt-4 flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-sm font-medium"
              >
                <Shield className="w-4 h-4" />
                <span>התאמה אישית של הגדרות קוקיות</span>
                {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {/* Detailed Settings */}
              {showDetails && (
                <div className="mt-4 space-y-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  {/* Necessary Cookies */}
                  <div className="flex items-center justify-between py-2">
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          קוקיות הכרחיות
                        </h3>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                          תמיד פעיל
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        נדרשות לתפעול בסיסי של האתר (אבטחה, ניווט, גישה לתוכן מאובטח)
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.necessary}
                      disabled
                      className="w-5 h-5 text-blue-600 rounded cursor-not-allowed opacity-50"
                    />
                  </div>

                  {/* Analytics Cookies */}
                  <div className="flex items-center justify-between py-2">
                    <div className="flex-1 pr-4">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        קוקיות אנליטיות
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        מאפשרות לנו להבין כיצד משתמשים בתוך באתר (Google Analytics)
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences({...preferences, analytics: e.target.checked})}
                      className="w-5 h-5 text-blue-600 rounded cursor-pointer"
                    />
                  </div>

                  {/* Marketing Cookies */}
                  <div className="flex items-center justify-between py-2">
                    <div className="flex-1 pr-4">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        קוקיות שיווק
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        משמשות להצגת פרסומות רלוונטיות (Facebook Pixel, Google Ads)
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => setPreferences({...preferences, marketing: e.target.checked})}
                      className="w-5 h-5 text-blue-600 rounded cursor-pointer"
                    />
                  </div>

                  {/* Functional Cookies */}
                  <div className="flex items-center justify-between py-2">
                    <div className="flex-1 pr-4">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        קוקיות פונקציונליות
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        שומרות את ההעדפות שלך (שפה, אזור, העדפות תצוגה)
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={(e) => setPreferences({...preferences, functional: e.target.checked})}
                      className="w-5 h-5 text-blue-600 rounded cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* Links */}
              <div className="mt-4 flex flex-wrap gap-4 text-xs">
                <a 
                  href="/privacy" 
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 underline"
                  target="_blank"
                >
                  מדיניות פרטיות
                </a>
                <a 
                  href="/terms" 
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 underline"
                  target="_blank"
                >
                  תנאי שימוש
                </a>
                <a 
                  href="/accessibility" 
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 underline"
                  target="_blank"
                >
                  הצהרת נגישות
                </a>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 pt-0">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleRejectAll}
                  className="px-5 py-2.5 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors"
                >
                  דחה הכל
                </button>
                {showDetails && (
                  <button
                    onClick={handleAcceptSelected}
                    className="px-5 py-2.5 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg font-medium transition-colors"
                  >
                    שמור העדפות
                  </button>
                )}
                <button
                  onClick={handleAcceptAll}
                  className="px-5 py-2.5 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors flex-1 sm:flex-initial"
                >
                  קבל הכל
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
