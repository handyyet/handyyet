'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

/**
 * Reusable address autocomplete field.
 * Renders as a plain <input> styled like the rest of the form, with a
 * custom suggestions dropdown positioned directly below it (no shadow DOM,
 * no Google-hosted overlay — fully ours, so it behaves the same on mobile
 * and desktop and matches the site's design).
 *
 * Usage:
 * <AddressAutocomplete
 *   value={address}
 *   onChange={(formattedAddress) => setAddress(formattedAddress)}
 *   placeholder="Street address"
 * />
 */
export default function AddressAutocomplete({
  value,
  onChange,
  placeholder = 'Street address',
  required = false,
  className = '',
}) {
  const [scriptReady, setScriptReady] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const sessionTokenRef = useRef(null);
  const wrapperRef = useRef(null);
  const debounceRef = useRef(null);

  // Keep the visible text in sync if the parent clears/sets the value externally
  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  // Close the dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  async function fetchSuggestions(query) {
    if (!query || !window.google?.maps?.importLibrary) {
      setSuggestions([]);
      return;
    }
    const { AutocompleteSuggestion, AutocompleteSessionToken } =
      await window.google.maps.importLibrary('places');

    if (!sessionTokenRef.current) {
      sessionTokenRef.current = new AutocompleteSessionToken();
    }

    try {
      const { suggestions: results } =
        await AutocompleteSuggestion.fetchAutocompleteSuggestions({
          input: query,
          sessionToken: sessionTokenRef.current,
          includedRegionCodes: ['us'],
        });
      setSuggestions(results || []);
      setOpen((results || []).length > 0);
      setActiveIndex(-1);
    } catch (err) {
      console.error('Address autocomplete error:', err);
      setSuggestions([]);
    }
  }

  function handleInputChange(e) {
    const query = e.target.value;
    setInputValue(query);
    onChange?.(query);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(query), 200);
  }

  async function selectSuggestion(suggestion) {
    const place = suggestion.placePrediction.toPlace();
    await place.fetchFields({ fields: ['formattedAddress'] });
    const formatted = place.formattedAddress || suggestion.placePrediction.text.text;
    setInputValue(formatted);
    onChange?.(formatted);
    setSuggestions([]);
    setOpen(false);
    sessionTokenRef.current = null; // session ends once a place is selected
  }

  function handleKeyDown(e) {
    if (!open || suggestions.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      selectSuggestion(suggestions[activeIndex]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  return (
    <div ref={wrapperRef} style={{ position: 'relative', width: '100%' }}>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_KEY}&loading=async&libraries=places&v=beta`}
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
      />
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        placeholder={placeholder}
        required={required}
        autoComplete="off"
        disabled={!scriptReady}
        className={className}
      />

      {open && suggestions.length > 0 && (
        <ul
          role="listbox"
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            right: 0,
            zIndex: 50,
            background: '#fdfaf5',
            border: '1px solid #e8ddd0',
            borderRadius: '16px',
            boxShadow: '0 12px 24px -8px rgba(0,0,0,0.15)',
            listStyle: 'none',
            margin: 0,
            padding: '6px',
            maxHeight: '260px',
            overflowY: 'auto',
          }}
        >
          {suggestions.map((s, i) => (
            <li
              key={s.placePrediction.placeId}
              role="option"
              aria-selected={i === activeIndex}
              onMouseDown={(e) => {
                e.preventDefault(); // keep focus, avoid blur before click registers
                selectSuggestion(s);
              }}
              onMouseEnter={() => setActiveIndex(i)}
              style={{
                padding: '10px 12px',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '15px',
                color: '#18181b',
                background: i === activeIndex ? 'rgba(200,118,58,0.12)' : 'transparent',
              }}
            >
              {s.placePrediction.text.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
