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
import ProfileEdit, {
  profileEditAction,
  profileEditLoader,
} from "./pages/ProfileEdit.tsx";
import { SearchResult, titleSearchLoader } from "./pages/SearchResult.tsx";

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
        path: "/title/details/:id",
        element: <MovieDetails />,
        action: movieReviewAcion,
        loader: titleDetailsLoader,
      },
      {
        path: "/title/search/",
        element: <SearchResult />,
        loader: titleSearchLoader,
      },
      { path: "/profile", element: <Profile />, loader: profileLoader },
      {
        path: "/profile/edit",
        element: <ProfileEdit />,
        loader: profileEditLoader,
        action: profileEditAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
