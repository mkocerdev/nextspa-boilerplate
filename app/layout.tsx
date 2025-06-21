"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme/theme-provider";
import "@/styles/globals.css";
import { useLanguagePersistence } from "@/hooks/use-language-persistence";

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
    </ThemeProvider>
  );
}

// Server component
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <title>Nubisense Platform</title>
        <meta name="description" content="Nubisense Platform" />
        <link rel="icon" href="/assets/nebisense-icon.png" type="image/png" />
      </head>
      <body suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
