import { API_BASE_URL } from "../../utils/Constants";
import type { ProfileResponse } from "../model/ProfileResponse";

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

  if (response.status === 404) {
    return { response: { id: 0, name: "", bio: "" } as ProfileResponse };
  }

  if (!response.ok) {
    throw new Error("Could not fetch profile.");
  }

  const data = (await response.json()) as ProfileResponse;
  return { response: data };
}
