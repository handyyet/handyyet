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
  for (let i = 0; i <= 28; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (d.getDay() !== 0) days.push(d);
  }
  return days;
}

function dateKey(d) { return d.toISOString().split("T")[0]; }
function fmt(d) { return `${DAY_NAMES[d.getDay()]}, ${MONTH_NAMES[d.getMonth()]} ${d.getDate()}`; }

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [blockedSlots, setBlockedSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(null);
  const [weekOffset, setWeekOffset] = useState(0);

  const days = getDays();
  const WEEK_SIZE = 7;
  const weekDays = days.slice(weekOffset * WEEK_SIZE, weekOffset * WEEK_SIZE + WEEK_SIZE);
  const totalWeeks = Math.ceil(days.length / WEEK_SIZE);

  const loadSlots = async (date) => {
    setLoading(true);
    const res = await fetch(`/api/booking/slots?date=${dateKey(date)}`);
    const data = await res.json();
    setBlockedSlots(data.blocked || []);
    setLoading(false);
  };

  useEffect(() => { if (authed) loadSlots(selectedDate); }, [authed, selectedDate]);

  const toggle = async (time) => {
    const isBlocked = blockedSlots.includes(time);
    setSaving(time);
    const res = await fetch("/api/booking/block", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, date: dateKey(selectedDate), time, action: isBlocked ? "unblock" : "block" }),
    });
    const data = await res.json();
    if (data.success) setBlockedSlots(data.blocked);
    setSaving(null);
  };

  const blockAll = async () => {
    for (const time of TIME_SLOTS) {
      if (!blockedSlots.includes(time)) await toggle(time);
    }
  };

  const unblockAll = async () => {
    for (const time of TIME_SLOTS) {
      if (blockedSlots.includes(time)) await toggle(time);
    }
  };

  if (!authed) {
    return (
      <main className="min-h-screen bg-[#f6f3ee] flex items-center justify-center px-5">
        <div className="bg-white rounded-[40px] p-10 shadow-2xl border border-black/10 w-full max-w-sm">
          <p className="text-3xl font-black">🔐</p>
          <h1 className="text-3xl font-black mt-4">Admin</h1>
          <p className="text-zinc-500 mt-2">HandyYet Booking Manager</p>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && setAuthed(true)}
            className="mt-6 w-full rounded-2xl bg-zinc-100 px-5 py-4 outline-none border border-transparent focus:border-orange-500"
          />
          {authError && <p className="text-red-500 text-sm mt-2 font-bold">Wrong password</p>}
          <button onClick={() => setAuthed(true)}
            className="mt-4 w-full bg-orange-500 text-black rounded-full py-4 font-black hover:bg-orange-400 transition">
            Login
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f3ee] px-5 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <a href="/" className="text-3xl font-black">Handy<span className="text-orange-500">Yet</span></a>
            <p className="text-zinc-500 font-bold mt-1">Booking Manager</p>
          </div>
          <button onClick={() => setAuthed(false)} className="bg-white border border-black/10 px-5 py-3 rounded-full font-black text-sm hover:bg-zinc-100 transition">
            Logout
          </button>
        </div>

        {/* Week navigation */}
        <div className="bg-white rounded-[32px] p-6 border border-black/10 mb-5">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => setWeekOffset(Math.max(0, weekOffset - 1))} disabled={weekOffset === 0}
              className="w-10 h-10 rounded-full bg-zinc-100 font-black text-zinc-600 hover:bg-zinc-200 transition disabled:opacity-30 text-xl">‹</button>
            <span className="font-black text-zinc-500 text-sm">
              {weekDays[0] && `${MONTH_NAMES[weekDays[0].getMonth()]} ${weekDays[0].getDate()} – ${MONTH_NAMES[weekDays[weekDays.length-1].getMonth()]} ${weekDays[weekDays.length-1].getDate()}`}
            </span>
            <button onClick={() => setWeekOffset(Math.min(totalWeeks - 1, weekOffset + 1))} disabled={weekOffset >= totalWeeks - 1}
              className="w-10 h-10 rounded-full bg-zinc-100 font-black text-zinc-600 hover:bg-zinc-200 transition disabled:opacity-30 text-xl">›</button>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((d, i) => {
              const isSelected = d.toDateString() === selectedDate.toDateString();
              const isToday = d.toDateString() === new Date().toDateString();
              return (
                <button key={i} onClick={() => setSelectedDate(d)}
                  className={`flex flex-col items-center py-3 rounded-2xl transition font-black text-sm
                    ${isSelected ? "bg-orange-500 text-black" :
                      isToday ? "bg-orange-50 border-2 border-orange-300 text-zinc-800" :
                      "bg-zinc-50 border border-black/08 text-zinc-700 hover:bg-orange-50"}`}>
                  <span className="text-[10px] opacity-60">{DAY_NAMES[d.getDay()]}</span>
                  <span className="text-lg mt-0.5">{d.getDate()}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Slots */}
        <div className="bg-white rounded-[32px] p-6 border border-black/10">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <h2 className="text-2xl font-black">{fmt(selectedDate)}</h2>
            <div className="flex gap-2">
              <button onClick={unblockAll} className="text-sm bg-green-100 text-green-700 px-4 py-2 rounded-full font-black hover:bg-green-200 transition">
                Open all
              </button>
              <button onClick={blockAll} className="text-sm bg-red-100 text-red-700 px-4 py-2 rounded-full font-black hover:bg-red-200 transition">
                Block all
              </button>
            </div>
          </div>

          {loading ? (
            <p className="text-zinc-400 font-bold text-center py-8">Loading...</p>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {TIME_SLOTS.map((time) => {
                const blocked = blockedSlots.includes(time);
                const isSaving = saving === time;
                return (
                  <button key={time} onClick={() => toggle(time)} disabled={isSaving}
                    className={`flex items-center justify-between px-5 py-4 rounded-2xl font-black transition
                      ${blocked ? "bg-red-50 border-2 border-red-200 text-red-600" :
                        "bg-green-50 border-2 border-green-200 text-green-700"}
                      ${isSaving ? "opacity-50" : "hover:scale-[1.02]"}`}>
                    <span>{time}</span>
                    <span className="text-lg">{blocked ? "🔴" : "🟢"}</span>
                  </button>
                );
              })}
            </div>
          )}

          <div className="mt-6 flex gap-4 text-sm font-bold text-zinc-400">
            <span>🟢 Available</span>
            <span>🔴 Blocked</span>
          </div>
        </div>
      </div>
    </main>
  );
}
