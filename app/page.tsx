'use client'

import { useState, useMemo } from 'react'
import IngredientSelector from './_components/IngredientSelector'
import RecipeList from './_components/RecipeList'
import ServingsSelector from './_components/ServingsSelector'
import { filterRecipes } from './_lib/recipeFilter'

export default function Home() {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [servings, setServings] = useState(2)

  const handleToggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleClear = () => setSelected(new Set())

  const groups = useMemo(() => filterRecipes(selected), [selected])

  const totalRecipes = groups.reduce((sum, g) => sum + g.results.length, 0)

  return (
    <div className="min-h-screen bg-orange-50">
      {/* ヘッダー */}
      <header className="bg-white border-b border-orange-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍳</span>
            <h1 className="font-bold text-gray-800 text-lg leading-tight">
              今日の料理
            </h1>
          </div>
          <ServingsSelector servings={servings} onChange={setServings} />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-5 space-y-6">
        {/* 食材選択エリア */}
        <section className="bg-white rounded-2xl p-4 shadow-sm border border-orange-100">
          <h2 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span>🛒</span>
            <span>家にある食材を選んでください</span>
          </h2>
          <IngredientSelector
            selected={selected}
            onToggle={handleToggle}
            onClear={handleClear}
          />
        </section>

        {/* レシピ結果 */}
        {selected.size === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p className="text-4xl mb-3">🥦</p>
            <p className="font-medium">食材を選ぶとレシピが表示されます</p>
            <p className="text-sm mt-1">上のカテゴリタブから食材を選択してください</p>
          </div>
        ) : totalRecipes === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p className="text-4xl mb-3">😓</p>
            <p className="font-medium">レシピが見つかりませんでした</p>
            <p className="text-sm mt-1">別の食材を追加してみてください</p>
          </div>
        ) : (
          <section>
            <p className="text-sm text-gray-500 mb-3">
              <span className="font-bold text-orange-500">{totalRecipes}件</span>のレシピが見つかりました
              （タップで詳細・{servings}人前の分量を確認）
            </p>
            <RecipeList groups={groups} servings={servings} />
          </section>
        )}
      </main>
    </div>
  )
}
