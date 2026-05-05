import PageContainer from "../components/PageContainer";
import { Link } from "react-router-dom";

export default function AdminHome() {
  return (
    <PageContainer>
      <div style={{ marginBottom: 24 }}>
        <div className="section-title">
          <span className="num">ADM</span>
          Dashboard
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        <div className="panel" style={{ padding: 20 }}>
          <div className="channel-strip" style={{ border: "none", padding: "0 0 12px 0", borderBottom: "1px solid var(--line)" }}>
            <span className="font-crt" style={{ color: "var(--amber)" }}>◈</span>
            <span>Watch Party</span>
          </div>
          <p className="muted" style={{ fontSize: 13, marginTop: 12, marginBottom: 16, lineHeight: 1.6 }}>
            Manage live transmissions and broadcast content to all users.
          </p>
          <Link to="/admin/watch-party" className="btn btn-sm btn-ghost">
            Manage →
          </Link>
        </div>

        <div className="panel" style={{ padding: 20, opacity: 0.5 }}>
          <div className="channel-strip" style={{ border: "none", padding: "0 0 12px 0", borderBottom: "1px solid var(--line)" }}>
            <span className="font-crt" style={{ color: "var(--amber)" }}>◈</span>
            <span>Users</span>
          </div>
          <p className="muted" style={{ fontSize: 13, marginTop: 12, marginBottom: 16, lineHeight: 1.6 }}>
            User management — coming soon.
          </p>
          <span className="chip" style={{ cursor: "default" }}>Soon</span>
        </div>

        <div className="panel" style={{ padding: 20, opacity: 0.5 }}>
          <div className="channel-strip" style={{ border: "none", padding: "0 0 12px 0", borderBottom: "1px solid var(--line)" }}>
            <span className="font-crt" style={{ color: "var(--amber)" }}>◈</span>
            <span>Content</span>
          </div>
          <p className="muted" style={{ fontSize: 13, marginTop: 12, marginBottom: 16, lineHeight: 1.6 }}>
            Content catalog management — coming soon.
          </p>
          <span className="chip" style={{ cursor: "default" }}>Soon</span>
        </div>
      </div>
    </PageContainer>
  );
}
