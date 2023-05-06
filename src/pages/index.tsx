import React from "react";
import axios from "axios";
import { GetServerSideProps } from "next";
import AppSymbol from "@/components/misc/appsSymbol";
import Hero from "@/components/misc/hero";
import { GenericProps, IApps } from "@/utils/types";
import Greetings from "@/components/misc/greetings";

const Home = ({ apps }: GenericProps) => {
  if (!apps.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex flex-col items-center gap-6 xs:gap-8 sm:gap-8">
      <div className="flex justify-center w-full">
        <Greetings />
      </div>
      <div className="w-full flex flex-wrap justify-center mx-6 items-start gap-10 md:gap-20 lg:gap-24 xl:gap-52 md:pb-8 md:pt-5 lg:pb-8 lg:pt-5 xl:pt-5 xl:pb-8 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
        <div className="w-full md:w-2/4 md:h-[164px] lg:w-[440px] xl:w-2/5 bg-gray-900 rounded ">
          <Hero />
        </div>
        <div
          className="w-full md:w-1/3 lg:w-1/3 xl:w-1/3 bg-screen"
          style={{ borderRadius: "16px" }}
        >
          <div className="w-full grid grid-cols-3 gap-2 place-items-center justify-content-center px-4 glass-screen pt-3">
            {apps.map((page: IApps, index: number) => {
              return (
                <AppSymbol
                  key={index}
                  image={page.image}
                  name={page.name}
                  page={page.page}
                />
              );
            })}
          </div>
        </div>
      </div>
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
