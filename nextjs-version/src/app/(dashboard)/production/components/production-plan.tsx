"use client"

import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts"
import { Card, CardAction, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { productionPlanData } from "../data"

const chartConfig = {
  가능량: {
    label: "가능량",
    color: "#d4d4d8",
  },
  발주량: {
    label: "발주량",
    color: "#3b82f6",
  },
}

const hasExceeded = productionPlanData.some((item) => item.exceeded)

export function ProductionPlan() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>생산 계획</CardTitle>
        {hasExceeded ? (
          <CardAction>
            <Badge variant="destructive">
              <span aria-hidden>⚠</span> 초과
            </Badge>
          </CardAction>
        ) : null}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <BarChart data={[...productionPlanData]} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" vertical={false} />
            <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="가능량" fill="var(--color-가능량)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="발주량" radius={[4, 4, 0, 0]}>
              {productionPlanData.map((entry) => (
                <Cell key={entry.category} fill={entry.exceeded ? "#ef4444" : "var(--color-발주량)"} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
