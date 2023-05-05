import { useEffect, useState } from "react";
import Select from "react-select";
import divisions from "@/utils/data/divisions";
import axios from "axios";
import Button from "../experiments/Button";

const Register = ({ setIsSignupModalOpen, signup }: any) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    area: "",
    city: "",
    country: "BD",
    phone: "",
    gender: "",
    avatar: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [wards, setWards] = useState<any[]>([]);
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleChangeSelect = (event: any, name: string) => {
    const { value } = event;
    setUser({ ...user, [name]: value });
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user.password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    try {
      const resp = await axios.post(signup, user);
      setMessage(resp.data.message)
    } catch (error: any) {
      const { response } = error.response && error
      const { message } = error
      setErrorMessage(response.data.message || message)
    }
  };

  useEffect(() => {
    if (user.city !== undefined) {
      const [selectedDivision] = divisions.filter(
        (division) => division.label === user.city
      );
      setWards(selectedDivision?.wards);
    }
  }, [user.city]);

  return (
    <div className="fixed top-0 left-0 w-full h-full overlay bg-background flex flex-wrap-reverse justify-evenly items-center overflow-y-auto">
      <div
        className="text-3xl text-white text-center md:flex-grow lg:flex-grow xl:flex-grow  h-full sm:h-[320px] xs:h-[320px] font-semibold "
        style={{
          backgroundImage: "url(/image/smiles.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>
      <div className="bg-background p-8 w-[546px] sm:mt-8 xs:mt-8">
        <div className="w-3/4 sm:w-full xs:w-full flex flex-col mx-auto">
          <span className="sm:block xs:block hidden bg-main text-background text-center px-4 py-2  transform translate-y-[-30px] rounded-lg">
            Greenfie
          </span>
          {message &&  <p className="my-2"><p className="text-main mb-1 px-2 text-notification text-center">{message}</p><hr/></p>}
          {errorMessage && !errorMessage.includes('Password') && <span className="my-2"><p className="text-red-500 mb-1 px-2 text-notification text-center">{errorMessage}</p><hr/></span>}
          <div className="flex justify-between items-center mb-2 px-3">
            <h1 className="text-lg font-bold text-black">Signup</h1>
            <button
              aria-label="Close"
              onClick={() => setIsSignupModalOpen(false)}
              className="material-icons"
            >
              close
            </button>
          </div>
          <div className="h-full w-full">
            <form
              onSubmit={handleSignup}
              className="px-4 py-2 max-h-fit w-full flex flex-col"
            >
              <div className="mt-4">
                <input
                  className="w-full px-3 py-2 border rounded-lg"
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  required
                  placeholder="Name..."
                  style={{ color: "#000" }}
                  autoFocus
                />
              </div>
              <div className="mt-4">
                <input
                  className="w-full px-3 py-2 border rounded-lg"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  required
                  placeholder="example@mail.com"
                />
              </div>
              <div className="mt-4">
                <div className="relative">
                <input
                  className="w-full px-3 py-2 border rounded-lg"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  required
                  placeholder="Password..."
                />
                 <button
                    type="button"
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (<i className="material-icons text-[20px] mt-2">visibility_off</i>) : (<i className="material-icons text-[20px] mt-2">remove_red_eye</i>)}
                  </button>
                </div>
              </div>
              <div className="mt-4">
                {errorMessage && errorMessage.includes('Password') && <p className="text-red-500 my-1 px-2 text-notification">{errorMessage}</p>}
                <div className="relative">
                <input
                  className="w-full px-3 py-2 border rounded-lg"
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm Password..."
                />
                 <button
                    type="button"
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ?(<i className="material-icons text-[20px] mt-2">visibility_off</i>) : (<i className="material-icons text-[20px] mt-2">remove_red_eye</i>)}
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <Select
                  name="city"
                  options={divisions}
                  placeholder="Choose your city"
                  onChange={(e) => handleChangeSelect(e, "city")}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      backgroundColor: "#fff",
                    }),
                  }}
                  required
                />
              </div>
              <div className="mt-4">
                <Select
                  name="area"
                  options={wards}
                  placeholder="Choose your Area"
                  onChange={(e) => handleChangeSelect(e, "area")}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      backgroundColor: "#fff",
                    }),
                  }}
                  noOptionsMessage={() => "Select city first"}
                  required
                />
              </div>
              <div className="mt-4">
                <Select
                  name="gender"
                  options={[
                    { label: "male", value: "male" },
                    { label: "female", value: "female" },
                  ]}
                  placeholder="Select gender"
                  onChange={(e) => handleChangeSelect(e, "gender")}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      backgroundColor: "#fff",
                    }),
                  }}
                  required
                />
              </div>
              <div className="mt-4">
                <input
                  className="w-full p-2  text-gray-700  rounded"
                  type="tel"
                  name="phone"
                  onChange={handleChange}
                  placeholder="Phone Number"
                />
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
              <Button children="Signup" type="submit" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
