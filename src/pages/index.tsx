import React, { useEffect} from "react";
import Greetings from "@/components/misc/landings.tsx/greetings";
import Hero from "@/components/misc/landings.tsx/hero";
import AppLists from "@/components/misc/landings.tsx/appLists";
import Testiminials from "@/components/misc/landings.tsx/testimonals";
import { useDispatch } from "react-redux";
import { setSignupIcon } from "@/store/features/auth";
import AskToAct from "@/components/misc/landings.tsx/askToAct";
import { getCookies } from "@/utils/cookies";
import favapps from "@/utils/data/fav-app";

const Home = () => {
  const dispatch = useDispatch();
  const handleScroll = () => {
    const scrolledPixels = window.pageYOffset;

    if (scrolledPixels >= 166) {
      dispatch(setSignupIcon(true));
    } else {
      dispatch(setSignupIcon(false));
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!favapps.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-background text-txt gap-10 mt-24">
      {!getCookies('token') ? <Greetings />:<AskToAct />}
      <Hero />
      <AppLists apps={favapps} />
      <Testiminials />
    </div>
  );
};



export default Home;
