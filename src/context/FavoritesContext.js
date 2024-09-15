import React, { createContext, useState, useContext } from "react";

// Create a Context for the Favorites with default value of undefined
const FavoritesContext = createContext();

// Custom hook to use the FavoritesContext more easily in other components
export const useFavorites = () => useContext(FavoritesContext);

// Provider component to wrap around components that need access to the FavoritesContext
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]); // State to keep track of the list of favorite movies

  const addFavorite = (movie) => {
    setFavorites([...favorites, movie]); // Add movie to the existing favorites (function)
  };

  // Function to remove a movie from the favorites list
  const removeFavorite = (movie) => {
    setFavorites(favorites.filter((fav) => fav.id !== movie.id)); // Filter out the movie to be removed
  }; //If the id does not match, the movie is kept in the new list. If it matches, the movie is excluded.

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }} // Provide the context values
    >
      {children}{" "}
      {/* Render child components that will have access to this context */}
    </FavoritesContext.Provider>
  );
};
