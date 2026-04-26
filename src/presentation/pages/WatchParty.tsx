import { useEffect, useState } from "react";
import { getCurrentTransmissionUseCase } from "../../domain/usecases/getCurrentTransmissionUseCase";
import type { TransmissionModel } from "../../domain/model/TransmissionModel";
import PageContainer from "../components/PageContainer";
import HlsPlayer from "../components/HlsPlayer";

const STREAM_URL = "http://localhost:8080/live/stream.m3u8";
const POLL_INTERVAL = 5000;

function useElapsedSeconds(startTime: string | undefined): number {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!startTime) return;
    const update = () => {
      setElapsed(Math.floor((Date.now() - new Date(startTime).getTime()) / 1000));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [startTime]);

  return elapsed;
}

function formatElapsed(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${m}m ${s}s`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

export default function WatchParty() {
  const [transmission, setTransmission] = useState<TransmissionModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const elapsed = useElapsedSeconds(transmission?.startTime);

  useEffect(() => {
    async function poll() {
      try {
        const result = await getCurrentTransmissionUseCase();
        setTransmission(result);
        return result;
      } catch {
        setTransmission(null);
        return null;
      } finally {
        setIsLoading(false);
      }
    }

    let id: ReturnType<typeof setInterval>;

    poll().then((result) => {
      if (!result) {
        id = setInterval(async () => {
          const next = await poll();
          if (next) clearInterval(id);
        }, POLL_INTERVAL);
      }
    });

    return () => clearInterval(id);
  }, []);

  return (
    <PageContainer>
      <h1 className="mb-6 text-3xl font-bold">Watch Party</h1>

      {isLoading ? (
        <div className="flex items-center justify-center py-24 text-gray-500">
          Loading...
        </div>
      ) : transmission ? (
        <div>
          <HlsPlayer streamUrl={STREAM_URL} />
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold">{transmission.movieName}</h2>
            <p className="text-sm text-gray-500">
              Live for {formatElapsed(elapsed)}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center py-24">
          <p className="text-gray-500">No live stream right now. Check back later!</p>
        </div>
      )}
    </PageContainer>
  );
}
