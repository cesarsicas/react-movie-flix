import { Form, Link, useLocation, useRouteLoaderData } from "react-router-dom";

interface AppHeaderProps {
  onToggleTheme: () => void;
  theme: "dark" | "light";
}

const MARQUEE_TEXT =
  "BE KIND · REWIND · NEW RELEASES · WATCH PARTY · ASK FLIX · MEMBERS ONLY · ";

const NAV_LINKS = [
  { to: "/", label: "Home", exact: true },
  { to: "/titles", label: "Browse" },
  { to: "/watch-party", label: "Watch Party" },
  { to: "/chat", label: "Ask Flix" },
];

export default function AppHeader({ onToggleTheme, theme }: AppHeaderProps) {
  const tokenData = useRouteLoaderData("root");
  const { pathname } = useLocation();

  function isActive(to: string, exact?: boolean) {
    return exact ? pathname === to : pathname.startsWith(to);
  }

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50 }}>
      {/* Marquee strip */}
      <div
        className="bar-amber overflow-hidden"
        style={{ height: 28, display: "flex", alignItems: "center" }}
      >
        <div className="marquee-track font-crt" style={{ fontSize: 13, letterSpacing: "0.15em" }}>
          {Array(4).fill(MARQUEE_TEXT).join("")}
        </div>
      </div>

      {/* Main nav row */}
      <nav
        className="panel grain"
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          alignItems: "center",
          gap: 24,
          padding: "0 28px",
          borderTop: "none",
          borderLeft: "none",
          borderRight: "none",
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <span
            className="font-display"
            style={{ fontSize: 22, color: "var(--amber)", letterSpacing: "0.05em" }}
          >
            ▶ REACTFLIX
          </span>
        </Link>

        {/* Route buttons */}
        <div style={{ display: "flex", gap: 4, alignItems: "center", padding: "8px 0" }}>
          {NAV_LINKS.map(({ to, label, exact }) => (
            <Link
              key={to}
              to={to}
              className={`btn btn-sm btn-ghost${isActive(to, exact) ? " btn-active" : ""}`}
              style={
                isActive(to, exact)
                  ? { color: "var(--amber)", borderColor: "var(--amber)" }
                  : undefined
              }
            >
              {isActive(to, exact) && <span style={{ color: "var(--amber)" }}>▸</span>}
              {label}
            </Link>
          ))}
        </div>

        {/* Right controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Search */}
          <Form action="/title/search/" method="get" style={{ display: "flex" }}>
            <button className="btn btn-sm btn-ghost" type="submit" title="Search">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" strokeLinecap="round" />
              </svg>
            </button>
            <input
              type="text"
              name="query"
              placeholder="Search…"
              className="input"
              style={{ width: 160, borderLeft: "none" }}
            />
          </Form>

          {/* Theme toggle */}
          <button
            className="btn btn-sm btn-ghost"
            onClick={onToggleTheme}
            title="Toggle theme"
          >
            {theme === "dark" ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* Auth links / user */}
          {tokenData ? (
            <>
              <Form action="/logout" method="post">
                <button className="btn btn-sm btn-ghost">Logout</button>
              </Form>
              <Link to="/profile">
                <div
                  style={{
                    width: 32,
                    height: 32,
                    background: "var(--amber)",
                    color: "var(--ink)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                    border: "1.5px solid var(--amber)",
                  }}
                >
                  ◈
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link to="/auth?mode=login" className="btn btn-sm btn-ghost">
                Login
              </Link>
              <Link to="/auth?mode=signup" className="btn btn-sm btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
