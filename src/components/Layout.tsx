import React from 'react'
import Head from 'next/head'
import NavbarThree from './navbar/NavProducts'
const Layout = ({ children }:any) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Greenfie</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@1.4.0/dist/tailwind.min.css" integrity="sha384-rqrEuvy7V2Q6CKjhV8U6pXU6swsUvhGc0Wjwhx1xEsAZFwOvovhOej8QX9VCz7G"  />
      </Head>
      <header className="bg-white shadow-md">
        <NavbarThree/>
      </header>
      <main className="container mx-auto p-4">
        {children}
      </main>
      <footer className="bg-black text-light h-48 md:hidden lg:hidden xl:hidden mx-6 mb-6 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] mt-12 rounded">
        <p className="px-4">Greenfie</p>
      </footer>
    </div>
  )
}

export default Layout
