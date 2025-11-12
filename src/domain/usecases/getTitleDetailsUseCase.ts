import { getTitleDetails } from "../../data/api/titleApi";
import type { TitleDetailsModel } from "../model/TitleDetailsModel";

export default async function getTitleDetailsUseCase(
  externalId: number,
): Promise<TitleDetailsModel> {
  const response = await getTitleDetails(externalId);
  return response;
}
