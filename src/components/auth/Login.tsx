import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { getAuth } from "@/store/features/auth";
import { useDispatch } from "react-redux";
const Login = ({ setIsLoginModalOpen, setIsSignupModalOpen, setIsResetModalOpen }: any) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const router = useRouter();
    const dispatch = useDispatch()

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });
    };
    const handleLoginSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', credentials);
            const data = response.data;
            dispatch(getAuth(data))
            console.log(data);
            router.replace('/products')
        } catch (error) {
            console.log(error);
            // handle error here, e.g. show error message
        }
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
        <div className="fixed top-0 left-0 w-full h-full overlay bg-background flex flex-wrap-reverse justify-evenly items-center overflow-y-auto">
            <div className="text-3xl text-white text-center md:flex-grow lg:flex-grow xl:flex-grow  h-full sm:h-[320px] xs:h-[320px] font-semibold " style={{ backgroundImage: 'url(/images/tomatos.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            </div>
            <div className="bg-background p-8 w-[546px] sm:mt-8 xs:mt-8">
                <div className="w-3/4 sm:w-full xs:w-full flex flex-col mx-auto">
                    <span className="sm:block xs:block hidden bg-main text-background px-4 py-2 transform translate-y-[-30px] text-center">Greenfie</span>
                    <div className="flex justify-between items-center mb-2 px-2">
                        <span className="text-lg font-bold text-black">Signin</span>
                        <button
                            aria-label="Close"
                            onClick={() => setIsLoginModalOpen(false)}
                            className="material-icons"
                        >
                            close
                        </button>
                    </div>
                    <div className="h-full w-full">
                        <form onSubmit={handleLoginSubmit} className="p-2 mb-12 flex flex-col">
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
                            <hr className="my-5" />

                            <p className="text-gray-600 text-sm mb-4">By clicking Login, you agree to our <a href="#" className="text-blue-500">Terms of Use</a> and <a href="#" className="text-blue-500">Privacy Policy</a>.</p>
                            <button className="bg-txt text-white px-4 py-2 rounded-lg ">Login</button>
                        </form>
                    </div>
                <div className="text-start px-2">
                    <p className="text-gray-600 text-sm mb-2">Don't have an account? <span className="text-blue-500 cursor-pointer" onClick={handleOptReg}>Register</span></p>
                    <p className="text-gray-600 text-sm">Forgot Password? <span className="text-blue-500 cursor-pointer" onClick={handleOptReset}>Reset Password</span></p>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
