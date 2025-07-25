"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Device, columns } from "@/app/company/example/containers/columns";
import { DataTable } from "@/components/custom/enhanced-data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePageHeader } from "@/contexts/page-header-context";
import { Download, Filter } from "lucide-react";

// Mock data for devices
const mockDevices: Device[] = [
  {
    id: "1",
    fullname: "iPhone 14 Pro",
    phoneNumber: 356938035643809, // IMEI number
    email: "DEV-001-IP14P",
    gender: 1, // 1=Active
  },
  {
    id: "2",
    fullname: "Samsung Galaxy S23",
    phoneNumber: 359123456789012, // IMEI number
    email: "DEV-002-SGS23",
    gender: 1, // 1=Active
  },
  {
    id: "3",
    fullname: "iPad Pro 12.9",
    phoneNumber: 356789123456789, // IMEI number
    email: "DEV-003-IP12P",
    gender: 0, // 0=Inactive
  },
  {
    id: "4",
    fullname: "MacBook Air M2",
    phoneNumber: 356345678901234, // IMEI number
    email: "DEV-004-MBA-M2",
    gender: 1, // 1=Active
  },
  {
    id: "5",
    fullname: "Dell Latitude 5520",
    phoneNumber: 356789123456789, // IMEI number
    email: "DEV-005-DL5520",
    gender: 1, // 1=Active
  },
  {
    id: "6",
    fullname: "HP EliteBook 840",
    phoneNumber: 356456789012345, // IMEI number
    email: "DEV-006-HPE840",
    gender: 0, // 0=Inactive
  },
  {
    id: "7",
    fullname: "Lenovo ThinkPad X1",
    phoneNumber: 356891234567890, // IMEI number
    email: "DEV-007-LTX1",
    gender: 1, // 1=Active
  },
  {
    id: "8",
    fullname: "Google Pixel 7",
    phoneNumber: 356567890123456, // IMEI number
    email: "DEV-008-GP7",
    gender: 1, // 1=Active
  },
];

export default function Calendar() {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<Device[] | null>(null);
  const { setPageTitle } = usePageHeader();

  useEffect(() => {
    setPageTitle(t("devices.title"));
  }, [setPageTitle, t]);

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setPosts(mockDevices);
    }, 500);

    return () => clearTimeout(timer);
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
