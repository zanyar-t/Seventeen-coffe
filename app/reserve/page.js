"use client";

import { useState } from "react";
import Numeral from "../../components/Numeral";

export default function ReservePage() {
  const [form, setForm] = useState({ customerName: "", phone: "", date: "", time: "", guests: 2 });
  const [status, setStatus] = useState("idle"); // idle | loading | done | error
  const [error, setError] = useState("");

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "خطا در ثبت رزرو");
      setStatus("done");
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <main className="container" style={{ padding: "96px 24px", textAlign: "center" }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "var(--gold)" }}>رزروت ثبت شد</h1>
        <p style={{ color: "var(--ink-soft)", marginTop: 10 }}>
          میز برای {form.guests} نفر، {form.date} ساعت {form.time}. منتظرت هستیم.
        </p>
      </main>
    );
  }

  return (
    <main className="container" style={{ padding: "64px 24px", maxWidth: 520, position: "relative" }}>
      <div style={{ position: "absolute", insetInlineEnd: -20, top: -10, pointerEvents: "none" }}>
        <Numeral size={100} />
      </div>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>رزرو میز</h1>
      <p style={{ color: "var(--ink-soft)", marginBottom: 32 }}>جای خودتو از قبل نگه دار.</p>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14 }}>
        <input required placeholder="اسم" value={form.customerName} onChange={(e) => update("customerName", e.target.value)} style={inputStyle} />
        <input required placeholder="شماره تماس" value={form.phone} onChange={(e) => update("phone", e.target.value)} style={inputStyle} />
        <div style={{ display: "flex", gap: 12 }}>
          <input required type="date" value={form.date} onChange={(e) => update("date", e.target.value)} style={inputStyle} />
          <input required type="time" value={form.time} onChange={(e) => update("time", e.target.value)} style={inputStyle} />
        </div>
        <input required type="number" min={1} max={20} placeholder="تعداد نفرات" value={form.guests} onChange={(e) => update("guests", Number(e.target.value))} style={inputStyle} />

        {error && <p style={{ color: "#b0453e", fontSize: 13 }}>{error}</p>}

        <button
          disabled={status === "loading"}
          style={{ background: "var(--ink)", color: "var(--bg)", padding: "14px", fontWeight: 700, border: "none", opacity: status === "loading" ? 0.6 : 1 }}
        >
          {status === "loading" ? "در حال ثبت…" : "ثبت رزرو"}
        </button>
      </form>
    </main>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  border: "1px solid var(--line)",
  fontFamily: "inherit",
  fontSize: 14,
  background: "var(--panel)",
};
