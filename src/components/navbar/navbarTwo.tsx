import React, { useState } from 'react';

const NavbarTwo = () => {
  const [activeParent, setActiveParent] = useState(-1);
  const handleClick = (i:any) => {
    setActiveParent(activeParent === i ? -1 : i);
  };
  
  return (
    <nav className="flex flex-col md:flex-row justify-between items-center p-4">
      <div className="md:hidden">
        <button className="bg-gray-500 p-3 rounded-lg">
          Hamburger menu
        </button>
      </div>
      <div className="hidden md:block">
        <img src="logo.png" alt="Logo" />
      </div>
      <div className="flex-1 md:ml-auto">
        {['Parent 1', 'Parent 2', 'Parent 3'].map((parent, i) => (
          <div key={i} className="relative">
            <button
              className="px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300"
              onClick={() => handleClick(i)}
            >
              {parent}
              {activeParent === i ? (
                <i className="fas fa-minus ml-2" />
              ) : (
                <i className="fas fa-plus ml-2" />
              )}
            </button>
            {activeParent === i && (
              <div className="w-full bg-gray-300 p-4">
                Child content for {parent}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default NavbarTwo;
