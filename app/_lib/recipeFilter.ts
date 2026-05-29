import { RECIPES, Recipe } from './recipes'

export type MatchResult = {
  recipe: Recipe
  matchCount: number
  matchRate: number
  missingIngredientNames: string[]
}

export type RecipeGroup = {
  label: string
  emoji: string
  results: MatchResult[]
}

export function filterRecipes(selectedIds: Set<string>): RecipeGroup[] {
  if (selectedIds.size === 0) return []

  const results: MatchResult[] = []

  for (const recipe of RECIPES) {
    const matchCount = recipe.mainIngredients.filter((id) => selectedIds.has(id)).length
    if (matchCount === 0) continue

    const matchRate = matchCount / recipe.mainIngredients.length

    const missingIngredientNames = recipe.mainIngredients
      .filter((id) => !selectedIds.has(id))
      .map((id) => {
        const ing = recipe.ingredients.find((i) => i.ingredientId === id)
        return ing?.name ?? id
      })

    results.push({ recipe, matchCount, matchRate, missingIngredientNames })
  }

  results.sort((a, b) => {
    if (b.matchRate !== a.matchRate) return b.matchRate - a.matchRate
    return a.missingIngredientNames.length - b.missingIngredientNames.length
  })

  const perfect = results.filter((r) => r.matchRate >= 1)
  const almost = results.filter((r) => r.matchRate >= 0.6 && r.matchRate < 1)
  const others = results.filter((r) => r.matchRate < 0.6)

  const groups: RecipeGroup[] = []
  if (perfect.length > 0) {
    groups.push({ label: 'これだけで作れる', emoji: '✅', results: perfect })
  }
  if (almost.length > 0) {
    groups.push({ label: 'あと少しで作れる', emoji: '🔶', results: almost })
  }
  if (others.length > 0) {
    groups.push({ label: '参考レシピ', emoji: '📋', results: others })
  }

  return groups
}
