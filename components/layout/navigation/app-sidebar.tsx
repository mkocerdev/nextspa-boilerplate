"use client";

import * as React from "react";
import Link from "next/link";
import {
  LayoutPanelLeft,
  MonitorSmartphone,
  Radio,
  GitBranch,
  FileChartColumn,
  Users,
  Book,
  LifeBuoy,
  Blocks,
} from "lucide-react";
import { useTheme } from "next-themes";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";

import { NavMain } from "./nav-main";
import { NavDocuments } from "./nav-documents";
import { NavSecondary } from "./nav-secondary";

const data = {
  items: [
    {
      i18nkey: "sidebar.dashboard",
      url: "/company/dashboard",
      icon: LayoutPanelLeft,
    },
    {
      i18nkey: "sidebar.devices",
      url: "/company/devices",
      icon: MonitorSmartphone,
    },
    {
      i18nkey: "sidebar.listeners",
      url: "/company/listeners",
      icon: Radio,
    },
    {
      i18nkey: "sidebar.flows",
      url: "/company/flows",
      icon: GitBranch,
    },
  ],
  documents: [
    {
      i18nkey: "sidebar.reports",
      url: "/company/reports",
      icon: FileChartColumn,
    },
    {
      i18nkey: "sidebar.userGuide",
      url: "/company/user-guide",
      icon: Book,
    },
    {
      i18nkey: "sidebar.integrations",
      url: "/company/integrations",
      icon: Blocks,
    },
  ],
  secondary: [
    {
      i18nkey: "sidebar.users",
      url: "/company/users",
      icon: Users,
    },
    {
      i18nkey: "sidebar.support",
      url: "/company/support",
      icon: LifeBuoy,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { theme } = useTheme();

  // Determine which logo to use based on theme
  const logoSrc =
    theme === "dark"
      ? "/assets/nebisense-logo-dark.png"
      : "/assets/nebisense-logo.png";

  return (
    <Sidebar
      variant="inset"
      {...props}
      collapsible="offcanvas"
      className="p-0 border-r border-sidebar-border"
    >
      <SidebarHeader className="border-b border-sidebar-border px-4 py-5">
        <SidebarMenu>
          <SidebarMenuItem className="pr-12">
            <Link href={"/company/dashboard"}>
              <Image
                src={logoSrc}
                alt="logo"
                width={100}
                height={100}
                className="w-full h-auto"
              />
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="px-4">
        <NavMain items={data.items} />
        <NavDocuments items={data.documents} />

        <NavSecondary items={data.secondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className="px-4">
        {/* User navigation moved to page header */}
      </SidebarFooter>
    </Sidebar>
  );
}
