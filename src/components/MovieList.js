import React from "react";
import MovieCard from "./MovieCard";
import "../css/MovieList.css";

// React.memo is used to optimize performance by memoizing the component
// This prevents unnecessary re-renders if the props (in this case, movies) don't change
const MovieList = React.memo(({ movies }) => (
  <div className="movieCardContainer">
    {movies.map((movie) => (
      <MovieCard key={movie.id} movie={movie} />
    ))}
  </div>
));

export default MovieList;
