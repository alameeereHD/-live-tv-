import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import mpegts from 'mpegts.js';

interface VideoPlayerProps {
  src: string;
  type?: 'hls' | 'mpegts';
}

export function VideoPlayer({ src, type = 'hls' }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hlsInstance: Hls | null = null;
    let mpegtsPlayer: mpegts.Player | null = null;

    if (type === 'mpegts' && mpegts.getFeatureList().mseLivePlayback) {
      mpegtsPlayer = mpegts.createPlayer(
        { type: 'mse', url: src, isLive: true },
        { enableWorker: true }
      );
      mpegtsPlayer.attachMediaElement(video);
      mpegtsPlayer.load();
    } else if (type === 'hls' && Hls.isSupported()) {
      hlsInstance = new Hls({ enableWorker: true, lowLatencyMode: true });
      hlsInstance.loadSource(src);
      hlsInstance.attachMedia(video);
      hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => video.play().catch(() => {}));
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      video.play().catch(() => {});
    }

    return () => {
      if (hlsInstance) hlsInstance.destroy();
      if (mpegtsPlayer) mpegtsPlayer.destroy();
      video.src = '';
      video.load();
    };
  }, [src, type]);

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden border border-zinc-800">
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        controls
        autoPlay
        muted
        playsInline
        crossOrigin="anonymous"
      />
      <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/70 rounded text-[10px] text-zinc-400">
        {type.toUpperCase()}
      </span>
    </div>
  );
}
