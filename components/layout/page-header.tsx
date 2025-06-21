"use client";

import { HeaderNavUser } from "./header-nav-user";
import { usePageHeader } from "@/contexts/page-header-context";

export function PageHeader() {
  const { pageTitle, rightContent } = usePageHeader();

  return (
    <header className="flex h-16 shrink-0 items-center justify-between">
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
