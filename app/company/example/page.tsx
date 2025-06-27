"use client";

import ApiClient from "@/lib/api";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Device, columns } from "@/app/company/example/containers/columns";
import { DataTable } from "@/components/custom/enhanced-data-table";
import { Button } from "@/components/ui/button";
import { RolesEnum } from "@/types/enums";
import Link from "next/link";
import { usePageHeader } from "@/contexts/page-header-context";
import { Download, Filter } from "lucide-react";

export default function Calendar() {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<Device[] | null>(null);
  const { setPageTitle } = usePageHeader();

  useEffect(() => {
    setPageTitle(t("devices.title"));
  }, [setPageTitle, t]);

  useEffect(() => {
    async function fetchPosts() {
      const res = await ApiClient.get(
        `/User/getFirmUsersByRole/${RolesEnum.Student}`
      );
      setPosts(res.data.data);
    }
    fetchPosts();
  }, []);

  if (!posts) return <div>{t("common.loading")}</div>;

  return (
    <div>
      <DataTable
        columns={columns}
        data={posts}
        searchColumn="fullname"
        searchPlaceholder={t("devices.searchPlaceholder")}
        actions={
          <>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              {t("common.filter")}
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button asChild>
              <Link href="/company/devices/create">
                {t("devices.newDevice")}
              </Link>
            </Button>
          </>
        }
      />
    </div>
  );
}
