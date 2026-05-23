import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>🎬 Movie App</Link>
      <div style={styles.links}>
        <Link to="/movies" style={styles.link}>Movies</Link>
        <Link to="/favorites" style={styles.link}>Favorites</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 32px",
    background: "#1c1c2e",
    color: "white",
  },
  logo: {
    color: "white",
    textDecoration: "none",
    fontSize: "20px",
    fontWeight: "700",
  },
  links: {
    display: "flex",
    gap: "24px",
  },
  link: {
    color: "#a0a0b0",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: "500",
  },
};

export default Navbar;