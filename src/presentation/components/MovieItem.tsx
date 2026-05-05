import type MovieModel from "../../domain/model/MovieModel";

const MovieItem: React.FC<
  React.PropsWithChildren<{ movie: MovieModel; showBottomInfo: Boolean; size?: "sm" | "md" }>
> = ({ movie, showBottomInfo, size = "md" }) => {
  return (
    <div className="vhs-card" style={{ width: "100%" }}>
      <div className="vhs-spine" />
      <div style={{ paddingLeft: 14 }}>
        <div className="poster">
          {movie.posterUrl ? (
            <img
              src={movie.posterUrl}
              alt={`Poster for ${movie.title}`}
            />
          ) : (
            <>
              <div className="poster-stripes" />
              <span className="poster-label">{movie.title}</span>
            </>
          )}
        </div>
        {showBottomInfo && (
          <div
            style={{
              padding: size === "sm" ? "6px 8px" : "8px 10px",
              borderTop: "1px solid var(--line)",
            }}
          >
            <p
              className="font-mono"
              style={{
                fontSize: size === "sm" ? 11 : 12,
                color: "var(--label-dim)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {movie.title}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieItem;
