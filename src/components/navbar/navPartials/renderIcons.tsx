import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Link from "next/link";
import { removeCookie } from "@/utils/cookies";
import { logoutAuth } from "@/store/features/auth";
import { useRouter } from "next/router";

type TIcon = {
  toLogin?: () => void;
  isLogoutIcon: boolean;
};
const RenderNavIcon = ({ toLogin, isLogoutIcon }: TIcon) => {
  const [isProfile, setIsProfile] = useState<boolean>(false);
  const [usr, setUsr] = useState<any>();
  const user = useSelector((state: RootState) => state.auth.auth);
  const dispatch = useDispatch();
  const { pathname } = useRouter();

  useEffect(() => {
    if (user) {
      setUsr(user);
    }
    setTimeout(() => {
      if (isProfile) {
        setIsProfile(false);
      }
    }, 5000);
  }, [user, isProfile]);

  const handleLogout = () => {
    try {
      removeCookie("token");
      dispatch(logoutAuth());
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }else{
        window.location.reload()
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const letterIcon = () => {
    const letter = user && usr?.name.slice(0, 1);
    return <span>{letter.toUpperCase()}</span>;
  };

  return (
    <>
      {usr?.name && (
        <>
          {!isProfile && pathname !== "/profile/auth-user" && (
            <div
              className="flex justify-center items-center w-[28px] h-[28px] rounded-full text-background bg-green cursor-pointer font-bold"
              onClick={() => setIsProfile(!isProfile)}
            >
              {letterIcon()}
            </div>
          )}
          {!isProfile && pathname === "/profile/auth-user" && (
            <div
              className="flex justify-center items-center w-[28px] h-[28px] rounded-full text-background bg-green cursor-pointer font-bold"
            >
              {letterIcon()}
            </div>
          )}
          {isProfile && (
            <div
              className={`flex justify-${
                isLogoutIcon ? "between" : "end"
              } items-center px-2 gap-${isLogoutIcon ? 2 : 0} float-right`}
              style={{ maxWidth: isLogoutIcon ? "fit-content" : "28px" }}
            >
              {isLogoutIcon && (
                <span
                  className="rounded px-2 text-white glass-screen"
                  onClick={handleLogout}
                >
                  Logout
                </span>
              )}
              <Link
                href="/profile/auth-user"
                className="rounded px-2 text-white glass-screen"
                onClick={() => setIsProfile(!isProfile)}
              >
                Profile
              </Link>
            </div>
          )}
        </>
      )}
      {!usr?.name && (
        <div
          className="flex justify-center items-center w-[28px] h-[28px] rounded-full text-background bg-green"
          onClick={toLogin}
        >
          <i className="material-icons cursor-pointer">person</i>
        </div>
      )}
    </>
  );
};

export default RenderNavIcon;
