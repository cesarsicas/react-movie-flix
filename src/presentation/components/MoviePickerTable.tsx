import { Form } from "react-router-dom";
import type { WatchPartyMovieModel } from "../../domain/model/WatchPartyMovieModel";

interface Props {
  movies: WatchPartyMovieModel[];
  isSubmitting: boolean;
}

export default function MoviePickerTable({ movies, isSubmitting }: Props) {
  return (
    <div className="panel" style={{ overflow: "hidden" }}>
      <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid var(--line-strong)" }}>
            {["Title", "Duration", "Filename", "Action"].map((h) => (
              <th
                key={h}
                style={{
                  padding: "10px 14px",
                  textAlign: "left",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "var(--label-dim)",
                  fontWeight: 600,
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => {
            const hours = Math.floor(movie.duration / 60);
            const mins = movie.duration % 60;
            const duration = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
            return (
              <tr
                key={movie.id}
                style={{ borderBottom: "1px solid var(--line)", transition: "background 0.1s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-3)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "")}
              >
                <td style={{ padding: "10px 14px", fontWeight: 500 }}>{movie.title}</td>
                <td style={{ padding: "10px 14px" }}>
                  <span className="font-crt muted" style={{ fontSize: 15 }}>{duration}</span>
                </td>
                <td style={{ padding: "10px 14px" }}>
                  <span className="font-mono muted" style={{ fontSize: 11 }}>{movie.filename}</span>
                </td>
                <td style={{ padding: "10px 14px" }}>
                  <Form method="post">
                    <input type="hidden" name="movieId" value={movie.id} />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary btn-sm"
                      style={{ opacity: isSubmitting ? 0.5 : 1 }}
                    >
                      ▶ Select
                    </button>
                  </Form>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
