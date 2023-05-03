import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

type TIcon = {
  toLogin: () => void;
}
const RenderNavIcon = ({ toLogin }: TIcon) => {
  const [usr, setUsr] = useState<any>();
  const user = useSelector((state: RootState) => state.auth.auth);
  useEffect(() => {
    if (user) {
      setUsr(user);
    }
  }, [user]);

  return (
    <>
      {usr?.name && (
        // <div className="text-3xl text-white font-bold rounded-full bg-white w-5 h-5"></div>
        <div className="flex justify-center items-center w-7 h-7 rounded-full text-background"
          style={{ backgroundColor: "#2ECC40" }}>
          <i className="material-icons cursor-pointer">check</i>
        </div>
      )}
      {!usr?.name && (
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
