import { API_BASE_URL } from "../../utils/Constants";
import type { TransmissionModel } from "../../domain/model/TransmissionModel";
import type { WatchPartyMovieModel } from "../../domain/model/WatchPartyMovieModel";

interface TransmissionResponse {
  title: string;
  startedAt: string;
  duration: number;
}

interface TransmissionMovieDto {
  id: number;
  title: string;
  duration: number;
  filename: string;
}

export async function fetchAvailableMovies(token: string): Promise<WatchPartyMovieModel[]> {
  const response = await fetch(`${API_BASE_URL}/transmissions/movies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Could not fetch available movies.");
  }

  const data = (await response.json()) as TransmissionMovieDto[];

  return data.map((m) => ({
    id: String(m.id),
    title: m.title,
    duration: m.duration,
    filename: m.filename,
  }));
}

export async function fetchCurrentTransmission(): Promise<TransmissionModel | null> {
  const response = await fetch(`${API_BASE_URL}/transmissions/current`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Could not fetch current transmission.");
  }

  const data = (await response.json()) as TransmissionResponse;

  return {
    id: "",
    movieName: data.title,
    startTime: data.startedAt,
    duration: data.duration,
    isActive: true,
  };
}

export async function fetchStartTransmission(token: string, movieId: string): Promise<TransmissionModel> {
  const response = await fetch(`${API_BASE_URL}/transmissions/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ movieId }),
  });

  if (!response.ok) {
    throw new Error("Could not start transmission.");
  }

  const data = (await response.json()) as TransmissionResponse;

  return {
    id: "",
    movieName: data.title,
    startTime: data.startedAt,
    duration: data.duration,
    isActive: true,
  };
}

export async function fetchStopTransmission(token: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/transmissions/stop`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Could not stop transmission.");
  }
}
