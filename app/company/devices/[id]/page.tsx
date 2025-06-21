"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
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
import { Device } from "@/app/company/devices/containers/columns";
import { usePageHeader } from "@/contexts/page-header-context";
import { useTranslation } from "react-i18next";

export default function DeviceDetail() {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useParams();
  const { setPageTitle } = usePageHeader();
  const [device, setDevice] = useState<Device | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phoneNumber: "",
    email: "",
    birthDate: "",
    gender: "0",
    oldPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    async function fetchDevice() {
      try {
        const res = await ApiClient.get(`/User/${params.id}`);
        const deviceData = res.data.data;
        setDevice(deviceData);
        setFormData({
          name: deviceData.name || "",
          surname: deviceData.surname || "",
          phoneNumber: deviceData.phoneNumber || "",
          email: deviceData.email || "",
          birthDate: deviceData.birthDate
            ? deviceData.birthDate.split("T")[0]
            : "",
          gender: deviceData.gender?.toString() || "0",
          oldPassword: "",
          newPassword: "",
        });
      } catch (error) {
        console.error("Error fetching device:", error);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchDevice();
    }
  }, [params.id]);

  useEffect(() => {
    setPageTitle(t("devices.editDevice"));
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
      const updateData = {
        name: formData.name,
        surname: formData.surname,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        birthDate: formData.birthDate,
        gender: parseInt(formData.gender),
        ...(formData.oldPassword &&
          formData.newPassword && {
            oldPassword: formData.oldPassword,
            newPassword: formData.newPassword,
          }),
      };

      await ApiClient.put(`/User`, updateData);
      router.push("/company/devices");
    } catch (error) {
      console.error("Error updating device:", error);
      alert("Error updating device. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Bu cihazı silmek istediğinizden emin misiniz?")) {
      try {
        await ApiClient.delete(`/User/${params.id}`);
        router.push("/company/devices");
      } catch (error) {
        console.error("Error deleting device:", error);
        alert("Error deleting device. Please try again.");
      }
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!device) {
    return <div className="p-4">Device not found</div>;
  }

  return (
    <div>
      <div className="">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Cihaz Bilgilerini Düzenle</CardTitle>
            <CardDescription>Cihaz bilgilerini güncelleyin</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Ad</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="surname">Soyad</Label>
                  <Input
                    id="surname"
                    name="surname"
                    value={formData.surname}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Telefon</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthDate">Doğum Tarihi</Label>
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
                <Label htmlFor="gender">Cinsiyet</Label>
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

              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-4">
                  Şifre Değiştir (İsteğe Bağlı)
                </h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="oldPassword">Mevcut Şifre</Label>
                    <Input
                      id="oldPassword"
                      name="oldPassword"
                      type="password"
                      value={formData.oldPassword}
                      onChange={handleInputChange}
                      placeholder="Mevcut şifrenizi girin"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Yeni Şifre</Label>
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      placeholder="Yeni şifrenizi girin"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <div className="space-x-2">
                  <Button type="submit" disabled={saving}>
                    {saving ? "Kaydediliyor..." : "Kaydet"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/company/devices")}
                  >
                    İptal
                  </Button>
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                >
                  Sil
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
