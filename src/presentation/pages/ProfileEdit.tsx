import PageContainer from "../components/PageContainer";
import type { ProfileModel } from "../../domain/model/ProfileModel";

import Banner from "../components/Banner";
import {
  Link,
  redirect,
  useLoaderData,
  type ActionFunctionArgs,
} from "react-router-dom";
import saveProfileUseCase from "../../domain/usecases/saveProfileUseCase";
import getProfileLocalUseCase from "../../domain/usecases/getProfileLocalUseCase";
import { ProfileEditForm } from "../components/ProfileEditForm";

export default function ProfileEdit() {
  const loaderData = useLoaderData() as { profile: ProfileModel } | undefined;

  return (
    <PageContainer>
      <Banner>
        <div className="tems-center flex h-[50vh] w-full flex-col justify-center text-center text-white">
          <h1 className="mb-2 text-5xl md:text-7xl">Welcome to ReactFlix</h1>
          <p className="mb-8 text-xl text-gray-200 md:text-2xl">
            Discover thousands of movies and series. Stream anywhere, anytime.
          </p>
        </div>
      </Banner>
      <div className="mb-12 grid gap-2 sm:grid-cols-1">
        <div className="mt-6">
          <ProfileEditForm profile={loaderData?.profile} />
        </div>
      </div>
    </PageContainer>
  );
}

export async function profileEditAction({ request }: ActionFunctionArgs) {
  console.log("Edit profile action called");

  const formData = await request.formData();
  const name = formData.get("name") as string;
  const bio = formData.get("bio") as string;

  try {
    const profileData = await saveProfileUseCase({
      id: 0,
      name: name,
      bio: bio,
    });

    return redirect("/profile");
  } catch (error) {
    return { errors: ["Could not authenticate user"] };
  }
}

export async function profileEditLoader(): Promise<{
  profile: ProfileModel;
}> {
  const data = await getProfileLocalUseCase();

  return { profile: data.data };
}
