"use client";

import { motion } from "framer-motion";
import type { ServiceData } from "../data/services";
import { Chatbot } from "./Chatbot";
import { useChatbot } from "../contexts/ChatbotContext";
import { ServiceGallery } from "./ServiceGallery";
import { SchemaMarkup } from "./SEO/SchemaMarkup";
import { InternalLinks } from "./SEO/InternalLinks";
import { StickyCTA } from "./SEO/StickyCTA";
import { MobileNav } from "./Navigation/MobileNav";
import { DesktopNav } from "./Navigation/DesktopNav";
import { MobileStickyCTA } from "./Navigation/MobileStickyCTA";
import { Footer } from "./Footer";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type ServiceDetailPageProps = {
  service: ServiceData;
  language: "tr" | "en";
};

// Navigation translations
const navTranslations = {
  tr: {
    brand: "Enta Litle Asim",
    nav: {
      services: "Hizmetler",
      whyUs: "Neden Biz",
      proof: "Referanslar",
      contact: "İletişim",
    },
  },
  en: {
    brand: "Enta Litle Asim",
    nav: {
      services: "Services",
      whyUs: "Why Us",
      proof: "Proof",
      contact: "Contact",
    },
  },
} as const;

export function ServiceDetailPage({ service, language }: ServiceDetailPageProps) {
  const { setPageContext, setLanguage } = useChatbot();
  const [lang, setLang] = useState<"tr" | "en">(language);
  const content = service[language];
  const navContent = navTranslations[language];

  // Sync language with parent
  useEffect(() => {
    setLang(language);
    setLanguage(language);
  }, [language, setLanguage]);

  useEffect(() => {
    setPageContext("product-detail");
  }, [setPageContext]);

  // Gallery images mapping per service
  const galleryImages = useMemo(() => {
    const images: { src: string; alt: string }[] = [];
    
    switch (service.id) {
      case "corporate-event-catering":
        // acilis_ images
        for (let i = 1; i <= 8; i++) {
          images.push({
            src: `/img/acilis_${i}.jpg`,
            alt: language === "tr" 
              ? `Kurumsal etkinlik catering - Açılış ${i}` 
              : `Corporate event catering - Opening ${i}`,
          });
        }
        break;
      
      case "wedding-engagement-catering":
        // düğün_ images (wedding)
        for (let i = 1; i <= 7; i++) {
          images.push({
            src: `/img/dugun_${i}.jpg`,
            alt: language === "tr" 
              ? `Düğün catering - ${i}` 
              : `Wedding catering - ${i}`,
          });
        }
        // soz_ images (engagement)
        for (let i = 1; i <= 5; i++) {
          images.push({
            src: `/img/soz_${i}.jpg`,
            alt: language === "tr" 
              ? `Söz catering - ${i}` 
              : `Engagement catering - ${i}`,
          });
        }
        break;
      
      case "festival-large-event-catering":
        // kahvaltı_ images
        for (let i = 1; i <= 4; i++) {
          images.push({
            src: `/img/kahvalti_${i}.jpg`,
            alt: language === "tr" 
              ? `Festival catering - Kahvaltı ${i}` 
              : `Festival catering - Breakfast ${i}`,
          });
        }
        break;
      
      case "workshop-special-experience-catering":
        // Use guzel_sofra images if available, or generic
        images.push(
          {
            src: `/img/guzel_sofra_1.jpg`,
            alt: language === "tr" ? "Workshop catering - Özel deneyim" : "Workshop catering - Special experience",
          },
          {
            src: `/img/guzel_sofra_2.jpg`,
            alt: language === "tr" ? "Workshop catering - Küratörlü etkinlik" : "Workshop catering - Curated event",
          }
        );
        break;
      
      case "seminar-conference-catering":
        // Use acilis_ images for seminars
        for (let i = 1; i <= 6; i++) {
          images.push({
            src: `/img/acilis_${i}.jpg`,
            alt: language === "tr" 
              ? `Seminer catering - ${i}` 
              : `Seminar catering - ${i}`,
          });
        }
        break;
      
      case "outdoor-activity-catering":
        // Use kahvaltı_ images for outdoor
        for (let i = 1; i <= 4; i++) {
          images.push({
            src: `/img/kahvalti_${i}.jpg`,
            alt: language === "tr" 
              ? `Açık alan catering - ${i}` 
              : `Outdoor catering - ${i}`,
          });
        }
        break;
    }
    
    return images;
  }, [service.id, language]);

  return (
    <div className="bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-20 w-full border-b border-gray-100 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2">
          <Link href="/" className="flex items-center">
            <Image
              src="/img/yazılıbeyaz.png"
              alt={navContent.brand}
              width={280}
              height={80}
              className="h-14 w-auto object-contain sm:h-16"
              priority
            />
            <span className="sr-only">{navContent.brand}</span>
          </Link>
          <div className="flex items-center gap-6">
            <DesktopNav
              language={language}
              navItems={navContent.nav}
              textColor="text-dark/70"
              hoverColor="hover:text-dark"
            />
            <MobileNav
              language={language}
              onLanguageChange={(newLang) => {
                localStorage.setItem("lang", newLang);
                setLang(newLang);
                setLanguage(newLang);
                window.location.reload();
              }}
              currentLang={lang}
              navItems={navContent.nav}
              brand={navContent.brand}
              ctaText={language === "tr" ? "Teklif Al" : "Get a Quote"}
              buttonColor="dark"
            />
            <div className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-dark md:flex">
              <button
                type="button"
                onClick={() => {
                  localStorage.setItem("lang", "tr");
                  setLang("tr");
                  setLanguage("tr");
                  window.location.reload();
                }}
                className={`rounded-full border px-3 py-1 transition ${
                  lang === "tr"
                    ? "border-soft-lavender bg-soft-lavender text-dark"
                    : "border-dark/20 text-dark/70 hover:border-soft-lavender hover:text-dark"
                }`}
              >
                TR
              </button>
              <button
                type="button"
                onClick={() => {
                  localStorage.setItem("lang", "en");
                  setLang("en");
                  setLanguage("en");
                  window.location.reload();
                }}
                className={`rounded-full border px-3 py-1 transition ${
                  lang === "en"
                    ? "border-soft-lavender bg-soft-lavender text-dark"
                    : "border-dark/20 text-dark/70 hover:border-soft-lavender hover:text-dark"
                }`}
              >
                EN
              </button>
            </div>
            <MobileNav
              language={language}
              onLanguageChange={(newLang) => {
                localStorage.setItem("lang", newLang);
                setLang(newLang);
                setLanguage(newLang);
                window.location.reload();
              }}
              currentLang={lang}
              navItems={navContent.nav}
              brand={navContent.brand}
              ctaText={language === "tr" ? "Teklif Al" : "Get a Quote"}
            />
          </div>
        </div>
      </header>

      {/* 1. Hero Section */}
      <section className="relative min-h-[70vh] overflow-hidden bg-gradient-to-b from-background via-background to-lilac/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(107,78,255,0.08),transparent_50%)]" />
        <div className="section-padding relative z-10 mx-auto flex max-w-6xl items-center">
          <div className="w-full space-y-8 py-20">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-xs uppercase tracking-[0.4em] text-dark-purple"
            >
              {content.eyebrow}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-balance text-4xl font-semibold leading-tight text-dark sm:text-5xl lg:text-6xl"
            >
              {content.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="max-w-2xl text-lg text-dark/70 sm:text-xl"
            >
              {content.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-lilac px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-soft-lavender hover:text-dark"
              >
                {content.finalCta.primary}
              </a>
              <a
                href="tel:+902125550102"
                className="inline-flex items-center justify-center rounded-full border border-dark/20 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-dark transition hover:border-lilac hover:text-lilac"
              >
                {content.finalCta.secondary}
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Service Overview */}
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-dark sm:text-3xl">
                {language === "tr" ? "Hizmet Özeti" : "Service Overview"}
              </h2>
              <div className="space-y-4 text-dark/70">
                <div>
                  <h3 className="mb-2 font-semibold text-dark">
                    {language === "tr" ? "Ne" : "What"}
                  </h3>
                  <p>{content.overview.what}</p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-dark">
                    {language === "tr" ? "Kim İçin" : "Who"}
                  </h3>
                  <p>{content.overview.who}</p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-dark">
                    {language === "tr" ? "Ne Zaman" : "When"}
                  </h3>
                  <p>{content.overview.when}</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-dark sm:text-3xl">
                {language === "tr" ? "Temel Özellikler" : "Key Highlights"}
              </h2>
              <ul className="space-y-4">
                {content.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-dark/70">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-lilac" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Operational Process */}
      <section className="section-padding bg-background">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 space-y-4">
            <h2 className="text-3xl font-semibold text-dark sm:text-4xl">
              {language === "tr" ? "Operasyonel Süreç" : "Operational Process"}
            </h2>
            <p className="max-w-2xl text-lg text-dark/70">
              {language === "tr"
                ? "Her aşama, operasyonel disiplin ve öngörülebilir sonuçlar için tasarlanmıştır."
                : "Each stage is designed for operational discipline and predictable outcomes."}
            </p>
          </div>
          <div className="space-y-8">
            {content.process.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex gap-6"
              >
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-lilac/10 text-lg font-semibold text-lilac">
                    {idx + 1}
                  </div>
                  {idx < content.process.length - 1 && (
                    <div className="mt-2 h-full w-0.5 bg-lilac/20" />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="mb-2 text-xl font-semibold text-dark">{step.title}</h3>
                  <p className="text-dark/70">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {galleryImages.length > 0 && (
        <section id="gallery" className="section-padding bg-white">
          <div className="mx-auto max-w-6xl">
            <ServiceGallery 
              images={galleryImages} 
              language={language}
            />
          </div>
        </section>
      )}

      {/* 4. Capacity & Scale Block */}
      <section className="section-padding bg-dark text-white">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 space-y-4">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              {language === "tr" ? "Kapasite ve Ölçek" : "Capacity & Scale"}
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.2em] text-soft-lavender">
                {language === "tr" ? "Günlük Üretim" : "Daily Production"}
              </p>
              <p className="text-3xl font-semibold text-white">{content.capacity.dailyProduction}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.2em] text-soft-lavender">
                {language === "tr" ? "Etkinlik Boyutu" : "Event Size"}
              </p>
              <p className="text-3xl font-semibold text-white">{content.capacity.eventSize}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.2em] text-soft-lavender">
                {language === "tr" ? "Eşzamanlı Lokasyonlar" : "Simultaneous Locations"}
              </p>
              <p className="text-3xl font-semibold text-white">
                {content.capacity.simultaneousLocations}
              </p>
            </div>
          </div>
          <p className="mt-8 max-w-2xl text-lg text-white/70">{content.capacity.description}</p>
        </div>
      </section>

      {/* 5. Use Cases */}
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 space-y-4">
            <h2 className="text-3xl font-semibold text-dark sm:text-4xl">
              {language === "tr" ? "Kullanım Senaryoları" : "Use Cases"}
            </h2>
            <p className="max-w-2xl text-lg text-dark/70">
              {language === "tr"
                ? "Bu hizmetin tipik olarak kullanıldığı durumlar."
                : "Typical scenarios where this service is used."}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {content.useCases.map((useCase, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="rounded-2xl border border-dark/10 bg-white p-6"
              >
                <h3 className="mb-3 text-xl font-semibold text-dark">{useCase.title}</h3>
                <p className="text-dark/70">{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Why This Service is Different */}
      <section className="section-padding bg-background">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 space-y-4">
            <h2 className="text-3xl font-semibold text-dark sm:text-4xl">
              {language === "tr" ? "Bu Hizmeti Farklı Kılan Özellikler" : "Why This Service is Different"}
            </h2>
            {/* H2 = trust & scale */}
            <p className="max-w-2xl text-lg text-dark/70">
              {language === "tr"
                ? "Operasyonel güç ve güvenilirlik odaklı özellikler."
                : "Features focused on operational strength and reliability."}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.differentiators.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="rounded-2xl border border-dark/10 bg-white p-6"
              >
                <p className="text-dark/70">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Related Services - Internal Linking */}
      <InternalLinks currentServiceId={service.id} language={language} />

      {/* 8. Final CTA */}
      <section id="contact" className="section-padding bg-dark text-white">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 text-center">
          <h2 className="text-balance text-4xl font-semibold text-white sm:text-5xl">
            {content.finalCta.headline}
          </h2>
          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="mailto:hello@entatlitelasim.com"
              className="inline-flex items-center justify-center rounded-full bg-lilac px-10 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-soft-lavender hover:text-dark"
            >
              {content.finalCta.primary}
            </a>
            <a
              href="tel:+902125550102"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-10 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:border-soft-lavender hover:text-soft-lavender"
            >
              {content.finalCta.secondary}
            </a>
          </div>
        </div>
      </section>

      {/* Visual Separation - Large padding before footer */}
      <div className="h-20 bg-background" aria-hidden="true" />

      <Footer language={language} />

      <Chatbot />
      <StickyCTA language={language} />
      <MobileStickyCTA language={language} />
    </div>
  );
}
