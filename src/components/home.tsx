
import React from "react";
import AppSymbol from "./appsSymbol";
import { AppPage } from "./appsSymbol";

const appPages: AppPage[] = [
  {
    image: "/images/tomatos.jpg",
    name: "Products",
    page: "/products"
  },
  {
    image: "/images/tomatos.jpg",
    name: "Recipes",
    page: "/recipes"
  },
  {
    image: "/images/tomatos.jpg",
    name: "Interiors",
    page: "/virtual-interiors"
  },
  {
    image: "/images/tomatos.jpg",
    name: "Blogs",
    page: "/green-blogs"
  },
  {
    image: "/images/tomatos.jpg",
    name: "News",
    page: "/green-news"
  },
  {
    image: "/images/tomatos.jpg",
    name: "About Us",
    page: "/about"
  },
  {
    image: "/images/tomatos.jpg",
    name: "News",
    page: "/green-news"
  },
  {
    image: "/images/tomatos.jpg",
    name: "About Us",
    page: "/about"
  },
  {
    image: "/images/tomatos.jpg",
    name: "News",
    page: "/green-news"
  },
  
];


const Home = () => {
  return (
    <div className="w-fit grid grid-cols-3 gap-2">
      {
        appPages.map((page, index) => {
          return (
            <AppSymbol
              key={index}
              image={page.image}
              name={page.name}
              page={page.page}
            />
          )
        })}

    </div>
  )
}
export default Home;