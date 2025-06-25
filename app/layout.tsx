"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";
import { useLanguagePersistence } from "@/hooks/use-language-persistence";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Client component wrapper
function ClientLayout({ children }: { children: ReactNode }) {
  // Initialize language persistence
  useLanguagePersistence();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <Toaster position="top-right" richColors />
    </ThemeProvider>
  );
}

// Server component
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning className={inter.variable}>
      <head>
        <title>Nubisense Platform</title>
        <meta name="description" content="Nubisense Platform" />
        <link rel="icon" href="/assets/nebisense-icon.png" type="image/png" />
      </head>
      <body suppressHydrationWarning className="font-inter">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
