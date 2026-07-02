"use client"

import * as React from "react"
import { Sprout } from "lucide-react"

function formatTime(date: Date) {
  return date.toLocaleTimeString("ko-KR", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
}

function formatDate(date: Date) {
  const datePart = date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
  const weekday = date.toLocaleDateString("ko-KR", { weekday: "short" })
  return `${datePart.replace(/\s/g, "")} (${weekday})`
}

export function ProductionHeader() {
  const [now, setNow] = React.useState<Date | null>(null)

  React.useEffect(() => {
    setNow(new Date())
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col gap-4 rounded-xl border bg-card px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Sprout className="size-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold leading-tight">JW Fresh</h1>
          </div>
          <p className="text-sm text-muted-foreground">숙주나물 생산 관제 시스템</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="font-mono text-2xl font-bold tabular-nums leading-tight">
            {now ? formatTime(now) : "--:--:--"}
          </div>
          <div className="text-xs text-muted-foreground">
            {now ? formatDate(now) : ""}
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">LIVE</span>
        </div>
      </div>
    </div>
  )
}
