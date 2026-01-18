"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

type GalleryImage = {
  src: string;
  alt: string;
};

type ServiceGalleryProps = {
  images: GalleryImage[];
  title?: string;
  language?: "tr" | "en";
};

export function ServiceGallery({ images, title, language = "tr" }: ServiceGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedImage !== null) {
        setSelectedImage(null);
      }
    };

    if (selectedImage !== null) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  if (!images || images.length === 0) return null;

  const defaultTitle = language === "tr" ? "Etkinliklerimizden" : "From Our Events";

  return (
    <>
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.4em] text-dark-purple">
              {title || defaultTitle}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((image, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl cursor-pointer"
                onClick={() => setSelectedImage(idx)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-h-[90vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                width={1200}
                height={800}
                className="max-h-[90vh] w-auto rounded-lg object-contain"
                priority
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -right-4 top-0 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label={language === "tr" ? "Kapat" : "Close"}
              >
                <svg
                  width="24"
                  height="24"
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
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage((prev) => (prev === 0 ? images.length - 1 : (prev || 0) - 1));
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                    aria-label={language === "tr" ? "Önceki" : "Previous"}
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
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage((prev) => ((prev || 0) + 1) % images.length);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                    aria-label={language === "tr" ? "Sonraki" : "Next"}
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
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
