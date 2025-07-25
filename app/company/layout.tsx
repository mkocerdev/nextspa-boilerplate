"use client"; // Tüm component'ler client-side'da çalışacak

import { ReactNode } from "react";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/navigation/app-sidebar";
import { PageHeader } from "@/components/layout/header/header-page-section";
import { PageHeaderProvider } from "@/contexts/page-header-context";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="">
            <PageHeaderProvider>
              <PageHeader />
              <div className="px-8 py-5">{children}</div>
            </PageHeaderProvider>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
