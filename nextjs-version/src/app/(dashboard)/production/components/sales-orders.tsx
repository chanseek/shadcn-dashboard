"use client"

import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CircularRing } from "./circular-ring"
import {
  foodMaterialOrders,
  salesOrders,
  unorderedStoreCount,
  type MarketOrder,
  type MarketStatus,
} from "../data"

const statusColor: Record<MarketStatus, string> = {
  done: "#22c55e",
  partial: "#f59e0b",
  urgent: "#ef4444",
}

const statusRingValue: Record<MarketStatus, number> = {
  done: 100,
  partial: 60,
  urgent: 35,
}

function OrderGrid({ orders }: { orders: MarketOrder[] }) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 @3xl:grid-cols-6">
      {orders.map((order) => (
        <div
          key={order.name}
          className={`flex flex-col items-center gap-2 rounded-lg border p-3 ${
            order.status !== "done" ? "border-blue-500/50" : ""
          }`}
        >
          <CircularRing
            segments={[{ value: statusRingValue[order.status], color: statusColor[order.status] }]}
            max={100}
            size={56}
            strokeWidth={5}
          >
            <span className="text-xs font-semibold" style={{ color: statusColor[order.status] }}>
              {order.name}
            </span>
          </CircularRing>
          <span className="text-lg font-bold tabular-nums">{order.count}</span>
        </div>
      ))}
    </div>
  )
}

export function SalesOrders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>영업 발주 현황</CardTitle>
        <CardAction>
          <span className="text-xs text-muted-foreground">
            미발주 <span className="font-semibold text-red-500">{unorderedStoreCount}</span>개
          </span>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="agri">
          <TabsList>
            <TabsTrigger value="agri">농산 발주</TabsTrigger>
            <TabsTrigger value="food">식자재 발주</TabsTrigger>
          </TabsList>
          <TabsContent value="agri">
            <OrderGrid orders={salesOrders} />
          </TabsContent>
          <TabsContent value="food">
            <OrderGrid orders={foodMaterialOrders} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
