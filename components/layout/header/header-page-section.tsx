"use client";

import { Separator } from "../../ui/separator";
import { HeaderNavUser } from "./header-nav-user";
import { usePageHeader } from "@/contexts/page-header-context";
import { SidebarTrigger } from "../../ui/sidebar";

export function PageHeader() {
  const { pageTitle, rightContent } = usePageHeader();

  return (
    <header className="flex h-16 bg-sidebar border-b border-sidebar-border shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium"> {pageTitle}</h1>
        <div className="ml-auto flex items-center gap-2">
          {rightContent}
          <HeaderNavUser />
        </div>
      </div>
    </header>
  );
}
