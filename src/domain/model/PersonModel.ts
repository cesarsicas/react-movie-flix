export interface PersonModel {
  id: number;
  externalId: number;
  full_name: string;
  first_name: string | null;
  last_name: string | null;
  tmdb_id: number | null;
  imdb_id: string | null;
  main_profession: string | null;
  secondary_profession: string | null;
  tertiary_profession: string | null;
  date_of_birth: string | null;
  date_of_death: string | null;
  place_of_birth: string | null;
  gender: string | null;
  headshot_url: string | null;
  known_for: number[];
  relevance_percentile: number | null;
}
