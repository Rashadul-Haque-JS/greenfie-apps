import { GenericProps } from '../../utils/types';
import Link from 'next/link';
import Image from 'next/image';

const RecipeCard = ({ recipe }: GenericProps) => {
  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg m-10 h-[500px]'>
      <div className="image-wrapper h-64 relative">
        <Image className='object-cover' src={recipe.image} alt={recipe.title} layout="fill" />
      </div>
      <div className='px-6 py-4 flex flex-col h-60'>
        <h1 className='font-bold text-xl mb-2'>{recipe.title}</h1>
        <p className='text-gray-700 text-base flex-grow'>{recipe.description}</p>
        <div className="flex justify-center mt-4">
          <Link href={`/recipes/${recipe._id}`} className='flex items-center justify-center bg-txt hover:bg-main text-white font-bold py-2 px-4 rounded'>
            <span className='mx-2'>Watch Now</span>
            <i className="material-icons">play_circle_outline</i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
