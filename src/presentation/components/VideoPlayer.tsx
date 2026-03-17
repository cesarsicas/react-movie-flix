type VideoPlayerProps = {
  streamUrl: string;
};

export default function VideoPlayer({ streamUrl }: VideoPlayerProps) {
  return (
    <div className="mb-12">
      <div className="overflow-hidden rounded-lg bg-black">
        <video
          className="w-full"
          controls
          controlsList="nodownload"
          preload="metadata"
        >
          <source src={streamUrl} type="video/mp4" />
          Your browser does not support video playback.
        </video>
      </div>
    </div>
  );
}
