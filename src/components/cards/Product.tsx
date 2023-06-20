import React, { useState } from "react";
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import { GenericProps } from "@/utils/types";

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
    <div className="max-w-md rounded overflow-hidden shadow-lg m-10">
      <div className="relative h-60">
        <Link href={`/products/${product._id}`}>
          <Image
            className="object-cover"
            src={`/uploads/${product.image}`}
            alt={product.name}
            layout="fill"
          />
        </Link>
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 capitalize">{product.name}</div>
        <div className="flex items-center gap-3">
          <div className="sm:w-1/3 xs:w-1/3 md:w-1/3 w-1/2" style={{ borderTop: "8px solid #000" }}></div>
          <p className="text-gray-700 text-base">{product.shortDesc}</p>
        </div>
      </div>
      <div className="px-6 py-4 flex justify-center items-center">
        <span className="inline-block bg-gray-200 rounded px-2 py-1 text-sm font-semibold text-gray-700 mr-2 flex-shrink-0">
          ${product.price}
        </span>
      </div>
      <div className="px-6 py-4 flex justify-center items-center">
        <Button onClick={toggleLove} className="px-2 mx-1 hover:bg-slate-300">
          {isLoved ? "Loved ❤️" : "Love It"}
        </Button>
        <Button onClick={addToCart} className="px-2 mx-1 hover:bg-slate-300">
          {isInCart ? "In Cart 🛒" : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
