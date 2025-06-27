"use client";

import { useEffect, useState } from "react";
import { usePageHeader } from "@/contexts/page-header-context";
import { useTranslation } from "react-i18next";
import { DeviceMetrics } from "@/app/company/dashboard/components/device-metrics";
import { DeviceCharts } from "@/app/company/dashboard/components/device-charts";
import { DeviceTable } from "@/app/company/dashboard/components/device-table";
import { OverviewStats } from "@/app/company/dashboard/components/overview-stats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authClient } from "@/lib/auth-client";
import i18n from "@/i18n/config";

interface DeviceData {
  id: number;
  deviceName: string;
  pressure: number;
  inHeat: number;
  outHeat: number;
  status: string;
  timestamp: string;
}

export default function DashboardPage() {
  const { t } = useTranslation();
  const { setPageTitle } = usePageHeader();
  const [allDeviceData, setAllDeviceData] = useState<DeviceData[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string>("Device A");
  const [deviceData, setDeviceData] = useState<DeviceData[]>([]);
  const [averages, setAverages] = useState({
    pressureOne: 0,
    pressureTwo: 0,
    inHeat: 0,
    outHeat: 0,
  });
  const authData = authClient.getAuthData();
  const user = authData?.user;

  // Sample data for overview statistics
  const overviewStats = {
    deviceCount: 12,
    listenerCount: 8,
    flowCount: 15,
    organizationCount: 3,
  };

  // Calculate time of day
  const getTimeOfDayKey = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "morning";
    if (hour >= 12 && hour < 18) return "afternoon";
    if (hour >= 18 && hour < 22) return "evening";
    return "night"; // 22:00 - 04:59
  };

  const timeOfDayKey = getTimeOfDayKey();

  // Get unique device names
  const deviceNames = [
    ...new Set(allDeviceData.map((device) => device.deviceName)),
  ];

  // Filter data based on selected device
  useEffect(() => {
    const filteredData = allDeviceData.filter(
      (device) => device.deviceName === selectedDevice
    );
    setDeviceData(filteredData);

    // Calculate averages for selected device
    if (filteredData.length > 0) {
      const avgPressureOne =
        filteredData.reduce((sum, device) => sum + device.pressure, 0) /
        filteredData.length;
      const avgPressureTwo = avgPressureOne * 0.8; // Example: secondary pressure as 80% of primary
      const avgInHeat =
        filteredData.reduce((sum, device) => sum + device.inHeat, 0) /
        filteredData.length;
      const avgOutHeat =
        filteredData.reduce((sum, device) => sum + device.outHeat, 0) /
        filteredData.length;

      setAverages({
        pressureOne: avgPressureOne,
        pressureTwo: avgPressureTwo,
        inHeat: avgInHeat,
        outHeat: avgOutHeat,
      });
    }
  }, [allDeviceData, selectedDevice]);

  useEffect(() => {
    setPageTitle(t("dashboard.title"));

    // Load device data
    const loadDeviceData = async () => {
      try {
        const response = await fetch("/data/device-data.json");
        const data = await response.json();
        setAllDeviceData(data);
      } catch (error) {
        console.error("Error loading device data:", error);
        // Fallback to sample data
        const sampleData = [
          {
            id: 1,
            deviceName: "Device A",
            pressure: 2.4,
            inHeat: 75.2,
            outHeat: 68.9,
            status: "active",
            timestamp: "2024-01-15T10:30:00Z",
          },
          {
            id: 2,
            deviceName: "Device B",
            pressure: 1.8,
            inHeat: 82.1,
            outHeat: 74.3,
            status: "active",
            timestamp: "2024-01-15T10:30:00Z",
          },
          {
            id: 3,
            deviceName: "Device C",
            pressure: 3.1,
            inHeat: 69.8,
            outHeat: 62.5,
            status: "maintenance",
            timestamp: "2024-01-15T10:30:00Z",
          },
        ];
        setAllDeviceData(sampleData);
      }
    };

    loadDeviceData();
  }, [setPageTitle, t]);

  return (
    <div className=" space-y-6">
      <div className="flex justify-between items-start">
        <div className="">
          <h1 className="text-lg font-semibold">
            {t("dashboard.welcome", {
              timeOfDay: t(`dashboard.timeOfDay.${timeOfDayKey}`),
              name: user?.fullname || user?.name || "User",
            })}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t("dashboard.today")}{" "}
            {new Date().toLocaleDateString(i18n.language, {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Overview Statistics */}
      <OverviewStats
        deviceCount={overviewStats.deviceCount}
        listenerCount={overviewStats.listenerCount}
        flowCount={overviewStats.flowCount}
        organizationCount={overviewStats.organizationCount}
      />
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">
          {t("dashboard.deviceDashboard", { deviceName: selectedDevice })}
        </h1>
        {/* Device Selector */}
        <div className="flex items-center space-x-2">
          <Select value={selectedDevice} onValueChange={setSelectedDevice}>
            <SelectTrigger>
              <strong className="text-sm font-medium mr-2">
                {t("dashboard.selectDevice")}:
              </strong>
              <SelectValue
                placeholder={t("dashboard.selectDevice")}
                className="text-sm font-medium"
              />
            </SelectTrigger>
            <SelectContent>
              {deviceNames.map((deviceName) => (
                <SelectItem key={deviceName} value={deviceName}>
                  {deviceName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* Device Metrics Cards */}
      <DeviceMetrics
        pressureOne={averages.pressureOne}
        pressureTwo={averages.pressureTwo}
        inHeat={averages.inHeat}
        outHeat={averages.outHeat}
      />

      {/* Charts */}
      <DeviceCharts data={deviceData} />

      {/* Device Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {t("dashboard.table.deviceDetails")} - {selectedDevice}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DeviceTable data={deviceData} />
        </CardContent>
      </Card>
    </div>
  );
}
