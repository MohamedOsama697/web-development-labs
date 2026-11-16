import MovieItem from "./MovieItem";

function MovieList({ movies, filter, onToggleWatched, onDeleteMovie }) {
  if (movies.length === 0) {
    const emptyMessage =
      filter === "all"
        ? "Your list is empty. Add a movie to get started."
        : `There are no ${filter === "watched" ? "watched" : "to-watch"} movies yet.`;

    return (
      <div className="empty-state">
        <span className="empty-icon" aria-hidden="true">
          🎬
        </span>
        <p>{emptyMessage}</p>
        {filter === "all" && (
          <p className="empty-hint">Your saved movies will appear here.</p>
        )}
      </div>
    );
  }

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieItem
          key={movie.id}
          movie={movie}
          onToggleWatched={onToggleWatched}
          onDeleteMovie={onDeleteMovie}
        />
      ))}
    </div>
  );
}

export default MovieList;