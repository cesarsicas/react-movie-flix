import { API_BASE_URL } from "../../utils/Constants";
import type { ProfileResponse } from "../model/ProfileResponse";
import type { ProfileUpdate } from "../model/ProfileUpdate";

export async function getProfile(token: string): Promise<{
  response: ProfileResponse;
}> {
  const response = await fetch(`${API_BASE_URL}/default/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 404 || response.status === 403) {
    return { response: { id: 0, name: "", bio: "" } as ProfileResponse };
  }

  if (!response.ok) {
    throw new Error("Could not fetch profile.");
  }

  const data = (await response.json()) as ProfileResponse;
  return { response: data };
}

export async function postProfile(
  token: string,
  profile: ProfileUpdate,
): Promise<{
  response: ProfileResponse;
}> {
  const response = await fetch(`${API_BASE_URL}/default/me`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profile),
  });

  if (!response.ok) {
    throw new Error("Could not update profile.");
  }

  const data = (await response.json()) as ProfileResponse;
  return { response: data };
}
