import Link from "next/link";
import React, { useState, useContext, useEffect } from "react";
import navs from "@/utils/data/navbar";
import { toggleStates } from "@/utils/data/misc";
import { NavContext } from "./NavPrivate";
import pathname from "@/components/misc/pathname";
import { GenericProps } from "@/utils/types";
const NavLinks = () => {
  const { setIsOpen } = useContext(NavContext);
  const [styleState, setStyleState] = useState<GenericProps>(toggleStates);
  const [openNav, setOpenNav] = useState<any>();

  const toggleStyleState = (componentName: any) => {
    if (openNav === componentName) {
      setOpenNav("");
    } else {
      setOpenNav(componentName);
    }
    setStyleState((prevState: any) => {
      // Set all keys in styleState to false except the current componentName
      const newState = Object.keys(prevState).reduce((acc:any, key) => {
        acc[key] = key === componentName;
        return acc;
      }, {});
      return newState;
    });
  };

  const renderPlusIcon = (key: string) => {
    return styleState[key] && openNav === key ? (
      <i className="material-icons text-[18px] text-gray-200">visibility_off</i>
    ) : (
      <i className="material-icons text-[18px] text-gray-200">remove_red_eye</i>
    );
  };
  
  const handleClickClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {navs.map((nav) => (
        <>
          <li>
            <button
              type="button"
              className="flex items-center w-full p-2 text-base font-normal text-txt hover:text-background transition duration-75 rounded-lg group "
              aria-controls={nav.name}
              data-collapse-toggle={nav.name}
              onClick={() => toggleStyleState(nav.name)}
            >
              <svg
                className="flex-shrink-0 w-6 h-6 text-txt transition duration-75 group-hover:text-background dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span
                className={`flex-1 ml-3 text-left whitespace-nowrap capitalize ${
                  nav.links.some((link) => link.route === pathname())
                    ? "text-background"
                    : "text-txt"
                }`}
              >
                {nav.name}
              </span>
              {renderPlusIcon(nav.name)}
            </button>
            <ul
              id={nav.name}
              className={`py-2 space-y-2  bg-lightGreen ${
                openNav === nav.name ? "" : "hidden"
              }`}
            >
              {nav?.links?.map((link: any) => (
                <li>
                  <Link
                    href={link.route}
                    className="flex items-center w-full p-2 text-base font-normal text-txt transition duration-75 rounded-lg pl-11 group capitalize "
                    key={link.route}
                    onClick={handleClickClose}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <hr />
        </>
      ))}
    </>
  );
};

export default NavLinks;
