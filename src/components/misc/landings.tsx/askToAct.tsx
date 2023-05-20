import React from "react";
import Link from "next/link";

const AskToAct = () => {

  return (
    <div
      className=" px-4 xs:py-6 sm:py-6 py-6 w-full "
      style={{
        backgroundImage: `linear-gradient(to bottom, #6ab04c, #3d8c35)`,
      }}
    >
      <div className="flex flex-col md:flex-row justify-center items-center gap-4">
        <h1 className="text-background text-center text-2xl lg:text-3xl xl:text-3xl font-bold mb-4 md:mb-0">
        Harvesting Unity. Cultivating Connections. Prospering Together.
        </h1>
        <div className="flex justify-center items-center gap-3">
          <Link
            href="/products"
            className="btn-main relative bg-txt text-background rounded-lg py-3 px-8 font-bold hover:bg-opacity-70 transition duration-300 ease-in-out cursor-pointer"
          >
            BUY
          </Link>
          <Link
            href="/products/productCreate"
            className="btn-main relative bg-txt text-background rounded-lg py-3 px-8 font-bold hover:bg-opacity-70 transition duration-300 ease-in-out cursor-pointer"
          >
            SALE
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AskToAct;
