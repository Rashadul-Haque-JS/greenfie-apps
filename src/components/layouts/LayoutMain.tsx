import React from "react"
import { useRouter } from 'next/router';
import Head from "next/head"
import Navbar from "../navbar/navbar";
import NavbarPrivate from "../navbar/NavPrivate"

const Layout = ({ children }:any) => {
  const {pathname}= useRouter();
  console.log(pathname);
  
  return (
    <div className="mx-auto min-h-screen bg- ">
      <Head>
        <title>Greenfie</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
    
      </Head>
      <header className="bg-white shadow-md ">
        {pathname === "/" ? <Navbar/> : <NavbarPrivate/>}
      </header>
      <main className="container w-full lg:w-5/6 xl:w-5/6 lg:float-right xl:float-right mx-auto px-4 mt-20">
        {children}
      </main>
      <footer className="bg-black text-light h-48 md:hidden lg:hidden xl:hidden mx-6 mb-6 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] mt-12 rounded">
        <p className="px-4">Greenfie</p>
      </footer>
    </div>
  )
}

export default Layout
