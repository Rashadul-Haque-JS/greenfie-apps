import { Recipe } from '../../utils/types';
import RecipeCard from '@/components/cards/recipie';
import ListsPage from '@/components/layouts/LayoutInner';
// mock dtat to be removed..when done
import recipes from '@/utils/mock-data/recipies'

const RecipeList = () => {
  return (
    <ListsPage>
      {recipes.map((recipe:Recipe)=>(<RecipeCard recipe={recipe}/>))}
    </ListsPage>
  );
};

export default RecipeList

