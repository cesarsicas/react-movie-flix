import PageContainer from "../components/PageContainer";
import type { ProfileResponse } from "../data/model/ProfileResponse";
import type { ProfileModel } from "../domain/model/ProfileModel";
import { getAuthToken } from "../utils/auth";
import { API_BASE_URL } from "../utils/Constants";

export default function Profile() {
  return (
    <PageContainer>
      <h1>Profile Page - To be implemented</h1>
    </PageContainer>
  );
}

export async function profileLoader(): Promise<{
  profile: ProfileModel;
}> {
  console.log("was called");

  const token = getAuthToken();
  const response = await fetch(`${API_BASE_URL}/default/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 404) {
    return { profile: { id: 0, name: "", bio: "" } as ProfileModel };
  }

  if (!response.ok) {
    throw new Error("Could not fetch profile.");
  }

  const data = (await response.json()) as ProfileResponse;
  const profile = data as unknown as ProfileModel;

  console.log(data);
  return { profile };
}
