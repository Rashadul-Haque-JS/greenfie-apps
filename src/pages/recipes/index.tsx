
import RecipeCard from '@/components/cards/recipie';
import ListsPage from '@/components/layouts/LayoutInner';
import {IRecipe, GenericProps } from '../../utils/types';
import { GetServerSideProps } from 'next';
import axios from 'axios'
import { getClientURL } from '@/utils/clientUrl';

const Recipes = ({recipes}:GenericProps) => {
  return (
    <ListsPage>
      {recipes?.map((recipe:IRecipe)=>(<RecipeCard key={recipe._id} recipe={recipe}/>))}
    </ListsPage>
  );
};


export const getServerSideProps : GetServerSideProps= async ()=>{
  const URL = getClientURL();
  try {
    const res = await axios.get(`${URL}/api/recipes/recipes`);
    const recipes = res.data;
    return { props: { recipes } };
  } catch (error:any) {
    console.error(error.message);
    return { props: { recipes:[]} };
  }
}

export default Recipes


