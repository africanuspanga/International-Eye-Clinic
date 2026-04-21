"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface TranslationContextType {
  isSwahili: boolean;
  toggle: () => void;
}

const TranslationContext = createContext<TranslationContextType>({
  isSwahili: false,
  toggle: () => {},
});

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [isSwahili, setIsSwahili] = useState(false);
  return (
    <TranslationContext.Provider value={{ isSwahili, toggle: () => setIsSwahili((v) => !v) }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  return useContext(TranslationContext);
}
