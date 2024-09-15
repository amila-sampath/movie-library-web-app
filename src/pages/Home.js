import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  Suspense,
  lazy,
} from "react";
import "../css/Home.css";
const MovieList = lazy(() => import("../components/MovieList"));
const SearchBar = lazy(() => import("../components/SearchBar"));
const GenreFilter = lazy(() => import("../components/GenreFilter"));

const Home = () => {
  // State variables as below
  const [movies, setMovies] = useState([]); // Holds the list of movies
  const [searchMovie, setSearchMovie] = useState(""); // Holds the current search movie
  const [selectedGenre, setSelectedGenre] = useState(""); // Holds the currently selected genre
  const [genres, setGenres] = useState([]); // Holds the list of genres
  const [page, setPage] = useState(1); // Holds the current page number for pagination
  const [hasMore, setHasMore] = useState(true); // Indicates if there are more movies to load

  // useEffect Purpose: Handles side effects such as data fetching, or manually changing the DOM.
  // Fetch genres on initial render
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=eae3ce9e9c84ddcc99c24562dcfd8a2e"
    )
      .then((response) => response.json())
      .then((data) => setGenres(data.genres));
  }, []); // Empty dependency array, use this runs only once

  // useCallback Purpose: is used to memoize 'fetchMovies' and 'handleScroll' functions, which helps to avoid unnecessary re-creations of these functions on every render.
  // Function to fetch movies based on genre and page & call API
  const fetchMovies = useCallback(async () => {
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=eae3ce9e9c84ddcc99c24562dcfd8a2e&with_genres=${selectedGenre}&page=${page}`;

    if (searchMovie) {
      url = `https://api.themoviedb.org/3/search/movie?api_key=eae3ce9e9c84ddcc99c24562dcfd8a2e&query=${searchMovie}&page=${page}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    // Filter out duplicate movies because api return duplicate id(details as below)
    setMovies((prevMovies) => {
      const existingIds = new Set(prevMovies.map((movie) => movie.id)); // Create a Set of existing movie IDs from the previous state
      const newMovies = data.results.filter(
        (movie) => !existingIds.has(movie.id) // Check if the movie's ID is not in the existing IDs set
      );
      return [...prevMovies, ...newMovies]; // Combine the previous movies with the new, unique movies
    });
    setHasMore(data.results.length > 0); // If api movie length > 0 it means more movies available, else no movies, then setHasMore to false
  }, [selectedGenre, page, searchMovie]); // Dependencies: changes (genre or the page number & searchMovie]); changes then triggered)

  // Fetch movies whenever fetchMovies changes (on genre or page change)
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]); // Dependency on fetchMovies

  // Reset page and movies when genre or search movie changes
  useEffect(() => {
    setPage(1);
    setMovies([]);
  }, [selectedGenre, searchMovie]); // Dependencies: rerun when selectedGenre or searchMovie changes

  // Memoize handleScroll with useCallback
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      !hasMore
    ) {
      return;
    }
    setPage((prevPage) => prevPage + 1);
  }, [hasMore]); // Depend on `hasMore` only

  // Add and clean up scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]); // Dependency on handleScroll

  //useMemo Purpose: useMemo ensures that the expensive computation is only performed when either the movies array or the searchMovie changes
  const filteredMovies = useMemo(() => {
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchMovie.toLowerCase())
    );
  }, [movies, searchMovie]); // Dependencies: rerun when movies or searchMovie changes

  return (
    <div className="home-container">
      <Suspense fallback={<div>Loading SearchBar...</div>}>
        <SearchBar searchMovie={searchMovie} onSearch={setSearchMovie} />
      </Suspense>
      <Suspense fallback={<div>Loading GenreFilter...</div>}>
        <GenreFilter
          genres={genres}
          selectedGenre={selectedGenre}
          onSelectGenre={setSelectedGenre}
        />
      </Suspense>
      <Suspense fallback={<div>Loading MovieList...</div>}>
        <MovieList movies={filteredMovies} />
      </Suspense>
      {hasMore && <p className="loading-more">Loading more movies...</p>}
    </div>
  );
};

export default Home;
