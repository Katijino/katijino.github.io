import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#ffe4e1' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
      <Link to="/timeline" style={{ marginRight: '1rem' }}>Timeline</Link>
      <Link to="/future">Future Plans</Link>
    </nav>
  );
}
