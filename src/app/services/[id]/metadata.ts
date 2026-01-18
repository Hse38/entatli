import type { Metadata } from "next";
import { getServiceById, type ServiceId } from "../../../data/services";
import {
  generateMetaTitle,
  generateMetaDescription,
  generateCanonicalUrl,
  serviceSlugMap,
  type Language,
} from "../../../lib/seo";

export async function generateMetadata(
  params: { id: string },
  language: Language = "en"
): Promise<Metadata> {
  const serviceId = params.id as ServiceId;
  const service = getServiceById(serviceId);

  if (!service) {
    return {
      title: "Service Not Found | En Tatlı Telaşım",
      description: "The requested service could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = generateMetaTitle(service, language);
  const description = generateMetaDescription(service, language);
  const canonical = generateCanonicalUrl(service.id, language);
  const content = service[language];

  // Get service-specific image
  const serviceImage = `/img/${service.id}.jpg`;
  const ogImage = `https://entatlitelasim.com${serviceImage}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    keywords: language === "tr"
      ? [
          "etkinlik catering",
          "catering organizasyon",
          content.title.toLowerCase(),
          "Istanbul catering",
          "büyük ölçekli catering",
          "kurumsal catering",
        ]
      : [
          "event catering",
          "catering organization",
          content.title.toLowerCase(),
          "Istanbul catering",
          "large-scale catering",
          "corporate catering",
        ],
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "En Tatlı Telaşım",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: content.title,
        },
      ],
      locale: language === "tr" ? "tr_TR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
