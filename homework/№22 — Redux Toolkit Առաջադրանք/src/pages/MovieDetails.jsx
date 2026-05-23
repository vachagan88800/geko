import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../features/favorites/favoritesSlice";
import movies from "../data/movies";

function MovieDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.movies);

  const movie = movies.find((m) => m.id === Number(id));
  const isFavorite = favorites.some((m) => m.id === movie?.id);

  if (!movie) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Movie not found</h1>
        <Link to="/movies" style={styles.back}>Back to Movies</Link>
      </div>
    );
  }

  function handleFavorite() {
    if (isFavorite) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite({ id: movie.id, title: movie.title, image: movie.image, year: movie.year }));
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img src={movie.image} alt={movie.title} style={styles.image} />
        <div style={styles.info}>
          <h1 style={styles.title}>{movie.title}</h1>
          <p style={styles.meta}>📅 {movie.year}</p>
          <p style={styles.meta}>⭐ {movie.rating}</p>
          <p style={styles.description}>{movie.description}</p>
          <div style={styles.buttons}>
            <button
              onClick={handleFavorite}
              style={{
                ...styles.favBtn,
                background: isFavorite ? "#fa5252" : "#339af0",
              }}
            >
              {isFavorite ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
            </button>
            <Link to="/movies" style={styles.back}>← Back to Movies</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "40px auto",
    padding: "0 20px",
  },
  card: {
    display: "flex",
    gap: "32px",
    background: "#1c1c2e",
    borderRadius: "12px",
    overflow: "hidden",
    padding: "24px",
  },
  image: {
    width: "200px",
    borderRadius: "8px",
    objectFit: "cover",
  },
  info: {
    flex: 1,
  },
  title: {
    color: "white",
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "12px",
  },
  meta: {
    color: "#a0a0b0",
    fontSize: "15px",
    marginBottom: "8px",
  },
  description: {
    color: "#c0c0d0",
    fontSize: "15px",
    lineHeight: "1.6",
    marginBottom: "24px",
    marginTop: "12px",
  },
  buttons: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },
  favBtn: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
  },
  back: {
    color: "#a0a0b0",
    textDecoration: "none",
    fontSize: "14px",
  },
};

export default MovieDetails;