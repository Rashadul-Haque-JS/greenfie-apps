import React, { useEffect, useState, createContext } from "react";
import Image from "next/image";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Reset from "../auth/Reset";
import PasswordForm from "../auth/passwordForm";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import RenderNavIcon from "./partials/IconLoginOrProfile";

export const AuthContext = createContext<any>([]);
const Navbar = ({ signup }: any) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignModalOpen, setIsSignupModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isPassFormOpen, setIsPassFormOpen] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState<any>();
  const [usr, setUsr] = useState<any>();
  const router = useRouter();
  const openModal = (modalType: string) => {
    const modalStates = {
      login: [true, false, false],
      signup: [false, true, false],
      reset: [false, false, true],
      password: [false, false, false, true],
    } as any;

    setIsLoginModalOpen(modalStates[modalType][0]);
    setIsSignupModalOpen(modalStates[modalType][1]);
    setIsResetModalOpen(modalStates[modalType][2]);
    setIsPassFormOpen(modalStates[modalType][3]);
  };

  useEffect(() => {
    const { confirmToken, email, login = null } = router.query;
    if ((confirmToken && email) || login) {
      setIsLoginModalOpen(true);
      setNewUserEmail(email);
    }
  }, []);

  useEffect(() => {
    const { resetPasswordToken, email } = router.query;
    if (resetPasswordToken && email) {
      setIsLoginModalOpen(false);
      setIsPassFormOpen(true);
      setNewUserEmail(email);
    }
  }, []);

  const user = useSelector((state: RootState) => state.auth.auth);
  useEffect(() => {
    if (user) {
      setUsr(user);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ newUserEmail }}>
      <div className="bg-main xs:px-1.5 sm:px-1.5 px-5 py-0">
        <nav className="mx-auto flex justify-between py-2 items-center">
          <div className="h-fit">
            <Image
              className="w-[30px] h-auto"
              src="/images/greenfie.png"
              alt="Greenfie logo"
              width={500}
              height={500}
            />
          </div>
          {!usr?.name && (
            <div className="flex w-48  items-center justify-end  gap-4">
              <div
                className="flex justify-center items-center  w-[30px] h-[30px] rounded-full text-background bg-green"
                onClick={() => openModal("login")}
              >
                <i className="material-icons cursor-pointer">person</i>
              </div>
              <div
                className="flex justify-center items-center  w-[30px] h-[30px] rounded-full text-background bg-green"
                onClick={() => openModal("signup")}
              >
                <i className="material-icons cursor-pointer">person_add</i>
              </div>
              <div
                className="flex justify-center items-center  w-[30px] h-[30px] rounded-full text-background bg-green"
                onClick={() => openModal("reset")}
              >
                <i className="material-icons cursor-pointer">help_outline</i>
              </div>
            </div>
          )}
        {usr?.name && <RenderNavIcon isLogoutIcon={true}/>}
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
          <PasswordForm
            setIsPassFormOpen={setIsPassFormOpen}
            setIsLoginModalOpen={setIsLoginModalOpen}
          />
        )}
      </div>
    </AuthContext.Provider>
  );
};

export default Navbar;
