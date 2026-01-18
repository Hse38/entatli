"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import HorizontalScroll from "../components/HorizontalScroll";
import { getGlobalGalleryImages } from "../components/GlobalGallery";
import { HorizontalGallery } from "../components/HorizontalGallery";
import { SchemaMarkup } from "../components/SEO/SchemaMarkup";
import { MobileNav } from "../components/Navigation/MobileNav";
import { DesktopNav } from "../components/Navigation/DesktopNav";
import { MobileStickyCTA } from "../components/Navigation/MobileStickyCTA";
import { Footer } from "../components/Footer";
import { Chatbot } from "../components/Chatbot";
import { useChatbot } from "../contexts/ChatbotContext";
import { useEffect, useMemo, useState } from "react";

type Language = "tr" | "en";

const translations = {
  en: {
    brand: "Enta Litle Asim",
    nav: {
      services: "Services",
      whyUs: "Why Us",
      proof: "Proof",
      contact: "Contact",
    },
    hero: {
      kicker: "Premium Dessert Logistics",
      title: "Premium Dessert & Catering Solutions for Large-Scale Events",
      description:
        "From corporate organizations to high-volume events, we deliver flawless dessert logistics with absolute reliability.",
      ctaPrimary: "Get a Quote",
      ctaSecondary: "Call Now",
    },
    counters: [
      { value: 420, suffix: "+", label: "Events Delivered" },
      { value: 160, suffix: "+", label: "Corporate Clients" },
      { value: 100, suffix: "%", label: "On-Time Delivery" },
    ],
    services: {
      kicker: "Services",
      title: "Event Catering & Organization Solutions",
      description:
        "Professional event catering operations designed for scale, precision, and seamless guest experience.",
      list: [
        {
          title: "Corporate Event Catering",
          description:
            "Planned service flow, corporate discipline, and on-time catering for meetings, launches, and internal corporate events.",
          highlight: "Corporate event catering",
        },
        {
          title: "Wedding & Engagement Catering",
          description:
            "Wedding-scale catering operations with guest flow management, service choreography, and premium presentation.",
          highlight: "Wedding catering",
        },
        {
          title: "Festival & Large Event Catering",
          description:
            "High-volume, high-pressure mass catering with speed, coordination, and field logistics for large-scale events.",
          highlight: "Festival catering",
        },
        {
          title: "Workshop & Special Experience Catering",
          description:
            "Small-to-medium scale curated events with concept-based menus, controlled service, and brand-aligned experience.",
          highlight: "Workshop catering",
        },
        {
          title: "Seminar & Conference Catering",
          description:
            "Long-duration professional events with continuous service, break-time catering, and predictable quality.",
          highlight: "Conference catering",
        },
        {
          title: "Outdoor & Activity Catering",
          description:
            "Outdoor and dynamic events with mobile setups, flexible service points, and environmental adaptation.",
          highlight: "Outdoor catering",
        },
      ],
      action: "View Details",
    },
    whyUs: {
      kicker: "Why Choose Us",
      title: "Corporate-grade precision with luxury hospitality standards.",
      description:
        "We operate like a logistics company and present like a luxury brand. The result: flawless execution with zero tolerance for mistakes.",
      list: [
        {
          title: "Operational Strength",
          description:
            "Documented workflows, strict QA, and cross-functional oversight ensure every delivery is measured and verified.",
        },
        {
          title: "Large-Scale Logistics",
          description:
            "Fleet coordination, redundant cold-chain systems, and disciplined staging for complex venues.",
        },
        {
          title: "Corporate Discipline",
          description:
            "Structured communication and accountability aligned with enterprise procurement expectations.",
        },
        {
          title: "Zero-Risk Execution",
          description:
            "Back-up inventory, contingency planning, and on-site leadership eliminate uncertainty.",
        },
      ],
    },
    proof: {
      kicker: "Social Proof",
      title: "Trusted by executive teams who cannot risk failure.",
      description:
        "Documented event coverage, verified delivery records, and repeat enterprise engagements.",
      gallery: [
        {
          id: 1,
          title: "Executive Gala Showcase",
          description: "Premium dessert staging for leadership audiences.",
        },
        {
          id: 2,
          title: "Corporate Summit Lounge",
          description: "High-throughput service with luxury presentation.",
        },
        {
          id: 3,
          title: "VIP Hospitality Suite",
          description: "White-glove dessert service for VIP guests.",
        },
        {
          id: 4,
          title: "Multi-Venue Deployment",
          description: "Synchronized delivery across complex venues.",
        },
      ],
      logos: [
        "Altair Holdings",
        "Marmara Finance",
        "Vertex Global",
        "Pera Hospitality",
        "NorthBridge Tech",
      ],
    },
    faq: {
      kicker: "FAQ",
      title: "Decisions made faster when answers are clear.",
      list: [
        {
          question: "How early should we book for large-scale events?",
          answer:
            "For enterprise events, we recommend reserving production windows at least 4-6 weeks in advance to secure logistics capacity.",
        },
        {
          question: "Do you offer on-site coordination?",
          answer:
            "Yes. Dedicated on-site supervisors manage setup, temperature control, and service flow for every high-volume event.",
        },
        {
          question: "Can you handle multi-location deployments?",
          answer:
            "We deploy multi-venue logistics with synchronized delivery schedules and real-time tracking to protect timing and quality.",
        },
      ],
    },
    contact: {
      title: "Your event cannot afford mistakes.",
      description:
        "Speak directly with our leadership team. We respond within hours, with a plan, timeline, and a clear execution path.",
      whatsapp: "Contact via WhatsApp",
      call: "Call Now",
      phone1: "+90 212 466 13 83",
      phone2: "+90 532 617 46 23",
      phone2WhatsApp: true,
      email: "info@entatlitelasim.com",
      address: {
        street: "Kocasinan Merkez Mahallesi, Mareşal Çakmak Caddesi No:25",
        city: "Bahçelievler / İstanbul",
        country: "Türkiye",
      },
      website: "entatlitelasim.com",
    },
    footer: {
      rights: "© 2026 Enta Litle Asim. All rights reserved.",
      address: "Maslak, Istanbul · +90 212 555 01 02",
    },
    chat: {
      title: "Executive Concierge",
      description:
        "Tell us your event date and guest count. We will respond with a tailored execution plan.",
      action: "Start Quote",
      toggle: "Chat",
      aria: "Toggle chatbot",
    },
    mobile: {
      whatsapp: "WhatsApp",
      call: "Call",
    },
    schema: {
      description:
        "Premium dessert and catering logistics for corporate organizations and large-scale events.",
      serviceDescription:
        "Enterprise-grade dessert production, logistics, and on-site hospitality execution.",
    },
  },
  tr: {
    brand: "Enta Litle Asim",
    nav: {
      services: "Hizmetler",
      whyUs: "Neden Biz",
      proof: "Galeri & Referanslar",
      contact: "İletişim",
    },
    hero: {
      kicker: "Premium Tatlı Lojistiği",
      title: "Büyük Ölçekli Etkinlikler için Premium Tatlı & Catering Çözümleri",
      description:
        "Kurumsal organizasyonlardan yüksek hacimli etkinliklere kadar kusursuz tatlı lojistiği sunarız.",
      ctaPrimary: "Teklif Al",
      ctaSecondary: "Hemen Ara",
    },
    counters: [
      { value: 420, suffix: "+", label: "Gerçekleşen Etkinlik" },
      { value: 160, suffix: "+", label: "Kurumsal Müşteri" },
      { value: 100, suffix: "%", label: "Zamanında Teslim" },
    ],
    services: {
      kicker: "Hizmetlerimiz",
      title: "Etkinlik Catering & Organizasyon Çözümleri",
      description:
        "Ölçek, hassasiyet ve kesintisiz misafir deneyimi için tasarlanmış profesyonel etkinlik catering operasyonları.",
      list: [
        {
          title: "Kurumsal Etkinlik Catering",
          description:
            "Toplantılar, lansmanlar ve kurumsal iç etkinlikler için planlı servis akışı, kurumsal disiplin ve zamanında catering.",
          highlight: "Kurumsal etkinlik catering",
        },
        {
          title: "Düğün & Nişan Catering",
          description:
            "Misafir akış yönetimi, servis koreografisi ve premium sunum ile düğün ölçeğinde catering operasyonları.",
          highlight: "Düğün catering",
        },
        {
          title: "Festival & Büyük Etkinlik Catering",
          description:
            "Büyük ölçekli etkinlikler için hız, koordinasyon ve saha lojistiği ile yüksek hacimli, yüksek baskılı toplu catering.",
          highlight: "Festival catering",
        },
        {
          title: "Workshop & Özel Deneyim Catering",
          description:
            "Konsept bazlı menüler, kontrollü servis ve marka uyumlu deneyim ile küçük-orta ölçekli küratörlü etkinlikler.",
          highlight: "Workshop catering",
        },
        {
          title: "Seminer & Konferans Catering",
          description:
            "Sürekli servis, mola zamanı catering ve öngörülebilir kalite ile uzun süreli profesyonel etkinlikler.",
          highlight: "Konferans catering",
        },
        {
          title: "Açık Alan & Aktivite Catering",
          description:
            "Mobil kurulumlar, esnek servis noktaları ve çevresel adaptasyon ile açık hava ve dinamik etkinlikler.",
          highlight: "Açık alan catering",
        },
      ],
      action: "Detayları Gör",
    },
    whyUs: {
      kicker: "Neden Biz",
      title: "Kurumsal hassasiyet, lüks misafirperverlik standardı.",
      description:
        "Lojistik şirketi gibi çalışır, lüks marka gibi sunarız. Sonuç: sıfır toleransla kusursuz uygulama.",
      list: [
        {
          title: "Operasyonel Güç",
          description:
            "Dokümante süreçler, sıkı QA ve çapraz denetim ile her teslimat ölçülür.",
        },
        {
          title: "Büyük Ölçekli Lojistik",
          description:
            "Filo koordinasyonu, yedekli soğuk zincir ve disiplinli sahneleme.",
        },
        {
          title: "Kurumsal Disiplin",
          description:
            "Kurumsal satın alma beklentileriyle uyumlu şeffaf iletişim ve hesap verebilirlik.",
        },
        {
          title: "Sıfır Riskli Uygulama",
          description:
            "Yedek stok, plan B ve sahada liderlik ile belirsizlik ortadan kalkar.",
        },
      ],
    },
    proof: {
      kicker: "Galeri & Referanslar",
      title: "Hata kabul etmeyen ekiplerin tercihi.",
      description:
        "Belgelendirilmiş etkinlik kapsamı, doğrulanmış teslim kayıtları ve tekrar eden kurumsal iş birlikleri.",
      gallery: [
        {
          id: 1,
          title: "Yönetici Gala Sunumu",
          description: "Lider ekipler için premium tatlı sahneleme.",
        },
        {
          id: 2,
          title: "Kurumsal Zirve Lounge",
          description: "Yüksek akışlı servis ve lüks sunum.",
        },
        {
          id: 3,
          title: "VIP Misafir Suiti",
          description: "VIP konuklar için white-glove servis.",
        },
        {
          id: 4,
          title: "Çoklu Mekan Dağıtımı",
          description: "Karmaşık mekanlarda senkron teslimat.",
        },
      ],
      logos: [
        "Altair Holdings",
        "Marmara Finance",
        "Vertex Global",
        "Pera Hospitality",
        "NorthBridge Tech",
      ],
    },
    faq: {
      kicker: "SSS",
      title: "Net cevaplar, hızlı kararlar sağlar.",
      list: [
        {
          question: "Büyük ölçekli etkinlikler için ne kadar önce rezervasyon yapmalıyız?",
          answer:
            "Kurumsal etkinliklerde lojistik kapasiteyi güvenceye almak için 4-6 hafta önceden planlama öneriyoruz.",
        },
        {
          question: "Sahada koordinasyon sağlıyor musunuz?",
          answer:
            "Evet. Her yüksek hacimli etkinlikte kurulum, sıcaklık kontrolü ve servis akışını yöneten saha sorumluları bulunur.",
        },
        {
          question: "Çoklu lokasyon dağıtımı yapabiliyor musunuz?",
          answer:
            "Çoklu mekan dağıtımlarını senkron teslimat planları ve gerçek zamanlı takip ile yürütüyoruz.",
        },
      ],
    },
    contact: {
      title: "Etkinliğiniz hata kabul etmez.",
      description:
        "Liderlik ekibimizle doğrudan iletişime geçin. Saatler içinde planlama, zamanlama ve net bir uygulama yolu sunalım.",
      whatsapp: "WhatsApp'tan Yazın",
      call: "Hemen Arayın",
      phone1: "0 212 466 13 83",
      phone2: "0 532 617 46 23",
      phone2WhatsApp: true,
      email: "info@entatlitelasim.com",
      address: {
        street: "Kocasinan Merkez Mahallesi, Mareşal Çakmak Caddesi No:25",
        city: "Bahçelievler / İstanbul",
        country: "Türkiye",
      },
      website: "entatlitelasim.com",
    },
    footer: {
      rights: "© 2026 Enta Litle Asim. Tüm hakları saklıdır.",
      address: "Maslak, İstanbul · +90 212 555 01 02",
    },
    chat: {
      title: "Executive Concierge",
      description:
        "Etkinlik tarihinizi ve misafir sayısını paylaşın. Size özel uygulama planı hazırlayalım.",
      action: "Teklif Başlat",
      toggle: "Sohbet",
      aria: "Sohbeti aç/kapat",
    },
    mobile: {
      whatsapp: "WhatsApp",
      call: "Ara",
    },
    schema: {
      description:
        "Kurumsal organizasyonlar ve büyük ölçekli etkinlikler için premium tatlı ve catering lojistiği.",
      serviceDescription:
        "Kurumsal seviyede tatlı üretimi, lojistik ve sahada misafirperverlik uygulaması.",
    },
  },
} as const;

function Counter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let animationFrame = 0;
    const duration = 1200;
    const start = performance.now();

    const step = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      setDisplay(Math.floor(progress * value));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [value]);

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className="text-4xl font-semibold text-white">
        {display}
        {suffix}
      </span>
      <span className="text-sm uppercase tracking-[0.2em] text-soft-lavender">
        {label}
      </span>
    </div>
  );
}

export default function Home() {
  const { setPageContext, setLanguage } = useChatbot();
  const [lang, setLang] = useState<Language>("tr");
  const content = useMemo(() => translations[lang], [lang]);

  useEffect(() => {
    const stored = localStorage.getItem("lang");
    if (stored === "tr" || stored === "en") {
      setLang(stored);
      return;
    }
    if (navigator.language.toLowerCase().startsWith("tr")) {
      setLang("tr");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("lang", lang);
    setLanguage(lang); // Sync chatbot language
  }, [lang, setLanguage]);

  // Set page context for chatbot
  useEffect(() => {
    setPageContext("home");
    
    // Optional: Detect section in view for more context-aware responses
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            if (sectionId === "services") {
              setPageContext("product-list");
            } else if (sectionId === "proof") {
              setPageContext("product-detail");
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [setPageContext]);


  // Generate FAQ items for schema
  const faqItems = useMemo(() => {
    return content.faq.list.map((faq) => ({
      question: faq.question,
      answer: faq.answer,
    }));
  }, [content.faq.list]);

  return (
    <div className="bg-background text-foreground m-0 p-0">
      {/* Schema Markup */}
      <SchemaMarkup language={lang} faqItems={faqItems} />

      <header
        className="sticky top-0 z-20 w-full backdrop-blur-md m-0"
        id="main-header"
      >
        <div className="absolute inset-0 bg-dark/80 -z-10" />
        <div className="absolute inset-0 lilac-gradient -z-10 opacity-60" />
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2">
          <a href="#" className="flex items-center">
            <Image
              src="/img/yazılıbeyaz.png"
              alt={content.brand}
              width={280}
              height={80}
              className="h-14 w-auto object-contain sm:h-16"
              priority
            />
            <span className="sr-only">{content.brand}</span>
          </a>
          <div className="flex items-center gap-6">
            <DesktopNav
              language={lang}
              navItems={content.nav}
              textColor="text-white/80"
              hoverColor="hover:text-white"
            />
            <div className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white md:flex">
              <button
                type="button"
                onClick={() => setLang("tr")}
                className={`rounded-full border px-3 py-1 transition ${
                  lang === "tr"
                    ? "border-soft-lavender bg-soft-lavender text-dark"
                    : "border-white/20 text-white/70 hover:border-soft-lavender hover:text-white"
                }`}
              >
                TR
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`rounded-full border px-3 py-1 transition ${
                  lang === "en"
                    ? "border-soft-lavender bg-soft-lavender text-dark"
                    : "border-white/20 text-white/70 hover:border-soft-lavender hover:text-white"
                }`}
              >
                EN
              </button>
            </div>
            <MobileNav
              language={lang}
              onLanguageChange={(newLang) => {
                setLang(newLang);
                localStorage.setItem("lang", newLang);
              }}
              currentLang={lang}
              navItems={content.nav}
              brand={content.brand}
              ctaText={content.hero.ctaPrimary}
            />
          </div>
        </div>
      </header>

      <main className="m-0 p-0">
        <section className="relative min-h-screen overflow-hidden bg-dark text-white m-0 p-0 -mt-0">
          <div className="absolute inset-0 lilac-gradient" />
          <motion.div
            className="absolute inset-0 grain-overlay opacity-60"
            animate={{ opacity: [0.25, 0.45, 0.25] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            initial={false}
          />
          <motion.div
            className="absolute -right-32 top-24 h-72 w-72 rounded-full bg-lilac/20 blur-3xl"
            animate={{ y: [0, 20, 0], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            initial={false}
          />
          <div className="relative z-10 flex min-h-screen items-center pt-0">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pb-20 sm:px-10 lg:px-20 pt-0">
              <div className="max-w-3xl space-y-6">
                <p className="text-xs uppercase tracking-[0.4em] text-soft-lavender">
                  {content.hero.kicker}
                </p>
                <h1 className="text-balance text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                  {content.hero.title}
                </h1>
                <p className="text-lg text-white/70 sm:text-xl">
                  {content.hero.description}
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full bg-lilac px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-soft-lavender hover:text-dark"
                >
                  {content.hero.ctaPrimary}
                </a>
                <a
                  href="tel:+902125550102"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:border-soft-lavender hover:text-soft-lavender"
                >
                  {content.hero.ctaSecondary}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-dark text-white">
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
            {content.counters.map((counter) => (
              <Counter key={counter.label} {...counter} />
            ))}
          </div>
        </section>

        <section id="services" className="section-padding bg-background">
          <div className="mx-auto flex max-w-6xl flex-col gap-12">
            <div className="max-w-2xl space-y-4">
              <p className="text-xs uppercase tracking-[0.4em] text-dark-purple">
                {content.services.kicker}
              </p>
              <h2 className="text-3xl font-semibold text-dark sm:text-4xl">
                {content.services.title}
              </h2>
              <p className="text-lg text-dark/70">
                {content.services.description}
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {content.services.list.map((service, idx) => {
                const serviceIds = [
                  "corporate-event-catering",
                  "wedding-engagement-catering",
                  "festival-large-event-catering",
                  "workshop-special-experience-catering",
                  "seminar-conference-catering",
                  "outdoor-activity-catering",
                ];
                const serviceImages = [
                  "/img/corporate-event-catering.jpg",
                  "/img/wedding-engagement-catering.jpg",
                  "/img/festival-large-event-catering.jpg",
                  "/img/workshop-special-experience-catering.jpg",
                  "/img/seminar-conference-catering.jpg",
                  "/img/outdoor-activity-catering.jpg",
                ];
                const serviceId = serviceIds[idx] || `service-${idx}`;
                const serviceImage = serviceImages[idx] || "/img/catering.jpg";
                return (
                  <Link
                    key={service.title}
                    href={`/services/${serviceId}`}
                    className="group relative block overflow-hidden rounded-3xl border border-dark/10 bg-white p-8 shadow-lg transition hover:-translate-y-2 focus-within:ring-2 focus-within:ring-lilac/50 focus:outline-none cursor-pointer"
                    aria-label={`${content.services.action}: ${service.title}`}
                  >
                    <div className="relative mb-6 h-40 overflow-hidden rounded-2xl">
                      <Image
                        src={serviceImage}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="space-y-3">
                      <span className="text-xs uppercase tracking-[0.3em] text-dark-purple">
                        {service.highlight}
                      </span>
                      <h3 className="text-2xl font-semibold text-dark">
                        {service.title}
                      </h3>
                      <p className="text-sm text-dark/70">{service.description}</p>
                      <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-lilac transition group-hover:text-dark-purple pointer-events-none">
                        {content.services.action}
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section id="why-us" className="section-padding bg-background">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_1fr]">
            <div className="space-y-8">
              <div className="relative h-56 w-full flex justify-center">
                <div className="relative h-full w-full max-w-md">
                  <Image
                    src="/img/yazılıbeyaz.png"
                    alt={content.brand}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 448px"
                    priority
                  />
                </div>
              </div>
              <div className="space-y-6">
                <p className="text-xs uppercase tracking-[0.4em] text-dark-purple">
                  {content.whyUs.kicker}
                </p>
                <h2 className="text-3xl font-semibold text-dark sm:text-4xl">
                  {content.whyUs.title}
                </h2>
                <p className="text-lg text-dark/70">
                  {content.whyUs.description}
                </p>
              </div>
            </div>
            <div className="grid gap-6">
              {content.whyUs.list.map((reason) => (
                <div
                  key={reason.title}
                  className="glass-panel rounded-2xl p-6 text-white"
                >
                  <h3 className="text-xl font-semibold text-white">
                    {reason.title}
                  </h3>
                  <p className="mt-3 text-sm text-white/70">
                    {reason.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="proof" className="section-padding bg-background text-dark">
          <div className="mx-auto flex max-w-6xl flex-col gap-10">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.4em] text-dark-purple">
                {content.proof.kicker}
              </p>
              <h2 className="text-3xl font-semibold text-dark sm:text-4xl">
                {content.proof.title}
              </h2>
              <p className="text-lg text-dark/70">
                {content.proof.description}
              </p>
            </div>
            <HorizontalGallery
              images={getGlobalGalleryImages(lang)}
              language={lang}
            />
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-5">
              {content.proof.logos.map((logo) => (
                <div
                  key={logo}
                  className="flex items-center justify-center rounded-2xl border border-dark/10 bg-white px-4 py-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-dark/50"
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="mx-auto max-w-4xl space-y-10">
            <div className="space-y-4 text-center">
              <p className="text-xs uppercase tracking-[0.4em] text-dark-purple">
                {content.faq.kicker}
              </p>
              <h2 className="text-3xl font-semibold text-dark sm:text-4xl">
                {content.faq.title}
              </h2>
            </div>
            <div className="grid gap-6">
              {content.faq.list.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-dark/10 bg-white p-6"
                >
                  <h3 className="text-lg font-semibold text-dark">
                    {faq.question}
                  </h3>
                  <p className="mt-3 text-sm text-dark/70">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section-padding bg-dark text-white">
          <div className="mx-auto max-w-5xl">
            {/* Headline & Copy */}
            <div className="mb-12 text-center">
              <h2 className="text-balance text-4xl font-semibold text-white sm:text-5xl">
                {content.contact.title}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/70">
                {content.contact.description}
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
              {/* WhatsApp Button - PRIMARY CTA */}
              <a
                href="https://wa.me/905326174623"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3 rounded-full bg-lilac px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-lg transition hover:bg-soft-lavender hover:text-dark focus:outline-none focus:ring-2 focus:ring-lilac/50 focus:ring-offset-2 focus:ring-offset-dark"
                aria-label={content.contact.whatsapp}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                {content.contact.whatsapp}
              </a>

              {/* Call Button - SECONDARY CTA */}
              <a
                href="tel:+905326174623"
                className="flex items-center justify-center gap-3 rounded-full border-2 border-white/30 bg-transparent px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:border-soft-lavender hover:bg-white/10 hover:text-soft-lavender focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-dark"
                aria-label={content.contact.call}
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
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {content.contact.call}
              </a>
            </div>

            {/* Contact Details Block */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Phone Numbers */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
                  {lang === "tr" ? "Telefon" : "Phone"}
                </h3>
                <div className="space-y-2">
                  <a
                    href={`tel:${content.contact.phone1.replace(/\s/g, "")}`}
                    className="block text-lg font-medium text-white transition hover:text-soft-lavender focus:outline-none focus:ring-2 focus:ring-lilac/50 focus:ring-offset-2 focus:ring-offset-dark rounded"
                    aria-label={`${lang === "tr" ? "Ara" : "Call"} ${content.contact.phone1}`}
                  >
                    {content.contact.phone1}
                  </a>
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${content.contact.phone2.replace(/\s/g, "")}`}
                      className="block text-lg font-medium text-white transition hover:text-soft-lavender focus:outline-none focus:ring-2 focus:ring-lilac/50 focus:ring-offset-2 focus:ring-offset-dark rounded"
                      aria-label={`${lang === "tr" ? "Ara" : "Call"} ${content.contact.phone2}`}
                    >
                      {content.contact.phone2}
                    </a>
                    {content.contact.phone2WhatsApp && (
                      <span className="rounded-full bg-lilac/20 px-2 py-0.5 text-xs font-semibold uppercase tracking-[0.1em] text-soft-lavender">
                        WhatsApp
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
                  {lang === "tr" ? "Adres" : "Address"}
                </h3>
                <address className="not-italic text-base leading-relaxed text-white/80">
                  <a
                    href="https://maps.google.com/?q=Kocasinan+Merkez+Mahallesi+Mareşal+Çakmak+Caddesi+No:25+Bahçelievler+İstanbul"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block transition hover:text-soft-lavender focus:outline-none focus:ring-2 focus:ring-lilac/50 focus:ring-offset-2 focus:ring-offset-dark rounded"
                  >
                    <div>{content.contact.address.street}</div>
                    <div>{content.contact.address.city}</div>
                    <div>{content.contact.address.country}</div>
                  </a>
                </address>
              </div>

              {/* Email & Website */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
                  {lang === "tr" ? "İletişim" : "Contact"}
                </h3>
                <div className="space-y-2">
                  <a
                    href={`mailto:${content.contact.email}`}
                    className="block text-base font-medium text-white transition hover:text-soft-lavender focus:outline-none focus:ring-2 focus:ring-lilac/50 focus:ring-offset-2 focus:ring-offset-dark rounded"
                    aria-label={`${lang === "tr" ? "E-posta gönder" : "Send email"} ${content.contact.email}`}
                  >
                    {content.contact.email}
                  </a>
                  <a
                    href={`https://${content.contact.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-white/60 transition hover:text-white/80 focus:outline-none focus:ring-2 focus:ring-lilac/50 focus:ring-offset-2 focus:ring-offset-dark rounded"
                  >
                    {content.contact.website}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visual Separation - Large padding before footer */}
        <div className="h-20 bg-dark/95" aria-hidden="true" />
      </main>

      <Footer language={lang} />

      <Chatbot />
      <MobileStickyCTA language={lang} />
    </div>
  );
}
