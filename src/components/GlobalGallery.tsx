"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

export type GlobalGalleryImage = {
  src: string;
  alt: string;
  serviceSlug: string;
  serviceTitle: string;
};

type GlobalGalleryProps = {
  language?: "tr" | "en";
};

// Service metadata mapping
const serviceMetadata = {
  "corporate-event-catering": {
    tr: "Kurumsal Etkinlik Catering",
    en: "Corporate Event Catering",
  },
  "wedding-engagement-catering": {
    tr: "Düğün & Nişan Catering",
    en: "Wedding & Engagement Catering",
  },
  "festival-large-event-catering": {
    tr: "Festival & Büyük Etkinlik Catering",
    en: "Festival & Large Event Catering",
  },
  "workshop-special-experience-catering": {
    tr: "Workshop & Özel Deneyim Catering",
    en: "Workshop & Special Experience Catering",
  },
  "seminar-conference-catering": {
    tr: "Seminer & Konferans Catering",
    en: "Seminar & Conference Catering",
  },
  "outdoor-activity-catering": {
    tr: "Açık Alan & Aktivite Catering",
    en: "Outdoor Activity Catering",
  },
} as const;

// Export function to get images (reusable)
export function getGlobalGalleryImages(
  language: "tr" | "en" = "tr"
): GlobalGalleryImage[] {
  const images: GlobalGalleryImage[] = [];

    // Corporate Event Catering - acilis_ images
    for (let i = 1; i <= 8; i++) {
      images.push({
        src: `/img/acilis_${i}.jpg`,
        alt:
          language === "tr"
            ? `Kurumsal etkinlik catering - Açılış ${i}`
            : `Corporate event catering - Opening ${i}`,
        serviceSlug: "corporate-event-catering",
        serviceTitle: serviceMetadata["corporate-event-catering"][language],
      });
    }

    // Wedding & Engagement Catering - düğün_ images
    for (let i = 1; i <= 7; i++) {
      images.push({
        src: `/img/dugun_${i}.jpg`,
        alt:
          language === "tr"
            ? `Düğün catering - ${i}`
            : `Wedding catering - ${i}`,
        serviceSlug: "wedding-engagement-catering",
        serviceTitle: serviceMetadata["wedding-engagement-catering"][language],
      });
    }

    // Wedding & Engagement Catering - soz_ images
    for (let i = 1; i <= 5; i++) {
      images.push({
        src: `/img/soz_${i}.jpg`,
        alt:
          language === "tr"
            ? `Söz catering - ${i}`
            : `Engagement catering - ${i}`,
        serviceSlug: "wedding-engagement-catering",
        serviceTitle: serviceMetadata["wedding-engagement-catering"][language],
      });
    }

    // Festival & Large Event Catering - kahvaltı_ images
    for (let i = 1; i <= 4; i++) {
      images.push({
        src: `/img/kahvalti_${i}.jpg`,
        alt:
          language === "tr"
            ? `Festival catering - Kahvaltı ${i}`
            : `Festival catering - Breakfast ${i}`,
        serviceSlug: "festival-large-event-catering",
        serviceTitle:
          serviceMetadata["festival-large-event-catering"][language],
      });
    }

    // Workshop & Special Experience Catering - guzel_sofra images
    images.push({
      src: `/img/guzel_sofra_1.jpg`,
      alt:
        language === "tr"
          ? "Workshop catering - Özel deneyim"
          : "Workshop catering - Special experience",
      serviceSlug: "workshop-special-experience-catering",
      serviceTitle:
        serviceMetadata["workshop-special-experience-catering"][language],
    });
    images.push({
      src: `/img/guzel_sofra_2.jpg`,
      alt:
        language === "tr"
          ? "Workshop catering - Küratörlü etkinlik"
          : "Workshop catering - Curated event",
      serviceSlug: "workshop-special-experience-catering",
      serviceTitle:
        serviceMetadata["workshop-special-experience-catering"][language],
    });

    // Seminar & Conference Catering - acilis_ images (subset)
    for (let i = 1; i <= 6; i++) {
      images.push({
        src: `/img/acilis_${i}.jpg`,
        alt:
          language === "tr"
            ? `Seminer catering - ${i}`
            : `Seminar catering - ${i}`,
        serviceSlug: "seminar-conference-catering",
        serviceTitle:
          serviceMetadata["seminar-conference-catering"][language],
      });
    }

    // Outdoor Activity Catering - kahvaltı_ images
    for (let i = 1; i <= 4; i++) {
      images.push({
        src: `/img/kahvalti_${i}.jpg`,
        alt:
          language === "tr"
            ? `Açık alan catering - ${i}`
            : `Outdoor catering - ${i}`,
        serviceSlug: "outdoor-activity-catering",
        serviceTitle: serviceMetadata["outdoor-activity-catering"][language],
      });
    }

    return images;
}

export function GlobalGallery({ language = "tr" }: GlobalGalleryProps) {
  // Collect all images from all services
  const allImages = useMemo<GlobalGalleryImage[]>(() => {
    return getGlobalGalleryImages(language);
  }, [language]);

  if (!allImages || allImages.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {allImages.map((image, idx) => (
        <motion.div
          key={`${image.serviceSlug}-${idx}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, delay: idx * 0.05 }}
          whileHover={{ scale: 1.01 }}
          className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
        >
          <Link
            href={`/services/${image.serviceSlug}#gallery`}
            className="block h-full w-full"
            aria-label={
              language === "tr"
                ? `${image.serviceTitle} galerisini görüntüle`
                : `View ${image.serviceTitle} gallery`
            }
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
