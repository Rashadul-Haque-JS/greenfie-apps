import React, { useState } from "react";
import Image from "next/image";

const Login = ({ setIsLoginModalOpen , setIsSignupModalOpen,setIsResetModalOpen}: any) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleLoginSubmit = (event: any) => {
        event.preventDefault();
        //codes here...
    };
    const handleOptReg = () => {
        setIsSignupModalOpen(true)
        setIsLoginModalOpen(false)
    };
    const handleOptReset = () => {
        setIsResetModalOpen(true)
        setIsLoginModalOpen(false)
    };


    return (
        <div className="fixed top-0 left-0 w-full h-full overlay bg-main flex flex-wrap-reverse justify-evenly items-center overflow-y-auto">
            <div className="text-3xl text-white text-center  font-semibold pt-4 my-12">
                <Image src="/images/tomatos.jpg" width={500} height={500} alt="green" />
            </div>
            <div className="bg-background p-8  w-[356px] sm:mt-10 xs:mt-10">
                <div className="flex justify-between items-center">
                    <span className="text-lg font-bold mb-4 text-black">Signin</span>
                    <i onClick={() => setIsLoginModalOpen(false)} className="material-icons">
                        close
                    </i>
                </div>
                <div className="min-h-[400px] w-full">

                <form onSubmit={handleLoginSubmit} className="p-2 mb-12">
                    <div className="mb-4">
                        <input
                            className="w-full px-3 py-2 border border-gray-400 rounded-lg my-2"
                            type="email"
                            id="email"
                            name="email"
                            onChange={handleChange}
                            required
                            placeholder="Email..."
                            autoFocus
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            className="w-full px-3 py-2 border border-gray-400 rounded-lg my-2"
                            type="password"
                            id="password"
                            name="password"
                            onChange={handleChange}
                            required
                            placeholder="Password..."
                        />
                    </div>
                    <hr className="my-5"/>
                    <button className="bg-txt text-white px-4 py-2 rounded-lg">Login</button>
                </form>
                Don't have account?  <span className="text-main px-2 underline" onClick={handleOptReg}>Create</span>
                Forgot password?  <span className="text-main px-2 underline" onClick={handleOptReset}>Reset</span>
                </div>
            </div>

        </div>

    );
};

export default Login;
