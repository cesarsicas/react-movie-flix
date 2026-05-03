export interface AutocompleteResultModel {
  id: number;
  name: string;
  relevance: number;
  type: string | null;
  year: number | null;
  result_type: "title" | "person";
  imdb_id: string | null;
  tmdb_id: number | null;
  tmdb_type: "movie" | "tv" | null;
  image_url: string | null;
}

export interface AutocompleteSearchModel {
  results: AutocompleteResultModel[];
}
