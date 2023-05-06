import { GenericProps } from '../../utils/types';
import Link from 'next/link';
import Image from 'next/image';
const RecipeCard = ({ recipe }: GenericProps) => {
  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg m-10 h-[480px]'>
      <Image className='w-full brightness-105 contrast-115' src={recipe.image} alt={recipe.title} width={500} height={500} />
      <div className='px-6 py-4 flex flex-col justify-center items-center '>
        <h1 className='font-bold text-xl mb-2 flex-shrink-0'>{recipe.title}</h1>
        <p className='text-gray-700 text-base flex-shrink-0'>{recipe.description}</p>
      </div>
      <div className='px-6 py-4 flex justify-center items-center'>
        <Link href={`/recipes/${recipe._id}`} className='flex items-center justify-center bg-txt hover:bg-main text-white font-bold py-2 px-4 w-full rounded'>
          <span className='mx-2'>Watch Now</span>
          <i className="material-icons">play_circle_outline</i>
        </Link>
      </div>

    </div>
  );
};

export default RecipeCard;
