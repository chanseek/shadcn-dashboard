import { statCards } from "../data"

export function StatCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 @5xl:grid-cols-4">
      {statCards.map((card) => (
        <div
          key={card.title}
          className={`flex flex-col gap-1 rounded-xl bg-gradient-to-br ${card.gradient} p-5 text-white shadow-sm`}
        >
          <span className="text-sm font-medium text-white/85">{card.title}</span>
          <span className="text-4xl font-bold tabular-nums">{card.value}</span>
          <span className="text-xs text-white/75">{card.description}</span>
          <span className="mt-2 text-xs font-medium text-white/90">{card.footer}</span>
        </div>
      ))}
    </div>
  )
}
