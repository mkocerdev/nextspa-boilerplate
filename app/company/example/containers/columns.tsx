"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

// This type is used to define the shape of our device data.
export type Device = {
  id: string;
  fullname: string; // Device name/model
  phoneNumber: number; // IMEI number
  email: string; // Device identifier
  gender: number; // Device status: 0=Inactive, 1=Active
};

const StatusCell = ({ status }: { status: number }) => {
  const { t } = useTranslation();
  const statusText =
    status === 1 ? "devices.status.active" : "devices.status.inactive";
  const statusClass = status === 1 ? "text-green-600" : "text-red-600";
  return <div className={`capitalize ${statusClass}`}>{t(statusText)}</div>;
};

const ActionCell = ({ id }: { id: string }) => {
  const { t } = useTranslation();
  return (
    <div className="flex ">
      <Button asChild>
        <a href={"/company/devices/" + id}>{t("devices.table.edit")}</a>
      </Button>
      <Button variant="destructive" className="ml-2">
        {t("devices.table.delete")}
      </Button>
    </div>
  );
};

const HeaderCell = ({ translationKey }: { translationKey: string }) => {
  const { t } = useTranslation();
  return <span>{t(translationKey)}</span>;
};

export const columns: ColumnDef<Device>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "fullname",
    header: () => (
      <HeaderCell translationKey="devices.table.headers.deviceName" />
    ),
  },
  {
    accessorKey: "phoneNumber",
    header: () => <HeaderCell translationKey="devices.table.headers.imei" />,
  },
  {
    accessorKey: "email",
    header: () => (
      <HeaderCell translationKey="devices.table.headers.deviceId" />
    ),
  },
  {
    accessorKey: "gender",
    header: () => <HeaderCell translationKey="devices.table.headers.status" />,
    cell: ({ row }) => {
      const status = row.original.gender;
      return <StatusCell status={status} />;
    },
  },
  {
    id: "actions",
    header: () => <HeaderCell translationKey="devices.table.headers.actions" />,
    cell: ({ row }) => {
      const id = row.original.id;
      return <ActionCell id={id} />;
    },
  },
];
