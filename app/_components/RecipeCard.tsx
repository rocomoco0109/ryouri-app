'use client'

import { useState } from 'react'
import { MatchResult } from '../_lib/recipeFilter'
import { scaleIngredients } from '../_lib/scaleIngredients'

type Props = {
  result: MatchResult
  servings: number
}

const CATEGORY_COLOR: Record<string, string> = {
  '和食': 'bg-red-100 text-red-700',
  '洋食': 'bg-blue-100 text-blue-700',
  '中華': 'bg-yellow-100 text-yellow-700',
}

export default function RecipeCard({ result, servings }: Props) {
  const [open, setOpen] = useState(false)
  const { recipe, matchRate, missingIngredientNames } = result

  const scaled = scaleIngredients(recipe.ingredients, recipe.baseServings, servings)

  const matchPercent = Math.round(matchRate * 100)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full text-left bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-200 transition-all p-4"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${CATEGORY_COLOR[recipe.category]}`}>
                {recipe.category}
              </span>
              <span className="text-xs text-gray-400">{recipe.cookingTime}分</span>
            </div>
            <h3 className="font-bold text-gray-800 text-base leading-snug">{recipe.name}</h3>
          </div>
          <div className="flex flex-col items-end shrink-0">
            <span
              className={`text-sm font-bold ${
                matchPercent === 100 ? 'text-green-600' : matchPercent >= 60 ? 'text-orange-500' : 'text-gray-400'
              }`}
            >
              {matchPercent}%
            </span>
            <div className="w-16 h-1.5 bg-gray-100 rounded-full mt-1">
              <div
                className={`h-1.5 rounded-full transition-all ${
                  matchPercent === 100 ? 'bg-green-500' : matchPercent >= 60 ? 'bg-orange-400' : 'bg-gray-300'
                }`}
                style={{ width: `${matchPercent}%` }}
              />
            </div>
          </div>
        </div>

        {missingIngredientNames.length > 0 && (
          <p className="mt-2 text-xs text-gray-400">
            不足:{' '}
            <span className="text-red-400">{missingIngredientNames.join('、')}</span>
          </p>
        )}
      </button>

      {/* モーダル */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-0 sm:p-4"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="bg-white w-full sm:max-w-lg max-h-[90vh] rounded-t-2xl sm:rounded-2xl flex flex-col overflow-hidden shadow-xl">
            {/* ヘッダー */}
            <div className="flex items-start justify-between p-5 border-b border-gray-100">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${CATEGORY_COLOR[recipe.category]}`}>
                    {recipe.category}
                  </span>
                  <span className="text-xs text-gray-400">{recipe.cookingTime}分</span>
                  <span className="text-xs text-gray-400">{servings}人前</span>
                </div>
                <h2 className="font-bold text-gray-900 text-xl">{recipe.name}</h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="ml-2 text-gray-400 hover:text-gray-600 text-2xl leading-none"
                aria-label="閉じる"
              >
                ×
              </button>
            </div>

            {/* スクロール可能コンテンツ */}
            <div className="overflow-y-auto flex-1 p-5 space-y-5">
              {/* 材料 */}
              <section>
                <h3 className="font-bold text-gray-700 text-sm mb-2">材料（{servings}人前）</h3>
                <ul className="space-y-1">
                  {scaled.map((item, i) => {
                    const origId = recipe.ingredients[i]?.ingredientId
                    const isMissing =
                      origId !== undefined && missingIngredientNames.includes(item.name)
                    return (
                      <li
                        key={i}
                        className={`flex justify-between text-sm py-1 border-b border-gray-50 ${
                          isMissing ? 'text-red-400' : 'text-gray-700'
                        }`}
                      >
                        <span>{item.name}{isMissing && ' ⚠'}</span>
                        <span className="font-medium">{item.scaled}</span>
                      </li>
                    )
                  })}
                </ul>
              </section>

              {/* 作り方 */}
              <section>
                <h3 className="font-bold text-gray-700 text-sm mb-2">作り方</h3>
                <ol className="space-y-2">
                  {recipe.steps.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-700">
                      <span className="shrink-0 w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
