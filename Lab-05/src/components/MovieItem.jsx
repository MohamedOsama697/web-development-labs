function MovieItem({ movie, onToggleWatched, onDeleteMovie }) {
  const stars = "★".repeat(movie.rating) + "☆".repeat(5 - movie.rating);

  return (
    <article className={`movie-card ${movie.watched ? "is-watched" : ""}`}>
      <div className="movie-card-main">
        <div className="movie-card-heading">
          <h3>{movie.title}</h3>
          <span
            className={`status-badge ${
              movie.watched ? "watched-badge" : "to-watch-badge"
            }`}
          >
            {movie.watched ? "Watched" : "To watch"}
          </span>
        </div>

        <p className="movie-rating" aria-label={`Rated ${movie.rating} out of 5`}>
          <span aria-hidden="true">{stars}</span>
          <span className="rating-number">{movie.rating}/5</span>
        </p>

        {movie.review ? (
          <p className="movie-review">{movie.review}</p>
        ) : (
          <p className="movie-review no-review">No review added yet.</p>
        )}
      </div>

      <div className="movie-actions">
        <button
          className="text-button"
          type="button"
          onClick={() => onToggleWatched(movie.id)}
        >
          {movie.watched ? "Move to watch list" : "Mark as watched"}
        </button>
        <button
          className="delete-button"
          type="button"
          onClick={() => onDeleteMovie(movie.id)}
          aria-label={`Remove ${movie.title} from your list`}
        >
          Remove
        </button>
      </div>
    </article>
  );
}

export default MovieItem;