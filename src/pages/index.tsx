import React from "react";
import axios from "axios";
import { GetServerSideProps } from "next";
import Greetings from "@/components/misc/landings.tsx/greetings";
import { GenericProps } from "@/utils/types";
import Hero from "@/components/misc/landings.tsx/hero";
import AppLists from "@/components/misc/landings.tsx/appLists";
import Testiminials from "@/components/misc/landings.tsx/testimonals";
const Home = ({ apps }: GenericProps) => {
  if (!apps.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-background text-txt gap-10 mt-24">
      <Greetings />
      <Hero />
      <AppLists apps={apps} />
      <Testiminials/>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await axios.get("http://127.0.0.1:9000/api/fav-apps");
    const apps = res.data;
    return { props: { apps } };
  } catch (error: any) {
    console.error(error.message);
    return { props: { apps: [] } };
  }
};

export default Home;
