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
import AdminLayout from "./pages/AdminLayout.tsx";
import { AdminLogin, adminLoginAction } from "./pages/AdminLogin.tsx";
import { adminLogoutAction } from "./pages/AdminLogout.tsx";
import AdminHome from "./pages/AdminHome.tsx";
import {
  adminTokenLoader,
  adminRootLoader,
  checkAdminAuthLoader,
} from "../utils/adminAuth.ts";
import WatchPartyHome, { watchPartyHomeLoader, watchPartyHomeAction } from "./pages/WatchPartyHome.tsx";
import WatchParty from "./pages/WatchParty.tsx";
import NewTransmission, {
  newTransmissionLoader,
  newTransmissionAction,
} from "./pages/NewTransmission.tsx";
import UploadMovie, { uploadMovieLoader } from "./pages/UploadMovie.tsx";

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
        path: "/title/details/:externalId",
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
      { path: "/watch-party", element: <WatchParty /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    id: "admin-root",
    loader: adminTokenLoader,
    children: [
      { index: true, loader: adminRootLoader },
      { path: "login", element: <AdminLogin />, action: adminLoginAction },
      { path: "logout", action: adminLogoutAction },
      { path: "home", element: <AdminHome />, loader: checkAdminAuthLoader },
      { path: "watch-party", element: <WatchPartyHome />, loader: watchPartyHomeLoader, action: watchPartyHomeAction },
      { path: "watch-party/new", element: <NewTransmission />, loader: newTransmissionLoader, action: newTransmissionAction },
      { path: "watch-party/upload", element: <UploadMovie />, loader: uploadMovieLoader },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
