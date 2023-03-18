import React, { useState } from 'react';
import Image from 'next/image';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Reset from '../auth/Reset';

const Navbar = ({ signup }: any) => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignModalOpen, setIsSignupModalOpen] = useState(false);
    const [isResetModalOpen, setIsResetModalOpen] = useState(false);
    
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
        <div className="bg-main xs:px-2 sm:px-2 px-8 py-0">
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
                <div className="flex w-48  items-center justify-end  gap-4">
                    <div
                        className="flex justify-center items-center w-7 h-7 rounded-full text-background"
                        style={{ backgroundColor: '#2ECC40' }}
                        onClick={() => openModal('login')}
                    >
                        <i className="material-icons">person</i>
                    </div>
                    <div
                        className="flex justify-center items-center w-7 h-7 rounded-full text-background"
                        style={{ backgroundColor: '#2ECC40' }}
                        onClick={() => openModal('signup')}
                    >
                        <i className="material-icons">person_add</i>
                    </div>
                    <div
                        className="flex justify-center items-center w-7 h-7 rounded-full text-background"
                        style={{ backgroundColor: '#2ECC40' }}
                        onClick={() => openModal('reset')}
                    >
                        <i className="material-icons">help_outline</i>
                    </div>
                </div>
            </nav>

            {isLoginModalOpen && (
                <Login setIsLoginModalOpen={setIsLoginModalOpen} setIsSignupModalOpen={setIsSignupModalOpen} setIsResetModalOpen={setIsResetModalOpen} />
            )}
            {isSignModalOpen && (
                <Register setIsSignupModalOpen={setIsSignupModalOpen} signup={signup} />
            )}
            {isResetModalOpen && (
                <Reset setIsResetModalOpen={setIsResetModalOpen} />
            )}
        </div>
    );
};

export default Navbar;
