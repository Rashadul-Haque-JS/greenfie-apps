import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Select from 'react-select'
import { dhakaWards } from "@/utils/data/wards";
const Register = ({ setIsSignupModalOpen }: any) => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        area: '',
        city: '',
        country: 'BD',
        phone: '',
        avatar: null
    });

    const [confirmPassword, setConfirmPassword] = useState("");
    const [profilePicture, setProfilePicture] = useState<File>();
    const [error, setError] = useState("");
    const router = useRouter();

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const handleChangeSelect = (event: any, name: string) => {
        const { value } = event
        setUser({ ...user, [name]: value })
    }

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (user.password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const userData = {
                ...user,
                avatar: profilePicture ? profilePicture : null,
            };

            // submit user data to server and redirect
            router.push("/");
        } catch (err: any) {
            setError(err.message);
        }
    };


    return (
        <div
            className="fixed top-0 left-0 w-full h-full overlay bg-main flex flex-wrap-reverse justify-evenly items-center overflow-y-auto"
        >   <div className="relative">
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-green-400 via-green-500 to-green-600 opacity-60"></div>
                <div className="text-3xl text-white text-center font-semibold pt-4 my-12 relative z-10 shadow-md rounded-lg">
                    <Image src="/images/tomatos.jpg" width={500} height={500} alt="green" />
                </div>
            </div>
            <div className=" bg-background p-8 md:w-[384px] lg:w-[384px] xl:w-[384px] mx-2 mb-10 sm:mt-10 xs:mt-10">
                <div className='flex justify-between items-center'>
                    <span className="text-lg font-bold mb-4 text-black">Signup</span>
                    <i onClick={() => setIsSignupModalOpen(false)} className="material-icons">close</i>
                </div>
                <form onSubmit={handleSignup} className="px-4 py-2 max-h-fit w-full ">

                    <div className="mt-4">
                        <input
                            className="w-full px-3 py-2 border rounded-lg bg-main"
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
                            className="w-full px-3 py-2 border rounded-lg bg-main"
                            type="email"
                            name="email"
                            onChange={handleChange}
                            required
                            placeholder="example@mail.com"

                        />
                    </div>
                    <div className="mt-4">
                        <input
                            className="w-full px-3 py-2 border rounded-lg bg-main"
                            type="password"
                            name="password"
                            onChange={handleChange}
                            required
                            placeholder="Password..."
                        />
                    </div>
                    <div className="mt-4">
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
                    </div>
                            <div className="mt-4">
                                <input
                                    className="w-full p-2  text-gray-700  rounded"
                                    type="text"
                                    name="city"
                                    onChange={handleChange}
                                    required
                                    placeholder="City"
                                />
                            </div>

                    <div className="mt-4">
                        <Select
                            name="area"
                            options={dhakaWards}
                            placeholder="Choose your Area"
                            onChange={(e) => handleChangeSelect(e, 'area')}
                            styles={{
                                control: (provided) => ({
                                    ...provided,
                                    backgroundColor: "#71ceac",
                                }),
                                option: (provided, state) => ({
                                    ...provided,
                                    backgroundColor: state.isSelected ? "#71ceac" : "white",
                                    color: state.isSelected ? "white" : "black",
                                }),
                            }}
                        />
                    </div>
                    <div className="mt-4">
                        <input
                            className="w-full p-2  text-gray-700  rounded"
                            type="tel"
                            name="phone"
                            onChange={handleChange}
                            required
                            placeholder="Phone Number"

                        />
                    </div>
                    <div className="mt-4">
                        <input
                            className="w-full p-2  text-gray-700  rounded"
                            type="file"
                            name="profilePicture"
                            onChange={(e) => setProfilePicture(e.target.files?.[0])}
                            required
                        />
                    </div>
                    <hr className="my-5" />
                    <button className="bg-txt text-white px-4 py-2 rounded-lg ">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Register