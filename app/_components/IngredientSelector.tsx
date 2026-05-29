'use client'

import { useState } from 'react'
import {
  INGREDIENT_CATEGORIES,
  INGREDIENTS,
  IngredientCategory,
  getIngredientsByCategory,
} from '../_lib/ingredients'

type Props = {
  selected: Set<string>
  onToggle: (id: string) => void
  onClear: () => void
}

const CATEGORY_SHORT: Record<IngredientCategory, string> = {
  '野菜': '野菜',
  '肉類': '肉類',
  '魚介類': '魚介',
  '卵・乳製品': '卵・乳',
  '豆腐・豆類': '豆腐',
  '乾物・缶詰': '乾物',
  '麺・米・パン': '麺・米',
  '調味料': '調味料',
  '洋風・中華食材': '洋中',
}

export default function IngredientSelector({ selected, onToggle, onClear }: Props) {
  const [activeCategory, setActiveCategory] = useState<IngredientCategory>('野菜')

  const categoryIngredients = getIngredientsByCategory(activeCategory)

  const countByCategory = (cat: IngredientCategory) =>
    INGREDIENTS.filter((i) => i.category === cat && selected.has(i.id)).length

  return (
    <div className="flex flex-col gap-3">
      {/* カテゴリタブ */}
      <div className="flex gap-1 flex-wrap">
        {INGREDIENT_CATEGORIES.map((cat) => {
          const count = countByCategory(cat)
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {CATEGORY_SHORT[cat]}
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* 食材グリッド */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {categoryIngredients.map((ing) => {
          const isSelected = selected.has(ing.id)
          return (
            <button
              key={ing.id}
              onClick={() => onToggle(ing.id)}
              className={`px-2 py-2 rounded-lg text-sm font-medium transition-all text-center ${
                isSelected
                  ? 'bg-orange-500 text-white shadow-sm scale-95'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-orange-300 hover:bg-orange-50'
              }`}
            >
              {ing.name}
            </button>
          )
        })}
      </div>

      {/* 選択状態と操作 */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">
          選択済み <span className="font-bold text-orange-500">{selected.size}</span> 品目
        </span>
        {selected.size > 0 && (
          <button
            onClick={onClear}
            className="text-gray-400 hover:text-red-500 transition-colors text-xs underline"
          >
            すべて解除
          </button>
        )}
      </div>
    </div>
  )
}
