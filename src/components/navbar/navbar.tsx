import React, { useState } from 'react';
import Image from 'next/image';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Reset from '../auth/Reset';

const Navbar = ({signup}:any) => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignModalOpen, setIsSignupModalOpen] = useState(false);
    const [isResetModalOpen, setIsResetModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const openModal = (modalType: string) => {
        const modalStates = {
          login: [true, false, false],
          signup: [false, true, false],
          reset: [false, false, true]
        } as any
      
        setIsLoginModalOpen(modalStates[modalType][0]);
        setIsSignupModalOpen(modalStates[modalType][1]);
        setIsResetModalOpen(modalStates[modalType][2]);
      
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
                        onClick={() => openModal('login')}
                    >
                        Login
                    </div>
                    <div className="nav-item signup" style={{ backgroundColor: 'red' }} onClick={() => openModal('signup')}>
                        Signup
                    </div>
                    <div className="nav-item help" style={{ backgroundColor: 'yellow' }} onClick={() => openModal('reset')}>
                        Help
                    </div>
                </div>
            </nav>

            {isLoginModalOpen && (
                <Login setIsLoginModalOpen={setIsLoginModalOpen} setIsSignupModalOpen={setIsSignupModalOpen} setIsResetModalOpen={setIsResetModalOpen}/>
            )}
            {isSignModalOpen && (
                <Register setIsSignupModalOpen={setIsSignupModalOpen} signup={signup}/>
            )}
            {isResetModalOpen && (
                <Reset setIsResetModalOpen={setIsResetModalOpen}/>
            )}
        </div>
    );
};

export default Navbar;
