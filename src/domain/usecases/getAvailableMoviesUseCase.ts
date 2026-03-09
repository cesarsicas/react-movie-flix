import { fetchAvailableMovies } from "../../data/api/transmissionApi";
import { getAdminToken } from "../../utils/adminAuth";
import type { WatchPartyMovieModel } from "../model/WatchPartyMovieModel";

export async function getAvailableMoviesUseCase(): Promise<WatchPartyMovieModel[]> {
  const token = getAdminToken();
  return await fetchAvailableMovies(token);
}
