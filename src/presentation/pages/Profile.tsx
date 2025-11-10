import PageContainer from "../components/PageContainer";
import type { ProfileModel } from "../../domain/model/ProfileModel";
import getProfileUseCase from "../../domain/usecases/getProfileUseCase";

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
  const data = await getProfileUseCase();
  return { profile: data.data };
}
