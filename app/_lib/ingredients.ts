export type IngredientCategory =
  | '野菜'
  | '肉類'
  | '魚介類'
  | '卵・乳製品'
  | '豆腐・豆類'
  | '乾物・缶詰'
  | '麺・米・パン'
  | '調味料'
  | '洋風・中華食材'

export type Ingredient = {
  id: string
  name: string
  category: IngredientCategory
}

export const INGREDIENT_CATEGORIES: IngredientCategory[] = [
  '野菜',
  '肉類',
  '魚介類',
  '卵・乳製品',
  '豆腐・豆類',
  '乾物・缶詰',
  '麺・米・パン',
  '調味料',
  '洋風・中華食材',
]

export const INGREDIENTS: Ingredient[] = [
  // 野菜
  { id: 'onion', name: '玉ねぎ', category: '野菜' },
  { id: 'carrot', name: 'にんじん', category: '野菜' },
  { id: 'potato', name: 'じゃがいも', category: '野菜' },
  { id: 'cabbage', name: 'キャベツ', category: '野菜' },
  { id: 'daikon', name: '大根', category: '野菜' },
  { id: 'spinach', name: 'ほうれん草', category: '野菜' },
  { id: 'negi', name: '長ねぎ', category: '野菜' },
  { id: 'eggplant', name: 'ナス', category: '野菜' },
  { id: 'tomato', name: 'トマト', category: '野菜' },
  { id: 'pumpkin', name: 'かぼちゃ', category: '野菜' },
  { id: 'green-pepper', name: 'ピーマン', category: '野菜' },
  { id: 'ginger', name: '生姜', category: '野菜' },
  { id: 'garlic', name: 'にんにく', category: '野菜' },
  { id: 'burdock', name: 'ごぼう', category: '野菜' },
  { id: 'chinese-cabbage', name: '白菜', category: '野菜' },
  { id: 'moyashi', name: 'もやし', category: '野菜' },
  { id: 'broccoli', name: 'ブロッコリー', category: '野菜' },
  { id: 'cucumber', name: 'きゅうり', category: '野菜' },
  { id: 'nira', name: 'ニラ', category: '野菜' },
  { id: 'mushroom', name: 'しいたけ', category: '野菜' },

  // 肉類
  { id: 'chicken-thigh', name: '鶏もも肉', category: '肉類' },
  { id: 'chicken-breast', name: '鶏むね肉', category: '肉類' },
  { id: 'pork-belly', name: '豚バラ肉', category: '肉類' },
  { id: 'pork-loin', name: '豚ロース', category: '肉類' },
  { id: 'beef', name: '牛肉', category: '肉類' },
  { id: 'ground-pork', name: '豚ひき肉', category: '肉類' },
  { id: 'ground-mix', name: '合挽き肉', category: '肉類' },
  { id: 'bacon', name: 'ベーコン', category: '肉類' },

  // 魚介類
  { id: 'salmon', name: '鮭', category: '魚介類' },
  { id: 'mackerel', name: 'サバ', category: '魚介類' },
  { id: 'tuna', name: 'ツナ缶', category: '魚介類' },
  { id: 'shrimp', name: 'エビ', category: '魚介類' },
  { id: 'squid', name: 'イカ', category: '魚介類' },
  { id: 'cod', name: 'タラ', category: '魚介類' },
  { id: 'sardine-can', name: 'イワシ缶', category: '魚介類' },
  { id: 'mackerel-can', name: 'サバ缶', category: '魚介類' },

  // 卵・乳製品
  { id: 'egg', name: '卵', category: '卵・乳製品' },
  { id: 'milk', name: '牛乳', category: '卵・乳製品' },
  { id: 'butter', name: 'バター', category: '卵・乳製品' },
  { id: 'cheese', name: 'チーズ', category: '卵・乳製品' },
  { id: 'heavy-cream', name: '生クリーム', category: '卵・乳製品' },

  // 豆腐・豆類
  { id: 'tofu', name: '豆腐', category: '豆腐・豆類' },
  { id: 'abura-age', name: '油揚げ', category: '豆腐・豆類' },
  { id: 'atsu-age', name: '厚揚げ', category: '豆腐・豆類' },
  { id: 'natto', name: '納豆', category: '豆腐・豆類' },
  { id: 'kinako', name: '大豆（水煮）', category: '豆腐・豆類' },

  // 乾物・缶詰
  { id: 'hijiki', name: 'ひじき', category: '乾物・缶詰' },
  { id: 'wakame', name: 'わかめ', category: '乾物・缶詰' },
  { id: 'tomato-can', name: 'トマト缶', category: '乾物・缶詰' },
  { id: 'dried-shiitake', name: '干し椎茸', category: '乾物・缶詰' },
  { id: 'ham', name: 'ハム', category: '乾物・缶詰' },
  { id: 'sausage', name: 'ウインナー', category: '乾物・缶詰' },
  { id: 'corn-can', name: 'コーン缶', category: '乾物・缶詰' },
  { id: 'bamboo', name: 'タケノコ（水煮）', category: '乾物・缶詰' },

  // 麺・米・パン
  { id: 'rice', name: 'ごはん', category: '麺・米・パン' },
  { id: 'pasta', name: 'パスタ', category: '麺・米・パン' },
  { id: 'bread', name: '食パン', category: '麺・米・パン' },
  { id: 'udon', name: 'うどん', category: '麺・米・パン' },
  { id: 'soba', name: 'そば', category: '麺・米・パン' },
  { id: 'chinese-noodle', name: '中華麺', category: '麺・米・パン' },
  { id: 'gyoza-skin', name: '餃子の皮', category: '麺・米・パン' },
  { id: 'harumaki-skin', name: '春巻きの皮', category: '麺・米・パン' },

  // 調味料
  { id: 'soy-sauce', name: '醤油', category: '調味料' },
  { id: 'miso', name: '味噌', category: '調味料' },
  { id: 'mirin', name: 'みりん', category: '調味料' },
  { id: 'sake', name: '料理酒', category: '調味料' },
  { id: 'sugar', name: '砂糖', category: '調味料' },
  { id: 'salt', name: '塩', category: '調味料' },
  { id: 'vinegar', name: '酢', category: '調味料' },
  { id: 'sesame-oil', name: 'ごま油', category: '調味料' },
  { id: 'mayonnaise', name: 'マヨネーズ', category: '調味料' },
  { id: 'ketchup', name: 'トマトケチャップ', category: '調味料' },
  { id: 'consomme', name: 'コンソメ', category: '調味料' },
  { id: 'dashi', name: 'だし（顆粒）', category: '調味料' },
  { id: 'sesame', name: 'ごま', category: '調味料' },
  { id: 'flour', name: '小麦粉', category: '調味料' },
  { id: 'starch', name: '片栗粉', category: '調味料' },

  // 洋風・中華食材
  { id: 'mapo-tofu-sauce', name: '豆板醤', category: '洋風・中華食材' },
  { id: 'tenmen-sauce', name: '甜麺醤', category: '洋風・中華食材' },
  { id: 'oyster-sauce', name: 'オイスターソース', category: '洋風・中華食材' },
  { id: 'chicken-stock', name: '鶏がらスープの素', category: '洋風・中華食材' },
  { id: 'curry-roux', name: 'カレールー', category: '洋風・中華食材' },
  { id: 'demi-glace', name: 'デミグラスソース', category: '洋風・中華食材' },
  { id: 'white-sauce', name: 'ホワイトソース', category: '洋風・中華食材' },
  { id: 'worcester', name: 'ウスターソース', category: '洋風・中華食材' },
  { id: 'lemon', name: 'レモン', category: '洋風・中華食材' },
  { id: 'breadcrumb', name: 'パン粉', category: '洋風・中華食材' },
]

export const getIngredientsByCategory = (category: IngredientCategory): Ingredient[] =>
  INGREDIENTS.filter((i) => i.category === category)

export const getIngredientById = (id: string): Ingredient | undefined =>
  INGREDIENTS.find((i) => i.id === id)
