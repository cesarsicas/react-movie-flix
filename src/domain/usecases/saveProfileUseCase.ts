import { postProfile } from "../../data/api/defaultUserApi";
import { saveLocalProfile } from "../../data/redux/profileSlice";
import { store } from "../../data/redux/store";
import { getAuthToken } from "../../utils/auth";
import type { ProfileModel } from "../model/ProfileModel";

export default async function saveProfileUseCase(
  profile: ProfileModel,
): Promise<{ data: ProfileModel }> {
  const token = getAuthToken();
  const profileResponse = await postProfile(token, profile);

  const profileModel = profileResponse.response as ProfileModel;
  store.dispatch(saveLocalProfile(profileModel));

  return { data: profileModel };
}
