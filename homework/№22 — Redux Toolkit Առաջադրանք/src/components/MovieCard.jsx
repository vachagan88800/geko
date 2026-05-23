import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../features/favorites/favoritesSlice";

function MovieCard({ id, title, image, year }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.movies);
  const isFavorite = favorites.some((m) => m.id === id);

  function handleFavorite() {
    if (isFavorite) {
      dispatch(removeFavorite(id));
    } else {
      dispatch(addFavorite({ id, title, image, year }));
    }
  }

  return (
    <div style={styles.card}>
      <img src={image} alt={title} style={styles.image} />
      <div style={styles.info}>
        <h2 style={styles.title}>{title}</h2>
        <p style={styles.year}>{year}</p>
        <div style={styles.buttons}>
          <Link to={`/movies/${id}`} style={styles.detailsBtn}>
            Details
          </Link>
          <button
            onClick={handleFavorite}
            style={{
              ...styles.favBtn,
              background: isFavorite ? "#fa5252" : "#2b2b3b",
            }}
          >
            {isFavorite ? "❤️ Remove" : "🤍 Favorite"}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "#1c1c2e",
    borderRadius: "12px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  image: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
  },
  info: {
    padding: "16px",
  },
  title: {
    color: "white",
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "6px",
  },
  year: {
    color: "#a0a0b0",
    fontSize: "14px",
    marginBottom: "12px",
  },
  buttons: {
    display: "flex",
    gap: "8px",
  },
  detailsBtn: {
    padding: "8px 16px",
    background: "#339af0",
    color: "white",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: "500",
  },
  favBtn: {
    padding: "8px 16px",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
  },
};

export default MovieCard;