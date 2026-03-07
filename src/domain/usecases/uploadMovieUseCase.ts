import type { WatchPartyMovieModel } from "../model/WatchPartyMovieModel";

export async function uploadMovieUseCase(file: File, title: string): Promise<WatchPartyMovieModel> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    id: `m-${Date.now()}`,
    title,
    duration: 0,
    filename: file.name,
  };
}
