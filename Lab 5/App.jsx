import React, { useState } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [titleInput, setTitleInput] = useState("");

  function handleAddMovie() {
    if (!titleInput.trim()) return;
    const newMovie = {
      id: Date.now(),
      title: titleInput,
      watched: false,
      expanded: false,
      rating: 0,
      comment: "",
      commentInput: ""
    };
    setMovies([...movies, newMovie]);
    setTitleInput("");
  }

  function toggleWatched(id) {
    setMovies(movies.map(m => m.id === id ? { ...m, watched: !m.watched } : m));
  }

  function toggleExpand(id) {
    setMovies(movies.map(m => m.id === id ? { ...m, expanded: !m.expanded } : m));
  }

  function removeMovie(id) {
    setMovies(movies.filter(m => m.id !== id));
  }

  function updateRating(id, rating) {
    setMovies(movies.map(m => m.id === id ? { ...m, rating: Number(rating) } : m));
  }

  function updateCommentInput(id, text) {
    setMovies(movies.map(m => m.id === id ? { ...m, commentInput: text } : m));
  }

  function saveComment(id) {
    setMovies(movies.map(m => 
      m.id === id ? { ...m, comment: m.commentInput, commentInput: "" } : m
    ));
  }

  return (
    <div className="todo-card">
      <h1>Movies Watch List</h1>
      <div className="input-group">
        <input 
          type="text" 
          placeholder="What movie do you want to watch?" 
          value={titleInput} 
          onChange={(e) => setTitleInput(e.target.value)} 
        />
        <button onClick={handleAddMovie}>Add</button>
      </div>

      <ul className="movie-list">
        {movies.map((movie) => (
          <li key={movie.id} className="movie-item">
            <div className="movie-header">
              <div className="movie-title-area" onClick={() => toggleWatched(movie.id)}>
                <input type="checkbox" checked={movie.watched} readOnly />
                <span className={`movie-title ${movie.watched ? "watched" : ""}`}>
                  {movie.title}
                </span>
                <span className="star-display">{"⭐".repeat(movie.rating)}</span>
              </div>
              <div className="actions">
                <button className="arrow-btn" onClick={() => toggleExpand(movie.id)}>
                  {movie.expanded ? "▲" : "▼"}
                </button>
                <button className="delete-btn" onClick={() => removeMovie(movie.id)}>✕</button>
              </div>
            </div>

            {movie.expanded && (
              <div className="submenu">
                <div className="submenu-row">
                  <label>Rate:</label>
                  <select value={movie.rating} onChange={(e) => updateRating(movie.id, e.target.value)}>
                    <option value={0}>0 Stars</option>
                    <option value={1}>1 Star</option>
                    <option value={2}>2 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={5}>5 Stars</option>
                  </select>
                </div>
                <div className="submenu-row">
                  <label>Add a comment:</label>
                  <div className="comment-box">
                    <input 
                      type="text" 
                      placeholder="Write review..." 
                      value={movie.commentInput} 
                      onChange={(e) => updateCommentInput(movie.id, e.target.value)} 
                    />
                    <button onClick={() => saveComment(movie.id)}>Submit</button>
                  </div>
                </div>
                {movie.comment && <p className="saved-comment">Review: "{movie.comment}"</p>}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;