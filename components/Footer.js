export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--line)", marginTop: 96 }}>
      <div className="container" style={{ padding: "40px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", color: "var(--ink-soft)", fontSize: 14 }}>
        <span>© {new Date().getFullYear()} Seventeen Coffee</span>
        <span className="mono" style={{ color: "var(--gold)" }}>17</span>
      </div>
    </footer>
  );
}
