'use client'

import { useState } from 'react'
import { MatchResult } from '../_lib/recipeFilter'
import { scaleIngredients } from '../_lib/scaleIngredients'
import { getRecipeImageUrl } from '../_lib/recipes'

type Props = {
  result: MatchResult
  servings: number
}

const CATEGORY_COLOR: Record<string, string> = {
  '和食': 'bg-red-100 text-red-700',
  '洋食': 'bg-blue-100 text-blue-700',
  '中華': 'bg-yellow-100 text-yellow-700',
}

const CATEGORY_BG: Record<string, string> = {
  '和食': 'bg-red-50',
  '洋食': 'bg-blue-50',
  '中華': 'bg-yellow-50',
}

export default function RecipeCard({ result, servings }: Props) {
  const [open, setOpen] = useState(false)
  const [imgError, setImgError] = useState(false)
  const { recipe, matchRate, missingIngredientNames } = result

  const scaled = scaleIngredients(recipe.ingredients, recipe.baseServings, servings)
  const matchPercent = Math.round(matchRate * 100)
  const imageUrl = getRecipeImageUrl(recipe.imageId, 400, 240)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full text-left bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-200 transition-all overflow-hidden"
      >
        {/* サムネイル画像 */}
        <div className={`w-full h-36 overflow-hidden ${CATEGORY_BG[recipe.category]}`}>
          {imgError ? (
            <div className={`w-full h-full flex items-center justify-center text-4xl ${CATEGORY_BG[recipe.category]}`}>
              {recipe.category === '和食' ? '🍱' : recipe.category === '洋食' ? '🍽️' : '🥢'}
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt={recipe.name}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          )}
        </div>

        {/* カード本文 */}
        <div className="p-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${CATEGORY_COLOR[recipe.category]}`}>
                  {recipe.category}
                </span>
                <span className="text-xs text-gray-400">{recipe.cookingTime}分</span>
              </div>
              <h3 className="font-bold text-gray-800 text-sm leading-snug">{recipe.name}</h3>
            </div>
            <div className="flex flex-col items-end shrink-0">
              <span
                className={`text-sm font-bold ${
                  matchPercent === 100 ? 'text-green-600' : matchPercent >= 60 ? 'text-orange-500' : 'text-gray-400'
                }`}
              >
                {matchPercent}%
              </span>
              <div className="w-14 h-1.5 bg-gray-100 rounded-full mt-1">
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
            <p className="mt-1.5 text-xs text-gray-400 truncate">
              不足: <span className="text-red-400">{missingIngredientNames.join('、')}</span>
            </p>
          )}
        </div>
      </button>

      {/* モーダル */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-0 sm:p-4"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="bg-white w-full sm:max-w-lg max-h-[90vh] rounded-t-2xl sm:rounded-2xl flex flex-col overflow-hidden shadow-xl">
            {/* モーダルヘッダー画像 */}
            <div className="relative w-full h-48 shrink-0 overflow-hidden">
              {imgError ? (
                <div className={`w-full h-full flex items-center justify-center text-6xl ${CATEGORY_BG[recipe.category]}`}>
                  {recipe.category === '和食' ? '🍱' : recipe.category === '洋食' ? '🍽️' : '🥢'}
                </div>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={getRecipeImageUrl(recipe.imageId, 600, 360)}
                  alt={recipe.name}
                  className="w-full h-full object-cover"
                  loading="eager"
                  onError={() => setImgError(true)}
                />
              )}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${CATEGORY_COLOR[recipe.category]}`}>
                    {recipe.category}
                  </span>
                  <span className="text-xs text-white/80">{recipe.cookingTime}分</span>
                  <span className="text-xs text-white/80">{servings}人前</span>
                </div>
                <h2 className="font-bold text-white text-xl drop-shadow">{recipe.name}</h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors"
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
                    const isMissing = missingIngredientNames.includes(item.name)
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
