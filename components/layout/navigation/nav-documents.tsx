"use client";

import { type LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavDocuments({
  items,
}: {
  items: {
    i18nkey: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  const { t } = useTranslation();
  const pathname = usePathname();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>{t("sidebar.documents")}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.i18nkey}>
            <SidebarMenuButton asChild isActive={pathname.startsWith(item.url)}>
              <Link href={item.url}>
                <item.icon />
                <span>{t(item.i18nkey)}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
