"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Repeat, Heart } from "lucide-react";

export interface Track {
  id: string;
  title?: string;
  imageUrl: string;
  audioUrl: string;
  duration?: number;
}

interface MusicPlayerProps {
  tracks: Track[];
  showTitle?: boolean;
  showControls?: boolean;
  backgroundStyle?: "glass" | "transparent" | "dark";
  layout?: "vertical" | "horizontal" | "compact";
  size?: "small" | "medium" | "large";
  onTrackChange?: (track: Track) => void;
  onlyCD?: boolean;
}

// 1. Move config outside so it doesn't recreate on every render
const sizeConfig = {
  small: {
    imageSize: "w-32 h-32",
    titleSize: "text-sm",
    bodyText: "text-xs",
    iconSize: "w-4 h-4",
    buttonSize: "p-1.5",
    padding: "p-3",
    gap: "gap-2",
  },
  medium: {
    imageSize: "w-48 h-48 md:w-56 md:h-56",
    titleSize: "text-lg md:text-xl",
    bodyText: "text-sm md:text-base",
    iconSize: "w-5 h-5 md:w-6 md:h-6",
    buttonSize: "p-3 md:p-4",
    padding: "p-6 md:p-8",
    gap: "gap-4 md:gap-6",
  },
  large: {
    imageSize: "w-64 h-64 md:w-80 md:h-80",
    titleSize: "text-2xl md:text-3xl",
    bodyText: "text-base md:text-lg",
    iconSize: "w-6 h-6 md:w-8 md:h-8",
    buttonSize: "p-4 md:p-5",
    padding: "p-8 md:p-12",
    gap: "gap-6 md:gap-8",
  },
};

// 2. Extracted Standalone Components
const VinylImage = ({ imageUrl, isPlaying, config, onPlayPause }: any) => (
  <div className="relative flex-shrink-0">
    <div className={`relative ${config.imageSize}`}>
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 shadow-2xl overflow-hidden">
        <div
          className={`w-full h-full rounded-full transition-transform duration-75 ${
            isPlaying ? "animate-spin" : ""
          }`}
          style={{
            backgroundImage: `url('${imageUrl}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            animation: isPlaying ? "spin 3s linear infinite" : "none",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-slate-900 shadow-lg border-2 border-slate-700" />
          </div>
        </div>
      </div>
      <button
        onClick={onPlayPause}
        className="absolute inset-0 rounded-full z-10 hover:bg-black/5 transition-colors group"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        <div className="w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          {isPlaying ? (
            <Pause className={`${config.iconSize} text-white drop-shadow-lg`} />
          ) : (
            <Play className={`${config.iconSize} text-white drop-shadow-lg ml-1`} />
          )}
        </div>
      </button>
    </div>
  </div>
);

const ProgressBar = ({ onlyCD, layout, duration, currentTime, onSeek, formatTime, config }: any) => {
  if (onlyCD) return null;
  return (
    <div className={layout === "compact" ? "hidden" : "w-full"}>
      <input
        type="range"
        min="0"
        max={duration || 0}
        value={currentTime}
        onChange={(e) => onSeek(Number(e.target.value))}
        className="w-full h-1 bg-slate-600/50 rounded-lg appearance-none cursor-pointer accent-slate-500"
      />
      <div className={`flex justify-between ${config.bodyText} text-slate-500 mt-1`}>
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

const Controls = ({
  onlyCD,
  isPlaying,
  showControls,
  isLooping,
  isFavorite,
  config,
  onPlayPause,
  onPrevTrack,
  onNextTrack,
  onToggleLoop,
  onToggleFavorite,
}: any) => {
  if (onlyCD) return null;
  return (
    <div className="flex items-center justify-center gap-2 md:gap-3">
      <button onClick={onPlayPause} className="text-white rounded-full transition-all hover:scale-110 shadow-lg" style={{ padding: config.buttonSize }}>
        {isPlaying ? <Pause className={config.iconSize} /> : <Play className={`${config.iconSize} ml-0.5`} />}
      </button>
      <button onClick={onPrevTrack} className="text-slate-400 hover:text-slate-200 transition-colors p-2">
        <SkipBack className={config.iconSize} />
      </button>
      <button onClick={onNextTrack} className="text-slate-400 hover:text-slate-200 transition-colors p-2">
        <SkipForward className={config.iconSize} />
      </button>
      {showControls && (
        <>
          <button onClick={onToggleLoop} className={`transition-all rounded-full p-2 ${isLooping ? "bg-red-500/20 text-red-500" : "text-slate-400 hover:text-slate-200"}`}>
            <Repeat className={config.iconSize} />
          </button>
          <button onClick={onToggleFavorite} className={`transition-all rounded-full p-2 ${isFavorite ? "text-red-500" : "text-slate-400 hover:text-red-500"}`}>
            <Heart className={config.iconSize} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </>
      )}
    </div>
  );
};

const Title = ({ showTitle, title, onlyCD, config }: any) => {
  if (!showTitle || !title || onlyCD) return null;
  return <h3 className={`${config.titleSize} font-bold text-white text-balance text-center`}>{title}</h3>;
};

const TrackCounter = ({ onlyCD, currentIndex, total, config }: any) => {
  if (onlyCD) return null;
  return <div className={`${config.bodyText} text-slate-500`}>{currentIndex + 1} / {total}</div>;
};

// 3. Main MusicPlayer Component
export default function MusicPlayer({
  tracks,
  showTitle = true,
  showControls = false,
  backgroundStyle = "dark",
  layout = "vertical",
  size = "medium",
  onTrackChange,
  onlyCD = false,
}: MusicPlayerProps) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const audioRef = useRef<HTMLAudioElement>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const currentTrack = tracks[currentTrackIndex];
  const config = sizeConfig[size];

  const bgClass =
    backgroundStyle === "glass"
      ? "bg-white/30 backdrop-blur-lg border border-white/40"
      : backgroundStyle === "dark"
      ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800"
      : "bg-transparent";

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (isLooping) {
        audio.currentTime = 0;
        audio.play();
      } else {
        handleNextTrack();
      }
    };

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [isLooping]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    isPlaying ? audio.play() : audio.pause();
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && audio.src !== currentTrack.audioUrl) {
      audio.src = currentTrack.audioUrl;
      if (isPlaying) audio.play();
    }
    onTrackChange?.(currentTrack);
  }, [currentTrackIndex]);

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleNextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
  };
  const handlePrevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  };

  const handleSeek = (time: number) => {
    if (audioRef.current) audioRef.current.currentTime = time;
  };

  const toggleFavorite = () => {
    const newFavorites = new Set(favorites);
    newFavorites.has(currentTrack.id) ? newFavorites.delete(currentTrack.id) : newFavorites.add(currentTrack.id);
    setFavorites(newFavorites);
  };

  const formatTime = (time: number) => {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Vertical Layout */}
      {layout === "vertical" && (
        <div className={`flex flex-col items-center justify-center ${config.gap} ${config.padding} rounded-2xl transition-all duration-300 ${bgClass}`}>
          <VinylImage imageUrl={currentTrack.imageUrl} isPlaying={isPlaying} config={config} onPlayPause={handlePlayPause} />
          <Title showTitle={showTitle} title={currentTrack.title} onlyCD={onlyCD} config={config} />
          <ProgressBar onlyCD={onlyCD} layout={layout} duration={duration} currentTime={currentTime} onSeek={handleSeek} formatTime={formatTime} config={config} />
          <Controls onlyCD={onlyCD} isPlaying={isPlaying} showControls={showControls} isLooping={isLooping} isFavorite={favorites.has(currentTrack.id)} config={config} onPlayPause={handlePlayPause} onPrevTrack={handlePrevTrack} onNextTrack={handleNextTrack} onToggleLoop={() => setIsLooping(!isLooping)} onToggleFavorite={toggleFavorite} />
          <TrackCounter onlyCD={onlyCD} currentIndex={currentTrackIndex} total={tracks.length} config={config} />
        </div>
      )}

      {/* Horizontal Layout */}
      {layout === "horizontal" && (
        <div className={`flex flex-col sm:flex-row ${config.gap} ${config.padding} rounded-2xl transition-all duration-300 ${bgClass} max-w-6xl`}>
          <div className="flex-shrink-0">
            <VinylImage imageUrl={currentTrack.imageUrl} isPlaying={isPlaying} config={config} onPlayPause={handlePlayPause} />
          </div>
          <div className={`flex-1 flex flex-col ${config.gap} justify-center`}>
            <Title showTitle={showTitle} title={currentTrack.title} onlyCD={onlyCD} config={config} />
            <ProgressBar onlyCD={onlyCD} layout={layout} duration={duration} currentTime={currentTime} onSeek={handleSeek} formatTime={formatTime} config={config} />
            <Controls onlyCD={onlyCD} isPlaying={isPlaying} showControls={showControls} isLooping={isLooping} isFavorite={favorites.has(currentTrack.id)} config={config} onPlayPause={handlePlayPause} onPrevTrack={handlePrevTrack} onNextTrack={handleNextTrack} onToggleLoop={() => setIsLooping(!isLooping)} onToggleFavorite={toggleFavorite} />
            <TrackCounter onlyCD={onlyCD} currentIndex={currentTrackIndex} total={tracks.length} config={config} />
          </div>
        </div>
      )}

      {/* Compact Layout */}
      {layout === "compact" && (
        <div className={`flex flex-row items-center ${config.gap} ${config.padding} rounded-xl transition-all duration-300 ${bgClass}`}>
          <div className="flex-shrink-0">
            <VinylImage imageUrl={currentTrack.imageUrl} isPlaying={isPlaying} config={config} onPlayPause={handlePlayPause} />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <Title showTitle={showTitle} title={currentTrack.title} onlyCD={onlyCD} config={config} />
            <Controls onlyCD={onlyCD} isPlaying={isPlaying} showControls={showControls} isLooping={isLooping} isFavorite={favorites.has(currentTrack.id)} config={config} onPlayPause={handlePlayPause} onPrevTrack={handlePrevTrack} onNextTrack={handleNextTrack} onToggleLoop={() => setIsLooping(!isLooping)} onToggleFavorite={toggleFavorite} />
          </div>
        </div>
      )}

      {/* Hidden Audio Element */}
      <audio ref={audioRef} crossOrigin="anonymous" />
    </>
  );
}