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
      {/* Channel header */}
      <div className="channel-strip" style={{ marginBottom: 24 }}>
        <span className="font-crt" style={{ color: "var(--amber)" }}>CH 77</span>
        <span>WATCH PARTY · LIVE STREAM</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {transmission && (
            <>
              <span className="rec-dot" />
              <span className="font-crt" style={{ fontSize: 14, color: "var(--red)" }}>LIVE</span>
            </>
          )}
        </div>
      </div>

      {isLoading ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px 0",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div className="tape-reel" />
            <div className="tape-reel" />
          </div>
          <p className="font-crt muted" style={{ fontSize: 18, letterSpacing: "0.1em" }}>
            LOADING…
          </p>
        </div>
      ) : transmission ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "start" }}>
          <div>
            {/* CRT-framed player */}
            <div className="crt" style={{ marginBottom: 16 }}>
              <div className="tracking-line" />
              <HlsPlayer streamUrl={STREAM_URL} />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div>
                <p
                  className="font-display"
                  style={{ fontSize: 22, color: "var(--label)", marginBottom: 4 }}
                >
                  {transmission.movieName}
                </p>
                <p className="font-crt muted" style={{ fontSize: 16 }}>
                  LIVE FOR {formatElapsed(elapsed).toUpperCase()}
                </p>
              </div>
            </div>
          </div>

          {/* Signal panel */}
          <div className="panel" style={{ padding: 16, minWidth: 160 }}>
            <div className="section-title" style={{ fontSize: 11 }}>Signal</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <p className="muted" style={{ fontSize: 11, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Video
                </p>
                <div className="vu-bar">
                  {Array(8).fill(null).map((_, i) => (
                    <span key={i} className={i < 6 ? "on" : i === 7 ? "peak" : ""} style={{ height: `${40 + i * 8}%` }} />
                  ))}
                </div>
              </div>
              <div>
                <p className="muted" style={{ fontSize: 11, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Audio
                </p>
                <div className="vu-bar">
                  {Array(8).fill(null).map((_, i) => (
                    <span key={i} className={i < 5 ? "on" : ""} style={{ height: `${30 + i * 10}%` }} />
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                <div className="tape-reel" style={{ width: 28, height: 28 }} />
                <div className="tape-reel" style={{ width: 28, height: 28 }} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="dashed-box"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px 0",
            gap: 16,
            textAlign: "center",
          }}
        >
          <div className="static-bg" style={{ width: 120, height: 80, marginBottom: 8 }} />
          <p className="font-crt" style={{ fontSize: 22, color: "var(--amber)", letterSpacing: "0.1em" }}>
            NO SIGNAL
          </p>
          <p className="muted" style={{ fontSize: 13 }}>
            No live stream right now. Check back later!
          </p>
        </div>
      )}
    </PageContainer>
  );
}
