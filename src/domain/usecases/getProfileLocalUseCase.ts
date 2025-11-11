import { store } from "../../data/redux/store";
import type { ProfileModel } from "../model/ProfileModel";

export default async function getProfileLocalUseCase(): Promise<{
  data: ProfileModel;
}> {
  const cachedMovies = store?.getState()?.profile.profile;

  return { data: cachedMovies as ProfileModel };
}
