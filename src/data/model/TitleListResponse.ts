export interface TitleListItem {
  id: number;
  externalId: number;
  title: string;
  type: string;
  year: number;
  imdb_id: string;
  tmdb_id: number;
  tmdb_type: string;
}

export interface TitleListResponse {
  titles: TitleListItem[];
  page: number | null;
  total_results: number;
  total_pages: number | null;
}
