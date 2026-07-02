import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CircularRing } from "./circular-ring"
import { claims, inventoryFreshness } from "../data"

const totalClaims = claims.reduce((sum, item) => sum + item.count, 0)

export function QualityInventory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>품질·재고</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-3">
          <p className="self-start text-xs text-muted-foreground">재고 선도</p>
          <CircularRing
            segments={inventoryFreshness.map((item) => ({ value: item.value, color: item.color }))}
            max={100}
            size={140}
            strokeWidth={16}
          />
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            {inventoryFreshness.map((item) => (
              <div key={item.label} className="flex items-center gap-1.5 text-xs">
                <span className="size-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs text-muted-foreground">클레임</p>
            <div className="text-right">
              <span className="text-xl font-bold text-red-500 tabular-nums">{totalClaims}</span>
              <p className="text-[11px] text-muted-foreground">당일 건수</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {claims.map((claim) => (
              <div key={claim.label} className="flex items-center gap-2">
                <span className="w-14 shrink-0 text-xs text-muted-foreground">{claim.label}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-red-500"
                    style={{ width: `${(claim.count / claim.max) * 100}%` }}
                  />
                </div>
                <span className="w-4 shrink-0 text-right text-xs font-medium tabular-nums">
                  {claim.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
