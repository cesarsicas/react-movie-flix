export interface TitleSearchResultItem {
  id: number;
  name: string;
  type: string;
  year: number;
  imdb_id: string;
  tmdb_id: number;
  tmdb_type: string;
}

export interface PersonSearchResultItem {
  id: number;
  name: string;
  main_profession: string;
  imdb_id: string;
  tmdb_id: number;
}

export interface TitleSearchResponse {
  title_results: TitleSearchResultItem[];
  people_results: PersonSearchResultItem[];
}
