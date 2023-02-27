import { GenericProps } from '../../utils/types';
import Link from 'next/link';
import Image from 'next/image';
const RecipeCard = ({ recipe }: GenericProps) => {
  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg m-10 h-[480px]'>
      <Image className='w-full' src={recipe.image} alt={recipe.title} width={500} height={500} />
      <div className='px-6 py-4'>
        <div className='font-bold text-xl mb-2'>{recipe.title}</div>
        <p className='text-gray-700 text-base'>{recipe.description}</p>
      </div>
      <div className='px-6 py-4'>
        <Link href={`/recipes/${recipe._id}`}>
          <button className='bg-txt hover:bg-main text-white font-bold py-2 px-4 rounded'>
            Show Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
