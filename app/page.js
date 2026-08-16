import Link from "next/link";
import Numeral from "../components/Numeral";

export default function Home() {
  return (
    <main>
      <section style={{ position: "relative", overflow: "hidden", borderBottom: "1px solid var(--line)" }}>
        <div
          style={{
            position: "absolute",
            insetInlineEnd: "-40px",
            top: "-30px",
            pointerEvents: "none",
          }}
        >
          <Numeral size={340} />
        </div>
        <div className="container" style={{ padding: "96px 24px 80px", position: "relative" }}>
          <p className="mono" style={{ color: "var(--gold)", fontSize: 14, marginBottom: 18 }}>
            17 خیابان، همیشه باز از ۸ صبح
          </p>
          <h1 style={{ fontSize: "clamp(34px, 6vw, 58px)", fontWeight: 800, maxWidth: 640, margin: 0, lineHeight: 1.25 }}>
            قهوه‌ای که با دقتِ ساعت هفده دم می‌شود
          </h1>
          <p style={{ maxWidth: 520, color: "var(--ink-soft)", fontSize: 17, marginTop: 22 }}>
            Seventeen Coffee یک کافه‌ی مینیمال است: دانه‌های تازه، اسپرسوی دقیق و فضایی برای موندن.
            سفارشتو آنلاین ثبت کن یا میزتو از قبل رزرو کن.
          </p>
          <div style={{ display: "flex", gap: 14, marginTop: 36 }}>
            <Link
              href="/order"
              style={{ background: "var(--ink)", color: "var(--bg)", padding: "14px 28px", fontSize: 15, fontWeight: 600 }}
            >
              سفارش آنلاین
            </Link>
            <Link
              href="/reserve"
              style={{ border: "1px solid var(--ink)", padding: "14px 28px", fontSize: 15, fontWeight: 600 }}
            >
              رزرو میز
            </Link>
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: "72px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 40 }}>
          {[
            { n: "01", t: "دانه‌ی تازه", d: "رست هفتگی، بدون انبار طولانی." },
            { n: "02", t: "دم‌آوری دقیق", d: "هر شات با وزن و زمان مشخص." },
            { n: "03", t: "فضای آرام", d: "جای مناسب کار و گفتگو." },
          ].map((f) => (
            <div key={f.n}>
              <span className="mono" style={{ color: "var(--gold)", fontSize: 13 }}>{f.n}</span>
              <h3 style={{ margin: "10px 0 6px", fontSize: 19 }}>{f.t}</h3>
              <p style={{ color: "var(--ink-soft)", fontSize: 15, margin: 0 }}>{f.d}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
