import React, { useState } from "react";
const Reset = ({ setIsResetModalOpen }: any) => {
    const [email, setEmail] = useState('');

    const handleResetSubmit = (event: any) => {
        event.preventDefault();
        // codes here...
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full overlay bg-background flex flex-wrap-reverse justify-evenly items-center overflow-y-auto">
            <div className="text-3xl text-white text-center md:flex-grow lg:flex-grow xl:flex-grow  h-full sm:h-[320px] xs:h-[320px] font-semibold " style={{ backgroundImage: 'url(/images/tomatos.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            </div>
            <div className="bg-background p-8 w-[546px] sm:mt-10 xs:mt-10 transform translate-y-[-100px] sm:translate-y-[100px] xs:translate-y-[100px]">
                <div className="w-3/4 sm:w-full xs:w-full flex flex-col mx-auto">
                    <span className="sm:block xs:block hidden bg-main text-background text-center px-4 py-2  transform translate-y-[-30px]">Greenfie</span>

                    <div className="flex justify-between items-center mb-4 px-2">
                        <span className="text-lg font-bold text-black">Reset password</span>
                        <button
                            aria-label="Close"
                            onClick={() => setIsResetModalOpen(false)}
                            className="material-icons" style={{ marginBottom: '14px' }}
                        >
                            close
                        </button>
                    </div>
                    <div className="h-full w-full ">
                        <form onSubmit={handleResetSubmit} className="p-2 flex flex-col">
                            <div className="mb-4">
                                <input
                                    className="w-full px-3 py-2 border border-gray-400 rounded-lg my-2"
                                    type="email"
                                    id="email"
                                    name="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="Enter your email address"
                                    autoFocus
                                />
                            </div>
                            <p className="mb-4 text-sky-400">
                                We'll send you an email with instructions on how to reset your password.
                            </p>
                            <hr className="my-5" />
                            <button className="bg-txt text-white px-4 py-2 rounded-lg">Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reset;
