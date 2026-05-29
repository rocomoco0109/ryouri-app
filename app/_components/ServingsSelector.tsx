'use client'

type Props = {
  servings: number
  onChange: (n: number) => void
}

export default function ServingsSelector({ servings, onChange }: Props) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium text-gray-700">人数</span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(Math.max(1, servings - 1))}
          className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 font-bold text-lg flex items-center justify-center hover:bg-orange-200 transition-colors disabled:opacity-40"
          disabled={servings <= 1}
          aria-label="人数を減らす"
        >
          −
        </button>
        <span className="w-16 text-center font-bold text-gray-800 text-lg">
          {servings}人前
        </span>
        <button
          onClick={() => onChange(Math.min(10, servings + 1))}
          className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 font-bold text-lg flex items-center justify-center hover:bg-orange-200 transition-colors disabled:opacity-40"
          disabled={servings >= 10}
          aria-label="人数を増やす"
        >
          ＋
        </button>
      </div>
    </div>
  )
}
