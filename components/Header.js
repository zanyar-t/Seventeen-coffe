import Link from "next/link";

export default function Header() {
  return (
    <header style={{ borderBottom: "1px solid var(--line)", background: "var(--bg)", position: "sticky", top: 0, zIndex: 10 }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 700, fontSize: 18 }}>
          <span className="mono" style={{ color: "var(--gold)" }}>17</span>
          <span>Seventeen Coffee</span>
        </Link>
        <nav style={{ display: "flex", gap: 28, fontSize: 15, color: "var(--ink-soft)" }}>
          <Link href="/menu">منو</Link>
          <Link href="/order">سفارش آنلاین</Link>
          <Link href="/reserve">رزرو میز</Link>
        </nav>
      </div>
    </header>
  );
}
