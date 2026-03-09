import { fetchCurrentTransmission } from "../../data/api/transmissionApi";
import { getAdminToken } from "../../utils/adminAuth";
import type { TransmissionModel } from "../model/TransmissionModel";

export async function getCurrentTransmissionUseCase(): Promise<TransmissionModel | null> {
  const token = getAdminToken();
  return await fetchCurrentTransmission(token);
}
