import { action as authformAction, Auth } from "./pages/Auth.tsx";
import { action as logoutAction } from "./pages/Logout.tsx";
import {
  action as movieReviewAcion,
  titleDetailsLoader,
} from "./pages/MovieDetails.tsx";
import { Home, moviesLoader } from "./pages/Home.tsx";
import { MovieDetails } from "./pages/MovieDetails.tsx";
import RootLayout from "./pages/RootLayout.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Profile, { profileLoader } from "./pages/Profile.tsx";
import { tokenLoader } from "../utils/auth.tsx";
import ProfileEdit from "./pages/ProfileEdit.tsx";

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
      {
        path: "/profile/edit",
        element: <ProfileEdit />,
        loader: profileLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
