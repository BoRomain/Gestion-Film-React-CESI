import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WishlistContext } from "../context/WishListProvider";
import styles from "../styles/Wishlist.module.css";

function Wishlist() {
  const navigate = useNavigate();
  const { wishlist, RemoveFromWishlist } = useContext(WishlistContext);

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  function DeleteFromWishlist(movieId) {
    RemoveFromWishlist(movieId);
    setMovies(movies.filter((movie) => movie.id !== movieId));
  }

  useEffect(() => {
    if (wishlist.length > 0) {
      const fetchPromises = wishlist.map((id) =>
        fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${
            import.meta.env.VITE_TMDB_TOKEN
          }`
        ).then((res) => res.json())
      );

      Promise.all(fetchPromises).then((dataArray) => {
        setMovies(dataArray);
      });
    }
  }, []);
  return (
    <div>
      <h1>Wishlist</h1>
      <input
        type="text"
        value={search}
        className={styles.search}
        placeholder="Rechercher un film"
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className={styles.grid}>
        {movies.map(
          (movie) =>
            movie.title.toLowerCase().includes(search.toLowerCase()) && (
              <div key={movie.id} className={styles.card}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
                <h2>{movie.title}</h2>
                <div className="columns2">
                  <button onClick={() => navigate(`/movies/${movie.id}`)}>
                    Voir les détails
                  </button>
                  <button onClick={() => DeleteFromWishlist(movie.id)}>
                    Supprimer
                  </button>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default Wishlist;
