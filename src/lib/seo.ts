import type { ServiceId } from "../data/services";
import type { ServiceData } from "../data/services";

export type Language = "tr" | "en";

// URL slug mapping for semantic SEO structure
export const serviceSlugMap: Record<ServiceId, { tr: string; en: string }> = {
  "corporate-event-catering": {
    tr: "kurumsal-etkinlik-catering",
    en: "corporate-event-catering",
  },
  "wedding-engagement-catering": {
    tr: "dugun-nisan-catering",
    en: "wedding-engagement-catering",
  },
  "festival-large-event-catering": {
    tr: "festival-buyuk-etkinlik-catering",
    en: "festival-large-event-catering",
  },
  "workshop-special-experience-catering": {
    tr: "workshop-ozel-deneyim-catering",
    en: "workshop-special-experience-catering",
  },
  "seminar-conference-catering": {
    tr: "seminer-konferans-catering",
    en: "seminar-conference-catering",
  },
  "outdoor-activity-catering": {
    tr: "acik-alan-aktivite-catering",
    en: "outdoor-activity-catering",
  },
  // Legacy IDs (keep for backward compatibility)
  "corporate-dessert-logistics": {
    tr: "kurumsal-etkinlik-catering",
    en: "corporate-event-catering",
  },
  "high-volume-event": {
    tr: "festival-buyuk-etkinlik-catering",
    en: "festival-large-event-catering",
  },
  "premium-hospitality": {
    tr: "workshop-ozel-deneyim-catering",
    en: "workshop-special-experience-catering",
  },
};

// Intent-based keyword clusters
export const keywordClusters = {
  commercial: {
    tr: [
      "etkinlik catering",
      "catering organizasyon",
      "kurumsal etkinlik catering",
      "düğün catering hizmeti",
      "festival catering",
      "büyük ölçekli catering",
      "toplu ikram hizmeti",
      "etkinlik yemek servisi",
    ],
    en: [
      "event catering",
      "catering organization",
      "corporate event catering",
      "wedding catering service",
      "festival catering",
      "large-scale catering",
      "bulk catering service",
      "event food service",
    ],
  },
  midFunnel: {
    tr: [
      "büyük etkinlikler için catering",
      "kurumsal catering çözümleri",
      "etkinlik catering kapasitesi",
      "etkinlik yemek lojistiği",
      "catering planlama hizmeti",
    ],
    en: [
      "catering for large events",
      "corporate catering solutions",
      "catering capacity for events",
      "event food logistics",
      "catering planning service",
    ],
  },
  informational: {
    tr: [
      "etkinlik catering nasıl çalışır",
      "festival catering lojistiği",
      "kurumsal etkinlik catering planlama",
      "catering organizasyon süreci",
    ],
    en: [
      "how event catering works",
      "catering logistics for festivals",
      "catering planning for corporate events",
      "catering organization process",
    ],
  },
};

// Generate meta title
export function generateMetaTitle(
  service: ServiceData | null,
  language: Language
): string {
  const baseBrand = "En Tatlı Telaşım";
  
  if (!service) {
    return language === "tr"
      ? "Premium Etkinlik Catering & Organizasyon Hizmetleri | En Tatlı Telaşım"
      : "Premium Event Catering & Organization Services | En Tatlı Telaşım";
  }

  const content = service[language];
  const primaryKeyword = language === "tr" 
    ? "Etkinlik Catering"
    : "Event Catering";
  
  // Format: [Primary Service] for [Event Type] | [Brand Name]
  return `${content.title} | ${baseBrand}`;
}

// Generate meta description
export function generateMetaDescription(
  service: ServiceData | null,
  language: Language
): string {
  if (!service) {
    return language === "tr"
      ? "Büyük ölçekli etkinlikler için profesyonel catering ve organizasyon hizmetleri. Kurumsal seviyede operasyonel güç, güvenilir lojistik, sıfır risk. İstanbul merkezli premium catering çözümleri."
      : "Professional catering and organization services for large-scale events. Corporate-grade operational strength, reliable logistics, zero risk. Premium catering solutions based in Istanbul.";
  }

  const content = service[language];
  const capacity = content.capacity;
  
  // Include: scale, reliability, service scope, soft CTA
  const description = language === "tr"
    ? `${content.description} Günlük üretim kapasitesi: ${capacity.dailyProduction}. Etkinlik büyüklüğü: ${capacity.eventSize}. ${capacity.description} İletişime geçin, özel teklif alın.`
    : `${content.description} Daily production capacity: ${capacity.dailyProduction}. Event size: ${capacity.eventSize}. ${capacity.description} Get in touch for a custom quote.`;

  // Ensure 140-160 chars
  if (description.length > 160) {
    return description.substring(0, 157) + "...";
  }
  return description;
}

// Generate canonical URL
export function generateCanonicalUrl(
  serviceId: ServiceId | null,
  language: Language
): string {
  const baseUrl = "https://entatlitelasim.com";
  
  if (!serviceId) {
    return baseUrl;
  }

  const slug = serviceSlugMap[serviceId]?.[language] || serviceId;
  return `${baseUrl}/services/${slug}`;
}

// Generate breadcrumb items
export function generateBreadcrumbs(
  service: ServiceData | null,
  language: Language
): Array<{ name: string; url: string }> {
  const baseUrl = "https://entatlitelasim.com";
  
  const items = [
    {
      name: language === "tr" ? "Ana Sayfa" : "Home",
      url: baseUrl,
    },
  ];

  if (service) {
    items.push({
      name: language === "tr" ? "Hizmetler" : "Services",
      url: `${baseUrl}/#services`,
    });
    
    items.push({
      name: service[language].title,
      url: generateCanonicalUrl(service.id, language),
    });
  }

  return items;
}

// Organization schema data
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "En Tatlı Telaşım",
  alternateName: "ENTATLI",
  url: "https://entatlitelasim.com",
  logo: "https://entatlitelasim.com/img/yazılıbeyaz.png",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+90-212-466-13-83",
      contactType: "Customer Service",
      areaServed: ["TR", "Istanbul"],
      availableLanguage: ["Turkish", "English"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+90-532-617-46-23",
      contactType: "Customer Service",
      contactOption: "https://schema.org/TollFree",
      areaServed: ["TR", "Istanbul"],
      availableLanguage: ["Turkish", "English"],
    },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Kocasinan Merkez Mahallesi, Mareşal Çakmak Caddesi No:25",
    addressLocality: "Bahçelievler",
    addressRegion: "Istanbul",
    addressCountry: "TR",
  },
  sameAs: [
    // Add social media URLs when available
  ],
};

// LocalBusiness schema data
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://entatlitelasim.com/#organization",
  name: "En Tatlı Telaşım",
  image: "https://entatlitelasim.com/img/yazılıbeyaz.png",
  telephone: ["+90-212-466-13-83", "+90-532-617-46-23"],
  email: "info@entatlitelasim.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Kocasinan Merkez Mahallesi, Mareşal Çakmak Caddesi No:25",
    addressLocality: "Bahçelievler",
    addressRegion: "Istanbul",
    postalCode: "",
    addressCountry: "TR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "41.1086",
    longitude: "29.0100",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  priceRange: "$$$",
  servesCuisine: "Event Catering",
  areaServed: {
    "@type": "City",
    name: "Istanbul",
  },
};
