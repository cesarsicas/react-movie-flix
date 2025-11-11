import { getProfile, postProfile } from "../../data/api/defaultUserApi";
import { getAuthToken } from "../../utils/auth";
import type { ProfileModel } from "../model/ProfileModel";

export default async function saveProfileUseCase(
  profile: ProfileModel,
): Promise<void> {
  const token = getAuthToken();
  await postProfile(token, profile);
}
