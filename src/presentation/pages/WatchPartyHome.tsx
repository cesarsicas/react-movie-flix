import { Link, useLoaderData } from "react-router-dom";
import { checkAdminAuthLoader } from "../../utils/adminAuth";
import { getCurrentTransmissionUseCase } from "../../domain/usecases/getCurrentTransmissionUseCase";
import type { TransmissionModel } from "../../domain/model/TransmissionModel";
import PageContainer from "../components/PageContainer";
import TransmissionStatusCard from "../components/TransmissionStatusCard";

interface LoaderData {
  transmission: TransmissionModel | null;
}

export async function watchPartyHomeLoader() {
  const authResult = checkAdminAuthLoader();
  if (authResult) return authResult;
  const transmission = await getCurrentTransmissionUseCase();
  return { transmission };
}

export default function WatchPartyHome() {
  const { transmission } = useLoaderData() as LoaderData;

  return (
    <PageContainer>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Watch Party</h1>
        <Link
          to="/admin/watch-party/upload"
          className="rounded border border-slate-800 px-4 py-2 text-sm hover:bg-slate-50"
        >
          Upload New Movie
        </Link>
      </div>

      {transmission ? (
        <TransmissionStatusCard transmission={transmission} />
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="mb-6 text-gray-500">No active transmission.</p>
          <Link
            to="/admin/watch-party/new"
            className="rounded bg-slate-800 px-6 py-3 text-white hover:bg-slate-700"
          >
            Create New Transmission
          </Link>
        </div>
      )}
    </PageContainer>
  );
}
