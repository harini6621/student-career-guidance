export default function SectionTitle({ title, subtitle, align = 'center' }) {
  return (
    <div className={`section-title section-title--${align}`}>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}
