import HomeSection from "../components/HomeSection";
import MoviesList from "../components/MoviesList";
import PageContainer from "../components/PageContainer";
import { Link, useLoaderData, type LoaderFunctionArgs } from "react-router-dom";
import type MovieModel from "../../domain/model/MovieModel";
import type { AutocompleteResultModel } from "../../domain/model/AutocompleteSearchModel";
import getAutocompleteSearchUseCase from "../../domain/usecases/getAutocompleteSearchUseCase";

type FilterTab = "all" | "movies" | "tv" | "people";

const TV_TYPES = new Set(["tv_series", "tv_miniseries", "tv_special"]);

const TAB_LABELS: { key: FilterTab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "movies", label: "Movies" },
  { key: "tv", label: "TV" },
  { key: "people", label: "People" },
];

interface LoaderData {
  titleResults: MovieModel[];
  peopleResults: AutocompleteResultModel[];
  query: string;
  filter: FilterTab;
}

export function SearchResult() {
  const { titleResults, peopleResults, query, filter } = useLoaderData() as LoaderData;

  const isAll = filter === "all";

  return (
    <PageContainer>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div className="section-title">
          <span className="num">◈</span>
          Search Results
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <span className="muted" style={{ fontSize: 13 }}>
            Query:
          </span>
          <span
            className="font-crt"
            style={{ fontSize: 18, color: "var(--amber)", letterSpacing: "0.05em" }}
          >
            "{query}"
          </span>
        </div>

        {/* Tabs */}
        <div className="tabs">
          {TAB_LABELS.map(({ key, label }) => (
            <Link
              key={key}
              to={`/title/search/?query=${encodeURIComponent(query)}&filter=${key}`}
              className={`tab${filter === key ? " active" : ""}`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {isAll && (
        <HomeSection title={`All Results (${titleResults.length + peopleResults.length})`} channelNum="◈">
          {titleResults.length === 0 && peopleResults.length === 0 ? (
            <div className="dashed-box muted" style={{ textAlign: "center" }}>No results found.</div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 14,
              }}
            >
              {titleResults.map((movie) => (
                <Link key={`title-${movie.id}`} to={`/title/details/${movie.externalId}`} style={{ textDecoration: "none" }}>
                  <ResultCard name={movie.title} imageUrl={movie.posterUrl} />
                </Link>
              ))}
              {peopleResults.map((person) => (
                <Link key={`person-${person.id}`} to={`/person/${person.id}`} style={{ textDecoration: "none" }}>
                  <ResultCard name={person.name} imageUrl={person.image_url} />
                </Link>
              ))}
            </div>
          )}
        </HomeSection>
      )}

      {!isAll && filter !== "people" && (
        <HomeSection title={`Titles (${titleResults.length})`} channelNum="◈">
          {titleResults.length > 0 ? (
            <MoviesList movies={titleResults} />
          ) : (
            <div className="dashed-box muted" style={{ textAlign: "center" }}>No titles found.</div>
          )}
        </HomeSection>
      )}

      {!isAll && filter === "people" && (
        <HomeSection title={`People (${peopleResults.length})`} channelNum="◈">
          {peopleResults.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 14,
              }}
            >
              {peopleResults.map((person) => (
                <Link key={person.id} to={`/person/${person.id}`} style={{ textDecoration: "none" }}>
                  <ResultCard name={person.name} imageUrl={person.image_url} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="dashed-box muted" style={{ textAlign: "center" }}>No people found.</div>
          )}
        </HomeSection>
      )}
    </PageContainer>
  );
}

function ResultCard({ name, imageUrl }: { name: string; imageUrl: string | null | undefined }) {
  return (
    <div className="vhs-card">
      <div className="vhs-spine" />
      <div style={{ paddingLeft: 14 }}>
        <div className="poster">
          {imageUrl ? (
            <img src={imageUrl} alt={name} />
          ) : (
            <>
              <div className="poster-stripes" />
              <span className="poster-label">{name}</span>
            </>
          )}
        </div>
        <div style={{ padding: "6px 8px", borderTop: "1px solid var(--line)" }}>
          <p className="font-mono muted" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
            {name}
          </p>
        </div>
      </div>
    </div>
  );
}

export async function titleSearchLoader({ request }: LoaderFunctionArgs): Promise<LoaderData> {
  const url = new URL(request.url);
  const query = url.searchParams.get("query");
  const filter = (url.searchParams.get("filter") as FilterTab) || "all";

  if (!query) throw new Response("query Parameter not found", { status: 400 });

  const { results } = await getAutocompleteSearchUseCase(query);

  const allTitles = results.filter((r) => r.result_type === "title");
  const filteredTitles =
    filter === "movies"
      ? allTitles.filter((r) => r.type === "movie")
      : filter === "tv"
        ? allTitles.filter((r) => r.type !== null && TV_TYPES.has(r.type))
        : allTitles;

  const titleResults: MovieModel[] = filteredTitles.map((item) => ({
    id: item.id,
    externalId: item.id,
    title: item.name,
    posterUrl: item.image_url ?? "",
    description: "",
    releaseDate: item.year ? String(item.year) : "",
    type: item.type ?? "",
  }));

  const peopleResults = results.filter((r) => r.result_type === "person");

  return { titleResults, peopleResults, query, filter };
}
