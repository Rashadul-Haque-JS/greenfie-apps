import React from "react";
import { useDispatch } from "react-redux";
import { setSignup } from "@/store/features/auth";

const Greetings = () => {
  const dispatch = useDispatch()
  const handleOptReg = () => {
   dispatch(setSignup(true))
  };
  return (
    <div className="bg-txt px-4 xs:p-4 sm:p-4 md:p-6 w-full">
      <p className="text-lime-400 text-center text-xs md:text-base font-medium mb-4 md:mb-6">
        WELCOME TO THE FIRST ROOF VEGETABLES WEBSITE IN BD
      </p>
      <div className="flex flex-col md:flex-row justify-center items-center gap-6">
        <h1 className="text-background text-center text-2xl md:text-4xl font-bold mb-4 md:mb-0">
          Eat Fresh and Buy Local
        </h1>
        <button onClick={handleOptReg}
          className="relative bg-main text-background rounded-full py-3 px-8 font-bold hover:bg-opacity-70 transition duration-300 ease-in-out"
        >
          {" "}
          Sign Up Now
        </button>
      </div>
    </div>
  );
};

export default Greetings;
