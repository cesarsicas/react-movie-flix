import PageContainer from "../components/PageContainer";
import type { ProfileModel } from "../../domain/model/ProfileModel";
import getProfileUseCase from "../../domain/usecases/getProfileUseCase";
import Banner from "../components/Banner";
import { Link, useLoaderData } from "react-router-dom";

export default function Profile() {
  const loaderData = useLoaderData() as { details: ProfileModel } | undefined;

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
        <div className="mt-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Profile</h2>

          {loaderData?.details ? (
            <p>Profile</p>
          ) : (
            <div>
              <p className="mb-10">Create a profile to show your information</p>
              <Link
                to={`/profile/edit`}
                className="min-w-[120px] rounded border bg-slate-600 px-6 py-2 text-center text-white hover:bg-slate-600 focus:outline-none"
              >
                Create Profile
              </Link>
            </div>
          )}
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
