import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { FavoritesProvider } from "./context/FavoritesContext";

// Lazy load the components
const Home = lazy(() => import("./pages/Home"));
const MovieDetailPage = lazy(() => import("./pages/MovieDetailPage"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage"));

const App = () => (
  <FavoritesProvider>
    <Router>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/:id" element={<MovieDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </Suspense>
    </Router>
  </FavoritesProvider>
);

export default App;
