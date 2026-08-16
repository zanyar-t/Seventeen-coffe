import { menu } from "../../lib/menu-data";

export const metadata = { title: "منو | Seventeen Coffee" };

export default function MenuPage() {
  return (
    <main className="container" style={{ padding: "64px 24px" }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>منو</h1>
      <p style={{ color: "var(--ink-soft)", marginBottom: 48 }}>قیمت‌ها به تومان</p>

      {menu.map((cat) => (
        <div key={cat.category} style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, borderBottom: "1px solid var(--line)", paddingBottom: 10, marginBottom: 20 }}>
            {cat.category}
          </h2>
          <div style={{ display: "grid", gap: 18 }}>
            {cat.items.map((item) => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16 }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 16 }}>{item.name}</div>
                  <div style={{ color: "var(--ink-soft)", fontSize: 14 }}>{item.desc}</div>
                </div>
                <div className="mono" style={{ whiteSpace: "nowrap", fontSize: 15, color: "var(--gold)" }}>
                  {item.price.toLocaleString("fa-IR")} ت
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}
