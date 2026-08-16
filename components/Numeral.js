// عنصر امضای بصری سایت: عدد ۱۷ به شکل واترمارک/برچسب.
// در هیرو به‌عنوان پس‌زمینه بزرگ، در منو به‌عنوان شماره میز/دسته، در فوتر به‌عنوان مهر.
export default function Numeral({ size = 120, style = {} }) {
  return (
    <span
      className="mono"
      aria-hidden="true"
      style={{
        fontSize: size,
        fontWeight: 500,
        color: "var(--gold)",
        opacity: 0.14,
        lineHeight: 1,
        letterSpacing: "-0.04em",
        userSelect: "none",
        ...style,
      }}
    >
      17
    </span>
  );
}
