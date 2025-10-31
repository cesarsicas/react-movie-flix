import "./index.css";
import { action as authformAction, Auth } from "./pages/Auth.tsx";
import { action as logoutAction } from "./pages/Logout.tsx";
import { action as movieReviewAcion } from "./pages/MovieDetails.tsx";
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
import Profile from "./pages/Profile.tsx";
import { checkAuthLoader, tokenLoader } from "./utils/auth.tsx";

const root = document.getElementById("root");

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    loader: tokenLoader,
    children: [
      { path: "/", element: <Home /> },
      { path: "/auth", element: <Auth />, action: authformAction },
      { path: "/logout", action: logoutAction },
      {
        path: "/movie/details/:id",
        element: <MovieDetails />,
        action: movieReviewAcion,
      },
      { path: "/profile", element: <Profile />, loader: checkAuthLoader },
    ],
  },
]);

ReactDOM.createRoot(root!).render(<RouterProvider router={router} />);
