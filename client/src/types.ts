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

type SortOptions = 'popularity' | 'date' | 'rating' | 'price';

interface IQueryOptions {
  page?: number;
  limit?: number;
  vegetarian?: boolean;
  vegan?: boolean;
  'gluten-free'?: boolean;
  'dairy-free'?: boolean;
  cheap?: boolean;
  'very-popular'?: boolean;
  'min-health-score'?: number;
  'max-ready'?: number;
  'serving-price'?: [number, number];
  ingredients?: string[];
  cuisines?: string[];
  'dish-types'?: string[];
  diets?: string[];
  'max-calories'?: number;
  'max-carbs'?: number;
  'max-fats'?: number;
  'max-proteins'?: number;
  search?: string[];
  sort?: SortOptions;
  'sort-dir'?: 1 | -1;
}

interface ILoadRecipeCard {
  containerClass: string;
  listClass: string;
  listElemType: string;
  cardClassList: string[];
  queryOptions: IQueryOptions;
  largeCardIndex: number;
}

type ILoadRecipePage = IRecipe;

export { IRecipe, IQueryOptions, ILoadRecipeCard, ILoadRecipePage, IIngredientMeta, INutrient, IInstructions };
