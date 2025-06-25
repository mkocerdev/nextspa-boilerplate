"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { useTranslation } from "react-i18next";

interface DeviceData {
  id: number;
  deviceName: string;
  pressure: number;
  inHeat: number;
  outHeat: number;
  status: string;
  timestamp: string;
}

export function DeviceTable({ data }: { data: DeviceData[] }) {
  const { t } = useTranslation();

  const columns: ColumnDef<DeviceData>[] = [
    {
      accessorKey: "deviceName",
      header: t("dashboard.table.deviceName"),
    },
    {
      accessorKey: "pressure",
      header: t("dashboard.table.pressure"),
      cell: ({ row }) => {
        const pressure = parseFloat(row.getValue("pressure"));
        return <div className="font-medium">{pressure.toFixed(1)}</div>;
      },
    },
    {
      accessorKey: "inHeat",
      header: t("dashboard.table.inHeat"),
      cell: ({ row }) => {
        const inHeat = parseFloat(row.getValue("inHeat"));
        return <div className="font-medium">{inHeat.toFixed(1)}</div>;
      },
    },
    {
      accessorKey: "outHeat",
      header: t("dashboard.table.outHeat"),
      cell: ({ row }) => {
        const outHeat = parseFloat(row.getValue("outHeat"));
        return <div className="font-medium">{outHeat.toFixed(1)}</div>;
      },
    },
    {
      accessorKey: "status",
      header: t("dashboard.table.status"),
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge variant={status === "active" ? "default" : "secondary"}>
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "timestamp",
      header: t("dashboard.table.timestamp"),
      cell: ({ row }) => {
        const date = new Date(row.getValue("timestamp"));
        return <div>{date.toLocaleString()}</div>;
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      searchPlaceholder={t("dashboard.table.searchPlaceholder")}
      searchColumn="deviceName"
    />
  );
}
