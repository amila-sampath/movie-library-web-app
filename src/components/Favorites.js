import React from "react";
import { useFavorites } from "../context/FavoritesContext";
import MovieCard from "./MovieCard";
import "../css/Favorites.css";

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites(); //useFavorites is used to get the favorites list and removeFavorite function from the context.

  return (
    <div className="favorites-container">
      <h1 className="favorites-title">Favorites</h1>
      {favorites.length === 0 ? (
        <p className="no-favorites">No favorite movies yet.</p>
      ) : (
        // Display a grid of favorite movies
        <div className="movie-card-grid">
          {favorites.map((movie) => (
            <div key={movie.id} className="movie-card-item">
              {/* Render each movie using the MovieCard component (reusable components) */}
              <MovieCard movie={movie} />
              <button
                className="remove-button"
                onClick={() => removeFavorite(movie)} // Handle removal of the movie from favorites
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
