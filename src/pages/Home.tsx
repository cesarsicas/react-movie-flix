import Banner from "../components/Banner";
import HomeSection from "../components/HomeSection";
import MoviesList from "../components/MoviesList";
import PageContainer from "../components/PageContainer";
import { useLoaderData } from "react-router-dom";
import getTitlesUseCase from "../domain/usecases/getTitlesUseCase";
import type MovieModel from "../domain/model/MovieModel";

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
      <HomeSection title="New Releases">
        <MoviesList movies={releases.slice(0, 10)} />
      </HomeSection>

      <HomeSection title="Popular Movies">
        <MoviesList movies={releases.slice(11, 20)} />
      </HomeSection>

      <HomeSection title="Trending">
        <MoviesList movies={releases.slice(21, 30)} />
      </HomeSection>
    </PageContainer>
  );
}

export async function moviesLoader(): Promise<{ releases: MovieModel[] }> {
  const data = await getTitlesUseCase();
  return { releases: data.releases };
}
