import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative w-full h-[280px] sm:h-[360px] md:h-[480px] 2xl:h-[640px]">
      <Image
        src="/images/products.png"
        alt="Hero image"
        className="object-cover w-full h-full"
        layout="fill"
      />
      <div className="absolute bottom-0 w-full bg-gray-800 xs:bg-opacity-25 sm:bg-opacity-25 bg-opacity-80 px-4 xs:py-6 sm:py-6 py-6">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <h2 className="text-white text-center text-lg font-medium mb-4 md:mb-6 uppercase">
            Discover fresh and local produce with Greenfie, BD's first rooftop
            vegetables hub
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Hero;
