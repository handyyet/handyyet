"use client";
import { useEffect, useRef, useState } from "react";

export default function AddressAutocomplete({ value, onChange, className }) {
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const sessionToken = useRef(null);
  const debounce = useRef(null);

  useEffect(() => {
    if (window.google) return;
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_KEY}&libraries=places&v=weekly`;
    script.async = true;
    document.head.appendChild(script);
  }, []);

  const fetchSuggestions = (input) => {
    clearTimeout(debounce.current);
    if (!input || input.length < 3) { setSuggestions([]); return; }

    debounce.current = setTimeout(async () => {
      if (!window.google) return;
      try {
        const { AutocompleteSessionToken, AutocompleteSuggestion } =
          await window.google.maps.importLibrary("places");

        if (!sessionToken.current) {
          sessionToken.current = new AutocompleteSessionToken();
        }

        const { suggestions } = await AutocompleteSuggestion.fetchAutocompleteSuggestions({
          input,
          sessionToken: sessionToken.current,
          includedRegionCodes: ["us"],
        });

        setSuggestions(suggestions.map(s => s.placePrediction));
        setOpen(true);
      } catch (e) {
        console.error("Places error:", e);
        setSuggestions([]);
      }
    }, 250);
  };

  const selectSuggestion = (prediction) => {
    const text = prediction.text?.text || prediction.text?.toString() || "";
    onChange(text);
    setSuggestions([]);
    setOpen(false);
    sessionToken.current = null;
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Address"
        value={value}
        onChange={(e) => { onChange(e.target.value); fetchSuggestions(e.target.value); }}
        onBlur={() => setTimeout(() => setOpen(false), 200)}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        required
        className={className}
        autoComplete="off"
      />
      {open && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-black/10 overflow-hidden">
          {suggestions.map((pred, i) => {
            const text = pred.text?.text || pred.text?.toString() || "";
            return (
              <button key={i} type="button"
                onMouseDown={() => selectSuggestion(pred)}
                className="w-full text-left px-5 py-4 hover:bg-orange-50 transition text-sm font-bold border-b border-black/05 last:border-0">
                📍 {text}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
