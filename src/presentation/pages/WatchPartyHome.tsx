import { Form, Link, redirect, useLoaderData } from "react-router-dom";
import { checkAdminAuthLoader } from "../../utils/adminAuth";
import { getCurrentTransmissionUseCase } from "../../domain/usecases/getCurrentTransmissionUseCase";
import { stopTransmissionUseCase } from "../../domain/usecases/stopTransmissionUseCase";
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

export async function watchPartyHomeAction() {
  await stopTransmissionUseCase();
  return redirect("/admin/watch-party");
}

export default function WatchPartyHome() {
  const { transmission } = useLoaderData() as LoaderData;

  return (
    <PageContainer>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div className="section-title" style={{ margin: 0 }}>
          <span className="num">CH 77</span>
          Watch Party
        </div>
        <Link to="/admin/watch-party/upload" className="btn btn-sm btn-ghost">
          Upload Movie
        </Link>
      </div>

      {transmission ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <TransmissionStatusCard transmission={transmission} />
          <Form method="post">
            <button type="submit" className="btn btn-red btn-sm">
              ■ Stop Transmission
            </button>
          </Form>
        </div>
      ) : (
        <div
          className="dashed-box"
          style={{ textAlign: "center", padding: "60px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}
        >
          <div className="static-bg" style={{ width: 80, height: 60 }} />
          <p className="font-crt" style={{ fontSize: 20, color: "var(--amber)", letterSpacing: "0.1em" }}>
            NO ACTIVE TRANSMISSION
          </p>
          <p className="muted" style={{ fontSize: 13 }}>No live stream is currently running.</p>
          <Link to="/admin/watch-party/new" className="btn btn-primary">
            ▶ Create Transmission
          </Link>
        </div>
      )}
    </PageContainer>
  );
}
