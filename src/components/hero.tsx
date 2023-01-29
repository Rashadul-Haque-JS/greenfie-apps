import React from 'react';

const Hero = () => {
  return (
    <div className="relative md:h-[456px] bg-gray-900 rounded-lg ">
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-75 rounded-lg"></div>
      <img src='/images/tomatos.jpg' alt="Hero image" className="object-cover h-full w-full rounded-lg" />
      <div className="absolute inset-0 flex items-center justify-center text-white">
        <h1 className="text-4xl font-medium">Welcome to Greenfie</h1>
      </div>
    </div>
  )
}

export default Hero;
