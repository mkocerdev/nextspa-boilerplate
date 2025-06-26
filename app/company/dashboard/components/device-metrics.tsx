"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gauge, CircleGauge, Thermometer, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

interface DeviceMetricsProps {
  pressureOne: number;
  pressureTwo: number;
  inHeat: number;
  outHeat: number;
}

export function DeviceMetrics({
  pressureOne,
  pressureTwo,
  inHeat,
  outHeat,
}: DeviceMetricsProps) {
  const { t } = useTranslation();

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {t("dashboard.metrics.pressureOne")}
          </CardTitle>
          <Gauge className="h-10 w-10 text-chart-1" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pressureOne.toFixed(1)} bar</div>
          <p className="text-xs text-muted-foreground">
            {t("dashboard.metrics.currentSystemPressure")}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {t("dashboard.metrics.pressureTwo")}
          </CardTitle>
          <CircleGauge className="h-10 w-10 text-chart-1" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pressureTwo.toFixed(1)} bar</div>
          <p className="text-xs text-muted-foreground">
            {t("dashboard.metrics.secondarySystemPressure")}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {t("dashboard.metrics.inHeat")}
          </CardTitle>
          <Thermometer className="h-10 w-10 text-chart-1" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{inHeat.toFixed(1)}°C</div>
          <p className="text-xs text-muted-foreground">
            {t("dashboard.metrics.inputTemperature")}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {t("dashboard.metrics.outHeat")}
          </CardTitle>
          <Zap className="h-10 w-10 text-chart-1" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{outHeat.toFixed(1)}°C</div>
          <p className="text-xs text-muted-foreground">
            {t("dashboard.metrics.outputTemperature")}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
