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

interface IArticle {
  _id: string;
  postedAt: string;
  title: string;
  category: string[];
  summary: string;
  body: string[];
  image: string;
  relevantRecipes: number[];
}

type SortOptions = 'popularity' | 'date' | 'rating' | 'price';

interface IRecipeQueryOptions {
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
  id?: string[];
}

interface IArticleQueryOptions {
  page?: number;
  limit?: number;
  category?: string;
  id?: string[];
}

interface ILoadRecipeCard {
  containerClass: string;
  listClass: string;
  listElemType: string;
  cardClassList: string[];
  queryOptions: IRecipeQueryOptions;
  largeCardIndex: number;
}

interface ILoadArticleCard {
  containerClass: string;
  listClass: string;
  articleClassList: string[];
  queryOptions: IArticleQueryOptions;
}

interface ILoadUserRecipes {
  saved: ILoadRecipeCard;
  favorite: ILoadRecipeCard;
}

interface ILoadUserArticles {
  saved: ILoadArticleCard;
  favorite: ILoadArticleCard;
}

type ILoadRecipePage = IRecipe;

interface IUserResponse extends Response {
  id: string;
  email: string;
  name: string;
  articles: {
    saved: string[];
    favorite: string[];
  };
  recipes: {
    saved: string[];
    favorite: string[];
  };
  products: {
    shopping: string[];
    own: string[];
  };
}

export {
  IRecipe,
  IRecipeQueryOptions,
  IArticleQueryOptions,
  ILoadRecipeCard,
  ILoadRecipePage,
  ILoadArticleCard,
  IIngredientMeta,
  INutrient,
  IInstructions,
  IArticle,
  IUserResponse,
  ILoadUserRecipes,
  ILoadUserArticles,
  SortOptions,
};
