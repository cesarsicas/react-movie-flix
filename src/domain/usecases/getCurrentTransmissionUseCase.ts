import { fetchCurrentTransmission } from "../../data/api/transmissionApi";
import type { TransmissionModel } from "../model/TransmissionModel";

export async function getCurrentTransmissionUseCase(): Promise<TransmissionModel | null> {
  return await fetchCurrentTransmission();
}
