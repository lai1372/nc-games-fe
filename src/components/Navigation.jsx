import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="navigation">
      <Link className="nav-link" to="/">
        Home
      </Link>
      <Link className="nav-link" to="/users">
        Users
      </Link>
    </nav>
  );
};

export default Navigation;
