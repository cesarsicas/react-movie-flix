import PageContainer from "../components/PageContainer";
import type { ProfileModel } from "../../domain/model/ProfileModel";
import Banner from "../components/Banner";
import { Link, useLoaderData } from "react-router-dom";
import getProfileUseCase from "../../domain/usecases/getProfileUseCase";

export default function Profile() {
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
      <div className="mb-12 flex w-full flex-row justify-center">
        <div className="mt-6 flex w-full flex-col md:w-2/3 lg:w-1/3">
          <h1 className="mb-4 text-center text-3xl font-bold text-gray-800">
            Profile
          </h1>

          {loaderData?.profile ? (
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800">Name</h2>
              <p className="mb-6">{loaderData?.profile.name}</p>

              <h2 className="text-2xl font-bold text-gray-800">Bio</h2>
              <p className="mb-6">{loaderData?.profile.bio}</p>
            </div>
          ) : (
            <p>Update your profile to show here</p>
          )}

          <div className="text-center">
            <Link
              to={`/profile/edit`}
              className="min-w-[120px] rounded border bg-slate-600 px-6 py-2 text-center text-white hover:bg-slate-600 focus:outline-none"
            >
              Update Profile
            </Link>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export async function profileLoader(): Promise<{
  profile: ProfileModel;
}> {
  const data = await getProfileUseCase();

  return { profile: data.data };
}
