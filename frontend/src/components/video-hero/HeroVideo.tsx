"use client";

import { useRef } from "react";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 size-full object-cover motion-reduce:hidden"
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
  );
}
