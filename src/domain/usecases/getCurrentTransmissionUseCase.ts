import type { TransmissionModel } from "../model/TransmissionModel";

const mockTransmission: TransmissionModel = {
  id: "tx-001",
  movieName: "Interstellar",
  startTime: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
  duration: 169,
  isActive: true,
};

export async function getCurrentTransmissionUseCase(): Promise<TransmissionModel | null> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockTransmission;
  // return null; // Uncomment to test empty state
}
