import React from "react";
import "../css/GenreFilter.css";

//only re-rendered when their respective props change
const GenreFilter = React.memo(({ genres, selectedGenre, onSelectGenre }) => (
  <div className="genre-filter">
    <select
      value={selectedGenre} // Set the selected value based on the selectedGenre prop
      onChange={(e) => onSelectGenre(e.target.value)} // Call onSelectGenre with the new value when changed
      className="genre-select"
    >
      <option value="">All Genres</option>
      {genres.map((genre) => (
        <option key={genre.id} value={genre.id}>
          {genre.name}
        </option>
      ))}
    </select>
  </div>
));

export default GenreFilter;
