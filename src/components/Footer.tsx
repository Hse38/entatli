"use client";

import Image from "next/image";
import Link from "next/link";

type FooterProps = {
  language: "tr" | "en";
};

const services = {
  tr: [
    { id: "kurumsal-etkinlik-catering", title: "Kurumsal Etkinlik Catering" },
    { id: "dugun-nisan-catering", title: "Düğün & Nişan Catering" },
    { id: "festival-buyuk-etkinlik-catering", title: "Festival & Büyük Etkinlik Catering" },
    { id: "seminer-konferans-catering", title: "Seminer & Konferans Catering" },
    { id: "acik-alan-aktivite-catering", title: "Açık Alan & Aktivite Catering" },
  ],
  en: [
    { id: "corporate-event-catering", title: "Corporate Event Catering" },
    { id: "wedding-engagement-catering", title: "Wedding & Engagement Catering" },
    { id: "festival-large-event-catering", title: "Festival & Large Event Catering" },
    { id: "seminar-conference-catering", title: "Seminar & Conference Catering" },
    { id: "outdoor-activity-catering", title: "Outdoor Activity Catering" },
  ],
};

const footerContent = {
  tr: {
    brand: {
      statement: "Premium etkinlik catering ve büyük ölçekli yemek servisi operasyonları.",
    },
    services: "Hizmetler",
    company: "Şirket",
    companyLinks: {
      about: "Hakkımızda",
      gallery: "Galeri",
      process: "Süreç",
      contact: "İletişim",
    },
    contact: "İletişim",
    rights: "© 2026 Enta Litle Asim. Tüm hakları saklıdır.",
    location: "İstanbul, Türkiye",
  },
  en: {
    brand: {
      statement: "Premium event catering and large-scale food service operations.",
    },
    services: "Services",
    company: "Company",
    companyLinks: {
      about: "About Us",
      gallery: "Gallery",
      process: "Process",
      contact: "Contact",
    },
    contact: "Contact",
    rights: "© 2026 Enta Litle Asim. All rights reserved.",
    location: "Istanbul, Turkey",
  },
};

export function Footer({ language }: FooterProps) {
  const content = footerContent[language];
  const serviceList = services[language];
  const contactInfo = {
    phone1: "0 212 466 13 83",
    phone2: "0 532 617 46 23",
    email: "info@entatlitelasim.com",
    address: {
      street: "Kocasinan Merkez Mahallesi, Mareşal Çakmak Caddesi No:25",
      city: "Bahçelievler / İstanbul",
      country: "Türkiye",
    },
  };

  return (
    <footer className="bg-dark/95 border-t border-white/5">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 lg:px-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/img/yazılıbeyaz.png"
                alt="Enta Litle Asim"
                width={200}
                height={60}
                className="h-10 w-auto object-contain"
                priority
              />
            </Link>
            <p className="text-sm leading-relaxed text-white/60">
              {content.brand.statement}
            </p>
          </div>

          {/* Column 2: Services */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
              {content.services}
            </h3>
            <nav className="flex flex-col gap-3">
              {serviceList.map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.id}`}
                  className="text-sm text-white/60 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-lilac/50 focus:ring-offset-2 focus:ring-offset-dark rounded"
                >
                  {service.title}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
              {content.company}
            </h3>
            <nav className="flex flex-col gap-3">
              <Link
                href="/#why-us"
                className="text-sm text-white/60 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-lilac/50 focus:ring-offset-2 focus:ring-offset-dark rounded"
              >
                {content.companyLinks.about}
              </Link>
              <Link
                href="/#proof"
                className="text-sm text-white/60 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-lilac/50 focus:ring-offset-2 focus:ring-offset-dark rounded"
              >
                {content.companyLinks.gallery}
              </Link>
              <Link
                href="/#services"
                className="text-sm text-white/60 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-lilac/50 focus:ring-offset-2 focus:ring-offset-dark rounded"
              >
                {content.companyLinks.process}
              </Link>
              <Link
                href="/#contact"
                className="text-sm text-white/60 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-lilac/50 focus:ring-offset-2 focus:ring-offset-dark rounded"
              >
                {content.companyLinks.contact}
              </Link>
            </nav>
          </div>

          {/* Column 4: Contact Info (Passive) */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
              {content.contact}
            </h3>
            <div className="space-y-3 text-sm text-white/60">
              <div className="space-y-1">
                <a
                  href={`tel:${contactInfo.phone1.replace(/\s/g, "")}`}
                  className="block transition hover:text-white focus:outline-none focus:ring-2 focus:ring-lilac/50 focus:ring-offset-2 focus:ring-offset-dark rounded"
                  aria-label={`${language === "tr" ? "Ara" : "Call"} ${contactInfo.phone1}`}
                >
                  {contactInfo.phone1}
                </a>
                <a
                  href={`tel:${contactInfo.phone2.replace(/\s/g, "")}`}
                  className="block transition hover:text-white focus:outline-none focus:ring-2 focus:ring-lilac/50 focus:ring-offset-2 focus:ring-offset-dark rounded"
                  aria-label={`${language === "tr" ? "Ara" : "Call"} ${contactInfo.phone2}`}
                >
                  {contactInfo.phone2}
                </a>
              </div>
              <a
                href={`mailto:${contactInfo.email}`}
                className="block transition hover:text-white focus:outline-none focus:ring-2 focus:ring-lilac/50 focus:ring-offset-2 focus:ring-offset-dark rounded"
                aria-label={`${language === "tr" ? "E-posta gönder" : "Send email"} ${contactInfo.email}`}
              >
                {contactInfo.email}
              </a>
              <address className="not-italic leading-relaxed">
                <div>{contactInfo.address.street}</div>
                <div>{contactInfo.address.city}</div>
                <div>{contactInfo.address.country}</div>
              </address>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 bg-dark">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 text-xs text-white/50 sm:px-10 sm:flex-row sm:items-center sm:justify-between lg:px-20">
          <span>{content.rights}</span>
          <span>{content.location}</span>
        </div>
      </div>
    </footer>
  );
}
