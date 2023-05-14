import React from "react";
import axios from "axios";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Greetings from "@/components/misc/greetings";
import { GenericProps, IApps } from "@/utils/types";
import HeroText from "@/components/misc/heroTxt";

const Home = ({ apps }: GenericProps) => {
  if (!apps.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-background text-txt gap-10">
      <Greetings />
      <div className="relative w-full h-[280px] sm:h-[360px] md:h-[480px] 2xl:h-[640px]">
        <Image
          src="/images/hero_tom.jpg"
          alt="Hero image"
          className="object-cover w-full h-full"
          layout="fill"
        />
        <HeroText />
      </div>
      <div className="bg-gray-100 w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-8 text-center">
            Green Tour
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
            {apps.map((page: IApps) => (
              <Link
                key={page.name}
                href={page.page}
                className="block rounded-md shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
              >
                <div className="relative h-40 sm:h-48 md:h-56 w-full">
                  <Image
                    src={page.image}
                    alt={`${page.name} icon`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="px-4 py-2 md:px-6 md:py-4">
                  <p className="text-base font-medium mb-1">{page.name}</p>
                  <p className="text-sm text-gray-500">{page.name}</p>
                </div>
              </Link>
            ))}
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
