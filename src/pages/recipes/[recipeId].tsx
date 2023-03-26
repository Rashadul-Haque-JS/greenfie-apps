import axios from 'axios';
import { GetServerSideProps } from 'next';
import { GenericProps } from '@/utils/types';

const Recipe = ({ recipe }: GenericProps) => {

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className='transform translate-y-[-28px]'>
      <div className='w-full transform translate-y-[-26px]'>
        <video controls autoPlay className='w-full h-[400px] xs:h-auto sm:h-auto bg-txt '>
          <source src={recipe.video} type='video/mp4' className='w-full h-full' />
        </video>
      </div>
      <div className='max-h-96 overflow-scroll mx-4'>
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
    </div>

  );
};


/* 
The context argument in SSR function is an object that has the following properties:
params: An object containing the dynamic route parameters.
req: The incoming HTTP request object.
res: The incoming HTTP response object.
query: An object containing the query parameters from the request URL.
pathname: The URL pathname of the request.
resolvedUrl: The actual URL of the request after resolution of any redirects.
*/

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { recipeId } = context.query;
    const res = await axios.get(`http://127.0.0.1:9000/api/recipes/recipes?id=${recipeId}`);
    const recipe = res.data;
    return { props: { recipe } };
  } catch (error: any) {
    console.error(error.message);
    return { props: { recipe: null } };
  }
};


export default Recipe


