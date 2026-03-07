import type { WatchPartyMovieModel } from "../model/WatchPartyMovieModel";

const mockMovies: WatchPartyMovieModel[] = [
  { id: "m-001", title: "Inception", duration: 148, filename: "inception_2010.mp4" },
  { id: "m-002", title: "The Dark Knight", duration: 152, filename: "dark_knight_2008.mp4" },
  { id: "m-003", title: "Interstellar", duration: 169, filename: "interstellar_2014.mkv" },
  { id: "m-004", title: "Dunkirk", duration: 106, filename: "dunkirk_2017.mp4" },
  { id: "m-005", title: "Oppenheimer", duration: 180, filename: "oppenheimer_2023.mkv" },
  { id: "m-006", title: "Tenet", duration: 150, filename: "tenet_2020.mp4" },
];

export async function getAvailableMoviesUseCase(): Promise<WatchPartyMovieModel[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockMovies;
}
