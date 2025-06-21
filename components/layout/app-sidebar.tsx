"use client";

import * as React from "react";
import {
  LayoutPanelLeft,
  MonitorSmartphone,
  AudioWaveform,
  Workflow,
} from "lucide-react";
import { useTheme } from "next-themes";

import { NavItems } from "./nav-items";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";

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
      icon: AudioWaveform,
    },
    {
      i18nkey: "sidebar.flows",
      url: "/company/flows",
      icon: Workflow,
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
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="pr-12">
            <Image
              src={logoSrc}
              alt="logo"
              width={100}
              height={100}
              className="w-full h-auto"
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavItems projects={data.items} />
      </SidebarContent>
      <SidebarFooter>
        {/* User navigation moved to page header */}
      </SidebarFooter>
    </Sidebar>
  );
}
