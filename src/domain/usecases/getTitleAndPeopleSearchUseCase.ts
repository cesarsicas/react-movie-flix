import { getTitleAndPeopleSearch } from "../../data/api/titleApi";
import type { TitleSearchModel } from "../model/TitleSearchModel";

export default async function getTitleAndPeopleSearchUseCase(
  searchValue: string,
  searchField: string,
  types?: string,
): Promise<TitleSearchModel> {
  return await getTitleAndPeopleSearch(searchValue, searchField, types);
}
