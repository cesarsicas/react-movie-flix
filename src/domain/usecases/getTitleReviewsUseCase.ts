import { getTitleReviews } from "../../data/api/titleApi";
import type { TitleReviewModel } from "../model/TitleReviewModel";

export default async function getTitleReviewsUseCase(
  externalId: number,
): Promise<TitleReviewModel[]> {
  const response = await getTitleReviews(externalId);
  return response as TitleReviewModel[];
}
