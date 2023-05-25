import React, { useEffect, useState, createContext } from "react";
import Logo from "../misc/logo";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Reset from "../auth/Reset";
import PasswordForm from "../auth/passwordForm";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import RenderNavIcon from "./navPartials/renderIcons";

export const AuthContext = createContext<any>([]);
const Navbar = ({ signup }: any) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignModalOpen, setIsSignupModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isPassFormOpen, setIsPassFormOpen] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState<any>();
  const [usr, setUsr] = useState<any>();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.auth);
  const isSignup = useSelector((state: RootState) => state.auth.signup);
  const isSignupIcon = useSelector((state: RootState) => state.auth.signupIcon);

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
  }, [router.query]);
  
  useEffect(() => {
    const { resetPasswordToken, email } = router.query;
    if (resetPasswordToken && email) {
      setIsLoginModalOpen(false);
      setIsPassFormOpen(true);
      setNewUserEmail(email);
    }
  }, []);

  useEffect(() => {
    if (user) {
      setUsr(user);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ newUserEmail }}>
      <div
        className="bg-main xs:px-1.5 sm:px-1.5 px-5 py-1"
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 999 }}
      >
        <nav className="mx-auto flex justify-between py-2 items-center">
          <Logo />
          {!usr?.name && (
            <div className="flex w-48  items-center justify-end  gap-4">
              <div
                className="flex justify-center items-center  w-[28px] h-[28px] rounded-full text-background bg-green"
                onClick={() => openModal("login")}
              >
                <i className="material-icons cursor-pointer">person</i>
              </div>
              {isSignupIcon && (
                <div
                  className="flex justify-center items-center  w-[28px] h-[28px] rounded-full text-background bg-green"
                  onClick={() => openModal("signup")}
                >
                  <i className="material-icons cursor-pointer">person_add</i>
                </div>
              )}
              <div
                className="flex justify-center items-center  w-[28px] h-[28px] rounded-full text-background bg-green"
                onClick={() => openModal("reset")}
              >
                <i className="material-icons cursor-pointer">help_outline</i>
              </div>
            </div>
          )}
          {usr?.name && <RenderNavIcon isLogoutIcon={true} />}
        </nav>

        {isLoginModalOpen && (
          <Login
            setIsLoginModalOpen={setIsLoginModalOpen}
            setIsSignupModalOpen={setIsSignupModalOpen}
            setIsResetModalOpen={setIsResetModalOpen}
          />
        )}
        {(isSignModalOpen || isSignup) && (
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
