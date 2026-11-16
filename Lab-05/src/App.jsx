import { useState } from "react";
import "./App.css";
import MovieForm from "./components/MovieForm";
import MovieList from "./components/MovieList";

const filters = [
  { value: "all", label: "All movies" },
  { value: "to-watch", label: "To watch" },
  { value: "watched", label: "Watched" },
];

function App() {
  const [movies, setMovies] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");

  const watchedCount = movies.filter((movie) => movie.watched).length;
  const toWatchCount = movies.length - watchedCount;
  const visibleMovies = movies.filter((movie) => {
    if (activeFilter === "watched") {
      return movie.watched;
    }

    if (activeFilter === "to-watch") {
      return !movie.watched;
    }

    return true;
  });

  function handleAddMovie(newMovie) {
    setMovies((currentMovies) => [...currentMovies, newMovie]);
  }

  function handleToggleWatched(movieId) {
    setMovies((currentMovies) =>
      currentMovies.map((movie) =>
        movie.id === movieId
          ? { ...movie, watched: !movie.watched }
          : movie
      )
    );
  }

  function handleDeleteMovie(movieId) {
    setMovies((currentMovies) =>
      currentMovies.filter((movie) => movie.id !== movieId)
    );
  }

  return (
    <main className="app-shell">
      <header className="page-header">
        <p className="eyebrow">YOUR PERSONAL CINEMA</p>
        <h1>
          Movies to watch.
          <br />
          <span>Stories to remember.</span>
        </h1>
        <p className="page-intro">
          Keep track of the films you love, the ones you want to see, and what
          you thought of them.
        </p>
      </header>

      <div className="watch-list-layout">
        <aside className="form-panel">
          <MovieForm onAddMovie={handleAddMovie} />
        </aside>

        <section className="collection-panel" aria-labelledby="collection-title">
          <div className="collection-heading">
            <div>
              <p className="eyebrow">YOUR COLLECTION</p>
              <h2 id="collection-title">My watch list</h2>
            </div>
            <p className="movie-count">
              <strong>{movies.length}</strong>{" "}
              {movies.length === 1 ? "movie" : "movies"}
            </p>
          </div>

          <div className="collection-summary" aria-label="Movie totals">
            <p>
              <span className="summary-dot to-watch-dot" />
              {toWatchCount} to watch
            </p>
            <p>
              <span className="summary-dot watched-dot" />
              {watchedCount} watched
            </p>
          </div>

          <nav className="filter-tabs" aria-label="Filter movies">
            {filters.map((filter) => (
              <button
                className={`filter-tab ${
                  activeFilter === filter.value ? "active" : ""
                }`}
                type="button"
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                aria-pressed={activeFilter === filter.value}
              >
                {filter.label}
              </button>
            ))}
          </nav>

          <MovieList
            movies={visibleMovies}
            filter={activeFilter}
            onToggleWatched={handleToggleWatched}
            onDeleteMovie={handleDeleteMovie}
          />
        </section>
      </div>

      <footer className="page-footer">
        <p>Your next favorite film is waiting.</p>
      </footer>
    </main>
  );
}

export default App;
