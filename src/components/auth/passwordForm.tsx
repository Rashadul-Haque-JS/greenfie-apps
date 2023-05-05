import React, { useState, useContext, useEffect } from "react";
import Button from "../experiments/Button";
import { AuthContext } from "../navbar/navbar";
import axios from "axios";
import router from "next/router";
import { toast } from "react-toastify";

const PasswordForm = ({ setIsPassFormOpen, setIsLoginModalOpen }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { newUserEmail } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordSubmit = async (e: any) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    try {
      const resp = await axios.post("/api/auth/updateForgotPassword", {
        email: email,
        password: password,
      });
      setIsPassFormOpen(false);
      router.replace("/");
      setIsLoginModalOpen(true);
      toast.success(resp.data.message);
    } catch (error: any) {
      const { response } = error.response && error;
      const { message } = error;
      setErrorMessage(response.data.message || message);
    }
  };

  useEffect(() => {
    if (newUserEmail) {
      setEmail(newUserEmail);
    }
  }, [newUserEmail]);

  return (
    <div className="fixed top-0 left-0 w-full h-full overlay bg-background flex flex-wrap-reverse justify-evenly items-center overflow-y-auto">
      <div
        className="text-3xl text-white text-center md:flex-grow lg:flex-grow xl:flex-grow  h-full sm:h-[320px] xs:h-[320px] font-semibold "
        style={{
          backgroundImage: "url(/images/smiles.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>
      <div className="bg-background p-8 w-[546px] sm:mt-10 xs:mt-10 transform translate-y-[-100px] sm:translate-y-[100px] xs:translate-y-[100px]">
        <div className="w-3/4 sm:w-full xs:w-full flex flex-col mx-auto">
          <span className="sm:block xs:block hidden bg-main text-background text-center px-4 py-2  transform translate-y-[-30px] rounded-lg">
            Greenfie
          </span>
          {errorMessage && !errorMessage.includes("match") && (
            <p className="text-red-500 my-1 px-2 text-notification">
              {errorMessage}
            </p>
          )}
          <div className="flex justify-between items-center mb-4 px-2">
            <h1 className="text-lg font-bold text-black"> Set new password</h1>
            <button
              aria-label="Close"
              onClick={() => setIsPassFormOpen(false)}
              className="material-icons"
              style={{ marginBottom: "14px" }}
            >
              close
            </button>
          </div>
          <div className="h-full w-full ">
            <form onSubmit={handlePasswordSubmit} className="p-2 flex flex-col">
              <div className="mt-4">
                <div className="relative">
                  <input
                    className="w-full px-3 py-2 border rounded-lg"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder=" New password..."
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <i className="material-icons text-[20px] mt-2">
                        visibility_off
                      </i>
                    ) : (
                      <i className="material-icons text-[20px] mt-2">
                        remove_red_eye
                      </i>
                    )}
                  </button>
                </div>
              </div>
              <div className="mt-4">
                {errorMessage && errorMessage.includes("match") && (
                  <span className="my-2">
                    <p className="text-red-500 mb-1 px-2 text-notification text-center">
                      {errorMessage}
                    </p>
                    <hr />
                  </span>
                )}
                <div className="relative">
                  <input
                    className="w-full px-3 py-2 border rounded-lg"
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Confirm new password..."
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <i className="material-icons text-[20px] mt-2">
                        visibility_off
                      </i>
                    ) : (
                      <i className="material-icons text-[20px] mt-2">
                        remove_red_eye
                      </i>
                    )}
                  </button>
                </div>
              </div>
              <hr className="my-5" />
              <Button type="submit">Submit</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordForm;
