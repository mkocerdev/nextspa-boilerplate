"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ApiClient from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RolesEnum } from "@/types/enums";
import { usePageHeader } from "@/contexts/page-header-context";
import { useTranslation } from "react-i18next";

export default function CreateStudent() {
  const { t } = useTranslation();
  const router = useRouter();
  const { setPageTitle } = usePageHeader();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phoneNumber: "",
    email: "",
    newPassword: "",
    birthDate: "",
    gender: "0",
  });

  useEffect(() => {
    setPageTitle(t("students.newStudent"));
  }, [setPageTitle, t]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const createData = {
        ...formData,
        gender: parseInt(formData.gender),
        roleId: RolesEnum.Student,
      };

      await ApiClient.post("/User", createData);
      router.push("/company/students");
    } catch (error) {
      console.error("Error creating student:", error);
      alert("Error creating student. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Yeni Öğrenci Ekle</CardTitle>
            <CardDescription>Yeni bir öğrenci oluşturun</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Ad *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Öğrenci adı"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="surname">Soyad *</Label>
                  <Input
                    id="surname"
                    name="surname"
                    value={formData.surname}
                    onChange={handleInputChange}
                    required
                    placeholder="Öğrenci soyadı"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="ornek@email.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Telefon *</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                  placeholder="5551234567"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthDate">Doğum Tarihi *</Label>
                <Input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Cinsiyet *</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => handleSelectChange("gender", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Cinsiyet seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Kadın</SelectItem>
                    <SelectItem value="1">Erkek</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">Şifre *</Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  required
                  placeholder="Güvenli şifre"
                />
              </div>

              <div className="flex space-x-2 pt-4">
                <Button type="submit" disabled={saving}>
                  {saving ? "Oluşturuluyor..." : "Öğrenci Oluştur"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/company/students")}
                >
                  İptal
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
