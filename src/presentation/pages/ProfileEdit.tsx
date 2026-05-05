import PageContainer from "../components/PageContainer";
import type { ProfileModel } from "../../domain/model/ProfileModel";
import { redirect, useLoaderData, type ActionFunctionArgs } from "react-router-dom";
import saveProfileUseCase from "../../domain/usecases/saveProfileUseCase";
import getProfileLocalUseCase from "../../domain/usecases/getProfileLocalUseCase";
import { ProfileEditForm } from "../components/ProfileEditForm";

export default function ProfileEdit() {
  const loaderData = useLoaderData() as { profile: ProfileModel } | undefined;

  return (
    <PageContainer>
      <div style={{ maxWidth: 520, margin: "40px auto" }}>
        {/* Channel header */}
        <div className="channel-strip" style={{ marginBottom: 24 }}>
          <span className="font-crt" style={{ color: "var(--amber)" }}>CH 01</span>
          <span>EDIT PROFILE</span>
          <span />
        </div>
        <div className="panel" style={{ padding: 24 }}>
          <ProfileEditForm profile={loaderData?.profile} />
        </div>
      </div>
    </PageContainer>
  );
}

export async function profileEditAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const bio = formData.get("bio") as string;

  try {
    await saveProfileUseCase({ id: 0, name, bio });
    return redirect("/profile");
  } catch {
    return { errors: ["Could not save profile"] };
  }
}

export async function profileEditLoader(): Promise<{ profile: ProfileModel }> {
  const data = await getProfileLocalUseCase();
  return { profile: data.data };
}
