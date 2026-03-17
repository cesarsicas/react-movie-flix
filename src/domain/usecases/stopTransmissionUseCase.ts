import { fetchStopTransmission } from "../../data/api/transmissionApi";
import { getAdminToken } from "../../utils/adminAuth";

export async function stopTransmissionUseCase(): Promise<void> {
  const token = getAdminToken();
  await fetchStopTransmission(token);
}
