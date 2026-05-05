import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import FloatingChat from "../components/FloatingChat";

export default function RootLayout() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    return (localStorage.getItem("theme") as "dark" | "light") ?? "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  return (
    <>
      <AppHeader onToggleTheme={toggleTheme} theme={theme} />
      <Outlet />
      <AppFooter />
      <FloatingChat />
    </>
  );
}
