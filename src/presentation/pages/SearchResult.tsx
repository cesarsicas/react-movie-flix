import Banner from "../components/Banner";
import HomeSection from "../components/HomeSection";
import MoviesList from "../components/MoviesList";
import PageContainer from "../components/PageContainer";
import { Link, useLoaderData, type LoaderFunctionArgs } from "react-router-dom";
import type MovieModel from "../../domain/model/MovieModel";
import type { PersonSearchResultModel } from "../../domain/model/TitleSearchModel";
import getTitlesSearchUseCase from "../../domain/usecases/getTitlesSearchUseCase";

type FilterTab = "all" | "movies" | "tv" | "people";

const FILTER_TYPES: Record<FilterTab, string | undefined> = {
  all: undefined,
  movies: "movie",
  tv: "tv_series,tv_miniseries,tv_special",
  people: undefined,
};

const TAB_LABELS: { key: FilterTab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "movies", label: "Movies" },
  { key: "tv", label: "TV" },
  { key: "people", label: "People" },
];

interface LoaderData {
  titleResults: MovieModel[];
  peopleResults: PersonSearchResultModel[];
  query: string;
  filter: FilterTab;
}

export function SearchResult() {
  const { titleResults, peopleResults, query, filter } = useLoaderData() as LoaderData;

  const showTitles = filter !== "people";
  const showPeople = filter !== "movies" && filter !== "tv";

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

      {showTitles && (
        <HomeSection title={`Title Results for "${query}"`}>
          {titleResults.length > 0 ? (
            <MoviesList movies={titleResults} />
          ) : (
            <p className="text-gray-500">No titles found.</p>
          )}
        </HomeSection>
      )}

      {showPeople && (
        <HomeSection title={`People Results for "${query}"`}>
          {peopleResults.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {peopleResults.map((person) => (
                <PersonCard key={person.id} person={person} />
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

function PersonCard({ person }: { person: PersonSearchResultModel }) {
  return (
    <Link to={`/person/${person.id}`}>
      <div className="flex flex-col items-center rounded-md bg-white p-4 shadow-md transition duration-300 hover:scale-[1.02] hover:shadow-lg">
        <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-2xl text-gray-500">
          {person.name.charAt(0)}
        </div>
        <p className="line-clamp-2 text-center text-sm font-semibold text-gray-900">
          {person.name}
        </p>
        {person.main_profession && (
          <span className="mt-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs capitalize text-gray-600">
            {person.main_profession}
          </span>
        )}
      </div>
    </Link>
  );
}

export async function titleSearchLoader({ request }: LoaderFunctionArgs): Promise<LoaderData> {
  const url = new URL(request.url);
  const query = url.searchParams.get("query");
  const filter = (url.searchParams.get("filter") as FilterTab) || "all";

  if (!query) {
    throw new Response("query Parameter not found", { status: 400 });
  }

  const types = FILTER_TYPES[filter];
  const searchResult = await getTitlesSearchUseCase(query, types);

  const titleResults: MovieModel[] = searchResult.title_results.map((item) => ({
    id: item.id,
    externalId: item.id,
    title: item.name,
    posterUrl: "",
    description: "",
    releaseDate: item.year ? String(item.year) : "",
    type: item.type,
  }));

  return {
    titleResults,
    peopleResults: searchResult.people_results,
    query,
    filter,
  };
}
