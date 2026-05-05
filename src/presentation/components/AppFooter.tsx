import { Link } from "react-router-dom";

export default function AppFooter() {
  return (
    <footer
      className="grain"
      style={{
        background: "var(--bg-2)",
        borderTop: "1px solid var(--line-strong)",
        marginTop: 64,
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "40px 28px 28px",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: 32,
        }}
      >
        {/* Brand */}
        <div>
          <div
            className="font-display"
            style={{ fontSize: 20, color: "var(--amber)", marginBottom: 12 }}
          >
            ▶ REACTFLIX
          </div>
          <p className="muted" style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
            Your retro-analog streaming destination. Be kind, rewind.
          </p>
          <div className="font-crt muted" style={{ fontSize: 13 }}>
            © {new Date().getFullYear()} ReactFlix · All rights reserved
          </div>
        </div>

        {/* Browse */}
        <div>
          <div className="section-title" style={{ marginBottom: 12 }}>
            Browse
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
            <li><Link to="/" className="link" style={{ fontSize: 13 }}>Home</Link></li>
            <li><Link to="/titles" className="link" style={{ fontSize: 13 }}>All Titles</Link></li>
            <li><Link to="/watch-party" className="link" style={{ fontSize: 13 }}>Watch Party</Link></li>
            <li><Link to="/chat" className="link" style={{ fontSize: 13 }}>Ask Flix</Link></li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <div className="section-title" style={{ marginBottom: 12 }}>
            Account
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
            <li><Link to="/auth?mode=login" className="link" style={{ fontSize: 13 }}>Login</Link></li>
            <li><Link to="/auth?mode=signup" className="link" style={{ fontSize: 13 }}>Sign Up</Link></li>
            <li><Link to="/profile" className="link" style={{ fontSize: 13 }}>Profile</Link></li>
          </ul>
        </div>

        {/* Info */}
        <div>
          <div className="section-title" style={{ marginBottom: 12 }}>
            Info
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
            <li>
              <span className="muted" style={{ fontSize: 13 }}>Powered by WatchMode</span>
            </li>
            <li>
              <span className="muted" style={{ fontSize: 13 }}>React 19 · TypeScript</span>
            </li>
            <li>
              <span className="muted" style={{ fontSize: 13 }}>Spring Boot · FastAPI</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "12px 28px",
          borderTop: "1px solid var(--line)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span className="font-crt muted" style={{ fontSize: 12, letterSpacing: "0.15em" }}>
          BE KIND · REWIND · CH 01–88
        </span>
        <div style={{ display: "flex", gap: 8 }}>
          <span className="sticker flat" style={{ fontSize: 12 }}>VHS</span>
          <span className="sticker flat red" style={{ fontSize: 12 }}>REC</span>
        </div>
      </div>
    </footer>
  );
}
