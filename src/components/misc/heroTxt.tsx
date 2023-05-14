import React from "react";

const HeroText = () => {
 
  return (
    <div className="absolute bottom-0 w-full">
      <div className="bg-black xs:bg-opacity-25 sm:bg-opacity-25 bg-opacity-80 px-4 xs:py-6 sm:py-6 py-6">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <h2 className="text-background text-center text-lg font-medium mb-4 md:mb-6 uppercase">
            Discover fresh and local produce with Greenfie, BD's first rooftop
            vegetable hub{" "}
          </h2>
          
        </div>
      </div>
    </div>
  );
};

export default HeroText;
