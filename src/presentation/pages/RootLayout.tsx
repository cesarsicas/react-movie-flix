import { Outlet } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import FloatingChat from "../components/FloatingChat";

export default function RootLayout() {
  return (
    <>
      <AppHeader />
      <Outlet />
      <AppFooter />
      <FloatingChat />
    </>
  );
}
