export class MovieModel {
  public id: string;
  public title: string;
  public posterUrl: string;
  public description: string;
  public year: string;
  public genres: string[];

  constructor(
    id: string,
    title: string,
    posterUrl: string,
    description: string,
    year: string,
    genres: string[],
  ) {
    this.id = id;
    this.title = title;
    this.posterUrl = posterUrl;
    this.description = description;
    this.year = year;
    this.genres = genres;
  }
}
