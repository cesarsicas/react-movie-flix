# React Movie Flix

Small movie-listing demo built with React, TypeScript, Vite and Tailwind. It demonstrates a simple movie grid, card components, routing to a details page, and responsive layout using Tailwind utilities.

## Technologies

- React (functional components + hooks)
- TypeScript
- Vite (dev server + build)
- React Router (routing / route params)
- Tailwind CSS (utility-first styling)

## Features

- Responsive movie grid with cards
- Clickable cards that navigate to a details page (`/movie/details/:id`)
- Truncated titles and consistent card sizing with Tailwind
- Example data in `src/components/MoviesList.tsx` (dummy movies)

## Project structure (important files)

- `src/main.tsx` — app entry, router setup
- `src/pages/Home.tsx` — home page that renders the movie list
- `src/components/MoviesList.tsx` — grid of movies
- `src/components/MovieItem.tsx` — single movie card
- `src/pages/MovieDetails.tsx` — details page (reads `:id` via `useParams`)
- `src/model/MovieModel.tsx` — MovieModel class
- `index.html`, `vite.config.ts`, and Tailwind config — build/dev setup

## Getting started (Windows PowerShell)

1. Install dependencies

```powershell
npm install
```

2. Start development server

```powershell
npm run dev
```

3. Open the app

Visit http://localhost:5173 (Vite prints the exact URL in the terminal).

4. Build for production

```powershell
npm run build
```

5. Preview the production build

```powershell
npm run preview
```

## License

This project is provided as-is for learning and demo purposes.
