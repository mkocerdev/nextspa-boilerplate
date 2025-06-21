"use client";

import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Calendar() {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <header className="flex shrink-0 items-center gap-2">
        <div className="p-4">
          <h1 className="text-2xl font-extrabold tracking-tight ">
            {t("settings.title")}
          </h1>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <Select value={i18n.language} onValueChange={i18n.changeLanguage}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Dili Seçin</SelectLabel>
              <SelectItem value="tr">Türkçe</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
