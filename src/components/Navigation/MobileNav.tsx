"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useNav } from "../../contexts/NavContext";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

type MobileNavProps = {
  language: "tr" | "en";
  onLanguageChange: (lang: "tr" | "en") => void;
  currentLang: "tr" | "en";
  navItems: {
    services: string;
    whyUs: string;
    proof: string;
    contact: string;
  };
  brand: string;
  ctaText: string;
  buttonColor?: "white" | "dark";
};

// Service slugs mapping
const serviceSlugs = {
  tr: {
    "corporate-event-catering": "kurumsal-etkinlik-catering",
    "wedding-engagement-catering": "dugun-nisan-catering",
    "festival-large-event-catering": "festival-buyuk-etkinlik-catering",
    "workshop-special-experience-catering": "workshop-ozel-deneyim-catering",
    "seminar-conference-catering": "seminer-konferans-catering",
    "outdoor-activity-catering": "acik-alan-aktivite-catering",
  },
  en: {
    "corporate-event-catering": "corporate-event-catering",
    "wedding-engagement-catering": "wedding-engagement-catering",
    "festival-large-event-catering": "festival-large-event-catering",
    "workshop-special-experience-catering": "workshop-special-experience-catering",
    "seminar-conference-catering": "seminar-conference-catering",
    "outdoor-activity-catering": "outdoor-activity-catering",
  },
};

const services = {
  tr: [
    { id: "corporate-event-catering", title: "Kurumsal Etkinlik Catering" },
    { id: "wedding-engagement-catering", title: "Düğün & Nişan Catering" },
    { id: "festival-large-event-catering", title: "Festival & Büyük Etkinlik Catering" },
    { id: "workshop-special-experience-catering", title: "Workshop & Özel Deneyim Catering" },
    { id: "seminar-conference-catering", title: "Seminer & Konferans Catering" },
    { id: "outdoor-activity-catering", title: "Açık Alan & Aktivite Catering" },
  ],
  en: [
    { id: "corporate-event-catering", title: "Corporate Event Catering" },
    { id: "wedding-engagement-catering", title: "Wedding & Engagement Catering" },
    { id: "festival-large-event-catering", title: "Festival & Large Event Catering" },
    { id: "workshop-special-experience-catering", title: "Workshop & Special Experience Catering" },
    { id: "seminar-conference-catering", title: "Seminar & Conference Catering" },
    { id: "outdoor-activity-catering", title: "Outdoor Activity Catering" },
  ],
};

export function MobileNav({
  language,
  onLanguageChange,
  currentLang,
  navItems,
  brand,
  ctaText,
  buttonColor = "white",
}: MobileNavProps) {
  const {
    isMobileMenuOpen,
    isServicesSubMenuOpen,
    openMobileMenu,
    closeMobileMenu,
    openServicesSubMenu,
    closeServicesSubMenu,
    closeAllMenus,
  } = useNav();

  const menuRef = useRef<HTMLDivElement>(null);
  const servicesMenuRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Focus trap
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const menu = menuRef.current;
    if (!menu) return;

    const focusableElements = menu.querySelectorAll(
      'a, button, [tabindex]:not([tabindex="-1"])'
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
        if (isServicesSubMenuOpen) {
          closeServicesSubMenu();
        } else {
          closeAllMenus();
        }
      }
    };

    document.addEventListener("keydown", handleTabKey);
    document.addEventListener("keydown", handleEscape);

    firstElement?.focus();

    return () => {
      document.removeEventListener("keydown", handleTabKey);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMobileMenuOpen, isServicesSubMenuOpen, closeAllMenus, closeServicesSubMenu]);

  return (
    <>
      {/* Hamburger Button */}
      <button
        type="button"
        onClick={() => {
          if (isMobileMenuOpen) {
            closeAllMenus();
          } else {
            openMobileMenu();
          }
        }}
        className="md:hidden flex flex-col gap-1.5 p-2"
        aria-label={language === "tr" ? "Menüyü aç" : "Open menu"}
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-menu"
      >
        <motion.span
          animate={
            isMobileMenuOpen
              ? { rotate: 45, y: 8 }
              : { rotate: 0, y: 0 }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
          }
          className={`block h-[2px] w-6 transition-colors ${
            buttonColor === "white" ? "bg-white" : "bg-dark"
          }`}
        />
        <motion.span
          animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.15 }}
          className={`block h-[2px] w-6 transition-colors ${
            buttonColor === "white" ? "bg-white" : "bg-dark"
          }`}
        />
        <motion.span
          animate={
            isMobileMenuOpen
              ? { rotate: -45, y: -8 }
              : { rotate: 0, y: 0 }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
          }
          className={`block h-[2px] w-6 transition-colors ${
            buttonColor === "white" ? "bg-white" : "bg-dark"
          }`}
        />
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.25, ease: [0.4, 0, 0.2, 1] }
              }
              onClick={closeAllMenus}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            />

            {/* Main Menu */}
            <motion.div
              ref={menuRef}
              id="mobile-menu"
              initial={shouldReduceMotion ? { x: 0, opacity: 1 } : { x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={shouldReduceMotion ? { x: 0, opacity: 1 } : { x: "100%", opacity: 0 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      duration: 0.25,
                      ease: [0.4, 0, 0.2, 1], // ease-in-out
                    }
              }
              className="fixed right-0 top-0 z-50 h-full w-[90%] max-w-[420px] bg-white shadow-2xl md:hidden rounded-l-3xl"
              role="dialog"
              aria-modal="true"
              aria-label={language === "tr" ? "Ana menü" : "Main menu"}
            >
              <div className="flex h-full flex-col">
                {/* Header - Sticky */}
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4">
                  <Link
                    href="/"
                    onClick={closeAllMenus}
                    className="flex items-center"
                  >
                    <Image
                      src="/img/yazılıbeyaz.png"
                      alt={brand}
                      width={200}
                      height={60}
                      className="h-10 w-auto object-contain opacity-90"
                      priority
                    />
                  </Link>
                  <button
                    type="button"
                    onClick={closeAllMenus}
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-dark/60 transition hover:bg-gray-100 hover:text-dark focus:outline-none focus:ring-2 focus:ring-lilac/50"
                    aria-label={language === "tr" ? "Menüyü kapat" : "Close menu"}
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
                </div>

                {/* Navigation Content */}
                <div className="flex-1 overflow-y-auto">
                  <AnimatePresence mode="wait">
                    {!isServicesSubMenuOpen ? (
                      <motion.nav
                        key="main-nav"
                        initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
                        transition={
                          shouldReduceMotion
                            ? { duration: 0 }
                            : { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
                        }
                        className="flex flex-col gap-1 p-6"
                      >
                        <Link
                          href="/"
                          onClick={closeAllMenus}
                          className="flex min-h-[48px] items-center py-3 text-base font-medium text-dark transition hover:text-lilac focus:outline-none focus:ring-2 focus:ring-lilac/50 focus:ring-offset-2 rounded-lg px-2 -mx-2"
                        >
                          {language === "tr" ? "Ana Sayfa" : "Home"}
                        </Link>

                        <button
                          type="button"
                          onClick={openServicesSubMenu}
                          className="flex min-h-[48px] items-center justify-between py-3 text-left text-base font-medium text-dark transition hover:text-lilac focus:outline-none focus:ring-2 focus:ring-lilac/50 focus:ring-offset-2 rounded-lg px-2 -mx-2"
                        >
                          <span>{navItems.services}</span>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-dark/40"
                          >
                            <path d="M9 18l6-6-6-6" />
                          </svg>
                        </button>

                        <Link
                          href="/#why-us"
                          onClick={closeAllMenus}
                          className="flex min-h-[48px] items-center py-3 text-base font-medium text-dark transition hover:text-lilac focus:outline-none focus:ring-2 focus:ring-lilac/50 focus:ring-offset-2 rounded-lg px-2 -mx-2"
                        >
                          {navItems.whyUs}
                        </Link>

                        <Link
                          href="/#proof"
                          onClick={closeAllMenus}
                          className="flex min-h-[48px] items-center py-3 text-base font-medium text-dark transition hover:text-lilac focus:outline-none focus:ring-2 focus:ring-lilac/50 focus:ring-offset-2 rounded-lg px-2 -mx-2"
                        >
                          {navItems.proof}
                        </Link>

                        <Link
                          href="/#contact"
                          onClick={closeAllMenus}
                          className="flex min-h-[48px] items-center py-3 text-base font-medium text-dark transition hover:text-lilac focus:outline-none focus:ring-2 focus:ring-lilac/50 focus:ring-offset-2 rounded-lg px-2 -mx-2"
                        >
                          {navItems.contact}
                        </Link>

                        {/* Language Selector */}
                        <div className="mt-8 flex gap-3 border-t border-gray-200 pt-6">
                          <button
                            type="button"
                            onClick={() => {
                              onLanguageChange("tr");
                              closeAllMenus();
                            }}
                            className={`flex-1 rounded-full border px-4 py-2.5 text-sm font-semibold uppercase tracking-[0.1em] transition ${
                              currentLang === "tr"
                                ? "border-soft-lavender bg-soft-lavender text-dark"
                                : "border-dark/20 text-dark/70 hover:border-soft-lavender hover:text-dark"
                            }`}
                          >
                            TR
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              onLanguageChange("en");
                              closeAllMenus();
                            }}
                            className={`flex-1 rounded-full border px-4 py-2.5 text-sm font-semibold uppercase tracking-[0.1em] transition ${
                              currentLang === "en"
                                ? "border-soft-lavender bg-soft-lavender text-dark"
                                : "border-dark/20 text-dark/70 hover:border-soft-lavender hover:text-dark"
                            }`}
                          >
                            EN
                          </button>
                        </div>
                      </motion.nav>
                    ) : (
                      <motion.nav
                        key="services-nav"
                        ref={servicesMenuRef}
                        initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={
                          shouldReduceMotion
                            ? { duration: 0 }
                            : { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
                        }
                        className="flex flex-col p-6"
                      >
                        {/* Back Button */}
                        <button
                          type="button"
                          onClick={closeServicesSubMenu}
                          className="mb-6 flex min-h-[48px] items-center gap-2 rounded-lg px-2 py-3 text-sm font-medium text-dark/70 transition hover:bg-gray-50 hover:text-dark focus:outline-none focus:ring-2 focus:ring-lilac/50 focus:ring-offset-2 -mx-2"
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M15 18l-6-6 6-6" />
                          </svg>
                          <span className="font-medium">
                            {language === "tr" ? "Geri" : "Back"}
                          </span>
                        </button>

                        <h2 className="mb-6 text-xl font-semibold text-dark">
                          {navItems.services}
                        </h2>

                        {/* Services List */}
                        <div className="flex flex-col gap-3">
                          {services[language].map((service) => {
                            const slug = serviceSlugs[language][service.id as keyof typeof serviceSlugs["tr"]];
                            return (
                              <Link
                                key={service.id}
                                href={`/services/${slug}`}
                                onClick={closeAllMenus}
                                className="flex min-h-[56px] items-center rounded-lg border border-gray-200 bg-white px-5 py-4 text-left transition hover:border-lilac hover:bg-lilac/5 focus:outline-none focus:ring-2 focus:ring-lilac/50 focus:ring-offset-2"
                              >
                                <span className="text-base font-medium text-dark">
                                  {service.title}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      </motion.nav>
                    )}
                  </AnimatePresence>
                </div>

                {/* Sticky CTA - Bottom */}
                <div className="sticky bottom-0 border-t border-gray-100 bg-white p-6">
                  <Link
                    href="/#contact"
                    onClick={closeAllMenus}
                    className="block w-full min-h-[48px] flex items-center justify-center rounded-full bg-lilac px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-lg transition hover:bg-soft-lavender hover:text-dark focus:outline-none focus:ring-2 focus:ring-lilac/50 focus:ring-offset-2"
                  >
                    {ctaText}
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
