export default class ReviewModel {
  public id: string;
  public userName: string;
  public review: string;

  constructor(id: string, userName: string, review: string) {
    this.id = id;
    this.userName = userName;
    this.review = review;
  }
}
