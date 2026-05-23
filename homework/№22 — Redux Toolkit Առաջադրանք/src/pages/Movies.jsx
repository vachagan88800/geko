import MovieCard from "../components/MovieCard";
import movies from "../data/movies";

function Movies() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>All Movies</h1>
      <div style={styles.grid}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            image={movie.image}
            year={movie.year}
          />
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
  title: {
    color: "white",
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "24px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
  },
};

export default Movies;