import React, { useState, createContext } from "react";
import Link from "next/link";
import { useMediaQuery } from "@material-ui/core";
import Image from "next/image";
import { removeCookie } from "@/server/utils/cookies";
import DeshboardLink from "../../misc/deshboardLink";
import { logoutAuth } from "@/store/features/auth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import NavLinks from "./NavLinks";
import router from "next/router";
import RenderNavIcon from "../partials/IconLoginOrProfile";
import { getCookies } from "@/server/utils/cookies";

export const NavContext = createContext<any>([]);
const Navbar = () => {
  const isMobileScreen = useMediaQuery("(max-width: 960px)");
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.auth);
  const token = getCookies('token')
  const handleClickOpen = () => {
    if (isMobileScreen) {
      setIsOpen(true);
    }
  };

  const toLogin = () => {
    const randomString = [...Array(10)]
      .map(() => Math.random().toString(36)[2])
      .join("");
    router.push(`/?login=${randomString}`);
  };

  const handleLogout = () => {
    try {
     removeCookie('token')
      dispatch(logoutAuth());
      window.location.href = "/";
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <NavContext.Provider value={{ setIsOpen }}>
      <div className="flex flex-col lg:flex-row xl:flex-row justify-between lg:justify-start xl:justify-start bg-main xs:px-3 sm:px-3 px-8 py-2 fixed top-0 left-0 w-full z-40 ">
        <div className="flex justify-between items-center lg:hidden xl:hidden">
          <button
            className="text-white p-0 rounded-full text-4xl"
            type="button"
            data-drawer-target="drawer-navigation"
            data-drawer-show="drawer-navigation"
            aria-controls="drawer-navigation"
            onClick={handleClickOpen}
          >
            &#9776;
          </button>
          <div className="text-2xl text-white font-bold">Greenfie</div>
          <RenderNavIcon user={user} toLogin={toLogin} />
        </div>
        <div className="hidden w-full lg:flex xl:flex justify-between items-center ">
          <Link href="/">
            <Image
              className="w-[36px] h-auto"
              src="/images/greenfie.png"
              alt="Greenfie logo"
              width={500}
              height={500}
            />
          </Link>
          <RenderNavIcon user={user} toLogin={toLogin} />
        </div>
        <div
          id="drawer-navigation"
          className={`fixed sm:top-0 sm:left-0 xs:top-0 xs:left-0 md:top-0 md:left-0 w-80 lg:top-[56px] lg:left-[240px] xl:top-[51px] xl:left-[240px] z-40 h-screen px-4 lg:pr-0 xl:pr-0 overflow-y-auto xs:transition-transform sm:transition-transform md:transition-transform ${
            isOpen ? "" : "-translate-x-full"
          } bg-main dark:bg-gray-800`}
          tabIndex={-1}
          aria-labelledby="drawer-navigation-label"
        >
          <hr className="hidden lg:block xl:block" />
          <h5
            id="drawer-navigation-label"
            className="text-2xl font-semibold text-white py-4 lg:hidden xl:hidden"
          >
            <Link href="/">Greenfie</Link>
          </h5>
          <button
            type="button"
            data-drawer-hide="drawer-navigation"
            aria-controls="drawer-navigation"
            className="text-gray-400 bg-transparent hover:text-txt rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white lg:hidden xl:hidden"
          >
            <div className="bg-white rounded-full w-12 h-12 flex justify-center items-center">
              <svg
                className="w-5 h-5"
                fill="#000"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <span className="sr-only">Close menu</span>
          </button>
          <div className="text-xl text-white text-center hidden lg:block xl:block font-semibold pt-4">
            Greenfie
          </div>
          <div className="py-4 overflow-hidden lg:flex lg:justify-end xl:flex xl:justify-end lg:p-[5px] xl:p-[5px]">
            <ul className="space-y-2 w-full lg:ml-16 xl:ml-16 ">
              <hr />
              <li>
                <DeshboardLink />
              </li>
              <hr />
              <NavLinks />
              {token && (
                <li>
                  <button
                    type="button"
                    className="flex items-center p-2 text-base font-normal text-txt rounded-lg hover:text-background"
                  >
                    <svg
                      className="flex-shrink-0 w-6 h-6 text-txt transition duration-75 group-hover:text-background dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                      <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                    </svg>
                    <span
                      className="flex-1 ml-3 whitespace-nowrap"
                      onClick={handleLogout}
                    >
                      Logout
                    </span>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </NavContext.Provider>
  );
};
export default Navbar;
