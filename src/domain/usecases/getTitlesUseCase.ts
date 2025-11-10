import { getTitles } from "../../data/api/titleApi";
import { saveLocalReleases } from "../../data/redux/releasesSlice";
import { store } from "../../data/redux/store";
import type MovieModel from "../model/MovieModel";

export default async function getTitlesUseCase(): Promise<{
  releases: MovieModel[];
}> {
  const cachedMovies: MovieModel[] = store?.getState()?.releases?.movies;

  if (cachedMovies && cachedMovies.length > 0) {
    return { releases: cachedMovies };
  }

  const response = await getTitles();

  const model = response.map((release) => {
    return {
      id: release.id,
      title: release.title,
      posterUrl: release.poster_url ?? "",
      description: "Description",
      releaseDate: release.source_release_date ?? "",
      type: release.type,
    } as MovieModel;
  });

  store.dispatch(saveLocalReleases(model));

  return { releases: model };
}
