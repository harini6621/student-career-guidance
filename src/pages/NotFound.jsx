import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';

export default function NotFound() {
  return (
    <section className="container not-found">
      <h1>404</h1>
      <h2>We couldn’t find that page</h2>
      <p>The link may be broken or the page may have moved. Head back home and pick a path from the menu.</p>
      <Link to="/" className="btn btn--primary"><FiHome /> Back to Home</Link>
    </section>
  );
}
