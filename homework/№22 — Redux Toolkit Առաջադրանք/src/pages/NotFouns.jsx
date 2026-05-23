import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <p style={styles.description}>Page not found</p>
      <Link to="/" style={styles.button}>Go Home</Link>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "100px auto",
    textAlign: "center",
    padding: "0 20px",
  },
  title: {
    fontSize: "72px",
    fontWeight: "700",
    color: "#339af0",
    marginBottom: "16px",
  },
  description: {
    fontSize: "18px",
    color: "#a0a0b0",
    marginBottom: "32px",
  },
  button: {
    padding: "12px 32px",
    background: "#339af0",
    color: "white",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: "500",
  },
};

export default NotFound;