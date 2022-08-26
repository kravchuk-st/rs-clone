interface INutrient {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
}

interface IEquipment {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}

type IIngredient = IEquipment;

interface IIngredientMeta {
  id: number;
  aisle: string;
  image: string;
  name: string;
  nameClean: string;
  original: string;
  originalName: string;
  amount: number;
  unit: string;
  measures: {
    us: {
      amount: number;
      unitShort: string;
      unitLong: string;
    };
    metric: {
      amount: number;
      unitShort: string;
      unitLong: string;
    };
  };
}

interface IInstructions {
  name: string;
  steps: {
    number: number;
    step: string;
    ingredients: IIngredient[];
    equipment: IEquipment[];
  }[];
}

interface IRecipe {
  id: number;
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  cheap: boolean;
  veryPopular: boolean;
  preparationMinutes: number;
  cookingMinutes: number;
  aggregateLikes: number;
  healthScore: number;
  pricePerServing: number;
  extendedIngredients: IIngredientMeta[];
  title: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  image: string;
  imageType: string;
  nutrition: {
    nutrients: INutrient[];
  };
  summary: string;
  cuisines: string[];
  dishTypes: string[];
  diets: string[];
  instructions: string;
  analyzedInstructions: IInstructions[];
}

export { IRecipe };
