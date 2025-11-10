import { getProfile } from "../../data/api/defaultUserApi";
import { getAuthToken } from "../../utils/auth";
import type { ProfileModel } from "../model/ProfileModel";

export default async function getProfileUseCase(): Promise<{
  data: ProfileModel;
}> {
  const token = getAuthToken();
  const data = await getProfile(token);

  return { data: data.response as ProfileModel };
}
