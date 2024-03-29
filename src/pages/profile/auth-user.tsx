import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { GenericProps } from "@/utils/types";
import Accordion from "@/components/misc/accordion";
import divisions from "@/utils/data/divisions";
import Button from "@/components/experiments/Button";
import { toast } from "react-toastify";
import ImageUpload from "@/components/auth/avatar";
const ProfilePage = ({ user }: GenericProps) => {
  const [userData, setUserData] = useState(user);
  const [wards, setWards] = useState<any[]>([]);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [screen, setScreen] = useState<boolean>(false);
  const [image, setImage] = useState("");
  const [file, setFile] = useState<any>();
  const [save, setSave] = useState<boolean>(false);

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

  const handleUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const resp = await axios.post("/api/auth/updatePassword", {
        email: userData?.email,
        oldPassword,
        newPassword,
      });
      toast.success(resp.data.message);
      setScreen(false);
    } catch (error: any) {
      const { response } = error.response && error;
      const { message } = error;
      toast.error(response.data.error || message);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleChangeSelect = (event: any, name: string) => {
    const { value } = event;
    setUserData({ ...userData, [name]: value });
  };

  const handleUpdateInfo = async (event: any) => {
    event.preventDefault();
    try {
      const data = {
        area: userData?.area,
        city: userData?.city,
        phone: userData?.phone,
        gender: userData?.gender,
      };
      const res = await axios.put("/api/users/updateUser", data);
      toast.success(res.data.message);
      console.log(res.data.message);
    } catch (error: any) {
      const { response } = error.response && error;
      const { message } = error;
      toast.error(response.data.message || message);
    }
  };

  const handleUpdateEmail = async (event: any) => {
    event.preventDefault();
    try {
      const res = await axios.put("/api/users/update-email", {
        email: userData?.email,
      });
      toast.success(res.data.message);
      console.log(res.data.message);
    } catch (error: any) {
      const { response } = error.response && error;
      const { message } = error;
      toast.error(response.data.message || message);
    }
  };

  const updateAvatar = async (event: any) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await axios.post("/api/users/uploadAvatar", formData);
      setUserData((user: GenericProps) => ({
        ...user,
        avatar: res.data.file,
      }));
      setSave(false);
      toast.success(res.data.message);
    } catch (error: any) {
      const { response } = error.response && error;
      const { message } = error;
      toast.error(response.data.message || message);
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="bg-background mx-auto w-full">
        <div className="p-6">
          {/* This one must be previewed, with or without boolean???? */}
          {!screen && (
            <div className="flex flex-col justify-center items-center gap-2 mb-6">
              <div className="relative rounded-full overflow-hidden w-48 h-64 md:w-64 md:h-80">
                <ImageUpload
                  image={
                    userData?.avatar ? `/uploads/${userData.avatar}` : image
                  }
                  setData={setUserData}
                  onImageChange={setImage}
                  setSave={setSave}
                  setFile={setFile}
                />
              </div>
              {save && (
                <form
                  onSubmit={updateAvatar}
                  className="w-fit my-3"
                  encType="multipart/form-data"
                >
                  <button
                    type="submit"
                    className=" px-3 py-2 rounded-lg bg-main text-background font-bold"
                  >
                    Save Image
                  </button>
                </form>
              )}
              {userData ? (
                <>
                  <h1 className="text-2xl font-bold capitalize">
                    {userData.name}
                  </h1>
                  <p className="text-gray-600">
                    123 {userData.area}, {userData.city || 'city'}, Global
                  </p>
                  <p className="text-gray-600">{userData.email}</p>
                  <p className="text-gray-600">{userData.phone}</p>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          )}
          <Accordion title="Edit and Update" setScreen={setScreen}>
            <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row w-full md:gap-24 lg:gap-24 xl:gap-24">
              <div className="mt-6 w-1/2 xs:w-full sm:w-full">
                <form
                  onSubmit={handleUpdateEmail}
                  className="flex flex-col w-full "
                >
                  <label htmlFor="email" className="mb-1">
                    Email Address
                  </label>
                  <div className="flex flex-wrap w-full xs:gap-2 sm:gap-2">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={userData?.email}
                      className="px-3 py-2 border xs:rounded-lg sm:rounded-lg rounded-r-none outline-none focus:border-blue-500 flex-grow"
                      onChange={handleChange}
                    />
                    <Button
                      type="submit"
                      className="py-1 xs:rounded-lg sm:rounded-lg rounded-l-none xs:w-full sm:w-full xs:mt-2 sm:mt-2"
                    >
                      Save
                    </Button>
                  </div>
                </form>
                <hr className="mt-6 mb-3" /> {/* Add a horizontal line here */}
                <div className="font-semibold text-sm mb-2">Others</div>
                <form onSubmit={handleUpdateInfo} className="flex flex-col">
                  <label htmlFor="city" className="mb-1">
                    City
                  </label>
                  <Select
                    id="city"
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
                        outline: "none",
                      }),
                    }}
                    aria-labelledby="city"
                    required
                  />
                  <label htmlFor="area" className="mt-4 mb-1">
                    Area
                  </label>
                  <Select
                    id="area"
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
                        outline: "none",
                      }),
                    }}
                    noOptionsMessage={() => "Select city first"}
                    aria-labelledby="area"
                    required
                  />
                  <label htmlFor="phone" className="mt-4 mb-1">
                    Phone
                  </label>
                  <input
                    type="number"
                    id="phone"
                    name="phone"
                    value={userData?.phone}
                    className="px-3 py-2 border rounded-lg outline-none focus:border-blue-500"
                    onChange={handleChange}
                  />

                  {!userData?.gender && (
                    <>
                      <label htmlFor="gender" className="mt-4 mb-1">
                        Gender
                      </label>
                      <Select
                        id="gender"
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
                            padding: "0.25rem",
                            border: "1px solid #000",
                            outline: "none",
                          }),
                        }}
                        aria-labelledby="gender"
                        required
                      />
                    </>
                  )}
                  <Button type="submit" className="mt-4 text-[16px]">
                    Update Info
                  </Button>
                </form>
              </div>
              <hr className="my-6 hidden sm:block xs:block" />
              <div className="mt-6 w-1/2 xs:w-full sm:w-full sm:mt-0 xs:mt-0">
                <form className="flex flex-col" onSubmit={handleUpdatePassword}>
                  <label htmlFor="current-password" className="mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="current-password"
                    name="current-password"
                    className="px-3 py-2 border rounded-lg outline-none focus:border-blue-500"
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <label htmlFor="new-password" className="mt-4 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="new-password"
                    name="new-password"
                    className="px-3 py-2 border rounded-lg outline-none focus:border-blue-500"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <label htmlFor="confirm-password" className="mt-4 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirm-password"
                    name="confirm-password"
                    className="px-3 py-2 border rounded-lg outline-none focus:border-blue-500"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <Button type="submit" className="mt-4 text-[16px]">
                    Update Password
                  </Button>
                </form>
              </div>
            </div>
          </Accordion>
          <Accordion title="My Published Products List" setScreen={setScreen}>
            {/* content for the My Published Products List accordion */}
          </Accordion>

          <Accordion title="My Sales History" setScreen={setScreen}>
            {/* content for the My Sales History accordion */}
          </Accordion>

          <Accordion title="My Purchase History" setScreen={setScreen}>
            {/* content for the My Purchase History accordion */}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
