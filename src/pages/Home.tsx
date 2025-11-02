import Banner from "../components/Banner";
import HomeSection from "../components/HomeSection";
import MoviesList from "../components/MoviesList";
import PageContainer from "../components/PageContainer";
import { API_BASE_URL } from "../utils/Constants";
import type MovieReleaseResponse from "../model/data/MovieReleaseResponse";
import { MovieModel } from "../model/MovieModel";
import { useLoaderData } from "react-router-dom";
import { saveLocalReleases } from "../data/redux/releasesSlice";
import { store } from "../data/redux/store";

interface LoaderData {
  releases: MovieModel[];
}

export function Home() {
  const { releases } = useLoaderData() as LoaderData;

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
  const cachedMovies = store?.getState()?.releases?.movies;

  if (cachedMovies && cachedMovies.length > 0) {
    return { releases: cachedMovies };
  }

  const response = await fetch(API_BASE_URL + "/movies/releases", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Could not fetch movies.");
  }

  const data = (await response.json()) as MovieReleaseResponse;

  const model = data.releases.map((release) => {
    return new MovieModel(
      release.id,
      release.title,
      release.poster_url ?? "",
      "Description",
      release.source_release_date ?? "",
      release.type,
    );
  });

  store.dispatch(saveLocalReleases(model));

  return { releases: model };
}
