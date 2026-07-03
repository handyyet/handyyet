"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();

    if (data.ok) {
      router.push("/admin/charge");
    } else {
      setError("Incorrect password.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center px-5">
      <div className="bg-zinc-900 rounded-[32px] p-8 w-full max-w-sm border border-white/10">
        <div className="text-4xl mb-4">🔐</div>
        <h1 className="text-2xl font-black text-white mb-1">HandyYet Admin</h1>
        <p className="text-zinc-400 text-sm mb-6">Enter your password to access the charge panel.</p>

        <form onSubmit={handleLogin} className="grid gap-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            className="bg-zinc-800 text-white rounded-2xl px-5 py-4 w-full focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder:text-zinc-500"
          />
          {error && <p className="text-red-400 text-sm font-black">{error}</p>}
          <button
            type="submit"
            disabled={loading || !password}
            className="bg-orange-500 hover:bg-orange-400 text-black font-black rounded-full py-4 transition disabled:opacity-50"
          >
            {loading ? "Logging in…" : "Log In →"}
          </button>
        </form>
      </div>
    </main>
  );
}
