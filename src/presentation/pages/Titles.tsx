import { Form, Link, useLoaderData, type LoaderFunctionArgs } from "react-router-dom";
import PageContainer from "../components/PageContainer";
import { getTitlesList } from "../../data/api/titleApi";
import type { TitleListItem } from "../../data/model/TitleListResponse";
import getGenresUseCase from "../../domain/usecases/getGenresUseCase";
import type { GenreModel } from "../../domain/model/GenreModel";

const TYPE_OPTIONS = [
  { value: "", label: "All Types" },
  { value: "movie", label: "Movie" },
  { value: "tv_series", label: "TV Series" },
  { value: "tv_special", label: "TV Special" },
  { value: "tv_miniseries", label: "Miniseries" },
  { value: "short_film", label: "Short Film" },
];

const SORT_OPTIONS = [
  { value: "relevance_desc", label: "Relevance ↓" },
  { value: "relevance_asc", label: "Relevance ↑" },
  { value: "popularity_desc", label: "Popularity ↓" },
  { value: "popularity_asc", label: "Popularity ↑" },
  { value: "release_date_desc", label: "Release Date ↓" },
  { value: "release_date_asc", label: "Release Date ↑" },
  { value: "title_asc", label: "Title A–Z" },
  { value: "title_desc", label: "Title Z–A" },
];

const TYPE_LABELS: Record<string, string> = {
  movie: "Movie",
  tv_series: "TV",
  tv_special: "TV Spc",
  tv_miniseries: "Mini",
  short_film: "Short",
};

interface LoaderData {
  titles: TitleListItem[];
  page: number | null;
  total_results: number;
  total_pages: number | null;
  genres: GenreModel[];
  filters: {
    types: string;
    sort_by: string;
    genres: string;
    user_rating_low: string;
    user_rating_high: string;
    release_date_start: string;
    release_date_end: string;
    page: string;
  };
}

export default function Titles() {
  const { titles, page, total_pages, total_results, genres, filters } =
    useLoaderData() as LoaderData;

  const hasPagination = page !== null && total_pages !== null;

  function buildPageUrl(targetPage: number) {
    const params = new URLSearchParams();
    if (filters.types) params.set("types", filters.types);
    if (filters.sort_by) params.set("sort_by", filters.sort_by);
    if (filters.genres) params.set("genres", filters.genres);
    if (filters.user_rating_low) params.set("user_rating_low", filters.user_rating_low);
    if (filters.user_rating_high) params.set("user_rating_high", filters.user_rating_high);
    if (filters.release_date_start) params.set("release_date_start", filters.release_date_start);
    if (filters.release_date_end) params.set("release_date_end", filters.release_date_end);
    params.set("page", String(targetPage));
    return `/titles?${params.toString()}`;
  }

  return (
    <PageContainer>
      {/* Page header */}
      <div style={{ marginBottom: 24 }}>
        <div className="section-title">
          <span className="num">CH 02</span>
          Browse Titles
        </div>
      </div>

      {/* Filter bar */}
      <div className="panel" style={{ padding: 20, marginBottom: 20 }}>
        <Form method="get" action="/titles" style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "flex-end" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label className="muted" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em" }}>Type</label>
            <select name="types" defaultValue={filters.types} className="select" style={{ width: "auto", minWidth: 130 }}>
              {TYPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label className="muted" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em" }}>Sort By</label>
            <select name="sort_by" defaultValue={filters.sort_by} className="select" style={{ width: "auto", minWidth: 160 }}>
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label className="muted" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em" }}>Genre</label>
            <select name="genres" defaultValue={filters.genres} className="select" style={{ width: "auto", minWidth: 130 }}>
              <option value="">All Genres</option>
              {genres.map((g) => (
                <option key={g.id} value={String(g.externalId)}>{g.name}</option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label className="muted" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em" }}>Rating (0–10)</label>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <input
                type="number" name="user_rating_low" placeholder="Min"
                min="0" max="10" step="0.1"
                defaultValue={filters.user_rating_low}
                className="input" style={{ width: 68 }}
              />
              <span className="muted">–</span>
              <input
                type="number" name="user_rating_high" placeholder="Max"
                min="0" max="10" step="0.1"
                defaultValue={filters.user_rating_high}
                className="input" style={{ width: 68 }}
              />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label className="muted" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em" }}>Release Year</label>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <input
                type="number" name="release_date_start" placeholder="From"
                min="1900" max="2099"
                defaultValue={filters.release_date_start}
                className="input" style={{ width: 80 }}
              />
              <span className="muted">–</span>
              <input
                type="number" name="release_date_end" placeholder="To"
                min="1900" max="2099"
                defaultValue={filters.release_date_end}
                className="input" style={{ width: 80 }}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-sm">
            Apply ▶
          </button>
        </Form>
      </div>

      {/* Results header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div className="section-title" style={{ margin: 0 }}>
          Results
          {total_results > 0 && (
            <span className="font-crt muted" style={{ fontSize: 13 }}>
              ({total_results.toLocaleString()})
            </span>
          )}
        </div>
        {hasPagination && (
          <span className="font-crt muted" style={{ fontSize: 13 }}>
            PG {page} / {total_pages!.toLocaleString()}
          </span>
        )}
      </div>

      {/* Table */}
      {titles.length > 0 ? (
        <>
          <div className="panel" style={{ overflow: "hidden", marginBottom: 20 }}>
            <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--line-strong)" }}>
                  {["#", "Title", "Type", "Year", "IMDb ID"].map((h) => (
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
                {titles.map((item, index) => (
                  <tr
                    key={item.id}
                    style={{ borderBottom: "1px solid var(--line)", transition: "background 0.1s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-3)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "")}
                  >
                    <td style={{ padding: "10px 14px", color: "var(--label-dim)", fontFamily: "'VT323', monospace", fontSize: 15 }}>
                      {(Number(filters.page) - 1) * 250 + index + 1}
                    </td>
                    <td style={{ padding: "10px 14px" }}>
                      <Link to={`/title/details/${item.externalId}`} className="link" style={{ fontSize: 13 }}>
                        {item.title}
                      </Link>
                    </td>
                    <td style={{ padding: "10px 14px" }}>
                      <span className="chip" style={{ fontSize: 10, padding: "2px 6px", cursor: "default" }}>
                        {TYPE_LABELS[item.type] ?? item.type}
                      </span>
                    </td>
                    <td style={{ padding: "10px 14px", color: "var(--label-dim)" }}>
                      {item.year ?? "—"}
                    </td>
                    <td style={{ padding: "10px 14px" }}>
                      <span className="font-mono muted" style={{ fontSize: 11 }}>
                        {item.imdb_id ?? "—"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {hasPagination && (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16, marginBottom: 40 }}>
              {page! > 1 ? (
                <Link to={buildPageUrl(page! - 1)} className="btn btn-ghost btn-sm">
                  ← Prev
                </Link>
              ) : (
                <span className="btn btn-ghost btn-sm" style={{ opacity: 0.3, cursor: "default" }}>← Prev</span>
              )}
              <span className="font-crt muted" style={{ fontSize: 16 }}>
                {page} / {total_pages!.toLocaleString()}
              </span>
              {page! < total_pages! ? (
                <Link to={buildPageUrl(page! + 1)} className="btn btn-ghost btn-sm">
                  Next →
                </Link>
              ) : (
                <span className="btn btn-ghost btn-sm" style={{ opacity: 0.3, cursor: "default" }}>Next →</span>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="dashed-box muted" style={{ textAlign: "center", padding: 40 }}>
          No titles found for the selected filters.
        </div>
      )}
    </PageContainer>
  );
}

export async function titlesLoader({ request }: LoaderFunctionArgs): Promise<LoaderData> {
  const url = new URL(request.url);

  const types = url.searchParams.get("types") || "";
  const sort_by = url.searchParams.get("sort_by") || "relevance_desc";
  const genres = url.searchParams.get("genres") || "";
  const user_rating_low = url.searchParams.get("user_rating_low") || "";
  const user_rating_high = url.searchParams.get("user_rating_high") || "";
  const releaseYearStart = url.searchParams.get("release_date_start") || "";
  const releaseYearEnd = url.searchParams.get("release_date_end") || "";
  const page = url.searchParams.get("page") || "1";

  const release_date_start = releaseYearStart ? `${releaseYearStart}0101` : "";
  const release_date_end = releaseYearEnd ? `${releaseYearEnd}1231` : "";

  const [response, genreList] = await Promise.all([
    getTitlesList({
      types: types || undefined,
      sort_by: sort_by || undefined,
      genres: genres || undefined,
      user_rating_low: user_rating_low || undefined,
      user_rating_high: user_rating_high || undefined,
      release_date_start: release_date_start || undefined,
      release_date_end: release_date_end || undefined,
      page,
    }),
    getGenresUseCase(),
  ]);

  return {
    titles: response.titles,
    page: response.page,
    total_results: response.total_results,
    total_pages: response.total_pages,
    genres: genreList,
    filters: {
      types,
      sort_by,
      genres,
      user_rating_low,
      user_rating_high,
      release_date_start: releaseYearStart,
      release_date_end: releaseYearEnd,
      page,
    },
  };
}
