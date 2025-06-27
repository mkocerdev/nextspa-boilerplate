"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MonitorSmartphone, Radio, GitBranch, Building2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface OverviewStatsProps {
  deviceCount: number;
  listenerCount: number;
  flowCount: number;
  organizationCount: number;
}

export function OverviewStats({
  deviceCount,
  listenerCount,
  flowCount,
  organizationCount,
}: OverviewStatsProps) {
  const { t } = useTranslation();

  return (
    <div className="grid md:grid-cols-4">
      <Card className="rounded-none border-none">
        <div className="border-r border-l-gray-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("dashboard.overview.organizations")}
            </CardTitle>
            <Building2 className="h-10 w-10 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{organizationCount}</div>
            <p className="text-xs text-muted-foreground">
              {t("dashboard.overview.totalOrganizations")}
            </p>
          </CardContent>
        </div>
      </Card>
      <Card className="rounded-none border-none">
        <div className="border-r border-l-gray-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("dashboard.overview.devices")}
            </CardTitle>
            <MonitorSmartphone className="h-10 w-10 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deviceCount}</div>
            <p className="text-xs text-muted-foreground">
              {t("dashboard.overview.totalDevices")}
            </p>
          </CardContent>
        </div>
      </Card>

      <Card className="rounded-none border-none">
        <div className="border-r border-l-gray-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("dashboard.overview.listeners")}
            </CardTitle>
            <Radio className="h-10 w-10 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{listenerCount}</div>
            <p className="text-xs text-muted-foreground">
              {t("dashboard.overview.activeListeners")}
            </p>
          </CardContent>
        </div>
      </Card>

      <Card className="rounded-none border-none">
        <div className="border-r border-l-gray-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("dashboard.overview.flows")}
            </CardTitle>
            <GitBranch className="h-10 w-10 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{flowCount}</div>
            <p className="text-xs text-muted-foreground">
              {t("dashboard.overview.activeFlows")}
            </p>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
