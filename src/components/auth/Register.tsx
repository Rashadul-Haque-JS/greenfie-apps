import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Select from 'react-select'
import divisions from "@/utils/data/divisions";
import axios from "axios";

const Register = ({ setIsSignupModalOpen, signup }: any) => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        area: '',
        city: '',
        country: 'BD',
        phone: '',
        gender: '',
        avatar: ''
    });

    const [confirmPassword, setConfirmPassword] = useState("");
    const [wards, setWards] = useState<any[]>([]);
    const [error, setError] = useState("");
    const [errorPhone, setErrorPhone] = useState("");
    const router = useRouter();

    const handleChange = (e: any) => {
        const { name, value } = e.target
        // // Regular expression for validating Bangladesh phone numbers
        // const landlineRegex = /^\+880-2-\d{7}$/;
        // const mobileRegex = /^\+880-(11|13|14|15|16|17|18|19)-\d{8}$/;

        // // Check if the phone number matches the regular expressions
        // const isLandlineValid = landlineRegex.test(value);
        // const isMobileValid = mobileRegex.test(value);

        // const prefixedValue = "+880" + value.replace(/\D/g,'');

        // // Set error message based on validation result
        // let errorMessage = '';
        // if (!isLandlineValid && !isMobileValid) {
        //     errorMessage = 'mobile:+880-17-XXXXXXX or landline:+880-2-XXXXXX';
        // }
        setUser({ ...user, [name]: value})
        // setErrorPhone(errorMessage)
    }

    const handleChangeSelect = (event: any, name: string) => {
        const { value } = event
        setUser({ ...user, [name]: value })
    }

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (user.password !== confirmPassword) {
            setError("Passwords do not match");
            return
        }
        try {
            await axios.post(signup, user)
            router.push("/");
        } catch (err: any) {
            setError(err.message);
        }
    };

    useEffect(() => {
        if (user.city !== undefined) {
            const [selectedDivision] = divisions.filter(division => division.label === user.city);
            setWards(selectedDivision?.wards);
        }
    }, [user.city]);

    return (
        <div
            className="fixed top-0 left-0 w-full h-full overlay bg-main flex flex-wrap-reverse justify-evenly items-center overflow-y-auto"
        >   <div className="relative">
                <div className="absolute bottom-10 left-0 w-56 h-4 bg-txt"></div>
                <div className="absolute top-14 right-0 w-56 h-4 bg-txt"></div>
                <div className="text-3xl text-white text-center font-semibold pt-4 my-12 relative z-10 shadow-md rounded-lg">
                    <Image src="/images/tomatos.jpg" width={500} height={500} alt="green" />
                </div>
            </div>
            <div className=" bg-background p-8 w-[356px] mx-2 mb-10 sm:mt-10 xs:mt-10">
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
                        <Select
                            name="city"
                            options={divisions}
                            placeholder="Choose your city"
                            onChange={(e) => handleChangeSelect(e, 'city')}
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
                            onChange={(e) => handleChangeSelect(e, 'area')}
                            styles={{
                                control: (provided) => ({
                                    ...provided,
                                    backgroundColor: "#fff",
                                }),
                            }}
                            noOptionsMessage={() => 'Select city first'}
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <Select
                            name="gender"
                            options={[{ label: "male", value: "male" }, { label: "female", value: "female" }]}
                            placeholder="Select gender"
                            onChange={(e) => handleChangeSelect(e, 'gender')}
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
                    <button className="bg-txt text-white px-4 py-2 rounded-lg ">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Register