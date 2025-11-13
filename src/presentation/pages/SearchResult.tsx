import Banner from "../components/Banner";
import HomeSection from "../components/HomeSection";
import MoviesList from "../components/MoviesList";
import PageContainer from "../components/PageContainer";
import { useLoaderData, type LoaderFunction } from "react-router-dom";
import getTitlesUseCase from "../../domain/usecases/getTitlesUseCase";
import type MovieModel from "../../domain/model/MovieModel";
import getProfileUseCase from "../../domain/usecases/getProfileUseCase";
import type { TitleSearchModel } from "../../domain/model/TitleSearchModel";
import getTitlesSearchUseCase from "../../domain/usecases/getTitlesSearchUseCase";

export function Home() {
  const { releases } = useLoaderData() as { releases: MovieModel[] };

  return (
    <PageContainer>
      <Banner>
        <div className="tems-center flex h-[50vh] w-full flex-col justify-center text-center text-white">
          <h1 className="mb-2 text-5xl md:text-7xl">Welcome to ReactFlix</h1>
          <p className="mb-8 text-xl text-gray-200 md:text-2xl">
            Discover thousands of movies and series. Stream anywhere, anytime.
          </p>
        </div>
      </Banner>
      <HomeSection title="Search Result">
        <MoviesList movies={releases.slice(0, 10)} />
      </HomeSection>
    </PageContainer>
  );
}

export async function titleSearchLoader(): Promise<{
  result: TitleSearchModel[];
}> {
  const searchParams = new URL(request.url).searchParams;

  const query = searchParams.query;

  if (!query) {
    throw new Response("Not Found", { status: 404 });
  }

  const result = await getTitlesSearchUseCase(query);

  return { result: result };
}
