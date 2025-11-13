import Banner from "../components/Banner";
import HomeSection from "../components/HomeSection";
import MoviesList from "../components/MoviesList";
import PageContainer from "../components/PageContainer";
import { useLoaderData, type LoaderFunctionArgs } from "react-router-dom";
import type MovieModel from "../../domain/model/MovieModel";
import getTitlesSearchUseCase from "../../domain/usecases/getTitlesSearchUseCase";

export function SearchResult() {
  const { result } = useLoaderData() as { result: MovieModel[] };

  return (
    <PageContainer>
      <Banner>
        <div className="tems-center flex h-[50vh] w-full flex-col justify-center text-center text-white">
          <h1 className="mb-2 text-5xl md:text-7xl">ReactFlix</h1>
          <p className="mb-8 text-xl text-gray-200 md:text-2xl">
            Discover thousands of movies and series. Stream anywhere, anytime.
          </p>
        </div>
      </Banner>
      <HomeSection title="Search Result">
        <MoviesList movies={result} />
      </HomeSection>
    </PageContainer>
  );
}

export async function titleSearchLoader({
  request,
}: LoaderFunctionArgs): Promise<{
  result: MovieModel[];
}> {
  const url = new URL(request.url);
  const query = url.searchParams.get("query");

  if (!query) {
    throw new Response("query Parameter not found", { status: 400 });
  }

  const result = (await getTitlesSearchUseCase(query)).map((searchResult) => {
    return {
      id: searchResult.id,
      title: searchResult.name,
      posterUrl: searchResult.image_url,
      releaseDate: "",
      type: searchResult.type,
    } as MovieModel;
  });

  return { result: result };
}
