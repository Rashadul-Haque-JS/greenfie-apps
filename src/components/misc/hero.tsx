import React from "react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="w-full">
      <div className="relative">
        <Image
          src="/images/hero_tom.jpg"
          alt="Hero image"
          className="object-cover brightness-105 contrast-115 h-full w-full md:h-[180px] lg:h-[280px] xl:h-[330px] rounded rounded-b-none"
          width={500}
          height={500}
        />
        <div className="absolute bottom-0 right-0 mr-2 mb-2">
          <Link href="/dashboard">
            <span className=" text-txt btn-glass-screen font-medium bold ">
              Dashboard
            </span>
          </Link>
        </div>
      </div>
      <div className="bg-main text-white p-5 md:px-2 md:pt-3 lg:p-10 xl:p-10 z-20 rounded rounded-t-none">
        <h2 className="text-xl text-black">lorem</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
      </div>
    </div>
  );
};

export default Hero;
