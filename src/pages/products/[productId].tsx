import { useState } from "react";
import { GenericProps } from "@/utils/types";
import { GetServerSideProps } from "next";
import Links from "@/stories/links/Link";
import axios from "axios";
import Image from "next/image";
import Buttons from "@/stories/buttons/Button";
import { getClientURL } from '@/utils/clientUrl';

const SingleProduct = ({ product }: GenericProps) => {
  const [quantity, setQuantity] = useState(1);
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    // Add product to cart
  };

  return (
    <div className="px-4">
      <div className="flex flex-wrap justify-evenly items-center gap-5">
        <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 h-full">
          <div className="aspect-w-3 aspect-h-4">
              <Image
                src={`/uploads/${product.image}`}
                alt={product?.name}
                className="object-cover rounded shadow-lg"
                width={500}
                height={500}
              />
        
          </div>
        </div>

        <div className="flex flex-col justify-end w-[336px] md:w-[304px] xs:w-full sm:w-full p-5 bg-background text-txt rounded-lg shadow-md gap-5">
          <h2 className="text-2xl font-bold mb-4 w-fit capitalize">{product?.name}</h2>
          <p className="text-lg mb-2">
            ${product?.price.toFixed(2)} /{product?.unit}
          </p>
          <p className="text-green-600 text-lg mb-4">
            ${(quantity * product?.price).toFixed(2)}{" "}
            <span className="text-sm">(Total for this items)</span>
          </p>
          <div className="flex justify-between items-center gap-2 w-full mb-4 py-[.1rem] px-1 bg-gray-700 rounded">
            <button
              onClick={decreaseQuantity}
              className={`w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 text-lightBG flex items-center justify-center ${
                quantity === 1 ? "stop-sign-cursor" : ""
              }`}
            >
              <i className="material-icons">remove_circle_outline</i>
            </button>

            <span className="text-lg font-medium text-lightBG">
              {quantity} {quantity < 2 ? product?.unit : product?.unit + "s"}
            </span>
            <button
              onClick={increaseQuantity}
              className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 text-lightBG flex items-center justify-center"
            >
              <i className="material-icons">add_circle_outline</i>
            </button>
          </div>
          <Buttons mode="primary" onClick={handleAddToCart}>
            Add To Cart
          </Buttons>
          <div className="flex justify-between items-center gap-2">
            <Links url="/products" mode="others" style="w-1/2">
              To lists
            </Links>
            <Links mode="others" style="w-1/2">
              To cart
            </Links>
          </div>
        </div>
      </div>
      <hr className="mt-16 mb-8" />
      <div className="mt-2 px-40 md:px-28 sm:px-8 xs:px-6">
        <h2 className="font-bold py-2">Details</h2>
        <p className="text-gray-600">{product?.description}</p>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const URL = getClientURL();
  try {
    const { productId } = context.query;
    const res = await axios.get(
      `${URL}/api/products/products?id=${productId}`
    );
    const product = res.data;
    return { props: { product } };
  } catch (error: any) {
    console.error(error.message);
    return { props: { product: null } };
  }
};

export default SingleProduct;
