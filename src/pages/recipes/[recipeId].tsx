import { useRouter, NextRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IRecipe } from '@/utils/types';

const RecipePage = () => {
  const router: NextRouter = useRouter();
  const [recipe, setRecipe] = useState<IRecipe | null>(null);

  useEffect(() => {
    async function fetchRecipe() {
      if (!router.query.recipeId) return;

      try {
        const response = await fetch(`http://127.0.0.1:9000/api/recipes/${router.query.recipeId}`);
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchRecipe();
  }, [router.query.recipeId]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className='w-full'>
        <video controls autoPlay style={{ width: '100%', height: '360px', background: 'black' }}>
          <source src={recipe.video} type='video/mp4' style={{ width: '100%', height: '360px' }} />
        </video>
      </div>
      <div className='max-w-4xl mx-auto my-10'>
        <h1 className='text-3xl font-bold mb-5'>{recipe.title}</h1>
        <p className='text-gray-700 text-xl mb-5'>{recipe.description}</p>
        <h2 className='text-2xl font-bold mb-5'>Ingredients</h2>
        <ul className='list-disc pl-5 mb-5'>
          {recipe.ingredients.map((ingredient: string, index: number) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h2 className='text-2xl font-bold mb-5'>Directions</h2>
        <ol className='list-decimal pl-5 mb-5'>
          {recipe.directions.map((step: string, index: number) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  try {
    const response = await fetch('http://127.0.0.1:9000/api/recipes');
    const recipes = await response.json();
    const paths = recipes.map((recipe: IRecipe) => ({ params: { recipeId: recipe._id!.toString() } }));
    return { paths, fallback: false };
  } catch (error) {
    console.error(error);
    return { paths: [], fallback: true };
  }
}

export async function getStaticProps({ params }: any) {
  try {
    const response = await fetch(`http://127.0.0.1:9000/api/recipes/${params.recipeId}`);
    const recipe = await response.json();
    return { props: { recipe }, revalidate: 60 };
  } catch (error) {
    console.error(error);
    return { props: { recipe: null }, revalidate: 60 };
  }
}

export default RecipePage;
