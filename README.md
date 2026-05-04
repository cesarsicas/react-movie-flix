# React Flix

A movie and series web application built with **React**, **TypeScript**, **Vite**, **Redux**, **React Router**, and **Tailwind CSS**.
It demonstrates authentication with **JWT tokens**, a responsive UI, clean archiftecture organization, and several real-world features such as title browsing, reviews, user profile management, HLS video streaming, and a live Watch Party system with an admin control panel.

> **Important:**  
> This frontend must be used together with the backend available in this repository:  
> **https://github.com/cesarsicas/spring-movie-flix**

---
## 🎥 Preview


https://github.com/user-attachments/assets/905d6a41-5f8b-4c6d-a706-fde761740fb0


## 🎥 Preview


https://github.com/user-attachments/assets/905d6a41-5f8b-4c6d-a706-fde761740fb0



## 🚀 Technologies Used

- **React** (functional components + hooks)
- **TypeScript**
- **Vite** (dev server and production build)
- **React Router** (routing, route params, loaders, and actions)
- **Redux Toolkit** (global state + caching)
- **Tailwind CSS** (utility-first styling)
- **JWT Authentication** (using local storage)
- **hls.js** (HLS video stream playback with native Safari fallback)
- **hls.js** (HLS video stream playback with native Safari fallback)

---

## ⭐ Features

### 🔐 Authentication

- User signup (email + password)
- User login (email + password)
- Persistent auth using a received **JWT token**
- Private routes for authenticated users

### 🎬 Titles

- Grid of movies and series on the Home page (new releases and trending)
- **Title browse page** (`/titles`) with multi-filter support: type, genre, sort, rating range, release year range, and pagination
- **Title details page** with:
  - Synopsis, trailer embed (YouTube)
  - Cast (actors with `order = 1`) and Crew (Directors and Writers), all linked to person pages
  - Movie metadata: genre, year, duration, rating
- **Autocomplete search** across titles and people, with tab filters (All / Movies / TV / People)

### 👤 People

- **Person details page** (`/person/:id`) showing bio, profession, gender, birth/death info, and a full table of titles they appeared in
- Person cards link from search results, title cast/crew sections, and anywhere people are listed

### 💬 Reviews

- View reviews submitted by users on any title
- Submit a new review (**only logged-in users**)

### 👤 Profile

- View profile info (**only logged-in users**)
- Edit profile info (**only logged-in users**)

### 📺 Watch Party

- Public `/watch-party` page that shows the live HLS stream
- Polls the API every 5 seconds until a transmission becomes active, then stops
- Displays elapsed time of the current transmission

### 💬 AI Chat

- AI-powered movie chatbot ("Flix") at `/chat`
- Spring Boot proxies requests to the Python AI service — the frontend never calls the AI service directly
- Conversation memory backed by Redis (falls back to in-memory if Redis is unavailable)

### 🛠 Admin Panel

- Separate admin authentication with JWT (stored in session)
- Admin dashboard at `/admin`
- **New Transmission** — pick an available movie from the API and start a live transmission
- **Upload Movie** — drag-and-drop upload with a progress bar
- **Stop Transmission** — end the current live transmission
- Protected admin routes with automatic redirect on missing/expired token

---

## 📁 Project Structure

This project follows a simplified **Clean Architecture** approach (without over-engineering).  
The application is divided into **Presentation**, **Domain**, and **Data** layers.

---

### **Presentation Layer**

_UI / React components / routing and user interaction_

- `src/presentation/App.tsx`  
  App entry point. Sets up routes, loaders (fetch before navigation), and actions (form submissions).
- `src/presentation/components/`  
  Shared UI components used across multiple pages.
- `src/presentation/pages/`  
  All main pages loaded through React Router.
- `src/presentation/pages/RootLayout.tsx`  
  Base layout containing the header, footer, and `Outlet`.

---

### **Domain Layer**

_Business logic, models, and use cases_

- `src/domain/model/`  
  Shared domain models and enums used across the application, including `Genre`, `TitleAndPeopleSearchTypes`, and `TitleAndPeopleSearchField`.
- `src/domain/usecases/`  
  Use cases for fetching or saving data.  
  Handles caching logic and interacts with Redux.

---

### **Data Layer**

_API communication + Redux storage_

- `src/data/model/`  
  Types representing API responses and request bodies.
- `src/data/api/`
- `src/data/api/`
  REST API calls:
  - `authApi.ts` — user login, signup, and admin login
  - `titleApi.ts` — fetch titles, title details (including cast/crew/sources), autocomplete search, person search, reviews, stream URL
  - `defaultUserApi.ts` — user profile CRUD
  - `transmissionApi.ts` — get current transmission, start/stop transmission, fetch available movies, upload movie
  - `transmissionApi.ts` — get current transmission, start/stop transmission, fetch available movies, upload movie
- `src/data/redux/`  
  Redux Toolkit slices, root store configuration, and selectors.

---

## 🛠 Getting Started

1. Install dependencies

```bash
npm install
```

2. Start development server

```bash
npm run dev
```

3. Open the app

Visit http://localhost:5173 (Vite prints the exact URL in the terminal).

4. Build for production

```bash
npm run build
```

5. Preview the production build

```bash
npm run preview
```

## License

This project is provided as-is for learning and demo purposes.
