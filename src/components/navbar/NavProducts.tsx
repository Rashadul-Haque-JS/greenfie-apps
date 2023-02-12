import React, { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeParent, setActiveParent] = useState(-1);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between  p-4 bg-gray-900">
      <div className="flex items-start lg:hidden xl:hidden">
        <button
          className="text-white p-2 rounded-full hover:bg-gray-700"
          onClick={toggle}
        >
          &#9776;
        </button>
      </div>
      <div className="flex items-center hidden lg:flex xl:flex">
        <img src="logo.png" alt="Logo" />
      </div>
      <div
        className={`navbar__drawer ${
          isOpen ? 'navbar__drawer--open' : ''
        } lg:hidden absolute left-0 w-full bg-gray-800 md:w-1/5 lg:w-1/5 xl:w-1/5 h-full` }
      >
        <div className="relative">
          <div
            className="absolute top-0 right-0"
            onClick={() => setIsOpen(false)}
          >
            <button className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700">
              &times;
            </button>
          </div>
          <div className="p-4">
            <div
              className="w-full bg-gray-700 p-2 rounded-lg cursor-pointer"
              onClick={() => {
                setActiveParent(activeParent === 0 ? -2 : 0);
              }}
            >
              Parent 1
              <div
                className="float-right"
                style={{ transform: `rotate(${activeParent === 0 ? '135deg' : '45deg'})` }}
              >
                &#43;
              </div>
            </div>
            {activeParent === 0 && (
              <div className="w-full bg-gray-300 p-4 mt-2">
                Child content for Parent 1
              </div>
            )}
          </div>
          <div className="p-4">
            <div
              className="w-full bg-gray-700 p-2 rounded-lg cursor-pointer"
              onClick={() => {
                setActiveParent(activeParent === 0 ? -2 : 0);
              }}
            >
              Parent 2
              <div
                className="float-right"
                style={{ transform: `rotate(${activeParent === 0 ? '135deg' : '45deg'})` }}
              >
                &#43;
              </div>
            </div>
            {activeParent === 0 && (
              <div className="w-full bg-gray-300 p-4 mt-2">
                Child content for Parent 1
              </div>
            )}
          </div>
          <div className="p-4">
            <div
              className="w-full bg-gray-700 p-2 rounded-lg cursor-pointer"
              onClick={() => {
                setActiveParent(activeParent === 0 ? -1 : 0);
              }}
            >
              Parent 3
              <div
                className="float-right"
                style={{ transform: `rotate(${activeParent === 0 ? '135deg' : '45deg'})` }}
              >
                &#43;
              </div>
            </div>
            {activeParent === 0 && (
              <div className="w-full bg-gray-300 p-4 mt-2">
                Child content for Parent 1
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
