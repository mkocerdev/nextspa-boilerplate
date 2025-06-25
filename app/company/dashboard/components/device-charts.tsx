"use client";

import { useTranslation } from "react-i18next";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Bar,
  BarChart,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface DeviceData {
  id: number;
  deviceName: string;
  pressure: number;
  inHeat: number;
  outHeat: number;
  status: string;
  timestamp: string;
}

interface DeviceChartsProps {
  data: DeviceData[];
}

export function DeviceCharts({ data }: DeviceChartsProps) {
  const { t } = useTranslation();

  // Prepare chart data with formatted time
  const chartData = data
    .sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    )
    .map((device) => {
      const date = new Date(device.timestamp);
      return {
        time: date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        inHeat: device.inHeat,
        outHeat: device.outHeat,
        pressureOne: device.pressure,
        pressureTwo: device.pressure * 0.8, // Example: secondary pressure as 80% of primary
      };
    });

  // Temperature chart config
  const temperatureChartConfig = {
    inHeat: {
      label: `${t("dashboard.metrics.inHeat")} (°C)`,
      color: "hsl(var(--chart-1))",
    },
    outHeat: {
      label: `${t("dashboard.metrics.outHeat")} (°C)`,
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  // Pressure chart config
  const pressureChartConfig = {
    pressureOne: {
      label: `${t("dashboard.metrics.pressureOne")} (bar)`,
      color: "hsl(var(--chart-3))",
    },
    pressureTwo: {
      label: `${t("dashboard.metrics.pressureTwo")} (bar)`,
      color: "hsl(var(--chart-4))",
    },
  } satisfies ChartConfig;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Temperature Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle>{t("dashboard.charts.temperatureComparison")}</CardTitle>
          <CardDescription>
            {t("dashboard.metrics.inHeat")} vs {t("dashboard.metrics.outHeat")}{" "}
            over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={temperatureChartConfig}>
            <LineChart
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="time"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line
                dataKey="inHeat"
                type="monotone"
                stroke="var(--color-inHeat)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="outHeat"
                type="monotone"
                stroke="var(--color-outHeat)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Pressure Levels Chart */}
      <Card>
        <CardHeader>
          <CardTitle>{t("dashboard.charts.pressureLevels")}</CardTitle>
          <CardDescription>
            {t("dashboard.metrics.pressureOne")} vs{" "}
            {t("dashboard.metrics.pressureTwo")} over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={pressureChartConfig}>
            <BarChart
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="time"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar
                dataKey="pressureOne"
                fill="var(--color-pressureOne)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="pressureTwo"
                fill="var(--color-pressureTwo)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
