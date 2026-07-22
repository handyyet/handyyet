'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

/**
 * Reusable address autocomplete field.
 *
 * Usage:
 * <AddressAutocomplete
 *   value={address}
 *   onSelect={(addr) => setAddress(addr)}
 *   placeholder="Enter your address"
 * />
 *
 * addr shape passed to onSelect:
 * { formatted, street, city, state, zip }
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

  useEffect(() => {
    let cancelled = false;

    async function mount() {
      if (!window.google?.maps?.importLibrary) return;
      await window.google.maps.importLibrary('places');
      if (cancelled || !containerRef.current) return;

      const el = document.createElement('gmp-place-autocomplete');
      el.setAttribute('placeholder', placeholder);
      if (required) el.setAttribute('required', '');
      el.style.width = '100%';
      el.style.display = 'block';

      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(el);
      elementRef.current = el;

      el.addEventListener('gmp-select', async ({ placePrediction }) => {
        const place = placePrediction.toPlace();
        await place.fetchFields({ fields: ['formattedAddress'] });
        onChange?.(place.formattedAddress || '');
      });
    }

    if (!elementRef.current) mount();
    return () => {
      cancelled = true;
    };
  }, []);

  // The web component has no simple value setter, so when the parent
  // resets the field (e.g. after a successful submit clears the form),
  // rebuild the widget to clear its visible text.
  useEffect(() => {
    const wasCleared = prevValueRef.current && !value;
    prevValueRef.current = value;
    if (!wasCleared || !window.google?.maps?.importLibrary) return;

    window.google.maps.importLibrary('places').then(() => {
      if (!containerRef.current) return;
      const el = document.createElement('gmp-place-autocomplete');
      el.setAttribute('placeholder', placeholder);
      if (required) el.setAttribute('required', '');
      el.style.width = '100%';
      el.style.display = 'block';

      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(el);
      elementRef.current = el;

      el.addEventListener('gmp-select', async ({ placePrediction }) => {
        const place = placePrediction.toPlace();
        await place.fetchFields({ fields: ['formattedAddress'] });
        onChange?.(place.formattedAddress || '');
      });
    });
  }, [value]);

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&loading=async&libraries=places&v=beta`}
        strategy="afterInteractive"
      />
      <div
        ref={containerRef}
        className={className}
        style={{
          border: '1px solid #d9c9b8',
          borderRadius: '8px',
          padding: '2px',
        }}
      />
    </>
  );
}
