export class MovieModel {
  public id: number;
  public title: string;
  public posterUrl: string;
  public description: string;
  public releaseDate: string;
  public type: string;

  constructor(
    id: number,
    title: string,
    posterUrl: string,
    description: string,
    releaseDate: string,
    type: string,
  ) {
    this.id = id;
    this.title = title;
    this.posterUrl = posterUrl;
    this.description = description;
    this.releaseDate = releaseDate;
    this.type = type;
  }
}
