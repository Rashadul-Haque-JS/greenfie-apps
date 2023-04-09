import React from "react";
type ObjectProps ={
[key: string]:any
}

type TIcon = {
user:ObjectProps;
toLogin:()=>void;
}
const RenderNavIcon = ({ user, toLogin }: TIcon) => {
  return (
    <>
      {user.name && (
        <div className="text-3xl text-white font-bold rounded-full bg-white w-5 h-5"></div>
      )}
      {!user.name && (
        <div
          className="flex justify-center items-center w-7 h-7 rounded-full text-background"
          style={{ backgroundColor: "#2ECC40" }}
          onClick={toLogin}
        >
          <i className="material-icons cursor-pointer">person</i>
        </div>
      )}
    </>
  );
};

export default RenderNavIcon;
