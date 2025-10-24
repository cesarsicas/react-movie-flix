import "./index.css";
import { Login } from "./pages/Login.tsx";
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
import { Signup } from "./pages/Signup.tsx";

const root = document.getElementById("root");

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/movie/details/:id", element: <MovieDetails /> },
    ],
  },
]);

ReactDOM.createRoot(root!).render(<RouterProvider router={router} />);
