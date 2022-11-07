export const NUTRIENTS_MAP = {
  macro: ["carbohydrates", "protein", "lipids", "fiber"],
  micro: [
    "vitaminA",
    "vitaminE",
    "vitaminC",
    "vitaminK",
    "vitaminB1",
    "vitaminB3",
    "iron",
    "potassium",
    "magnesium",
    "calcium",
  ],
};

export interface Ingredient {
  label: string;
  nutrients: string[];
  type: "base" | "topping";
  image: string;
}

export const INGREDIENTS: { [ingredient: string]: Ingredient } = {
  tortillaChips: {
    label: "Tortilla Chips",
    nutrients: ["carbohydrates"],
    type: "topping",
    image: "/ingredients/tortillaChips.png",
  },
  croutons: {
    label: "Croutons",
    nutrients: ["carbohydrates", "lipids"],
    type: "topping",
    image: "/ingredients/croutons.png",
  },
  sweetPotato: {
    label: "Sweet Potato",
    nutrients: ["carbohydrates", "vitaminA", "potassium", "vitaminC"],
    type: "topping",
    image: "/ingredients/sweetPotato.png",
  },
  potatoes: {
    label: "Potato",
    nutrients: ["carbohydrates", "fiber", "vitaminC", "potassium"],
    type: "topping",
    image: "/ingredients/potato.png",
  },
  sunflowerSeeds: {
    label: "Sunflower Seeds",
    nutrients: ["lipids", "fiber", "protein", "potassium", "magnesium"],
    type: "topping",
    image: "/ingredients/sunflowerSeeds.png",
  },
  chiaSeeds: {
    label: "Chia Seeds",
    nutrients: ["lipids", "fiber", "protein", "magnesium", "calcium", "iron"],
    type: "topping",
    image: "/ingredients/chiaSeeds.png",
  },
  walnuts: {
    label: "Walnuts",
    nutrients: ["fiber", "protein", "vitaminB3", "lipids", "potassium"],
    type: "topping",
    image: "/ingredients/walnuts.png",
  },
  almonds: {
    label: "Almonds",
    nutrients: ["fiber", "protein", "vitaminB3", "lipids"],
    type: "topping",
    image: "/ingredients/almonds.png",
  },
  onions: {
    label: "Onions",
    nutrients: ["fiber", "vitaminC"],
    type: "topping",
    image: "/ingredients/onions.png",
  },
  tomato: {
    label: "Tomato",
    nutrients: ["fiber", "vitaminA", "vitaminC"],
    type: "topping",
    image: "/ingredients/tomato.png",
  },
  swissChard: {
    label: "Swiss Chard",
    nutrients: ["fiber", "vitaminA", "vitaminK", "vitaminC", "magnesium"],
    type: "base",
    image: "/ingredients/swissChard.png",
  },
  romaineLettuce: {
    label: "Romaine Lettuce",
    nutrients: ["fiber", "vitaminA", "vitaminK"],
    type: "base",
    image: "/ingredients/romaineLettuce.png",
  },
  spinach: {
    label: "Spinach",
    nutrients: ["fiber", "vitaminA", "vitaminC", "iron", "potassium"],
    type: "base",
    image: "/ingredients/spinach.png",
  },
  kale: {
    label: "Kale",
    nutrients: ["fiber", "vitaminA", "vitaminC", "vitaminK"],
    type: "base",
    image: "/ingredients/kale.png",
  },
  beetGreens: {
    label: "Beet Greens",
    nutrients: ["fiber", "vitaminA", "vitaminC", "vitaminK"],
    type: "base",
    image: "/ingredients/beetroot.png",
  },
  cabbage: {
    label: "Cabbage",
    nutrients: ["fiber", "vitaminC"],
    type: "base",
    image: "/ingredients/cabbage.png",
  },
  tofu: {
    label: "Tofu",
    nutrients: ["lipids", "calcium"],
    type: "topping",
    image: "/ingredients/tofu.png",
  },
  avocadoSlices: {
    label: "Avocado Slices",
    nutrients: ["carbohydrates", "lipids", "vitaminE", "vitaminC", "vitaminK"],
    type: "topping",
    image: "/ingredients/avocadoSlices.png",
  },
  peanuts: {
    label: "Peanuts",
    nutrients: ["protein", "vitaminB3", "lipids", "potassium", "iron"],
    type: "topping",
    image: "/ingredients/peanuts.png",
  },
  blackBeans: {
    label: "Black Beans",
    nutrients: ["protein", "vitaminA", "vitaminC"],
    type: "topping",
    image: "/ingredients/blackBeans.png",
  },
  kidneyBeans: {
    label: "Kidney Beans",
    nutrients: ["protein", "fiber", "potassium"],
    type: "topping",
    image: "/ingredients/kidneyBeans.png",
  },
  peaPods: {
    label: "Pea Pods",
    nutrients: ["carbohydrates", "vitaminA", "vitaminC"],
    type: "topping",
    image: "/ingredients/peaPods.png",
  },
  purpleCabbage: {
    label: "Purple Cabbage",
    nutrients: ["fiber", "vitaminA", "vitaminC"],
    type: "base",
    image: "/ingredients/purpleCabbage.png",
  },
  edamame: {
    label: "Edamame",
    nutrients: ["protein", "vitaminC", "iron"],
    type: "topping",
    image: "/ingredients/edamame.png",
  },
  redPeppers: {
    label: "Red Peppers",
    nutrients: ["vitaminC", "vitaminB1"],
    type: "topping",
    image: "/ingredients/redPeppers.png",
  },
  greenPeppers: {
    label: "Green Peppers",
    nutrients: ["vitaminC", "vitaminB1"],
    type: "topping",
    image: "/ingredients/greenPeppers.png",
  },
  beetroot: {
    label: "Beetroot",
    nutrients: ["vitaminA", "vitaminC"],
    type: "topping",
    image: "/ingredients/beetroot.png",
  },
  pomegranateSeeds: {
    label: "Pomegranate Seeds",
    nutrients: ["vitaminE", "lipids"],
    type: "topping",
    image: "/ingredients/pomegranateSeeds.png",
  },
  cucumber: {
    label: "Cucumber",
    nutrients: ["vitaminC", "vitaminK"],
    type: "topping",
    image: "/ingredients/cucumber.png",
  },
  carrots: {
    label: "Carrots",
    nutrients: ["vitaminA", "fiber"],
    type: "topping",
    image: "/ingredients/carrots.png",
  },
  corn: {
    label: "Corn",
    nutrients: ["fiber", "vitaminC"],
    type: "topping",
    image: "/ingredients/corn.png",
  },
};

export interface IngredientsByNutrients {
  [nutrient: string]: string[];
}

export const INGREDIENTS_BY_NUTRIENTS: IngredientsByNutrients = Object.entries(
  INGREDIENTS
).reduce(
  (
    acc: IngredientsByNutrients,
    [ingredientName, ingredient]: [string, Ingredient]
  ) => {
    ingredient.nutrients.forEach((nutrient: string) => {
      if (!Object.keys(acc).includes(nutrient)) {
        acc[nutrient] = [ingredientName];
      } else {
        acc[nutrient].push(ingredientName);
      }
    });
    return acc;
  },
  {}
);

export interface IngredientsByType {
  [type: string]: string[];
}

export const INGREDIENTS_BY_TYPE: IngredientsByType = Object.entries(
  INGREDIENTS
).reduce(
  (
    acc: IngredientsByType,
    [ingredientName, ingredient]: [string, Ingredient]
  ) => {
    if (!Object.keys(acc).includes(ingredient.type)) {
      acc[ingredient.type] = [ingredientName];
    } else {
      acc[ingredient.type].push(ingredientName);
    }
    return acc;
  },
  {}
);
