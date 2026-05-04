import { getGenres } from "../../data/api/titleApi";
import type { GenreModel } from "../model/GenreModel";

async function getGenresUseCase(): Promise<GenreModel[]> {
  const genres = await getGenres();
  return genres.map(({ id, externalId, name }) => ({ id, externalId, name }));
}

export default getGenresUseCase;
