"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { getGenderLabel } from "@/types/enums";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Device = {
  id: string;
  fullname: string;
  phoneNumber: number;
  email: string;
  gender: number;
};

const GenderCell = ({ gender }: { gender: number }) => {
  const { t } = useTranslation();
  return <div className="capitalize">{t(getGenderLabel(gender))}</div>;
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
      <HeaderCell translationKey="devices.table.headers.fullName" />
    ),
  },
  {
    accessorKey: "phoneNumber",
    header: () => (
      <HeaderCell translationKey="devices.table.headers.phoneNumber" />
    ),
  },
  {
    accessorKey: "email",
    header: () => <HeaderCell translationKey="devices.table.headers.email" />,
  },
  {
    accessorKey: "gender",
    header: () => <HeaderCell translationKey="devices.table.headers.gender" />,
    cell: ({ row }) => {
      const gender = row.original.gender;
      return <GenderCell gender={gender} />;
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
