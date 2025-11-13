import { getTitlesSearch } from "../../data/api/titleApi";
import type { TitleSearchModel } from "../model/TitleSearchModel";

export default async function getTitlesSearchUseCase(
  query: string,
): Promise<TitleSearchModel[]> {
  const response = await getTitlesSearch(query);

  return response as TitleSearchModel[];
}
