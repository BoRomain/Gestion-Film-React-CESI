import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../styles/MovieDetail.module.css";
import WishlistBtn from "./WishlistBtn";

function MovieDetail() {
  const navigate = useNavigate();

  const [movie, setMovie] = useState({});
  const [actors, setActors] = useState([]);
  const [trailer, setTrailer] = useState({});
  const [similarMovies, setSimilarMovies] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        id +
        "?api_key=" +
        import.meta.env.VITE_TMDB_TOKEN
    )
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, []);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        id +
        "/credits?api_key=" +
        import.meta.env.VITE_TMDB_TOKEN
    )
      .then((res) => res.json())
      .then((data) => setActors(data.cast.slice(0, 10)));
  }, []);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        id +
        "/videos?api_key=" +
        import.meta.env.VITE_TMDB_TOKEN
    )
      .then((res) => res.json())
      .then((data) => setTrailer(data.results[0]));
  }, []);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        id +
        "/similar?api_key=" +
        import.meta.env.VITE_TMDB_TOKEN
    )
      .then((res) => res.json())
      .then((data) => setSimilarMovies(data.results.slice(0, 10)));
  }, []);

  return (
    <div>
      <h1>{movie.title}</h1>
      <img
        src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
        alt={movie.title}
      />
      <p>{movie.overview}</p>
      <iframe
        width="560"
        height="315"
        src={"https://www.youtube.com/embed/" + trailer.key}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
      <p>Date de sortie : {movie.release_date}</p>
      <p>Note : {movie.vote_average} / 10 ⭐</p>
      <WishlistBtn movieId={movie.id} />
      <h2>Acteurs</h2>
      <div className={styles.actorsList}>
        {actors.map((actor) => (
          <div key={actor.id} className={styles.actorCard}>
            <img
              src={"https://image.tmdb.org/t/p/w500" + actor.profile_path}
              alt={actor.name}
            />
            <p>{actor.name}</p>
          </div>
        ))}
      </div>
      <h2>Films similaires</h2>
      <div className={styles.similarMoviesList}>
        {similarMovies.map((movie) => (
          <div key={movie.id} className={styles.similarMovieCard}>
            <img
              src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
              alt={movie.title}
            />
            <p>{movie.title}</p>
            <WishlistBtn movieId={movie.id} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieDetail;
