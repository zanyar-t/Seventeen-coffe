"use client";

import { useState, useMemo } from "react";
import { menu } from "../../lib/menu-data";

export default function OrderPage() {
  const [cart, setCart] = useState({}); // { itemId: qty }
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const allItems = useMemo(() => menu.flatMap((c) => c.items), []);

  function changeQty(id, delta) {
    setCart((prev) => {
      const next = { ...prev };
      const qty = (next[id] || 0) + delta;
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });
  }

  const cartItems = Object.entries(cart).map(([id, qty]) => {
    const item = allItems.find((i) => i.id === id);
    return { ...item, qty };
  });

  const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  async function handleCheckout() {
    setError("");
    if (!customerName || !phone) {
      setError("لطفاً اسم و شماره تماس رو وارد کن.");
      return;
    }
    if (cartItems.length === 0) {
      setError("سبد خرید خالیه.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          phone,
          items: cartItems.map((i) => ({ id: i.id, name: i.name, price: i.price, qty: i.qty })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "خطا در ثبت سفارش");
      window.location.href = data.paymentUrl;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <main className="container" style={{ padding: "64px 24px", display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 48 }}>
      <div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 32 }}>سفارش آنلاین</h1>
        {menu.map((cat) => (
          <div key={cat.category} style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 17, fontWeight: 700, borderBottom: "1px solid var(--line)", paddingBottom: 8, marginBottom: 16 }}>
              {cat.category}
            </h2>
            {cat.items.map((item) => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0" }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{item.name}</div>
                  <div className="mono" style={{ fontSize: 13, color: "var(--gold)" }}>{item.price.toLocaleString("fa-IR")} ت</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <button onClick={() => changeQty(item.id, -1)} style={btnStyle} aria-label="کم کردن">−</button>
                  <span className="mono" style={{ minWidth: 18, textAlign: "center" }}>{cart[item.id] || 0}</span>
                  <button onClick={() => changeQty(item.id, 1)} style={btnStyle} aria-label="اضافه کردن">+</button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <aside style={{ borderInlineStart: "1px solid var(--line)", paddingInlineStart: 32, height: "fit-content", position: "sticky", top: 96 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>سبد سفارش</h2>
        {cartItems.length === 0 ? (
          <p style={{ color: "var(--ink-soft)", fontSize: 14 }}>هنوز چیزی اضافه نکردی.</p>
        ) : (
          <div style={{ marginBottom: 20 }}>
            {cartItems.map((i) => (
              <div key={i.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, padding: "6px 0" }}>
                <span>{i.name} × {i.qty}</span>
                <span className="mono">{(i.price * i.qty).toLocaleString("fa-IR")} ت</span>
              </div>
            ))}
            <hr className="hairline" style={{ margin: "14px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700 }}>
              <span>جمع کل</span>
              <span className="mono">{total.toLocaleString("fa-IR")} ت</span>
            </div>
          </div>
        )}

        <input placeholder="اسم" value={customerName} onChange={(e) => setCustomerName(e.target.value)} style={inputStyle} />
        <input placeholder="شماره تماس" value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} />

        {error && <p style={{ color: "#b0453e", fontSize: 13, marginTop: 8 }}>{error}</p>}

        <button
          onClick={handleCheckout}
          disabled={loading}
          style={{ width: "100%", marginTop: 16, background: "var(--ink)", color: "var(--bg)", padding: "14px", fontWeight: 700, border: "none", opacity: loading ? 0.6 : 1 }}
        >
          {loading ? "در حال اتصال به درگاه…" : "پرداخت و ثبت سفارش"}
        </button>
      </aside>
    </main>
  );
}

const btnStyle = {
  width: 28,
  height: 28,
  border: "1px solid var(--line)",
  background: "var(--panel)",
  fontSize: 16,
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  border: "1px solid var(--line)",
  marginBottom: 10,
  fontFamily: "inherit",
  fontSize: 14,
  background: "var(--panel)",
};
