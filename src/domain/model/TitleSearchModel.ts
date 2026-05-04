export interface TitleSearchResultModel {
  id: number;
  name: string;
  type: string;
  year: number;
  tmdb_id: number;
  tmdb_type: string;
}

export interface PersonSearchResultModel {
  id: number;
  name: string;
  main_profession: string;
}

export interface TitleSearchModel {
  title_results: TitleSearchResultModel[];
  people_results: PersonSearchResultModel[];
}
