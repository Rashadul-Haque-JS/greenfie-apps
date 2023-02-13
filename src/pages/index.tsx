import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import HomePage from "@/components/home";
import Hero from "@/components/hero";
import Layout from "@/components/Layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Layout>
      <div className="container h-full mx-auto ">
        {/* <section className="md:min-h-[120px]">
        <h1 className="text-main my-8 text-[1.2rem] px-4">Welcome to Greenfie</h1>
        </section> */}
        <div className="flex flex-wrap justify-center mx-6 p-4 items-start gap-10 md:gap-20 first-letter: lg:gap-36 xl:gap-52 md:py-10 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] mt-12">
          <Hero />
          <HomePage />
        </div>

      </div>
      
    </Layout>
  );
}
