import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import "../css/MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams(); // Get the movie ID from the URL parameters (Call from MovieCard.js)
  const navigate = useNavigate(); // Hook to programmatically navigate between pages
  const [movie, setMovie] = useState(null); // State to store movie details
  const { favorites, addFavorite, removeFavorite } = useFavorites(); // Access favorites and functions from the context

  // Fetch movie details
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=eae3ce9e9c84ddcc99c24562dcfd8a2e`
    )
      .then((response) => response.json())
      .then((data) => setMovie(data)); // Set the movie details in state
  }, [id]); // Dependency array: re-run effect if `id` changes

  // Display a loading message if the movie details are not yet available
  if (!movie) return <div className="loading">Loading...</div>;

  // Check if the movie is in the favorites list, this will help to control below button
  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  return (
    <div className="movie-details-container">
      <button className="back-button" onClick={() => navigate("/")}>
        Back to Home
      </button>
      <div className="movie-details-content">
        <img
          className="movie-poster"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // image URL using the poster_path
          alt={movie.title}
        />
        <div className="movie-info">
          <h1 className="movie-title">{movie.title}</h1>
          <p className="movie-overview">{movie.overview}</p>
          <p className="movie-status">Status: {movie.status}</p>
          <p className="movie-release-date">
            Release Date: {movie.release_date}
          </p>
          <div className="movie-rating">
            <span>⭐</span> {movie.vote_average}
          </div>
          <button
            className="favorite-button"
            onClick={() =>
              isFavorite ? removeFavorite(movie) : addFavorite(movie)
            }
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
