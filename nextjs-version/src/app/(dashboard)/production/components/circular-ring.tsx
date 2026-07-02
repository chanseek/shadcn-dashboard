"use client"

import { cn } from "@/lib/utils"

export interface RingSegment {
  value: number
  color: string
}

interface CircularRingProps {
  segments: RingSegment[]
  max: number
  size?: number
  strokeWidth?: number
  trackColor?: string
  className?: string
  children?: React.ReactNode
}

export function CircularRing({
  segments,
  max,
  size = 64,
  strokeWidth = 6,
  trackColor = "var(--muted)",
  className,
  children,
}: CircularRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  let offsetAcc = 0

  return (
    <div
      className={cn("relative inline-flex items-center justify-center shrink-0", className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        {segments.map((segment, index) => {
          const fraction = max > 0 ? Math.min(segment.value / max, 1) : 0
          const dash = fraction * circumference
          const gap = circumference - dash
          const strokeDashoffset = -offsetAcc
          offsetAcc += dash

          return (
            <circle
              key={index}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          )
        })}
      </svg>
      {children ? (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      ) : null}
    </div>
  )
}
