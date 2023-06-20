import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Button from "../experiments/Button";
import { AuthContext } from "../navbar/navHome";
import { setCookies } from "@/utils/cookies";

const Login = ({
  setIsLoginModalOpen,
  setIsSignupModalOpen,
  setIsResetModalOpen,
}: any) => {
  const [credentials, setCredentials] = useState({ email: "greenfie@greenfie-test.com", password: "greenfie" });
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const { newUserEmail } = useContext(AuthContext);

  useEffect(() => {
    if (newUserEmail) {
      setCredentials((prevCredentials) => ({
        ...prevCredentials,
        email: newUserEmail,
      }));
    }
  }, [newUserEmail]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };
  const handleLoginSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", credentials);
      const { token } = response.data;
      setCookies("token", token);
      router.replace("/products");
    } catch (error: any) {
      const { response } = error.response && error;
      const { message } = error;
      setErrorMessage(response.data.message || message);
    }
  };
  const handleOptReg = () => {
    setIsSignupModalOpen(true);
    setIsLoginModalOpen(false);
  };
  const handleOptReset = () => {
    setIsResetModalOpen(true);
    setIsLoginModalOpen(false);
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

      <div className="bg-background p-8 w-[546px] sm:mt-8 xs:mt-8">
        <div className="w-3/4 sm:w-full xs:w-full flex flex-col mx-auto">
          <span className="sm:block xs:block hidden bg-main text-background px-4 py-2 rounded-lg text-center mb-8">
            Greenfie
          </span>
          <div className="flex justify-between items-center mb-4 px-2">
            <h1 className="text-lg font-bold text-black">Signin</h1>
            <button
              aria-label="Close"
              onClick={() => setIsLoginModalOpen(false)}
              className="material-icons"
            >
              close
            </button>
          </div>
          <div className="h-full w-full">
            <form
              onSubmit={handleLoginSubmit}
              className="p-2 mb-12 flex flex-col"
            >
              <div className="mb-4">
                {errorMessage && errorMessage.includes("User") && (
                  <p className="text-red-500 my-1 px-2 text-notification ">
                    {errorMessage}
                  </p>
                )}
                <label className="px-1" htmlFor="password">Email</label>
                <input
                  className="w-full px-3 py-2 border border-gray-400 rounded-lg mt-1"
                  type="email"
                  id="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  required
                  autoFocus
                />
              </div>
              <div className="mb-4">
                {errorMessage && errorMessage.includes("Password") && (
                  <p className="text-red-500 mb-1 px-2 text-notification">
                    {errorMessage}
                  </p>
                )}
                <label className="px-1" htmlFor="password">Password</label>
                <div className="relative mt-1">
                  <input
                    className="w-full px-3 py-2 border border-gray-400 rounded-lg "
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                   
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
              <hr className="my-5" />

              <p className="text-gray-600 text-sm mb-4">
                By clicking Login, you agree to our{" "}
                <a href="#" className="text-blue-500">
                  Terms of Use
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-500">
                  Privacy Policy
                </a>
                . .
              </p>
              <Button type="submit">Login</Button>
            </form>
          </div>
          <div className="px-2 text-center">
            <p className="text-gray-600 text-sm mb-2">
              Don&apos;t have an account?
              <span
                className="text-blue-500 cursor-pointer"
                onClick={handleOptReg}
              >
                Register
              </span>
            </p>
            <p className="text-gray-600 text-sm">
              Forgot Password?
              <span
                className="text-blue-500 cursor-pointer"
                onClick={handleOptReset}
              >
                Reset Password
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
