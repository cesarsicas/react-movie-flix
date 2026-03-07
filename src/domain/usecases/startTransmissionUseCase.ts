import type { TransmissionModel } from "../model/TransmissionModel";
import { getAvailableMoviesUseCase } from "./getAvailableMoviesUseCase";

export async function startTransmissionUseCase(movieId: string): Promise<TransmissionModel> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const movies = await getAvailableMoviesUseCase();
  const movie = movies.find((m) => m.id === movieId);
  if (!movie) throw new Error(`Movie not found: ${movieId}`);
  return {
    id: `tx-${Date.now()}`,
    movieName: movie.title,
    startTime: new Date().toISOString(),
    duration: movie.duration,
    isActive: true,
  };
}
