import { API_BASE_URL } from "../../utils/Constants";
import type { MovieRelease } from "../model/MovieRelease";
import type { TitleDetailsReponse } from "../model/TitleDetailsResponse";
import type { TitleReviewReponse } from "../model/TitleReviewResponse";

export async function getTitles(): Promise<MovieRelease[]> {
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

export async function getTitleDetails(
  externalId: number,
): Promise<TitleDetailsReponse> {
  if (!externalId) {
    throw new Response("Not Found", { status: 404 });
  }
  const response = await fetch(`${API_BASE_URL}/titles/${externalId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Could not fetch movies.");
  }

  const data = (await response.json()) as TitleDetailsReponse;

  return data;
}

export async function getTitleReviews(
  externalId: Number,
): Promise<TitleReviewReponse[]> {
  if (!externalId) {
    throw new Response("Not Found", { status: 404 });
  }
  const response = await fetch(`${API_BASE_URL}/titles/${externalId}/reviews`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Could not fetch titles.");
  }

  const data = (await response.json()) as TitleReviewReponse[];

  return data;
}
