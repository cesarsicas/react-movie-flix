import { Form, Link, useRouteLoaderData } from "react-router-dom";

export default function AdminToolbar() {
  const tokenData = useRouteLoaderData("admin-root");

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50 }}>
      <nav
        className="panel"
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
        <Link to="/admin/home" style={{ textDecoration: "none" }}>
          <span className="font-display" style={{ fontSize: 18, color: "var(--amber)" }}>
            ▶ REACTFLIX
          </span>
          <span className="sticker flat" style={{ fontSize: 11, marginLeft: 8 }}>ADMIN</span>
        </Link>

        {/* Nav */}
        {tokenData && (
          <div style={{ display: "flex", gap: 4, alignItems: "center", padding: "8px 0" }}>
            <Link to="/admin/home" className="btn btn-sm btn-ghost">
              Dashboard
            </Link>
            <Link to="/admin/watch-party" className="btn btn-sm btn-ghost">
              Watch Party
            </Link>
          </div>
        )}

        {/* Logout */}
        {tokenData && (
          <Form action="/admin/logout" method="post">
            <button className="btn btn-sm btn-ghost">Logout</button>
          </Form>
        )}
      </nav>
    </header>
  );
}
