"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { Pause, Play } from "lucide-react";

const WIDE = "(min-width: 768px)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeMedia(onChange: () => void): () => void {
  const queries = [window.matchMedia(WIDE), window.matchMedia(REDUCED_MOTION)];
  queries.forEach((query) => query.addEventListener("change", onChange));
  return () =>
    queries.forEach((query) => query.removeEventListener("change", onChange));
}

/**
 * Whether to load the ~6 MB hero video at all. Skipped on narrow viewports,
 * under reduced-motion, or with Save-Data on — the poster/LCP image already
 * covers those cases. useSyncExternalStore returns false during SSR (server
 * snapshot), so the video only ever mounts client-side.
 */
function useShouldPlayVideo(): boolean {
  return useSyncExternalStore(
    subscribeMedia,
    () => {
      const nav = navigator as Navigator & {
        connection?: { saveData?: boolean };
      };
      const saveData = nav.connection?.saveData === true;
      const wideEnough = window.matchMedia(WIDE).matches;
      const reducedMotion = window.matchMedia(REDUCED_MOTION).matches;
      return wideEnough && !reducedMotion && !saveData;
    },
    () => false
  );
}

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const shouldPlay = useShouldPlayVideo();

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  if (!shouldPlay) {
    return null;
  }

  return (
    <>
      <video
        ref={videoRef}
        className="absolute inset-0 size-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/obraz.jpg"
        onLoadedMetadata={() => {
          // Slow, contemplative motion — deliberate part of the hero design
          if (videoRef.current) {
            videoRef.current.playbackRate = 0.5;
          }
        }}
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>

      {/* Pause/play control — WCAG 2.2.2: auto-playing motion >5s needs a stop
          mechanism. */}
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Zatrzymaj wideo w tle" : "Odtwórz wideo w tle"}
        className="absolute bottom-6 right-6 z-20 rounded-full bg-navy-950/50 p-2.5 text-white backdrop-blur-sm transition-colors hover:bg-navy-950/70"
      >
        {playing ? (
          <Pause className="size-4" aria-hidden />
        ) : (
          <Play className="size-4" aria-hidden />
        )}
      </button>
    </>
  );
}
