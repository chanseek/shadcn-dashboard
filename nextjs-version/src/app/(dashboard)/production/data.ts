export const statCards = [
  {
    title: "총 생산 가능량",
    value: "190",
    description: "당일 기준",
    footer: "1공장 80 + 2공장 110",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    title: "당일 총 주문량",
    value: "170",
    description: "실시간 발주",
    footer: "가용 잔여 20",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    title: "평균 품질 등급",
    value: "A+",
    description: "당일 샘플링",
    footer: "합격률 98.2%",
    gradient: "from-emerald-500 to-green-600",
  },
  {
    title: "미발주 매장 경고",
    value: "3",
    description: "개 매장 · 즉시 확인",
    footer: "마감까지 2h 15m",
    gradient: "from-rose-500 to-red-600",
  },
] as const

export const cultivationChartData = [
  { time: "00", 살수온: 18.1, 품온: 20.2 },
  { time: "02", 살수온: 20.4, 품온: 20.9 },
  { time: "04", 살수온: 17.8, 품온: 20.0 },
  { time: "06", 살수온: 18.3, 품온: 20.4 },
  { time: "08", 살수온: 19.4, 품온: 21.6 },
  { time: "10", 살수온: 20.5, 품온: 23.1 },
  { time: "12", 살수온: 20.9, 품온: 24.6 },
  { time: "14", 살수온: 21.4, 품온: 25.9 },
  { time: "16", 살수온: 21.8, 품온: 26.3 },
  { time: "18", 살수온: 21.5, 품온: 25.8 },
  { time: "20", 살수온: 20.2, 품온: 24.1 },
  { time: "22", 살수온: 19.0, 품온: 22.6 },
] as const

// index of the peak reading in cultivationChartData, highlighted with a red dot
export const cultivationPeakIndex = [8, 9]

export const growthProgress = [
  { label: "유묘기", percent: 100 },
  { label: "급속성장", percent: 100 },
  { label: "중간성장", percent: 78 },
] as const

export const productionPlanData = [
  { category: "일반", 가능량: 83, 발주량: 80, exceeded: false },
  { category: "굵은", 가능량: 65, 발주량: 75, exceeded: true },
  { category: "샤브용", 가능량: 38, 발주량: 33, exceeded: false },
] as const

export type MarketStatus = "done" | "partial" | "urgent"

export interface MarketOrder {
  name: string
  count: number
  status: MarketStatus
}

export const salesOrders: MarketOrder[] = [
  { name: "가락", count: 45, status: "done" },
  { name: "구리", count: 38, status: "done" },
  { name: "수원", count: 32, status: "done" },
  { name: "인천", count: 28, status: "partial" },
  { name: "부천", count: 22, status: "done" },
  { name: "안양", count: 18, status: "done" },
  { name: "성남", count: 25, status: "done" },
  { name: "용인", count: 30, status: "partial" },
  { name: "화성", count: 20, status: "done" },
  { name: "평택", count: 15, status: "urgent" },
  { name: "이천", count: 12, status: "done" },
  { name: "광주", count: 10, status: "done" },
]

export const foodMaterialOrders: MarketOrder[] = [
  { name: "가락", count: 12, status: "done" },
  { name: "구리", count: 9, status: "done" },
  { name: "수원", count: 15, status: "done" },
  { name: "인천", count: 7, status: "done" },
  { name: "부천", count: 6, status: "partial" },
  { name: "안양", count: 5, status: "done" },
  { name: "성남", count: 11, status: "done" },
  { name: "용인", count: 8, status: "done" },
  { name: "화성", count: 6, status: "done" },
  { name: "평택", count: 4, status: "done" },
  { name: "이천", count: 3, status: "done" },
  { name: "광주", count: 2, status: "done" },
]

export const unorderedStoreCount = salesOrders.filter((o) => o.status !== "done").length

export const inventoryFreshness = [
  { label: "안전", value: 72, color: "#22c55e" },
  { label: "우려", value: 20, color: "#f59e0b" },
  { label: "즉시출고", value: 8, color: "#ef4444" },
] as const

export const claims = [
  { label: "부패", count: 1, max: 5 },
  { label: "변색", count: 1, max: 5 },
  { label: "이물질", count: 0, max: 5 },
] as const

export const processingProduction = [
  { label: "일반", target: 80, completed: 62 },
  { label: "굵은", target: 70, completed: 45 },
  { label: "샤브용", target: 35, completed: 30 },
] as const

export interface ShipmentMarket {
  name: string
  마감: number
  상차: number
  잔여: number
}

export const shipmentStatus: ShipmentMarket[] = [
  { name: "가락", 마감: 45, 상차: 42, 잔여: 3 },
  { name: "구리", 마감: 38, 상차: 35, 잔여: 3 },
  { name: "수원", 마감: 32, 상차: 27, 잔여: 5 },
  { name: "인천", 마감: 28, 상차: 22, 잔여: 6 },
  { name: "부천", 마감: 22, 상차: 16, 잔여: 6 },
  { name: "안양", 마감: 18, 상차: 12, 잔여: 6 },
]
