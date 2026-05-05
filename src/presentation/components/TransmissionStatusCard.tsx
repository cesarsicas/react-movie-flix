import type { TransmissionModel } from "../../domain/model/TransmissionModel";

interface Props {
  transmission: TransmissionModel;
}

export default function TransmissionStatusCard({ transmission }: Props) {
  const hours = Math.floor(transmission.duration / 60);
  const minutes = transmission.duration % 60;
  const durationLabel = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

  return (
    <div className="panel" style={{ padding: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <span className="rec-dot" />
        <span className="font-crt" style={{ fontSize: 16, color: "var(--red)", letterSpacing: "0.1em" }}>LIVE</span>
        <span style={{ fontSize: 16, fontWeight: 600 }}>{transmission.movieName}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div
          style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px dashed var(--line)", fontSize: 13 }}
        >
          <span className="muted">Started</span>
          <span>{new Date(transmission.startTime).toLocaleString()}</span>
        </div>
        <div
          style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", fontSize: 13 }}
        >
          <span className="muted">Duration</span>
          <span className="font-crt" style={{ fontSize: 16 }}>{durationLabel}</span>
        </div>
      </div>
    </div>
  );
}
