import { getTitleAndPeopleSearch } from "../../data/api/titleApi";
import type { TitleSearchModel } from "../model/TitleSearchModel";

export default async function getTitleAndPeopleSearchUseCase(
  query: string,
  types?: string,
): Promise<TitleSearchModel> {
  return await getTitleAndPeopleSearch(query, types);
}
