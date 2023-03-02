import React, { useState } from 'react';
import Image from 'next/image';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // perform login logic here
    // if successful, close the modal
     setIsModalOpen(false);
  };

  return (
    <div className="bg-main xs:px-3 sm:px-3 px-8 py-0">
      <nav className="mx-auto flex justify-between py-2 items-center">
        <div className="h-fit">
          <Image
            className="w-[36px] h-auto"
            src="/images/greenfie.png"
            alt="Greenfie logo"
            width={500}
            height={500}
          />
        </div>
        <div className="flex w-48 justify-evenly items-center">
          <div
            className="nav-item login"
            style={{ backgroundColor: 'green' }}
            onClick={() => setIsModalOpen(true)}
          >
            Login
          </div>
          <div className="nav-item signup" style={{ backgroundColor: 'red' }}>
            Signup
          </div>
          <div className="nav-item help" style={{ backgroundColor: 'yellow' }}>
            Help
          </div>
        </div>
      </nav>

      {isModalOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full overlay bg-black flex justify-center items-center"
        >
          <div className=" bg-background p-8 rounded-lg w-[340px]">
            <div className='flex justify-between items-center'>
            <span className="text-lg font-bold mb-4"></span>
            <i onClick={() => setIsModalOpen(false)} className="material-icons">close</i>
            </div>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-400 rounded-lg"
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-400 rounded-lg"
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
