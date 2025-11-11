import { getProfile } from "../../data/api/defaultUserApi";
import { saveLocalProfile } from "../../data/redux/profileSlice";
import { store } from "../../data/redux/store";
import { getAuthToken } from "../../utils/auth";
import type { ProfileModel } from "../model/ProfileModel";

export default async function getProfileUseCase(): Promise<{
  data: ProfileModel;
}> {
  const token = getAuthToken();
  const data = await getProfile(token);

  const profileModel = data.response as ProfileModel;
  store.dispatch(saveLocalProfile(profileModel));

  return { data: profileModel };
}
