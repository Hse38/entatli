"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "entatli_hasSeenIntro";

export function IntroVideoOverlay() {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mount check to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Check if user has seen intro on mount (client-side only)
  useEffect(() => {
    if (!isMounted) return;
    // Ensure we're on client side
    if (typeof window === "undefined") return;

    const hasSeenIntro = localStorage.getItem(STORAGE_KEY);
    if (!hasSeenIntro) {
      // Small delay to ensure main content is rendered first (SEO/performance)
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isMounted]);

  const handleClose = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    setIsPlaying(false);
    setIsVisible(false);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, "true");
    }
  };

  // Focus trap when intro is visible
  useEffect(() => {
    if (!isVisible) return;

    const container = containerRef.current;
    if (!container) return;

    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleTabKey);
    document.addEventListener("keydown", handleEscape);

    firstElement?.focus();

    return () => {
      document.removeEventListener("keydown", handleTabKey);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isVisible]);

  const handlePlay = () => {
    setIsLoading(true);
    setIsPlaying(true);
    setIsPaused(false);
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Fail silently, skip intro
        handleClose();
      });
    }
  };

  const handleTogglePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
        setIsPaused(false);
      } else {
        video.pause();
        setIsPaused(true);
      }
    }
  };


  const handleVideoEnd = () => {
    handleClose();
  };

  const handleVideoError = () => {
    // Fail silently, skip intro
    handleClose();
  };

  const handleVideoLoaded = () => {
    setIsLoading(false);
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!isMounted || !isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-dark/95 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="intro-title"
          aria-describedby="intro-description"
        >
          {/* Close Button - Always visible */}
          <button
            type="button"
            onClick={handleClose}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 sm:right-6 sm:top-6"
            aria-label="Skip intro and enter site"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {!isPlaying ? (
            /* Pre-Play State */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center gap-6 px-6 text-center"
            >
              <h2
                id="intro-title"
                className="text-2xl font-semibold text-white sm:text-3xl"
              >
                Firmamızı 45 saniyede tanıyın.
              </h2>
              <p
                id="intro-description"
                className="max-w-md text-base text-white/70 sm:text-lg"
              >
                Premium etkinlik catering çözümlerimizi keşfedin.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                {/* Play Button */}
                <button
                  type="button"
                  onClick={handlePlay}
                  className="group flex items-center justify-center gap-3 rounded-full bg-lilac px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-lg transition hover:bg-soft-lavender hover:text-dark focus:outline-none focus:ring-2 focus:ring-lilac/50 focus:ring-offset-2 focus:ring-offset-dark"
                  aria-label="Play intro video"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Video İzle
                </button>

                {/* Skip Button */}
                <button
                  type="button"
                  onClick={handleClose}
                  className="rounded-full border-2 border-white/30 bg-transparent px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:border-soft-lavender hover:bg-white/10 hover:text-soft-lavender focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-dark"
                  aria-label="Skip intro and enter site"
                >
                  Siteye Gir
                </button>
              </div>
            </motion.div>
          ) : (
            /* Video Playing State */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl px-4 sm:px-6"
            >
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-dark/50">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-white" />
                </div>
              )}

              <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-dark shadow-2xl">
                <video
                  ref={videoRef}
                  src="/img/intro.mp4"
                  className="h-full w-full object-cover"
                  muted
                  playsInline
                  onEnded={handleVideoEnd}
                  onError={handleVideoError}
                  onLoadedData={handleVideoLoaded}
                  onPlay={() => setIsPaused(false)}
                  onPause={() => setIsPaused(true)}
                  controls={false}
                />

                {/* Custom Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={handleTogglePlayPause}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                      aria-label={isPaused ? "Play video" : "Pause video"}
                    >
                      {isPaused ? (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      ) : (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <rect x="6" y="4" width="4" height="16" />
                          <rect x="14" y="4" width="4" height="16" />
                        </svg>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleClose}
                      className="rounded-full bg-white/20 px-6 py-2 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                      aria-label="Close video and enter site"
                    >
                      Kapat
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
