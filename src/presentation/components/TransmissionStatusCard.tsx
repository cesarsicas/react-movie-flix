import type { TransmissionModel } from "../../domain/model/TransmissionModel";

interface Props {
  transmission: TransmissionModel;
}

export default function TransmissionStatusCard({ transmission }: Props) {
  const hours = Math.floor(transmission.duration / 60);
  const minutes = transmission.duration % 60;
  const durationLabel = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <span className="rounded bg-red-600 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-white">
          LIVE
        </span>
        <h2 className="text-xl font-semibold">{transmission.movieName}</h2>
      </div>
      <div className="space-y-1 text-sm text-gray-600">
        <p>
          <span className="font-medium">Started:</span>{" "}
          {new Date(transmission.startTime).toLocaleString()}
        </p>
        <p>
          <span className="font-medium">Duration:</span> {durationLabel}
        </p>
      </div>
    </div>
  );
}
