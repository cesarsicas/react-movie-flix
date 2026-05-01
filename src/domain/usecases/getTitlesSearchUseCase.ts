import { getTitlesSearch } from "../../data/api/titleApi";
import type { TitleSearchModel } from "../model/TitleSearchModel";

export default async function getTitlesSearchUseCase(
  query: string,
  types?: string,
): Promise<TitleSearchModel> {
  return await getTitlesSearch(query, types);
}
