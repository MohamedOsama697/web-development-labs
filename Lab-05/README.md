# My Movie Watch List

A small React app for keeping a personal list of movies. Add a title, rating, and
optional review; mark movies as watched; filter the list; or remove a movie.
This project is made for practicing components, props, JSX, `useState`, lists,
conditional rendering, and event handlers.

## Run the app

1. Install the project packages with `npm install`.
2. Start the development server with `npm run dev`.
3. Open the local address printed in the terminal.

Use `npm run lint` to check the code or `npm run build` to create the production
version in the `dist` folder.

Movie data is kept in React state while the page is open. It is not saved after
you refresh or close the page.

## How the React app works

### `src/main.jsx`

This is the starting point for the React code. `createRoot` connects React to
the `<div id="root">` in `index.html`, then displays the `App` component.
`StrictMode` is a development helper that can point out some coding mistakes.
The import of `index.css` loads the styles shared by the whole page.

### `src/App.jsx`

`App` is the parent component and owns the movie list:

- `useState([])` creates the list. Each movie is an object containing an `id`,
  `title`, `rating`, `review`, and `watched` value.
- A second `useState` remembers which filter is selected. The movie totals and
  filtered list are calculated from the state, so they stay in sync.
- `handleAddMovie`, `handleToggleWatched`, and `handleDeleteMovie` update the
  list. They are passed to child components as props, so a child can tell the
  parent what the user did.
- The `filters.map(...)` call makes one filter button for each filter option.
  `visibleMovies` is passed to `MovieList`.
- The JSX arranges the page and passes props to `MovieForm` and `MovieList`.

### `src/components/MovieForm.jsx`

This component displays the form for adding a movie. Its `title`, `rating`,
`review`, and `error` state values are updated by the input event handlers.
These are controlled inputs: React state provides each field's `value`, and
`onChange` updates that value as the user types.

When the form is submitted, `handleSubmit` stops the browser's normal page
reload, checks that the title is not blank, and calls the `onAddMovie` function
it received as a prop. The form then clears its fields. The new movie starts as
unwatched.

### `src/components/MovieList.jsx`

This component receives the visible movies and event-handler props. If there are
no visible movies, it returns a helpful empty message. Otherwise, `movies.map`
creates a `MovieItem` for every movie. Each item has a `key` so React can keep
track of it when the list changes.

### `src/components/MovieItem.jsx`

This component displays one movie's title, watched status, rating, and review.
Conditional rendering shows a different status label and action depending on
whether the movie has been watched, and shows a placeholder when there is no
review. Its buttons call the handler props to change the movie status or remove
the movie.

## Other project files

- `index.html` is the web page Vite serves. It provides the root element for
  React, the page title, description, and favicon.
- `src/index.css` contains page-wide styles, colors, and basic resets.
- `src/App.css` contains the layout and styles for the form, filters, empty
  state, and movie cards. It also includes rules for narrow screens.
- `public/favicon.svg` is the small movie-themed icon shown by the browser.
- `public/icons.svg` contains SVG icon symbols from the starter project; this
  app does not currently use them.
- `src/assets/hero.png`, `src/assets/react.svg`, and `src/assets/vite.svg` are
  starter-project images that are not currently used by the app.
- `package.json` lists the React and Vite packages and the `dev`, `build`,
  `lint`, and `preview` commands.
- `package-lock.json` records the exact package versions installed by npm.
- `vite.config.js` enables Vite's React support.
- `.oxlintrc.json` selects the lint rules used for React.
- `.gitignore` lists generated files and local editor files that should not be
  included in version control.

## Try it out

1. Add a movie with a rating and an optional note.
2. Switch between **All movies**, **To watch**, and **Watched**.
3. Mark a movie as watched, then move it back to the watch list.
4. Remove a movie and notice how the totals update.
