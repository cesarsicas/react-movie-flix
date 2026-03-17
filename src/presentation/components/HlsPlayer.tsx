import { useEffect, useRef } from "react";
import Hls from "hls.js";

type HlsPlayerProps = {
  streamUrl: string;
};

export default function HlsPlayer({ streamUrl }: HlsPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = streamUrl;
    }
  }, [streamUrl]);

  return (
    <div className="mb-12">
      <div className="overflow-hidden rounded-lg bg-black">
        <video
          ref={videoRef}
          className="w-full"
          controls
          controlsList="nodownload"
          autoPlay
        />
      </div>
    </div>
  );
}
