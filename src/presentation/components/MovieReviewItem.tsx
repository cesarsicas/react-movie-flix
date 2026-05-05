import type ReviewModel from "../../domain/model/ReviewModel";

const MoviewReviewItem: React.FC<
  React.PropsWithChildren<{ movie: ReviewModel }>
> = ({ movie }) => {
  return (
    <div
      className="panel"
      style={{ padding: 16, marginBottom: 10 }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <div
          style={{
            width: 32,
            height: 32,
            background: "var(--bg-3)",
            border: "1px solid var(--line-strong)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            color: "var(--amber)",
            flexShrink: 0,
          }}
        >
          ◈
        </div>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600 }}>{movie.defaultUserName}</p>
          <p className="font-crt muted" style={{ fontSize: 13 }}>2024-09-14</p>
        </div>
      </div>
      <p className="muted" style={{ fontSize: 13, lineHeight: 1.6 }}>{movie.review}</p>
    </div>
  );
};

export default MoviewReviewItem;
