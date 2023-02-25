export interface IRecipe {
  _id?: string;
  title: string;
  description: string;
  image: string;
  video: string;
  ingredients: string[];
  directions: string[];
}

export interface IProducts{
  _id?: string;
  name: string;
  description: string;
  price:number;
  image: string;
}

export interface GenericProps{
  [key:string]:any
}