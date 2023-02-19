export interface Recipe {
  id: number;
  title: string;
  description: string;
  image: string;
  video: string;
  ingredients: string[];
  directions?: string[];
}