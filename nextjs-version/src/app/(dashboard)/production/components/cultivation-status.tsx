"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { cultivationChartData, cultivationPeakIndex, growthProgress } from "../data"

const chartConfig = {
  살수온: {
    label: "살수온",
    color: "#3b82f6",
  },
  품온: {
    label: "품온",
    color: "#22c55e",
  },
}

function makePeakDot(color: string) {
  return function PeakDot({ cx, cy, index }: { cx?: number; cy?: number; index?: number }) {
    if (cx === undefined || cy === undefined) return null
    const isPeak = index !== undefined && cultivationPeakIndex.includes(index)
    return (
      <circle
        cx={cx}
        cy={cy}
        r={isPeak ? 4 : 2}
        fill={isPeak ? "#ef4444" : color}
        stroke="none"
      />
    )
  }
}

export function CultivationStatus() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>재배 현황</CardTitle>
        <p className="text-xs text-muted-foreground">살수온 / 품온 (24H)</p>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <ChartContainer config={chartConfig} className="h-[220px] w-full">
          <LineChart data={[...cultivationChartData]} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11 }}
              domain={[17, 27]}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="살수온"
              stroke="var(--color-살수온)"
              strokeWidth={2}
              dot={makePeakDot("#3b82f6")}
            />
            <Line
              type="monotone"
              dataKey="품온"
              stroke="var(--color-품온)"
              strokeWidth={2}
              dot={makePeakDot("#22c55e")}
            />
          </LineChart>
        </ChartContainer>

        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium text-muted-foreground">생육 진행률</p>
          {growthProgress.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span className="w-16 shrink-0 text-xs text-muted-foreground">{item.label}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: `${item.percent}%` }}
                />
              </div>
              <span className="w-9 shrink-0 text-right text-xs font-medium tabular-nums">
                {item.percent}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
