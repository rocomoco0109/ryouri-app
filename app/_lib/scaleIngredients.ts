import { RecipeIngredient } from './recipes'

const TABLESPOON_UNITS = ['大さじ', '小さじ']
const GRAM_UNITS = ['g', 'ml']
const COUNT_UNITS = ['個', '枚', '本', '片', '束', '缶', '玉', '丁', '切れ', '膳分']

function round(value: number, step: number): number {
  return Math.round(value / step) * step
}

export function scaleAmount(amount: number, unit: string, scale: number): string {
  const scaled = amount * scale

  if (TABLESPOON_UNITS.includes(unit)) {
    const rounded = round(scaled, 0.5)
    return `${rounded > 0 ? rounded : 0.5}${unit}`
  }

  if (GRAM_UNITS.includes(unit)) {
    const rounded = Math.max(5, round(scaled, 5))
    return `${rounded}${unit}`
  }

  if (COUNT_UNITS.includes(unit)) {
    const rounded = Math.max(1, Math.round(scaled))
    return `${rounded}${unit}`
  }

  // その他の単位（適量など）
  const rounded = Math.round(scaled * 10) / 10
  return `${rounded > 0 ? rounded : amount}${unit}`
}

export function scaleIngredients(
  ingredients: RecipeIngredient[],
  baseServings: number,
  targetServings: number
): { name: string; scaled: string }[] {
  const scale = targetServings / baseServings
  return ingredients.map((ing) => ({
    name: ing.name,
    scaled: scaleAmount(ing.amount, ing.unit, scale),
  }))
}
