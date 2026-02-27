import React, { useRef, useState, useEffect } from 'react';

type AudioVisualizerProps = {
  audioSrc: string;
  width?: number;
  height?: number;
};

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  audioSrc,
  width = 350,
  height = 200,
}) => {
  // We want 16 bars, so we initialize an array of 16 zeros
  const [frequencyData, setFrequencyData] = useState<Uint8Array>(
    new Uint8Array(16)
  );
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Refs to keep track of our audio elements and animation frame without triggering re-renders
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const animationRef = useRef<number | null>(null);

  // Initialize the Web Audio API and start playback (must be called from user gesture)
  const startAudio = async () => {
    const audio = audioRef.current;
    if (!audio || !audioSrc) return;

    // Create context and graph only on first start (inside user gesture)
    if (!audioContextRef.current) {
      const AudioContextClass =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioContextRef.current = new AudioContextClass();

      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 64;

      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.gain.value = isMuted ? 0 : 1;

      sourceRef.current =
        audioContextRef.current.createMediaElementSource(audio);
      sourceRef.current.connect(analyserRef.current);
      analyserRef.current.connect(gainNodeRef.current);
      gainNodeRef.current.connect(audioContextRef.current.destination);
    }

    if (
      audioContextRef.current &&
      audioContextRef.current.state === "suspended"
    ) {
      await audioContextRef.current.resume();
    }

    if (audio.paused) {
      try {
        await audio.play();
        updateVisualizer();
      } catch (e) {
        console.error("Audio play failed:", e);
      }
    } else {
      updateVisualizer();
    }
  };

  const updateVisualizer = () => {
    if (!analyserRef.current) return;

    // Get the frequency data
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);

    // We only need the first 16 bars for our visualizer
    setFrequencyData(dataArray.slice(0, 16));

    // Request the next frame
    animationRef.current = requestAnimationFrame(updateVisualizer);
  };

  const handleVisualizerClick = async () => {
    if (!hasStarted) {
      setIsMuted(false);
      setHasStarted(true);
      await startAudio();
      return;
    }

    setIsMuted((prev) => {
      const next = !prev;
      if (gainNodeRef.current) {
        gainNodeRef.current.gain.value = next ? 0 : 1;
      }
      return next;
    });
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
      if (sourceRef.current) {
        sourceRef.current.disconnect();
      }
      if (analyserRef.current) {
        analyserRef.current.disconnect();
      }
      if (gainNodeRef.current) {
        gainNodeRef.current.disconnect();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <div
      className={`visualizer-wrapper ${isMuted ? "muted" : ""}`}
      onClick={handleVisualizerClick}
      role="button"
      title={hasStarted ? (isMuted ? "Click to unmute" : "Click to mute") : "Click to play"}
      aria-label={hasStarted ? (isMuted ? "Unmute" : "Mute") : "Play music"}
    >
      <div
        className="bars-container"
        style={{ width, height }}
      >
        {Array.from(frequencyData).map((value, index) => {
          // The value is between 0 and 255. Convert it to a percentage for CSS height.
          const heightPercentage = (value / 255) * 100;
          return (
            <div
              key={index}
              className="visualizer-bar"
              style={{ height: `${heightPercentage}%` }}
            />
          );
        })}
      </div>
      <audio ref={audioRef} src={audioSrc} />
    </div>
  );
};

export default AudioVisualizer;