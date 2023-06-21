import { useEffect, useState } from "react";

import axios from "axios";
import Button from "../experiments/Button";
import { useDispatch } from "react-redux";
import { setSignup } from "@/store/features/auth";

const Register = ({ setIsSignupModalOpen, signup }: any) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [restCountry, setRestCountry] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user.password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    try {
      const signupData = { ...user, restCountry };
      const resp = await axios.post(signup, signupData);
      setMessage(resp.data.message);
      dispatch(setSignup(false));
      setErrorMessage('');
    } catch (error: any) {
      const { response } = error.response && error;
      const { message } = error;
      setErrorMessage(response.data.error || message);
    }
  };

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get("https://ipapi.co/json/");
        setRestCountry(response.data.country_name);
      } catch (error) {
        console.error("Error fetching country:", error);
      }
    };

    fetchCountry();
  }, []);

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
          <span className="sm:block xs:block hidden bg-main text-background text-center px-4 py-2 rounded-lg mb-8">
            Greenfie
          </span>
          {message && (
            <p className="my-2">
              <p className="text-main mb-1 px-2 text-notification text-center">
                {message}
              </p>
              <hr />
            </p>
          )}
          {errorMessage && !errorMessage.includes("Password") && (
            <span className="my-2">
              <p className="text-red-500 mb-1 px-2 text-notification text-center">
                {errorMessage}
              </p>
              <hr />
            </span>
          )}
          <div className="flex justify-between items-center mb-2 px-3">
            <h1 className="text-lg font-bold text-black">Signup</h1>
            <button
              aria-label="Close"
              onClick={() => {
                setIsSignupModalOpen(false);
                dispatch(setSignup(false));
              }}
              className="material-icons"
            >
              close
            </button>
          </div>
          <div className="h-full w-full">
            <form
              onSubmit={handleSignup}
              className="p-2 py-2 max-h-fit w-full flex flex-col"
            >
              <div className="mt-4">
                <label className="px-1" htmlFor="name">Full Name</label>
                <input
                  className="w-full px-3 py-2 border rounded-lg mt-1"
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  required
                  style={{ color: "#000" }}
                  autoFocus
                />
              </div>
              <div className="mt-4">
                <label className="px-1" htmlFor="email">E-mail</label>
                <input
                  className="w-full px-3 py-2 border rounded-lg mt-1"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  required
                 
                />
              </div>
              <div className="mt-4">
                <label className="px-1" htmlFor="password">Password</label>
                <div className="relative mt-1">
                  <input
                    className="w-full px-3 py-2 border rounded-lg"
                    type={showPassword ? "text" : "password"}
                    name="password"
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
              <div className="mt-4">
                {errorMessage && errorMessage.includes("Password") && (
                  <p className="text-red-500 my-1 px-2 text-notification">
                    {errorMessage}
                  </p>
                )}
                <label className="px-1" htmlFor="confirm password">Confirm Password</label>
                <div className="relative mt-1">
                  <input
                    className="w-full px-3 py-2 border rounded-lg"
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    
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
              <p className="text-gray-600 text-sm mb-4">
                By clicking Login, you agree to our{" "}
                <a href="#" className="text-blue-500">
                  Terms of Use
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-500">
                  Privacy Policy
                </a>
                .
              </p>
              <Button type="submit">Signup</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
