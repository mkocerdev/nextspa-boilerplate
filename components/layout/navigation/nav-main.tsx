"use client";

import { type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupContent,
} from "@/components/ui/sidebar";

export function NavMain({
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
    <SidebarGroup className="group-data-[collapsible=icon]:hidden mt-6 px-0">
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.i18nkey}>
              <Link href={item.url}>
                <SidebarMenuButton
                  tooltip={item.i18nkey}
                  isActive={pathname === item.url}
                >
                  {item.url && <item.icon />}
                  <span className="text-sm">{t(item.i18nkey)}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
