import { ProductionHeader } from "./components/production-header"
import { StatCards } from "./components/stat-cards"
import { CultivationStatus } from "./components/cultivation-status"
import { ProductionPlan } from "./components/production-plan"
import { SalesOrders } from "./components/sales-orders"
import { QualityInventory } from "./components/quality-inventory"
import { ProcessingProduction } from "./components/processing-production"
import { ShipmentStatus } from "./components/shipment-status"

export default function ProductionDashboard() {
  return (
    <div className="flex-1 space-y-6 px-4 pt-0 lg:px-6">
      <ProductionHeader />

      <div className="@container/main space-y-6">
        <StatCards />

        <div className="grid grid-cols-1 gap-6 @5xl:grid-cols-4">
          <CultivationStatus />
          <ProductionPlan />
          <div className="@5xl:col-span-2">
            <SalesOrders />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 @5xl:grid-cols-4">
          <QualityInventory />
          <ProcessingProduction />
          <div className="@5xl:col-span-2">
            <ShipmentStatus />
          </div>
        </div>
      </div>
    </div>
  )
}
