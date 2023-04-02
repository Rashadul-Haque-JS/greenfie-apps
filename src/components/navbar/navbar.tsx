import React, { useEffect, useState, createContext } from "react";
import Image from "next/image";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Reset from "../auth/Reset";
import PasswordForm from "../auth/passwordForm";
import { useRouter } from "next/router";

export const AuthContext = createContext<any>([]);
const Navbar = ({ signup }: any) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignModalOpen, setIsSignupModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isPassFormOpen, setIsPassFormOpen] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState<any>();

  const router = useRouter();
  const openModal = (modalType: string) => {
    const modalStates = {
      login: [true, false, false],
      signup: [false, true, false],
      reset: [false, false, true],
      password: [false, false, false,true],
    } as any;

    setIsLoginModalOpen(modalStates[modalType][0]);
    setIsSignupModalOpen(modalStates[modalType][1]);
    setIsResetModalOpen(modalStates[modalType][2]);
    setIsPassFormOpen(modalStates[modalType][3])
  };

  useEffect(() => {
    const { confirmToken, email, login = null } = router.query;
    if ((confirmToken && email) || login) {
      setIsLoginModalOpen(true);
      setNewUserEmail(email);
    }
  }, []);

  useEffect(() => {
    const { confirmReset, email,  } = router.query;
    if ((confirmReset && email)) {
      setIsPassFormOpen(true);
      setNewUserEmail(email);
    }
  }, []);

  return (
    <AuthContext.Provider value={{newUserEmail}}>
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
              style={{ backgroundColor: "#2ECC40" }}
              onClick={() => openModal("login")}
            >
              <i className="material-icons cursor-pointer">person</i>
            </div>
            <div
              className="flex justify-center items-center w-7 h-7 rounded-full text-background"
              style={{ backgroundColor: "#2ECC40" }}
              onClick={() => openModal("signup")}
            >
              <i className="material-icons cursor-pointer">person_add</i>
            </div>
            <div
              className="flex justify-center items-center w-7 h-7 rounded-full text-background"
              style={{ backgroundColor: "#2ECC40" }}
              onClick={() => openModal("reset")}
            >
              <i className="material-icons cursor-pointer">help_outline</i>
            </div>
          </div>
        </nav>

        {isLoginModalOpen && (
          <Login
            setIsLoginModalOpen={setIsLoginModalOpen}
            setIsSignupModalOpen={setIsSignupModalOpen}
            setIsResetModalOpen={setIsResetModalOpen}
          />
        )}
        {isSignModalOpen && (
          <Register
            setIsSignupModalOpen={setIsSignupModalOpen}
            signup={signup}
          />
        )}
        {isResetModalOpen && (
          <Reset setIsResetModalOpen={setIsResetModalOpen} />
        )}
        {isPassFormOpen && (
          <PasswordForm setIsPassFormOpen={setIsPassFormOpen} />
        )}
      </div>
    </AuthContext.Provider>
  );
};

export default Navbar;
