import { useSelector, useDispatch } from "react-redux";
import { removeFavorite } from "../features/favorites/favoritesSlice";
import { Link } from "react-router-dom";

function Favorites() {
  const favorites = useSelector((state) => state.favorites.movies);
  const dispatch = useDispatch();

  if (favorites.length === 0) {
    return (
      <div style={styles.empty}>
        <h1 style={styles.title}>❤️ Favorites</h1>
        <p style={styles.emptyText}>No favorite movies</p>
        <Link to="/movies" style={styles.button}>Browse Movies</Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>❤️ Favorites</h1>
      <div style={styles.grid}>
        {favorites.map((movie) => (
          <div key={movie.id} style={styles.card}>
            <img src={movie.image} alt={movie.title} style={styles.image} />
            <div style={styles.info}>
              <h2 style={styles.movieTitle}>{movie.title}</h2>
              <p style={styles.year}>{movie.year}</p>
              <div style={styles.buttons}>
                <Link to={`/movies/${movie.id}`} style={styles.detailsBtn}>
                  Details
                </Link>
                <button
                  onClick={() => dispatch(removeFavorite(movie.id))}
                  style={styles.removeBtn}
                >
                  ❌ Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "40px auto",
    padding: "0 20px",
  },
  empty: {
    maxWidth: "400px",
    margin: "100px auto",
    textAlign: "center",
    padding: "0 20px",
  },
  title: {
    color: "white",
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "24px",
  },
  emptyText: {
    color: "#a0a0b0",
    fontSize: "16px",
    marginBottom: "24px",
  },
  button: {
    padding: "10px 24px",
    background: "#339af0",
    color: "white",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#1c1c2e",
    borderRadius: "12px",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "280px",
    objectFit: "cover",
  },
  info: {
    padding: "16px",
  },
  movieTitle: {
    color: "white",
    fontSize: "15px",
    fontWeight: "600",
    marginBottom: "6px",
  },
  year: {
    color: "#a0a0b0",
    fontSize: "13px",
    marginBottom: "12px",
  },
  buttons: {
    display: "flex",
    gap: "8px",
  },
  detailsBtn: {
    padding: "6px 14px",
    background: "#339af0",
    color: "white",
    borderRadius: "6px",
    textDecoration: "none",
    fontSize: "13px",
  },
  removeBtn: {
    padding: "6px 14px",
    background: "#fa5252",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "13px",
    cursor: "pointer",
  },
};

export default Favorites;