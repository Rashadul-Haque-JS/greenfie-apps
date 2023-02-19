import { Recipe } from '../../utils/types';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-10 h-[480px]">
    <img className="w-full" src={recipe.image} alt={recipe.title} />
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{recipe.title}</div>
      <p className="text-gray-700 text-base">{recipe.description}</p>
    </div>
    <div className="px-6 py-4">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Show Details
      </button>
    </div>
  </div>
  
  );
};

export default RecipeCard;
