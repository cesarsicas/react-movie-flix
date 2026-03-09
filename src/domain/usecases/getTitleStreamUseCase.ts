import { getTitleStreamUrl } from "../../data/api/titleApi";
import type TitleStreamModel from "../model/TitleStreamModel";

export default function getTitleStreamUseCase(
  externalId: number,
): TitleStreamModel {
  const streamUrl = getTitleStreamUrl(externalId);
  return { streamUrl };
}
