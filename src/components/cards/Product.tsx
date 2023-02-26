import React, { useState } from 'react';
import { Button } from 'antd';

interface ProductProps {
  name: string;
  description: string;
  image: string;
  price: number;
}

const ProductCard: React.FC<ProductProps> = ({ name, description, image, price }) => {
  const [isLoved, setIsLoved] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  const toggleLove = () => {
    setIsLoved(!isLoved);
  };

  const addToCart = () => {
    setIsInCart(!isInCart);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-10">
      <img className="w-full" src={image} alt={name} loading="lazy" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">
          {description}
        </p>
      </div>
      <div className="px-4 py-4">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          ${price}
        </span>
        <Button onClick={toggleLove} className="px-2 mx-1 hover:bg-main">
          {isLoved ? 'Loved ❤️' : 'Love It'}
        </Button>
        <Button onClick={addToCart} className="px-2 mx-1 hover:bg-main">
          {isInCart ? 'In Cart 🛒' : 'Add to Cart'}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
