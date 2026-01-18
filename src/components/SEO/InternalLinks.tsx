"use client";

import Link from "next/link";
import type { ServiceId } from "../../data/services";
import { serviceSlugMap, type Language } from "../../lib/seo";

type InternalLinksProps = {
  currentServiceId: ServiceId;
  language: Language;
};

// Related services mapping for internal linking
const relatedServices: Record<ServiceId, ServiceId[]> = {
  "corporate-event-catering": [
    "seminar-conference-catering",
    "workshop-special-experience-catering",
  ],
  "wedding-engagement-catering": [
    "workshop-special-experience-catering",
    "outdoor-activity-catering",
  ],
  "festival-large-event-catering": [
    "corporate-event-catering",
    "outdoor-activity-catering",
  ],
  "workshop-special-experience-catering": [
    "corporate-event-catering",
    "wedding-engagement-catering",
  ],
  "seminar-conference-catering": [
    "corporate-event-catering",
    "workshop-special-experience-catering",
  ],
  "outdoor-activity-catering": [
    "festival-large-event-catering",
    "wedding-engagement-catering",
  ],
  // Legacy IDs
  "corporate-dessert-logistics": [
    "seminar-conference-catering",
    "workshop-special-experience-catering",
  ],
  "high-volume-event": [
    "corporate-event-catering",
    "outdoor-activity-catering",
  ],
  "premium-hospitality": [
    "corporate-event-catering",
    "wedding-engagement-catering",
  ],
};

// Semantic anchor text variations
const anchorTexts: Record<ServiceId, { tr: string[]; en: string[] }> = {
  "corporate-event-catering": {
    tr: [
      "kurumsal catering operasyonları",
      "kurumsal etkinlik yemek servisi",
      "toplantı catering hizmeti",
    ],
    en: [
      "corporate catering operations",
      "corporate event food service",
      "meeting catering service",
    ],
  },
  "wedding-engagement-catering": {
    tr: [
      "düğün catering hizmeti",
      "nişan catering organizasyonu",
      "düğün yemek servisi",
    ],
    en: [
      "wedding catering service",
      "engagement catering organization",
      "wedding food service",
    ],
  },
  "festival-large-event-catering": {
    tr: [
      "festival catering hizmeti",
      "büyük ölçekli etkinlik catering",
      "toplu ikram hizmeti",
    ],
    en: [
      "festival catering service",
      "large-scale event catering",
      "bulk catering service",
    ],
  },
  "workshop-special-experience-catering": {
    tr: [
      "workshop catering hizmeti",
      "özel deneyim catering",
      "küratörlü etkinlik catering",
    ],
    en: [
      "workshop catering service",
      "special experience catering",
      "curated event catering",
    ],
  },
  "seminar-conference-catering": {
    tr: [
      "seminer catering hizmeti",
      "konferans yemek servisi",
      "profesyonel etkinlik catering",
    ],
    en: [
      "seminar catering service",
      "conference food service",
      "professional event catering",
    ],
  },
  "outdoor-activity-catering": {
    tr: [
      "açık alan catering",
      "outdoor etkinlik yemek servisi",
      "dış mekan catering hizmeti",
    ],
    en: [
      "outdoor catering",
      "outdoor event food service",
      "outdoor venue catering service",
    ],
  },
  // Legacy
  "corporate-dessert-logistics": {
    tr: ["kurumsal catering operasyonları"],
    en: ["corporate catering operations"],
  },
  "high-volume-event": {
    tr: ["büyük ölçekli etkinlik catering"],
    en: ["large-scale event catering"],
  },
  "premium-hospitality": {
    tr: ["özel deneyim catering"],
    en: ["special experience catering"],
  },
};

export function InternalLinks({
  currentServiceId,
  language,
}: InternalLinksProps) {
  const related = relatedServices[currentServiceId] || [];
  
  if (related.length === 0) return null;

  return (
    <section className="section-padding bg-background">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-8 text-2xl font-semibold text-dark sm:text-3xl">
          {language === "tr" ? "İlgili Hizmetler" : "Related Services"}
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {related.map((serviceId) => {
            const slug = serviceSlugMap[serviceId]?.[language] || serviceId;
            const texts = anchorTexts[serviceId]?.[language] || [];
            const anchorText = texts[0] || serviceId;

            return (
              <Link
                key={serviceId}
                href={`/services/${slug}`}
                className="group rounded-2xl border border-dark/10 bg-white p-6 transition hover:border-lilac/50 hover:shadow-lg"
              >
                <h3 className="mb-2 text-lg font-semibold text-dark group-hover:text-lilac">
                  {anchorText}
                </h3>
                <p className="text-sm text-dark/70">
                  {language === "tr"
                    ? "Detayları görüntüle"
                    : "View details"}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
