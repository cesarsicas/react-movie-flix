import { postTitleReview } from "../../data/api/titleApi";
import { getAuthToken } from "../../utils/auth";
import type { SaveTitleReviewModel } from "../model/SaveTitleReviewModel";
import type { TitleReviewModel } from "../model/TitleReviewModel";

export default async function saveTitleReviewUseCase(
  review: SaveTitleReviewModel,
): Promise<TitleReviewModel> {
  const token = getAuthToken();
  const titleReviewResponse = await postTitleReview(token, review);

  const profileModel = titleReviewResponse as TitleReviewModel;

  return profileModel;
}
