import "./index.css";
import { Auth } from "./pages/Auth.tsx";
import { Home } from "./pages/Home.tsx";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
} from "react-router";
import { MovieDetails } from "./pages/MovieDetails.tsx";
import RootLayout from "./pages/RootLayout.tsx";
import { RouterProvider } from "react-router-dom";

const root = document.getElementById("root");

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/auth", element: <Auth /> },
      { path: "/movie/details/:id", element: <MovieDetails /> },
    ],
  },
]);

ReactDOM.createRoot(root!).render(<RouterProvider router={router} />);
