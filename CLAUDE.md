# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Commands

```bash
npm run dev        # dev server at http://localhost:5173
npm run build      # tsc + vite build
npm run lint       # eslint
npm run preview    # preview production build
```

No test runner is configured. There are no test files in the repo.

The backend must be running at `http://localhost:8080`. The base URL and localStorage token keys are defined in `src/utils/Constants.ts`.

---

## Architecture

Three-layer Clean Architecture: **Data → Domain → Presentation**.

- **`data/api/`** — raw `fetch` calls, returns typed DTOs (`data/model/`)
- **`data/redux/`** — Redux Toolkit store with two slices: `releases` (movie list cache) and `profile` (user profile cache)
- **`domain/usecases/`** — orchestrate API calls, transform DTOs → domain models (`domain/model/`), and dispatch to Redux
- **`presentation/pages/`** — React Router pages; each page owns its loader and/or action
- **`presentation/components/`** — shared UI, no business logic

**Data flow:** loader/action → use case → API function → Redux slice (for caching).

---

## Routing

All routes and their loaders/actions are defined in `presentation/App.tsx`. Two independent route trees:

**User routes (`/`)**
- `/` — Home (`moviesLoader`)
- `/auth` — Login/Signup (`authformAction`)
- `/logout` — clears user token
- `/title/details/:externalId` — MovieDetails (`titleDetailsLoader`, `movieReviewAction`)
- `/title/search` — SearchResult (`titleSearchLoader`)
- `/profile` — Profile view (`profileLoader`)
- `/profile/edit` — Profile edit (`profileEditLoader`, `profileEditAction`)
- `/watch-party` — public live stream view; polls `/transmissions/current` every 5 s until a transmission is found, then stops
- `/chat` — AI chat (`chatLoader`)

**Admin routes (`/admin`)**
- `/admin` — root; redirects to `/admin/home` if token present, else `/admin/login`
- `/admin/login` — AdminLogin (`adminLoginAction`)
- `/admin/home` — dashboard (requires admin token)
- `/admin/watch-party` — transmission manager (`watchPartyHomeLoader`, `watchPartyHomeAction`)
- `/admin/watch-party/new` — pick movie to stream (`newTransmissionLoader`, `newTransmissionAction`)
- `/admin/watch-party/upload` — file upload UI (**upload logic is mocked**)

---

## Auth

Two separate JWT systems, both stored in `localStorage`:

| System | Key | Utility file |
|---|---|---|
| User | `"token"` | `src/utils/auth.tsx` |
| Admin | `"admin_token"` | `src/utils/adminAuth.ts` |

Route loaders act as auth guards. `checkAdminAuthLoader()` redirects to `/admin/login` if no admin token is found. The user-side equivalent (`checkAuthLoader()`) exists but is not currently applied to any route — user routes load their token with `tokenLoader()` without hard-redirecting.

---

## Redux Caching

Redux is used only for in-memory cache, not for UI state. Use cases check the cache before hitting the API:

```typescript
const cached = store.getState().releases.movies
if (cached.length > 0) return cached   // skip API call
const response = await getTitles()
store.dispatch(saveLocalReleases(response))
```

The same pattern applies to the profile slice. The typed hooks in `src/data/redux/hooks.ts` are commented out; components access the store via direct imports instead.

---

## Key Non-Obvious Details

- **`movieReviewAction`** returns `{ ok: true, review }` and the `MovieDetails` component reads it via `useActionData()`, then appends the review to local state — the review list is not re-fetched.
- **`uploadMovieUseCase`** is a mock: it resolves after 500 ms and returns dummy data. Real file upload is not implemented.
- **HLS video** is handled by `HlsPlayer.tsx` (uses `hls.js` with a native `<video>` fallback for Safari). Title stream URL: `{BASE_URL}/titles/{externalId}/stream`. Watch Party stream: `{BASE_URL}/live/stream.m3u8`.
- **`?useCache=true`** query param is appended to title API requests as a hint to the Spring backend to serve from its own PostgreSQL cache rather than re-fetching from the WatchMode API.
- The `Home` loader pre-fetches both releases and profile so Redux is warm before child pages render.
