import { getAutocompleteSearch } from "../../data/api/titleApi";
import type { AutocompleteSearchModel } from "../model/AutocompleteSearchModel";

export default async function getAutocompleteSearchUseCase(
  query: string,
): Promise<AutocompleteSearchModel> {
  return await getAutocompleteSearch(query);
}
