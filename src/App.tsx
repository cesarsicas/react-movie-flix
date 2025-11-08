import { action as authformAction, Auth } from "./pages/Auth.tsx";
import { action as logoutAction } from "./pages/Logout.tsx";
import {
  action as movieReviewAcion,
  titleDetailsLoader,
} from "./pages/MovieDetails.tsx";
import { Home, moviesLoader } from "./pages/Home.tsx";
import { createBrowserRouter } from "react-router";
import { MovieDetails } from "./pages/MovieDetails.tsx";
import RootLayout from "./pages/RootLayout.tsx";
import { RouterProvider } from "react-router-dom";
import Profile from "./pages/Profile.tsx";
import { checkAuthLoader, tokenLoader } from "./utils/auth.tsx";
//import TestaRedux from "./pages/TestaRedux.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    loader: tokenLoader,
    children: [
      { path: "/", element: <Home />, loader: moviesLoader },
      { path: "/auth", element: <Auth />, action: authformAction },
      { path: "/logout", action: logoutAction },
      {
        path: "/movie/details/:id",
        element: <MovieDetails />,
        action: movieReviewAcion,
        loader: titleDetailsLoader,
      },
      { path: "/profile", element: <Profile />, loader: checkAuthLoader },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
