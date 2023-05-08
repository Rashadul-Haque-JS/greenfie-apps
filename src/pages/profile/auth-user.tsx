import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Select, { SingleValue } from "react-select";
import { GenericProps } from "@/utils/types";
import Accordion from "@/components/misc/accordion";
import divisions from "@/utils/data/divisions";
import Button from "@/components/experiments/Button";

const ProfilePage = ({ user }: GenericProps) => {
  const [userData, setUserData] = useState(user);
  const [wards, setWards] = useState<any[]>([]);

  useEffect(() => {
    if (userData?.city !== undefined) {
      const [selectedDivision] = divisions.filter(
        (division) => division.label === userData.city
      );
      setWards(selectedDivision?.wards);
    }
  }, [userData?.city]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get("/api/users/authUser");
        setUserData(res.data.user);
      } catch (error: any) {
        console.error(error.message);
        setUserData(null);
      }
    };
    if (!userData) {
      fetchUserData();
    }
  }, [userData]);

  function handleChangeSelect(
    e: SingleValue<{
      label: string;
      value: string;
      wards: { label: string; value: string }[];
    }>,
    arg1: string
  ): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-background shadow-md rounded-lg mx-auto w-full">
        <div className="p-6">
          <div className="flex flex-col justify-center items-center gap-2 mb-6">
            <div className="relative rounded-full overflow-hidden w-48 h-64 md:w-64 md:h-80">
              <Image
                src="/images/hero_cab.jpg"
                layout="fill"
                objectFit="cover"
                alt="User Profile Picture"
              />
            </div>
            {userData ? (
              <>
                <h1 className="text-2xl font-bold">{userData.name} Haque</h1>
                <p className="text-gray-600">
                  123 {userData.area}, {userData.city} BD
                </p>
                <p className="text-gray-600">{userData.email}</p>
                <p className="text-gray-600">{userData.phone}</p>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <Accordion title="Edit and Update">
            <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row w-full gap-24">
              <div className="mt-6 w-1/2 xs:w-full sm:w-full">
                <form className="flex flex-col">
                  <label htmlFor="email" className="mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={userData?.email}
                    className="px-3 py-2 border rounded-lg outline-none focus:border-blue-500"
                  />
                  <label htmlFor="email" className=" mt-4 mb-1">
                    City
                  </label>
                  <Select
                    name="city"
                    options={divisions}
                    placeholder="Choose your city"
                    onChange={(e) => handleChangeSelect(e, "city")}
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        backgroundColor: "#fff",
                        padding: "0.25rem",
                        border: "1px solid #000",
                        outline:'none'
                      }),
                    }}
                    required
                  />
                  <label htmlFor="email" className="mt-4 mb-1">
                    Area
                  </label>
                  <Select
                    name="area"
                    options={wards}
                    placeholder="Choose your Area"
                    onChange={(e) => handleChangeSelect(e, "area")}
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        backgroundColor: "#fff",
                        padding: "0.25rem",
                        border: "1px solid #000",
                        outline:'none',
                      }),
                    }}
                    noOptionsMessage={() => "Select city first"}
                    required
                  />

                  <label htmlFor="email" className="mt-4 mb-1">
                    Phone
                  </label>
                  <input
                    type="number"
                    id="phone"
                    name="phone"
                    value={userData?.phone}
                    className="px-3 py-2 border rounded-lg outline-none focus:border-blue-500"
                  />
                   <Button type="submit" className="mt-4">Update</Button>
                </form>
              </div>
              <div className="mt-6 w-1/2 xs:w-full sm:w-full">
                <form className="flex flex-col">
                  <label htmlFor="current-password" className="mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="current-password"
                    name="current-password"
                    className="px-3 py-2 border rounded-lg outline-none focus:border-blue-500"
                  />
                  <label htmlFor="new-password" className="mt-4 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="new-password"
                    name="new-password"
                    className="px-3 py-2 border rounded-lg outline-none focus:border-blue-500"
                  />
                  <label htmlFor="confirm-password" className="mt-4 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirm-password"
                    name="confirm-password"
                    className="px-3 py-2 border rounded-lg outline-none focus:border-blue-500"
                  />
                   <Button type="submit" className="mt-4">Update Password</Button>
                </form>
              </div>
            </div>
          </Accordion>
          <Accordion title="My Published Products List">
            {/* content for the My Published Products List accordion */}
          </Accordion>

          <Accordion title="My Sales History">
            {/* content for the My Sales History accordion */}
          </Accordion>

          <Accordion title="My Purchase History">
            {/* content for the My Purchase History accordion */}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
