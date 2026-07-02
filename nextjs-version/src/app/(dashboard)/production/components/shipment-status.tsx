import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CircularRing } from "./circular-ring"
import { shipmentStatus } from "../data"

const legend = [
  { label: "마감", color: "#3b82f6" },
  { label: "상차", color: "#8b5cf6" },
  { label: "잔여", color: "#22c55e" },
] as const

export function ShipmentStatus() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>출고 현황 — 시장별 품목 대조</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 @4xl:grid-cols-6">
          {shipmentStatus.map((market) => {
            const total = market.마감 + market.상차 + market.잔여
            return (
              <div key={market.name} className="flex flex-col items-center gap-2 rounded-lg border p-3">
                <CircularRing
                  segments={[
                    { value: market.마감, color: legend[0].color },
                    { value: market.상차, color: legend[1].color },
                    { value: market.잔여, color: legend[2].color },
                  ]}
                  max={total}
                  size={56}
                  strokeWidth={7}
                >
                  <span className="text-xs font-semibold">{market.name}</span>
                </CircularRing>
                <div className="flex flex-col items-center gap-0.5 text-[11px]">
                  <span className="text-muted-foreground">
                    마감 <span className="font-medium text-foreground">{market.마감}</span>
                  </span>
                  <span className="text-muted-foreground">
                    상차 <span className="font-medium text-foreground">{market.상차}</span>
                  </span>
                  <span className="text-muted-foreground">
                    잔여 <span className="font-medium text-foreground">{market.잔여}</span>
                  </span>
                </div>
              </div>
            )
          })}
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1 border-t pt-3">
          {legend.map((item) => (
            <div key={item.label} className="flex items-center gap-1.5 text-xs">
              <span className="size-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
