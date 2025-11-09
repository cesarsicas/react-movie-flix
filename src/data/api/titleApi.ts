import { API_BASE_URL } from "../../utils/Constants";
import type { MovieRelease } from "../model/MovieRelease";

export async function getTitlesFromApi(): Promise<MovieRelease[]> {
  const response = await fetch(API_BASE_URL + "/titles/releases", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Could not fetch titles.");
  }

  const data = (await response.json()) as MovieRelease[];

  return data;
}
