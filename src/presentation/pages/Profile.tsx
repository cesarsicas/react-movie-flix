import PageContainer from "../components/PageContainer";
import type { ProfileModel } from "../../domain/model/ProfileModel";
import { Link, useLoaderData } from "react-router-dom";
import getProfileUseCase from "../../domain/usecases/getProfileUseCase";

const MOCK_QUEUE = [
  { id: 1, title: "Add titles to your queue", poster: null },
];

const MOCK_WATCHED = [
  { id: 1, title: "Your recently watched titles appear here", poster: null },
];

export default function Profile() {
  const loaderData = useLoaderData() as { profile: ProfileModel } | undefined;
  const profile = loaderData?.profile;

  return (
    <PageContainer>
      <div style={{ marginBottom: 32, display: "grid", gridTemplateColumns: "auto 1fr", gap: 24, alignItems: "start" }}>
        {/* Avatar */}
        <div
          style={{
            width: 80,
            height: 80,
            background: "var(--amber)",
            color: "var(--ink)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
            fontWeight: 700,
            border: "2px solid var(--amber)",
            flexShrink: 0,
          }}
        >
          {profile?.name ? profile.name[0].toUpperCase() : "?"}
        </div>

        {/* Info card */}
        <div className="panel" style={{ padding: 20 }}>
          <div className="channel-strip" style={{ border: "none", padding: "0 0 12px 0", marginBottom: 12, borderBottom: "1px solid var(--line)" }}>
            <span className="font-crt" style={{ color: "var(--amber)" }}>CH 01</span>
            <span>USER PROFILE</span>
            <Link to="/profile/edit" className="btn btn-sm btn-ghost">
              Edit
            </Link>
          </div>

          {profile ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px dashed var(--line)", paddingBottom: 8 }}>
                <span className="muted" style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em" }}>Name</span>
                <span style={{ fontSize: 14 }}>{profile.name}</span>
              </div>
              {profile.bio && (
                <div>
                  <span className="muted" style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: 6 }}>Bio</span>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--label-dim)" }}>{profile.bio}</p>
                </div>
              )}
            </div>
          ) : (
            <p className="muted" style={{ fontSize: 13 }}>
              Update your profile to show info here.
            </p>
          )}
        </div>
      </div>

      {/* Watch Queue */}
      <div style={{ marginBottom: 40 }}>
        <div className="section-title">
          <span className="num">CH 02</span>
          Watch Queue
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
            gap: 12,
          }}
        >
          {MOCK_QUEUE.map((item) => (
            <div key={item.id} className="vhs-card" style={{ opacity: 0.5 }}>
              <div className="vhs-spine" />
              <div style={{ paddingLeft: 14 }}>
                <div className="poster">
                  <div className="poster-stripes" />
                  <span className="poster-label" style={{ fontSize: 11 }}>EMPTY</span>
                </div>
                <div style={{ padding: "6px 8px", borderTop: "1px solid var(--line)" }}>
                  <p className="font-mono muted" style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                    {item.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recently Watched */}
      <div style={{ marginBottom: 40 }}>
        <div className="section-title">
          <span className="num">CH 03</span>
          Recently Watched
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
            gap: 12,
          }}
        >
          {MOCK_WATCHED.map((item) => (
            <div key={item.id} className="vhs-card" style={{ opacity: 0.5 }}>
              <div className="vhs-spine" />
              <div style={{ paddingLeft: 14 }}>
                <div className="poster">
                  <div className="poster-stripes" />
                  <span className="poster-label" style={{ fontSize: 11 }}>EMPTY</span>
                </div>
                <div style={{ padding: "6px 8px", borderTop: "1px solid var(--line)" }}>
                  <p className="font-mono muted" style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                    {item.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}

export async function profileLoader(): Promise<{ profile: ProfileModel }> {
  const data = await getProfileUseCase();
  return { profile: data.data };
}
