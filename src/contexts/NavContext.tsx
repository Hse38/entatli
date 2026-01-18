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
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    setIsServicesSubMenuOpen(false);
    document.body.style.overflow = "unset";
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
