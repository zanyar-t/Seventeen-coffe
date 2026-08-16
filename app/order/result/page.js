const MESSAGES = {
  paid: { title: "پرداخت موفق بود", desc: "سفارشت ثبت شد، منتظرت هستیم.", color: "var(--gold)" },
  failed: { title: "پرداخت ناموفق بود", desc: "مشکلی پیش اومد، دوباره امتحان کن.", color: "#b0453e" },
  canceled: { title: "پرداخت لغو شد", desc: "هر وقت خواستی دوباره سفارش بده.", color: "var(--ink-soft)" },
  notfound: { title: "سفارش پیدا نشد", desc: "لطفاً دوباره تلاش کن.", color: "var(--ink-soft)" },
};

export default function OrderResult({ searchParams }) {
  const status = searchParams?.status || "notfound";
  const refId = searchParams?.refId;
  const info = MESSAGES[status] || MESSAGES.notfound;

  return (
    <main className="container" style={{ padding: "96px 24px", textAlign: "center" }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, color: info.color }}>{info.title}</h1>
      <p style={{ color: "var(--ink-soft)", marginTop: 12 }}>{info.desc}</p>
      {refId && (
        <p className="mono" style={{ marginTop: 20, fontSize: 14 }}>
          کد پیگیری: {refId}
        </p>
      )}
    </main>
  );
}
