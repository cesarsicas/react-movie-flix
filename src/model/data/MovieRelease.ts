export class MovieRelease {
  public id: number;
  public title: string;
  public type: string;
  public imdb_id: string | null;
  public tmdb_id: number | null;
  public tmdb_type: string | null;
  public season_number: number | null;
  public poster_url: string | null;
  public source_release_date: string | null;
  public source_id: number | null;
  public source_name: string | null;
  public is_original: number | null;

  constructor(
    id: number,
    title: string,
    type: string,
    imdb_id: string | null = null,
    tmdb_id: number | null = null,
    tmdb_type: string | null = null,
    season_number: number | null = null,
    poster_url: string | null = null,
    source_release_date: string | null = null,
    source_id: number | null = null,
    source_name: string | null = null,
    is_original: number | null = null,
  ) {
    this.id = id;
    this.title = title;
    this.type = type;
    this.imdb_id = imdb_id;
    this.tmdb_id = tmdb_id;
    this.tmdb_type = tmdb_type;
    this.season_number = season_number;
    this.poster_url = poster_url;
    this.source_release_date = source_release_date;
    this.source_id = source_id;
    this.source_name = source_name;
    this.is_original = is_original;
  }
}
