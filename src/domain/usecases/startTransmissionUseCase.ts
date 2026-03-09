import { fetchStartTransmission } from "../../data/api/transmissionApi";
import { getAdminToken } from "../../utils/adminAuth";
import type { TransmissionModel } from "../model/TransmissionModel";

export async function startTransmissionUseCase(movieId: string): Promise<TransmissionModel> {
  const token = getAdminToken();
  return await fetchStartTransmission(token, movieId);
}
