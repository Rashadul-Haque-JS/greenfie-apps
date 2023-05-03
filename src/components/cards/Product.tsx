import React, { useState } from 'react';
import { Button } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { GenericProps } from '@/utils/types';

const ProductCard = ({ product }: GenericProps) => {
  const [isLoved, setIsLoved] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  const toggleLove = () => {
    setIsLoved(!isLoved);
  };

  const addToCart = () => {
    setIsInCart(!isInCart);
  };

  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg m-10'>
      <Link href={`/products/${product._id}`}>
        <Image className='w-full' src={product.image} alt={product.name} width={500} height={500} />
      </Link>
      <div className='px-6 py-4'>
        <div className='font-bold text-xl mb-2'>{product.name}</div>
        <p className='text-gray-700 text-base'>
          {product.description}
        </p>
      </div>
      <div className='px-4 py-4 flex justify-center items-center'>
        <span className='inline-block bg-gray-200 rounded px-2 py-1 text-sm font-semibold text-gray-700 mr-2 flex-shrink-0'>
          ${product.price}
        </span>
        <Button onClick={toggleLove} className='px-2 mx-1 hover:bg-slate-300 flex-shrink-0'>
          {isLoved ? 'Loved ❤️' : 'Love It'}
        </Button>
        <Button onClick={addToCart} className='px-2 mx-1 hover:bg-slate-300 flex-shrink-0'>
          {isInCart ? 'In Cart 🛒' : 'Add to Cart'}
        </Button>
      </div>


    </div>
  );
};

export default ProductCard;
