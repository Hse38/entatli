"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

type NavContextType = {
  isMobileMenuOpen: boolean;
  isServicesSubMenuOpen: boolean;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;
  openServicesSubMenu: () => void;
  closeServicesSubMenu: () => void;
  closeAllMenus: () => void;
};

const NavContext = createContext<NavContextType | undefined>(undefined);

export function NavProvider({ children }: { children: ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesSubMenuOpen, setIsServicesSubMenuOpen] = useState(false);

  const openMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(true);
    document.body.style.overflow = "hidden";
    // Add blur class to main content when menu is open
    const mainContent = document.querySelector("main");
    if (mainContent) {
      mainContent.style.filter = "blur(4px)";
      mainContent.style.transition = "filter 0.25s ease";
    }
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    setIsServicesSubMenuOpen(false);
    document.body.style.overflow = "unset";
    // Remove blur from main content when menu is closed
    const mainContent = document.querySelector("main");
    if (mainContent) {
      mainContent.style.filter = "none";
    }
  }, []);

  const toggleMobileMenu = useCallback(() => {
    if (isMobileMenuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }, [isMobileMenuOpen, openMobileMenu, closeMobileMenu]);

  const openServicesSubMenu = useCallback(() => {
    setIsServicesSubMenuOpen(true);
  }, []);

  const closeServicesSubMenu = useCallback(() => {
    setIsServicesSubMenuOpen(false);
  }, []);

  const closeAllMenus = useCallback(() => {
    closeMobileMenu();
  }, [closeMobileMenu]);

  return (
    <NavContext.Provider
      value={{
        isMobileMenuOpen,
        isServicesSubMenuOpen,
        openMobileMenu,
        closeMobileMenu,
        toggleMobileMenu,
        openServicesSubMenu,
        closeServicesSubMenu,
        closeAllMenus,
      }}
    >
      {children}
    </NavContext.Provider>
  );
}

export function useNav() {
  const context = useContext(NavContext);
  if (context === undefined) {
    throw new Error("useNav must be used within a NavProvider");
  }
  return context;
}
