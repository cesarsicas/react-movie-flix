import { action as authformAction, Auth } from "./presentation/pages/Auth.tsx";
import { action as logoutAction } from "./presentation/pages/Logout.tsx";
import {
  action as movieReviewAcion,
  titleDetailsLoader,
} from "./presentation/pages/MovieDetails.tsx";
import { Home, moviesLoader } from "./presentation/pages/Home.tsx";
import { MovieDetails } from "./presentation/pages/MovieDetails.tsx";
import RootLayout from "./presentation/pages/RootLayout.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Profile, { profileLoader } from "./presentation/pages/Profile.tsx";
import { tokenLoader } from "./utils/auth.tsx";

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
      { path: "/profile", element: <Profile />, loader: profileLoader },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
