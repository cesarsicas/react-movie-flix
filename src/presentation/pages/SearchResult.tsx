import Banner from "../components/Banner";
import HomeSection from "../components/HomeSection";
import MoviesList from "../components/MoviesList";
import PageContainer from "../components/PageContainer";
import { Link, useLoaderData, type LoaderFunctionArgs } from "react-router-dom";
import type MovieModel from "../../domain/model/MovieModel";
import type { AutocompleteResultModel } from "../../domain/model/AutocompleteSearchModel";
import getAutocompleteSearchUseCase from "../../domain/usecases/getAutocompleteSearchUseCase";
import placeholder from "../../assets/poster_placeholder.png";

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
      <Banner>
        <div className="flex h-[50vh] w-full flex-col items-center justify-center text-center text-white">
          <h1 className="mb-2 text-5xl md:text-7xl">ReactFlix</h1>
          <p className="mb-8 text-xl text-gray-200 md:text-2xl">
            Discover thousands of movies and series. Stream anywhere, anytime.
          </p>
        </div>
      </Banner>

      <div className="bg-gray-100 px-8 pt-6">
        <div className="flex gap-2">
          {TAB_LABELS.map(({ key, label }) => (
            <Link
              key={key}
              to={`/title/search/?query=${encodeURIComponent(query)}&filter=${key}`}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                filter === key
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {isAll && (
        <HomeSection title={`Results for "${query}"`}>
          {titleResults.length === 0 && peopleResults.length === 0 ? (
            <p className="text-gray-500">No results found.</p>
          ) : (
            <div className="grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5">
              {titleResults.map((movie) => (
                <Link key={`title-${movie.id}`} to={`/title/details/${movie.externalId}`}>
                  <ResultCard name={movie.title} imageUrl={movie.posterUrl} />
                </Link>
              ))}
              {peopleResults.map((person) => (
                <Link key={`person-${person.id}`} to={`/person/${person.id}`}>
                  <ResultCard name={person.name} imageUrl={person.image_url} />
                </Link>
              ))}
            </div>
          )}
        </HomeSection>
      )}

      {!isAll && filter !== "people" && (
        <HomeSection title={`Title Results for "${query}"`}>
          {titleResults.length > 0 ? (
            <MoviesList movies={titleResults} />
          ) : (
            <p className="text-gray-500">No titles found.</p>
          )}
        </HomeSection>
      )}

      {!isAll && filter === "people" && (
        <HomeSection title={`People Results for "${query}"`}>
          {peopleResults.length > 0 ? (
            <div className="grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5">
              {peopleResults.map((person) => (
                <Link key={person.id} to={`/person/${person.id}`}>
                  <ResultCard name={person.name} imageUrl={person.image_url} />
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No people found.</p>
          )}
        </HomeSection>
      )}
    </PageContainer>
  );
}

function ResultCard({ name, imageUrl }: { name: string; imageUrl: string | null | undefined }) {
  return (
    <div className="max-w-65 min-w-50 transform cursor-pointer overflow-hidden rounded-md bg-white shadow-xl transition duration-300 hover:scale-[1.02]">
      <img
        src={imageUrl || placeholder}
        alt={name}
        className="h-94 w-full object-cover"
      />
      <div className="p-3">
        <h3 className="line-clamp-1 text-center font-semibold text-gray-900">{name}</h3>
      </div>
    </div>
  );
}

export async function titleSearchLoader({ request }: LoaderFunctionArgs): Promise<LoaderData> {
  const url = new URL(request.url);
  const query = url.searchParams.get("query");
  const filter = (url.searchParams.get("filter") as FilterTab) || "all";

  if (!query) {
    throw new Response("query Parameter not found", { status: 400 });
  }

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

  return {
    titleResults,
    peopleResults,
    query,
    filter,
  };
}
