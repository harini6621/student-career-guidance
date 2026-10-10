export default function PageHeader({ icon, title, subtitle, children }) {
  return (
    <section className="page-header">
      <div className="page-header__shape page-header__shape--one" />
      <div className="page-header__shape page-header__shape--two" />
      <div className="container page-header__content">
        {icon && <span className="page-header__icon">{icon}</span>}
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
