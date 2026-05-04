import { getTitlesList, type TitlesListParams } from "../../data/api/titleApi";
import type { TitleListResponse } from "../../data/model/TitleListResponse";
import type MovieModel from "../model/MovieModel";

export interface TitlesListResult {
  titles: MovieModel[];
  page: number | null;
  total_results: number;
  total_pages: number | null;
}

export default async function getTitlesListUseCase(
  params: TitlesListParams = {},
): Promise<TitlesListResult> {
  const response: TitleListResponse = await getTitlesList(params);

  const titles: MovieModel[] = response.titles.map((item) => ({
    id: item.id,
    externalId: item.externalId,
    title: item.title,
    posterUrl: "",
    description: "",
    releaseDate: item.year ? String(item.year) : "",
    type: item.type,
  }));

  return {
    titles,
    page: response.page,
    total_results: response.total_results,
    total_pages: response.total_pages,
  };
}
