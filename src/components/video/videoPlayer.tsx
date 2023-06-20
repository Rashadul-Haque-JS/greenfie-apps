import React, { useState, useRef } from 'react';

type TProps = {
  src: string
}
function VideoPlayer({ src }: TProps) {
  const [playing, setPlaying] = useState(false);
  const [showPauseButton, setShowPauseButton] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video?.paused) {
      video?.play();
      setPlaying(true);
    } else {
      video?.pause();
      setPlaying(false);
    }

  };

  return (
    <div
      style={{ position: 'relative' }}
      onMouseEnter={() => setShowPauseButton(true)}
      onMouseLeave={() => setShowPauseButton(false)}
      onTouchMove={() => setShowPauseButton(true)}
      onTouchEnd={() => setShowPauseButton(false)}

    >
      <div style={{border:'10px #000 solid'}}>
      <video
        controls
        autoPlay
        className='w-full h-[400px] xs:h-auto sm:h-auto bg-txt '
        ref={videoRef}
        src={src}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
      >
        <source src={src} type='video/mp4' className='w-full h-full' />
      </video>
      </div>
      {playing && showPauseButton && (
        <button
          onClick={togglePlayPause}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '99999',
            fontSize: '3em',
            color: '#FFFFFF',
          }}
        >
          ❚❚
        </button>
      )}
      {!playing && (
        <button
          onClick={togglePlayPause}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '99999',
            fontSize: '3em',
            color: 'red'
          }}
        >
          ▶
        </button>
      )}
    </div>
  );
}

export default VideoPlayer;
