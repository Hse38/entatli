"use client";

import { motion, AnimatePresence } from "framer-motion";
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
    closeMobileMenu,
    openServicesSubMenu,
    closeServicesSubMenu,
    closeAllMenus,
  } = useNav();

  const menuRef = useRef<HTMLDivElement>(null);
  const servicesMenuRef = useRef<HTMLDivElement>(null);

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
            closeServicesSubMenu();
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
          className={`block h-0.5 w-6 transition-colors ${
            buttonColor === "white" ? "bg-white" : "bg-dark"
          }`}
        />
        <motion.span
          animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
          className={`block h-0.5 w-6 transition-colors ${
            buttonColor === "white" ? "bg-white" : "bg-dark"
          }`}
        />
        <motion.span
          animate={
            isMobileMenuOpen
              ? { rotate: -45, y: -8 }
              : { rotate: 0, y: 0 }
          }
          className={`block h-0.5 w-6 transition-colors ${
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
              onClick={closeAllMenus}
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
            />

            {/* Main Menu */}
            <motion.div
              ref={menuRef}
              id="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 z-50 h-full w-[90%] max-w-sm bg-white shadow-2xl md:hidden"
            >
              <div className="flex h-full flex-col">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
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
                      className="h-10 w-auto object-contain"
                      priority
                    />
                  </Link>
                  <button
                    type="button"
                    onClick={closeAllMenus}
                    className="p-2 text-dark/70 transition hover:text-dark"
                    aria-label={language === "tr" ? "Menüyü kapat" : "Close menu"}
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
                </div>

                {/* Navigation Content */}
                <div className="flex-1 overflow-y-auto">
                  <AnimatePresence mode="wait">
                    {!isServicesSubMenuOpen ? (
                      <motion.nav
                        key="main-nav"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex flex-col p-6"
                      >
                        <Link
                          href="/"
                          onClick={closeAllMenus}
                          className="py-4 text-lg font-semibold text-dark transition hover:text-lilac"
                        >
                          {language === "tr" ? "Ana Sayfa" : "Home"}
                        </Link>

                        <button
                          type="button"
                          onClick={openServicesSubMenu}
                          className="flex items-center justify-between py-4 text-left text-lg font-semibold text-dark transition hover:text-lilac"
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
                          >
                            <path d="M9 18l6-6-6-6" />
                          </svg>
                        </button>

                        <Link
                          href="/#why-us"
                          onClick={closeAllMenus}
                          className="py-4 text-lg font-semibold text-dark transition hover:text-lilac"
                        >
                          {navItems.whyUs}
                        </Link>

                        <Link
                          href="/#proof"
                          onClick={closeAllMenus}
                          className="py-4 text-lg font-semibold text-dark transition hover:text-lilac"
                        >
                          {navItems.proof}
                        </Link>

                        <Link
                          href="/#contact"
                          onClick={closeAllMenus}
                          className="py-4 text-lg font-semibold text-dark transition hover:text-lilac"
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
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex flex-col p-6"
                      >
                        {/* Back Button */}
                        <button
                          type="button"
                          onClick={closeServicesSubMenu}
                          className="mb-4 flex items-center gap-2 py-2 text-dark/70 transition hover:text-dark"
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
                          <span className="text-sm font-semibold uppercase tracking-[0.1em]">
                            {language === "tr" ? "Geri" : "Back"}
                          </span>
                        </button>

                        <h2 className="mb-4 text-xl font-semibold text-dark">
                          {navItems.services}
                        </h2>

                        {/* Services List */}
                        <div className="flex flex-col gap-2">
                          {services[language].map((service) => {
                            const slug = serviceSlugs[language][service.id as keyof typeof serviceSlugs["tr"]];
                            return (
                              <Link
                                key={service.id}
                                href={`/services/${slug}`}
                                onClick={closeAllMenus}
                                className="rounded-lg border border-gray-200 bg-white px-4 py-4 text-left transition hover:border-lilac hover:bg-lilac/5"
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

                {/* Sticky CTA */}
                <div className="border-t border-gray-200 bg-white p-6">
                  <Link
                    href="/#contact"
                    onClick={closeAllMenus}
                    className="block w-full rounded-full bg-lilac px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-soft-lavender hover:text-dark"
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
