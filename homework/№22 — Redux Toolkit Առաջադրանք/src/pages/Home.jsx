import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎬 Welcome to Movie App</h1>
      <p style={styles.description}>
        Discover the best movies and save your favorites.
      </p>
      <Link to="/movies" style={styles.button}>
        Browse Movies
      </Link>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "100px auto",
    textAlign: "center",
    padding: "0 20px",
  },
  title: {
    fontSize: "36px",
    fontWeight: "700",
    color: "white",
    marginBottom: "16px",
  },
  description: {
    fontSize: "16px",
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

export default Home;