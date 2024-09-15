import React from "react";
import "../css/SearchBar.css";

//only re-rendered when their respective props change
const SearchBar = React.memo(({ searchMovie, onSearch }) => (
  <div className="search-bar">
    <input
      type="text"
      value={searchMovie}
      onChange={(e) => onSearch(e.target.value)} // Update searchMovie via onSearch callback when input changes
      placeholder="Search for movies..."
      className="search-input"
    />
  </div>
));

export default SearchBar;
