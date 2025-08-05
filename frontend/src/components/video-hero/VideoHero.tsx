'use client';

import { useEffect, useRef } from 'react';
import styles from './VideoHero.module.scss';

export default function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Slow down video playback to match original implementation
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <div className={styles.videoContainer}>
      {/* Video Background */}
      <video
        ref={videoRef}
        className={styles.video}
        autoPlay
        muted
        loop
        playsInline
        src="/video.mp4"
      >
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className={styles.overlay}></div>

      {/* Title */}
      <div className={styles.titleContainer}>
        <h1 className={`${styles.title} ${styles.sanctuary}`}>
          Sanktuarium
        </h1>
        <h1 className={`${styles.title} ${styles.sanctuaryPlace}`}>
          Kotłów
        </h1>
      </div>
    </div>
  );
} 