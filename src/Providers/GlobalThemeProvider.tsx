'use client'

import { ThemeProvider } from 'next-themes'


type GlobalContextProviderProps = {
  children: React.ReactNode;
};


export function GlobalThemeProvider({
  children,
}: GlobalContextProviderProps) {

  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}