"use client";
import { useState, useEffect } from "react";

const TIME_SLOTS = [
  "8:00 AM","9:00 AM","10:00 AM","11:00 AM","12:00 PM",
  "1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM","7:00 PM","8:00 PM"
];

const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAY_NAMES = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function getDays() {
  const days = [];
  const today = new Date();
  for (let i = 1; i <= 28; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (d.getDay() !== 0) days.push(d);
  }
  return days;
}

function dateKey(d) {
  return d.toISOString().split("T")[0];
}

export default function BookingCalendar({ value, onChange }) {
  const days = getDays();
  const [selectedDate, setSelectedDate] = useState(value?.date || null);
  const [selectedTime, setSelectedTime] = useState(value?.time || null);
  const [weekOffset, setWeekOffset] = useState(0);
  const [blockedSlots, setBlockedSlots] = useState({});
  const [loading, setLoading] = useState(false);

  const WEEK_SIZE = 7;
  const weekDays = days.slice(weekOffset * WEEK_SIZE, weekOffset * WEEK_SIZE + WEEK_SIZE);
  const totalWeeks = Math.ceil(days.length / WEEK_SIZE);

  useEffect(() => {
    if (!selectedDate) return;
    setLoading(true);
    fetch(`/api/booking/slots?date=${dateKey(selectedDate)}`)
      .then(r => r.json())
      .then(data => {
        setBlockedSlots(prev => ({ ...prev, [dateKey(selectedDate)]: data.blocked || [] }));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [selectedDate]);

  const isBlocked = (time) => {
    if (!selectedDate) return false;
    return (blockedSlots[dateKey(selectedDate)] || []).includes(time);
  };

  const pickDate = (d) => {
    setSelectedDate(d);
    setSelectedTime(null);
    onChange(null);
  };

  const pickTime = (t) => {
    if (isBlocked(t)) return;
    setSelectedTime(t);
    onChange({ date: selectedDate, time: t });
  };

  const fmt = (d) => `${DAY_NAMES[d.getDay()]}, ${MONTH_NAMES[d.getMonth()]} ${d.getDate()}`;

  return (
    <div className="bg-zinc-50 rounded-3xl p-5 border border-black/08">
      <p className="text-sm font-black text-zinc-600 mb-4">Select a date & time</p>

      <div className="flex items-center justify-between mb-3">
        <button type="button" onClick={() => setWeekOffset(Math.max(0, weekOffset - 1))}
          disabled={weekOffset === 0}
          className="w-8 h-8 rounded-full bg-white border border-black/10 font-black text-zinc-500 hover:bg-zinc-100 transition disabled:opacity-30">‹</button>
        <span className="text-xs font-bold text-zinc-400">
          {weekDays[0] && `${MONTH_NAMES[weekDays[0].getMonth()]} ${weekDays[0].getDate()} – ${MONTH_NAMES[weekDays[weekDays.length-1].getMonth()]} ${weekDays[weekDays.length-1].getDate()}`}
        </span>
        <button type="button" onClick={() => setWeekOffset(Math.min(totalWeeks - 1, weekOffset + 1))}
          disabled={weekOffset >= totalWeeks - 1}
          className="w-8 h-8 rounded-full bg-white border border-black/10 font-black text-zinc-500 hover:bg-zinc-100 transition disabled:opacity-30">›</button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-5">
        {weekDays.map((d, i) => {
          const isSelected = selectedDate && d.toDateString() === selectedDate.toDateString();
          return (
            <button key={i} type="button" onClick={() => pickDate(d)}
              className={`flex flex-col items-center py-2 rounded-2xl transition text-xs font-black
                ${isSelected ? "bg-orange-500 text-black" : "bg-white border border-black/08 text-zinc-700 hover:border-orange-300 hover:bg-orange-50"}`}>
              <span className="text-[10px] opacity-60">{DAY_NAMES[d.getDay()]}</span>
              <span className="text-base mt-0.5">{d.getDate()}</span>
            </button>
          );
        })}
      </div>

      {selectedDate && (
        <>
          <p className="text-sm font-black text-zinc-600 mb-3">
            {loading ? "Loading availability..." : `Available times — ${fmt(selectedDate)}`}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {TIME_SLOTS.map((t) => {
              const blocked = isBlocked(t);
              const selected = selectedTime === t;
              return (
                <button key={t} type="button" onClick={() => pickTime(t)} disabled={blocked}
                  className={`py-3 rounded-2xl text-sm font-black transition
                    ${selected ? "bg-orange-500 text-black" :
                      blocked ? "bg-zinc-200 text-zinc-400 cursor-not-allowed line-through" :
                      "bg-white border border-black/08 text-zinc-700 hover:border-orange-300 hover:bg-orange-50"}`}>
                  {t}
                </button>
              );
            })}
          </div>
        </>
      )}

      {selectedDate && selectedTime && (
        <div className="mt-4 bg-orange-50 border border-orange-200 rounded-2xl px-4 py-3 text-sm font-black text-orange-700">
          ✓ {fmt(selectedDate)} at {selectedTime}
        </div>
      )}
    </div>
  );
}
