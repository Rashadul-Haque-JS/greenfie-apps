import React, { useState } from "react";
import Image from "next/image";

const Reset = ({ setIsResetModalOpen }: any) => {
    const [email, setEmail] = useState('');

    const handleResetSubmit = (event: any) => {
        event.preventDefault();
        // codes here...
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full overlay bg-main flex flex-wrap-reverse justify-evenly items-center overflow-y-auto">
            <div className="text-3xl text-white text-center font-semibold pt-4 my-12">
                <Image src="/images/tomatos.jpg" width={500} height={500} alt="green" />
            </div>
            <div className="bg-background p-8 w-[356px] sm:mt-10 xs:mt-10">
                <div className="flex justify-between items-center">
                    <span className="text-lg font-bold mb-4 text-black">Reset Password</span>
                    <button
                        aria-label="Close"
                        onClick={() => setIsResetModalOpen(false)}
                        className="material-icons"
                    >
                        close
                    </button>
                </div>
                <div className="min-h-[400px] w-full">
                    <form onSubmit={handleResetSubmit} className="p-2 ">
                        <div className="mb-4">
                            <input
                                className="w-full px-3 py-2 border border-gray-400 rounded-lg my-2"
                                type="email"
                                id="email"
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Email..."
                                autoFocus
                            />
                        </div>
                        <hr className="my-5" />
                        <button className="bg-txt text-white px-4 py-2 rounded-lg">Send</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Reset;
