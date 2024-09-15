import React from "react";
import { Link } from "react-router-dom";
import "../css/MovieCard.css";

// React.memo is used to optimize performance by memoizing the component
// This prevents unnecessary re-renders if the props (in this case, movie) don't change
const MovieCard = React.memo(({ movie }) => {
  const { id, title, poster_path, vote_average, release_date } = movie; //simplifies access to properties in an object by creating individual variables

  return (
    <div className="card">
      {/* Link to the detailed movie page using the id */}
      <Link to={`/movies/${id}`} className="link">
        <img
          className="poster"
          src={`https://image.tmdb.org/t/p/w500${poster_path}`} // image URL using the poster_path
          alt={title}
          loading="lazy"
        />
        <div className="info">
          <h3 className="title">{title}</h3>
          <p className="releaseDate">{release_date}</p>
          <div className="rating">
            <span>⭐</span> {vote_average}
          </div>
        </div>
      </Link>
    </div>
  );
});

export default MovieCard;
