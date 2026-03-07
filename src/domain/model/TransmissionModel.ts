export interface TransmissionModel {
  id: string;
  movieName: string;
  startTime: string; // ISO 8601
  duration: number;  // minutes
  isActive: boolean;
}
