import { Outlet } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import Banner from "../components/Banner";
import AppFooter from "../components/AppFooter";

export default function RootLayout() {
  return (
    <>
      <AppHeader />
      <Outlet />
      <AppFooter />
    </>
  );
}
