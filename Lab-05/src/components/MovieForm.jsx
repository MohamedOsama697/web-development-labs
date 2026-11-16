import { useState } from "react";

function MovieForm({ onAddMovie }) {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("5");
  const [review, setReview] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (trimmedTitle === "") {
      setError("Please enter a movie title.");
      return;
    }

    onAddMovie({
      id: Date.now(),
      title: trimmedTitle,
      rating: Number(rating),
      review: review.trim(),
      watched: false,
    });

    setTitle("");
    setRating("5");
    setReview("");
    setError("");
  }

  return (
    <form className="movie-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <p className="eyebrow">START A COLLECTION</p>
        <h2>Add a movie</h2>
        <p className="form-description">
          Save a film for later, or add one you have already seen.
        </p>
      </div>

      <div className="form-field">
        <label htmlFor="movie-title">Movie title</label>
        <input
          id="movie-title"
          type="text"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            setError("");
          }}
          placeholder="For example, Moonlight"
          required
          aria-invalid={error !== ""}
          aria-describedby={error ? "title-error" : undefined}
        />
        {error && (
          <p className="form-error" id="title-error" role="alert">
            {error}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="movie-rating">Your rating</label>
        <select
          id="movie-rating"
          value={rating}
          onChange={(event) => setRating(event.target.value)}
        >
          <option value="5">5 stars - Loved it</option>
          <option value="4">4 stars - Really liked it</option>
          <option value="3">3 stars - It was okay</option>
          <option value="2">2 stars - Not for me</option>
          <option value="1">1 star - Did not like it</option>
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="movie-review">Your review</label>
        <textarea
          id="movie-review"
          value={review}
          onChange={(event) => setReview(event.target.value)}
          placeholder="What should you remember about it?"
          rows="4"
        />
      </div>

      <button className="add-button" type="submit">
        <span aria-hidden="true">+</span> Add to my list
      </button>
    </form>
  );
}

export default MovieForm;