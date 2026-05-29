'use client'

import { RecipeGroup } from '../_lib/recipeFilter'
import RecipeCard from './RecipeCard'

type Props = {
  groups: RecipeGroup[]
  servings: number
}

export default function RecipeList({ groups, servings }: Props) {
  if (groups.length === 0) return null

  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <section key={group.label}>
          <h2 className="flex items-center gap-2 font-bold text-gray-700 mb-3">
            <span>{group.emoji}</span>
            <span>{group.label}</span>
            <span className="text-sm font-normal text-gray-400">（{group.results.length}件）</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {group.results.map((result) => (
              <RecipeCard key={result.recipe.id} result={result} servings={servings} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
