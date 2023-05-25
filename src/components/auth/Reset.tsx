import React, { useState } from "react";
import Button from "../experiments/Button";
import axios from "axios";
import Link from "next/link";
const Reset = ({ setIsResetModalOpen }: any) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleResetSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const resp = await axios.post("/api/auth/forgotPassword", {
        email: email,
      });
      setMessage(resp.data.message);
    } catch (error: any) {
      const { response } = error.response && error;
      const { message } = error;
      setErrorMessage(response.data.message || message);
    }
    // codes here...
  };

  return (
    <div className="w-full h-full overlay bg-background flex justify-evenly items-center overflow-y-auto">
      <div
        className="text-3xl text-white text-center md:flex-grow lg:flex-grow xl:flex-grow h-full sm:h-[320px] xs:h-[320px] font-semibold hidden-xs hidden-sm"
        style={{
          backgroundImage: "url(/images/smiles.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>
      <div className="bg-background p-8 w-[546px] sm:mt-10 xs:mt-10 transform">
        <div className="w-3/4 sm:w-full xs:w-full flex flex-col mx-auto">
          <span className="sm:block xs:block hidden bg-main text-background text-center px-4 py-2 mb-8">
            Greenfie
          </span>
          {message && (
            <div className="my-2">
              <p className="text-main mb-1 px-2 text-notification text-center">
                {message}
              </p>
              <hr />
            </div>
          )}
          {errorMessage && (
            <p className="text-red-500 my-1 px-2 text-notification">
              {errorMessage}
            </p>
          )}
          <div className="flex justify-between items-center mb-4 px-2">
            <h1 className="text-lg font-bold text-black">Reset password</h1>
            <button
              aria-label="Close"
              onClick={() => setIsResetModalOpen(false)}
              className="material-icons"
              style={{ marginBottom: "14px" }}
            >
              close
            </button>
          </div>
          <div className="h-full w-full ">
            <form onSubmit={handleResetSubmit} className="p-2 flex flex-col">
              <div className="mb-4">
              <label className="px-1" htmlFor="email">Email</label>
                <input
                  className="w-full px-3 py-2 border border-gray-400 rounded-lg mt-1"
                  type="email"
                  id="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <p className="mb-4 text-[#1A77BC] text-center">
                We&apos;ll send you an email with instructions on how to reset
                your password.
              </p>
              <hr className="my-5" />
              <Button type="submit">Send</Button>
            </form>
          </div>
        </div>
        <div className="text-[#1A77BC] mt-[100px] mx-auto text-center">
          <Link href="/contact">Others Query?</Link>
        </div>
      </div>
    </div>
  );
};

export default Reset;
