import { API_BASE_URL } from "../../utils/Constants";
import type { AutocompleteSearchResponse } from "../model/AutocompleteSearchResponse";
import type { GenreResponse } from "../model/GenreResponse";
import type { MovieRelease } from "../model/MovieRelease";
import type { PersonResponse } from "../model/PersonResponse";
import type { SaveTitleReview } from "../model/SaveTitleReview";
import type { TitleDetailsReponse } from "../model/TitleDetailsResponse";
import type { TitleListResponse } from "../model/TitleListResponse";
import type { TitleReviewReponse } from "../model/TitleReviewResponse";
import type { TitleSearchResponse } from "../model/TitleSearchResponse";

const USE_CACHE = true;

export async function getGenres(): Promise<GenreResponse[]> {
  const response = await fetch(`${API_BASE_URL}/titles/genres?useCache=${USE_CACHE}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Could not fetch genres.");
  }

  return (await response.json()) as GenreResponse[];
}

export async function getTitles(): Promise<MovieRelease[]> {
  const response = await fetch(`${API_BASE_URL}/titles/releases?useCache=${USE_CACHE}`, {
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

export async function getTitleAndPeopleSearch(
  searchValue: string,
  searchField: string,
  types?: string,
): Promise<TitleSearchResponse> {
  if (!searchValue) {
    throw new Response("Server error", { status: 500 });
  }

  const params = new URLSearchParams({ searchValue, searchField });
  if (types) params.set("types", types);

  const response = await fetch(`${API_BASE_URL}/titles/search?${params.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Could not fetch titles.");
  }

  const data = (await response.json()) as TitleSearchResponse;

  return data;
}

export interface TitlesListParams {
  types?: string;
  sort_by?: string;
  genres?: string;
  release_date_start?: string;
  release_date_end?: string;
  user_rating_low?: string;
  user_rating_high?: string;
  page?: string;
  limit?: string;
  person_id?: string;
  useCache?: boolean;
}

export async function getTitlesList(params: TitlesListParams = {}): Promise<TitleListResponse> {
  const query = new URLSearchParams();

  if (params.types) query.set("types", params.types);
  if (params.sort_by) query.set("sort_by", params.sort_by);
  if (params.genres) query.set("genres", params.genres);
  if (params.release_date_start) query.set("release_date_start", params.release_date_start);
  if (params.release_date_end) query.set("release_date_end", params.release_date_end);
  if (params.user_rating_low) query.set("user_rating_low", params.user_rating_low);
  if (params.user_rating_high) query.set("user_rating_high", params.user_rating_high);
  if (params.page) query.set("page", params.page);
  if (params.limit) query.set("limit", params.limit);
  if (params.person_id) query.set("person_id", params.person_id);
  query.set("useCache", String(params.useCache ?? false));

  const response = await fetch(`${API_BASE_URL}/titles/list?${query.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Could not fetch titles list.");
  }

  return (await response.json()) as TitleListResponse;
}

export async function getPerson(personId: number): Promise<PersonResponse> {
  const response = await fetch(
    `${API_BASE_URL}/titles/person/${personId}?useCache=${USE_CACHE}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Response("Person not found", { status: response.status });
  }

  return (await response.json()) as PersonResponse;
}

export async function getTitleDetails(
  externalId: number,
): Promise<TitleDetailsReponse> {
  if (!externalId) {
    throw new Response("Not Found", { status: 404 });
  }
  const response = await fetch(`${API_BASE_URL}/titles/${externalId}?useCache=${USE_CACHE}`, {
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

export function getTitleStreamUrl(externalId: number): string {
  if (!externalId) {
    throw new Error("externalId is required");
  }
  return `${API_BASE_URL}/titles/${externalId}/stream`;
}

export async function getAutocompleteSearch(
  query: string,
): Promise<AutocompleteSearchResponse> {
  if (!query) {
    throw new Response("Server error", { status: 500 });
  }

  const params = new URLSearchParams({ query });

  const response = await fetch(
    `${API_BASE_URL}/titles/autocomplete-search?${params.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Could not fetch autocomplete results.");
  }

  return (await response.json()) as AutocompleteSearchResponse;
}

export async function postTitleReview(
  token: string,
  saveTitleReview: SaveTitleReview,
): Promise<TitleReviewReponse> {
  if (!saveTitleReview) {
    throw new Response("Server error", { status: 500 });
  }
  const response = await fetch(`${API_BASE_URL}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(saveTitleReview),
  });

  if (!response.ok) {
    throw new Error("Could not save review");
  }

  const data = (await response.json()) as TitleReviewReponse;

  return data;
}
