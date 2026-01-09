import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/MoviesList.module.css";
import WishlistBtn from "./WishlistBtn";

function MoviesList() {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  function GetMoviesBySearch(search) {
    fetch(
      "https://api.themoviedb.org/3/search/movie?api_key=" +
        import.meta.env.VITE_TMDB_TOKEN +
        "&query=" +
        search
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
  }

  function GetMoviesByCategory(category) {
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        category +
        "?api_key=" +
        import.meta.env.VITE_TMDB_TOKEN
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
  }

  useEffect(() => {
    GetMoviesByCategory("now_playing");
  }, []);

  return (
    <div>
      <h1>Liste de films</h1>
      <div className={styles.searchbox}>
        <input
          type="text"
          value={search}
          placeholder="Rechercher un film"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={(e) => GetMoviesBySearch(search)}>Rechercher</button>
      </div>
      <div className={styles.categoriesbox}>
        <button onClick={(e) => GetMoviesByCategory("now_playing")}>
          En ce moment
        </button>
        <button onClick={(e) => GetMoviesByCategory("popular")}>
          Populaires
        </button>
        <button onClick={(e) => GetMoviesByCategory("top_rated")}>
          les mieux notés
        </button>
        <button onClick={(e) => GetMoviesByCategory("upcoming")}>
          A venir
        </button>
      </div>
      <div className={styles.grid}>
        {movies.map((movie) => (
          <div className={styles.card} key={movie.id}>
            <img
              src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
            <p>{movie.vote_average.toFixed(1)} / 10 ⭐</p>
            <div className="columns2">
              <button
                className="detail-btn"
                onClick={() => navigate(`/movies/${movie.id}`)}
              >
                Voir les détails
              </button>
              <WishlistBtn movieId={movie.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoviesList;
