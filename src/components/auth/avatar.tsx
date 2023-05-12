import React, { useState } from "react";
import Image from "next/image";

type TAvatar = {
  image: string;
  onImageChange: Function;
  setSave:(props:boolean)=>void;
  setFile:(props:any)=>void
};

const ImageUpload = ({ image, onImageChange,setSave ,setFile }: TAvatar) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onImageChange(reader.result);
      };
      reader.readAsDataURL(file);
      setSave(true)
      setFile(file);
    }
  };

  const handleImageWrapperMouseEnter = () => {
    setIsHovered(true);
  };

  const handleImageWrapperMouseLeave = () => {
    setIsHovered(false);
  };

  const handleSvgClick = () => {
    const input = document.getElementById("image-upload");
    input?.click();
  };

  return (
    <div className="relative rounded-full overflow-hidden w-48 h-64 md:w-64 md:h-80">
      <style>
        {`
          .image-wrapper:hover img {
            transform: scale(1.05);
            transition: transform 0.5s ease-in-out;
          }
        `}
      </style>
      <div
        className="image-wrapper"
        onMouseEnter={handleImageWrapperMouseEnter}
        onMouseLeave={handleImageWrapperMouseLeave}
      >
        <Image
          src={image || "/images/default-avatar-green.png"}
          layout="fill"
          objectFit="cover"
          alt="User Profile Picture"
        />
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div
              className="flex justify-center items-center h-10 w-10 glass-screen rounded-lg cursor-pointer"
              onClick={handleSvgClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-white opacity-100 transition-opacity"
                style={{ zIndex: 1 }}
              >
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.59l1.71-3.42A1 1 0 0 1 9.13 2h5.74a1 1 0 0 1 .92.58l1.71 3.42H23a2 2 0 0 1 2 2v9z"></path>
                <circle cx="12" cy="13" r="4"></circle>
              </svg>
            </div>
          </div>
        )}
      </div>
      <label
        htmlFor="image-upload"
        className="absolute bottom-0 right-0 p-2 cursor-pointer"
      >
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </label>
    </div>
  );
};

export default ImageUpload;
