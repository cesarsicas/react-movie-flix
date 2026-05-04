export interface TitleSourceResponse {
  source_id: number;
  name: string;
  type: string;
  region: string;
  ios_url: string | null;
  android_url: string | null;
  web_url: string;
  format: string;
  price: number | null;
  seasons: number | null;
  episodes: number | null;
}

export interface TitleCastMemberResponse {
  person_id: number;
  type: string;
  full_name: string;
  headshot_url: string | null;
  role: string;
  episode_count: number | null;
  order: number;
}

export interface TitleDetailsReponse {
  id: number;
  title: string;
  original_title: string;
  plot_overview: string;
  type: string;
  runtime_minutes?: number;
  year?: number;
  end_year?: number;
  release_date?: string;
  imdb_id?: string;
  tmdb_id?: number;
  tmdb_type?: string;
  genres?: number[];
  genre_names?: string[];
  similar_titles?: number[];
  networks?: number[];
  network_names?: string[];
  user_rating?: number;
  critic_score?: number;
  relevance_percentile?: number;
  us_rating?: string;
  poster?: string;
  backdrop?: string;
  original_language?: string;
  trailer?: string;
  trailer_thumbnail?: string;
  sources?: TitleSourceResponse[];
  cast?: TitleCastMemberResponse[];
}
