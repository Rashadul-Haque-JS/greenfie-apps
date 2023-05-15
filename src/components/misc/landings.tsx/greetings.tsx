import React from "react";
import { useDispatch } from "react-redux";
import { setSignup } from "@/store/features/auth";

const Greetings = () => {
  const dispatch = useDispatch()
  const handleOptReg = () => {
   dispatch(setSignup(true))
  };
  return (
    <div className=" px-4 xs:py-6 sm:py-6 py-6 w-full " style={{backgroundImage: `linear-gradient(to bottom, #6ab04c, #3d8c35)`
    }}>
      <div className="flex flex-col md:flex-row justify-center items-center gap-4">
        <h1 className="text-background text-center text-2xl lg:text-3xl xl:text-3xl font-bold mb-4 md:mb-0">
        Fresh veggies. Connect & Share. Grow Together</h1>
        <button onClick={handleOptReg}
          className="btn-main relative bg-txt text-background rounded-full py-3 px-8 font-bold hover:bg-opacity-70 transition duration-300 ease-in-out cursor-pointer"
        >
          Sign Up Now
        </button>
      </div>
    </div>
  );
};

export default Greetings;
