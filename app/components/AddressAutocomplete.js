'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

/**
 * Reusable address autocomplete field.
 *
 * Usage:
 * <AddressAutocomplete
 *   value={address}
 *   onChange={(formattedAddress) => setAddress(formattedAddress)}
 *   placeholder="Enter your address"
 * />
 */
export default function AddressAutocomplete({
  value,
  onChange,
  placeholder = 'Street address',
  required = false,
  className = '',
}) {
  const containerRef = useRef(null);
  const elementRef = useRef(null);
  const prevValueRef = useRef(value);
  const [scriptReady, setScriptReady] = useState(false);

  function buildWidget() {
    if (!containerRef.current) return;

    const el = document.createElement('gmp-place-autocomplete');
    el.setAttribute('placeholder', placeholder);
    if (required) el.setAttribute('required', '');
    el.style.width = '100%';
    el.style.display = 'block';
    // Match the site's light design instead of Google's default dark theme.
    // These are officially supported host-level style properties for
    // gmp-place-autocomplete (they work despite the closed shadow root).
    el.style.setProperty('color-scheme', 'light');
    el.style.setProperty('background-color', '#fdfaf5');
    el.style.border = '2px solid transparent';
    el.style.borderRadius = '9999px';
    el.style.padding = '2px';

    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(el);
    elementRef.current = el;

    el.addEventListener('gmp-select', async ({ placePrediction }) => {
      const place = placePrediction.toPlace();
      await place.fetchFields({ fields: ['formattedAddress'] });
      onChange?.(place.formattedAddress || '');
    });
  }

  // Mount the widget once the Google Maps script has actually finished loading.
  useEffect(() => {
    if (!scriptReady) return;
    let cancelled = false;

    window.google.maps.importLibrary('places').then(() => {
      if (!cancelled && !elementRef.current) buildWidget();
    });

    return () => {
      cancelled = true;
    };
  }, [scriptReady]);

  // Rebuild the widget when the parent clears the field (e.g. after form reset).
  useEffect(() => {
    const wasCleared = prevValueRef.current && !value;
    prevValueRef.current = value;
    if (!wasCleared || !scriptReady) return;

    window.google.maps.importLibrary('places').then(() => {
      buildWidget();
    });
  }, [value, scriptReady]);

  return (
    <>
      <style>{`
        gmp-place-autocomplete {
          transition: border-color 0.2s ease;
        }
        gmp-place-autocomplete:focus-within {
          border-color: #c8763a !important;
        }
      `}</style>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_KEY}&loading=async&libraries=places&v=beta`}
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
      />
      <div ref={containerRef} className={className} style={{ width: '100%' }} />
    </>
  );
}
