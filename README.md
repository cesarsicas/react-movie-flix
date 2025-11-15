# React Flix

A small movie and series web application built with **React**, **TypeScript**, **Vite**, **Redux**, **React Router**, and **Tailwind CSS**.  
It demonstrates authentication with **JWT tokens**, a responsive UI, clean architecture organization, and several real-world features such as title browsing, reviews, and user profile management.

> **Important:**  
> This frontend must be used together with the backend available in this repository:  
> **https://github.com/cesarsicas/spring-movie-flix**

---

## 🚀 Technologies Used

- **React** (functional components + hooks)
- **TypeScript**
- **Vite** (dev server and production build)
- **React Router** (routing, route params, loaders, and actions)
- **Redux Toolkit** (global state + caching)
- **Tailwind CSS** (utility-first styling)
- **JWT Authentication** (using local storage)

---

## ⭐ Features

### 🔐 Authentication

- User signup (email + password)
- User login (email + password)
- Persistent auth using a received **JWT token**
- Private routes for authenticated users

### 🎬 Titles

- Grid of movies and series
- New releases and trending titles sections
- Title details page
- Title search

### 💬 Reviews

- View reviews submitted by users
- Submit a new review (**only logged-in users**)

### 👤 Profile

- View profile info (**only logged-in users**)
- Edit profile info (**only logged-in users**)

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
  Shared domain models used across the application.
- `src/domain/usecases/`  
  Use cases for fetching or saving data.  
  Handles caching logic and interacts with Redux.

---

### **Data Layer**

_API communication + Redux storage_

- `src/data/model/`  
  Types representing API responses and request bodies.
- `src/data/api/`  
  REST API calls:
  - `authApi.ts` — login, signup
  - `titleApi.ts` — fetch titles, save and fetch reviews
  - `defaultUserApi.ts` — user profile CRUD
- `src/data/redux/`  
  Redux Toolkit slices, root store configuration, and selectors.

---

## 📌 ToDo (Planned Features)

### 🎥 Video Streaming

- Allow logged-in users to **stream video directly from the API**
- No need to download the entire video file before playing

### 💬 Real-Time Chat

- Provide a **real-time chat system** for logged-in users
- Enables live interaction while browsing or watching conte

---

## 🛠 Getting Started (Windows PowerShell)

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
