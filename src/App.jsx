import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import axios from "axios";
import Home from "./components/Home";
import Favorites from "./components/Favorites";
const App = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const postsPerPage = 12;

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setPosts(response.data);
        setFilteredPosts(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Data is fetched. Please try again later!");
        setLoading(false);
      });

    const savedFavorites =
      JSON.parse(localStorage.getItem("favoritePosts")) || [];
    setFavorites(savedFavorites);
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(term)
    );
    setFilteredPosts(filtered);
    setCurrentPage(1);
  };

  const toggleFavorite = (post) => {
    let updatedFavorites;
    if (favorites.some((fav) => fav.id === post.id)) {
      updatedFavorites = favorites.filter((fav) => fav.id !== post.id);
    } else {
      updatedFavorites = [...favorites, post];
    }
    setFavorites(updatedFavorites);

    localStorage.setItem("favoritePosts", JSON.stringify(updatedFavorites));
  };

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              posts={filteredPosts}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              handleSearch={handleSearch}
              searchTerm={searchTerm}
              loading={loading}
              error={error}
              currentPage={currentPage}
              postsPerPage={postsPerPage}
              handlePageChange={handlePageChange}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites favorites={favorites} toggleFavorite={toggleFavorite} />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
