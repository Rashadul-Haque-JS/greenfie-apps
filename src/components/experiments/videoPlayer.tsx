import { useState, useRef } from "react";

type Props = {
  src: string;
};

const VideoPlayer = ({ src }: Props) => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <div className="relative rounded overflow-hidden">
      <video
        className="w-full h-[382px] bg-txt rounded"
        // className="w-full h-auto"
        src={src}
        ref={videoRef}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      {!playing && (
        <div
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={handlePlay}
        >
          <svg className="w-20 h-20 text-white" fill="red" viewBox="0 0 20 20">
            <path d="M6 4l12 6-12 6z" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
