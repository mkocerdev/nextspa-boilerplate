"use client";

import { HeaderNavUser } from "./header-nav-user";
import { usePageHeader } from "@/contexts/page-header-context";

export function PageHeader() {
  const { pageTitle, rightContent } = usePageHeader();

  return (
    <header className="header bg-sidebar border-b border-sidebar-border flex h-16 shrink-0 items-center justify-between px-6">
      <div className="flex items-center gap-2 font-bold text-xl">
        {pageTitle}
      </div>
      <div className="flex items-center gap-2">
        {rightContent}
        <HeaderNavUser />
      </div>
    </header>
  );
}
