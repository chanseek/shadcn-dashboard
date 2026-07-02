import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CircularRing } from "./circular-ring"
import { processingProduction } from "../data"

const rowColors = ["#3b82f6", "#8b5cf6", "#22c55e"]

export function ProcessingProduction() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>가공·생산</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {processingProduction.map((row, index) => {
          const remaining = row.target - row.completed
          const percent = Math.round((row.completed / row.target) * 100)
          const color = rowColors[index % rowColors.length]

          return (
            <div key={row.label} className="flex items-center gap-4">
              <span className="w-14 shrink-0 text-sm font-medium">{row.label}</span>
              <CircularRing
                segments={[{ value: percent, color }]}
                max={100}
                size={72}
                strokeWidth={7}
              >
                <span className="text-sm font-bold tabular-nums" style={{ color }}>
                  {percent}%
                </span>
              </CircularRing>
              <div className="flex flex-1 flex-col gap-0.5">
                <span className="text-xs text-muted-foreground">
                  목표 <span className="font-medium text-foreground">{row.target}</span>
                </span>
                <span className="text-xs text-muted-foreground">
                  완료 <span className="font-medium text-foreground">{row.completed}</span>
                </span>
                <span className="text-xs text-muted-foreground">
                  잔여 <span className="font-medium text-foreground">{remaining}</span>
                </span>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
