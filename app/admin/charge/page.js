"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminCharge() {
  const [customers, setCustomers] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(null); // { type: "success"|"error", message: "" }
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    setFetching(true);
    const res = await fetch("/api/admin/customers");
    if (res.status === 401) { router.push("/admin/login"); return; }
    const data = await res.json();
    setCustomers(data.customers || []);
    setFetching(false);
  };

  const selectedCustomer = customers.find((c) => c.email === selectedEmail);

  const totalCharged = selectedCustomer?.charges
    ?.filter((c) => c.status === "succeeded")
    .reduce((sum, c) => sum + c.amount, 0) || 0;

  const handleCharge = async () => {
    if (!selectedEmail || !amount || Number(amount) <= 0) {
      setStatus({ type: "error", message: "Select a customer and enter a valid amount." });
      return;
    }
    setLoading(true);
    setStatus(null);

    const res = await fetch("/api/admin/charge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: selectedEmail,
        amount: parseFloat(amount),
        description: description.trim() || "HandyYet service",
      }),
    });
    const data = await res.json();

    if (data.success) {
      setStatus({ type: "success", message: `✅ Charged $${parseFloat(amount).toFixed(2)} successfully! ID: ${data.id}` });
      setAmount("");
      setDescription("");
      await loadCustomers(); // Refresh history
    } else {
      setStatus({ type: "error", message: data.error });
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white px-5 py-10">
      <div className="max-w-xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black">💳 Charge Panel</h1>
            <p className="text-zinc-400 text-sm mt-1">HandyYet Admin · {customers.length} customer{customers.length !== 1 ? "s" : ""} saved</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-zinc-500 hover:text-white text-sm transition"
          >
            Log out
          </button>
        </div>

        {/* Charge form */}
        <div className="bg-zinc-900 rounded-[28px] p-6 border border-white/10 grid gap-5 mb-6">
          <h2 className="font-black text-lg">New charge</h2>

          {/* Customer selector */}
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-2 block">Customer</label>
            {fetching ? (
              <div className="bg-zinc-800 rounded-2xl px-5 py-4 text-zinc-500 text-sm">Loading customers…</div>
            ) : customers.length === 0 ? (
              <div className="bg-zinc-800 rounded-2xl px-5 py-4 text-zinc-500 text-sm">No customers yet.</div>
            ) : (
              <select
                value={selectedEmail}
                onChange={(e) => { setSelectedEmail(e.target.value); setStatus(null); }}
                className="bg-zinc-800 text-white rounded-2xl px-5 py-4 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Select customer…</option>
                {customers.map((c) => (
                  <option key={c.email} value={c.email}>
                    {c.name ? `${c.name} — ${c.email}` : c.email}
                  </option>
                ))}
              </select>
            )}

            {/* Customer info badge */}
            {selectedCustomer && (
              <div className="mt-2 bg-zinc-800 rounded-2xl px-4 py-3 flex gap-4 text-sm">
                <span className="text-zinc-400">Service: <span className="text-white font-black">{selectedCustomer.service}</span></span>
                <span className="text-zinc-400">Total charged: <span className="text-orange-400 font-black">${totalCharged.toFixed(2)}</span></span>
              </div>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-2 block">Amount (USD)</label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 font-black">$</span>
              <input
                type="number"
                min="1"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="bg-zinc-800 text-white rounded-2xl pl-9 pr-5 py-4 w-full focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder:text-zinc-600"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-2 block">Description (optional)</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Extra outlet installation, Additional TV mount…"
              className="bg-zinc-800 text-white rounded-2xl px-5 py-4 w-full focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder:text-zinc-600"
            />
          </div>

          <button
            onClick={handleCharge}
            disabled={loading || !selectedEmail || !amount || Number(amount) <= 0}
            className="bg-orange-500 hover:bg-orange-400 text-black font-black rounded-full py-4 text-lg transition disabled:opacity-40"
          >
            {loading ? "Processing…" : `Charge $${amount ? parseFloat(amount).toFixed(2) : "0.00"} →`}
          </button>

          {status && (
            <div className={`rounded-2xl p-4 text-sm font-black ${
              status.type === "success"
                ? "bg-green-500/20 border border-green-500/30 text-green-300"
                : "bg-red-500/20 border border-red-500/30 text-red-300"
            }`}>
              {status.message}
            </div>
          )}
        </div>

        {/* Charge history for selected customer */}
        {selectedCustomer?.charges?.length > 0 && (
          <div className="bg-zinc-900 rounded-[28px] p-6 border border-white/10">
            <h2 className="font-black text-lg mb-4">Charge history — {selectedCustomer.name || selectedCustomer.email}</h2>
            <div className="grid gap-3">
              {selectedCustomer.charges.map((charge) => (
                <div key={charge.id} className="bg-zinc-800 rounded-2xl p-4 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-black text-lg">${charge.amount.toFixed(2)}</p>
                    <p className="text-zinc-400 text-sm truncate">{charge.description}</p>
                    <p className="text-zinc-600 text-xs mt-0.5">{new Date(charge.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                  </div>
                  <span className={`shrink-0 text-xs font-black px-3 py-1 rounded-full ${
                    charge.status === "succeeded"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}>
                    {charge.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {!fetching && customers.length === 0 && (
          <div className="bg-zinc-900 rounded-[28px] p-10 border border-white/10 text-center">
            <div className="text-5xl mb-4">💳</div>
            <p className="font-black text-xl text-white">No saved cards yet</p>
            <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
              When customers choose "Save card" on the booking page, they'll appear here and you can charge them anytime.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
