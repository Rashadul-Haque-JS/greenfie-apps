import React, { useState } from "react";
import Image from "next/image";

type TAvatar = {
  image: string;
  onImageChange: Function;
};

const ImageUpload = ({ image, onImageChange }: TAvatar) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onImageChange(reader.result);
      };
      reader.readAsDataURL(file);
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
          src={image || "/images/hero_cab.jpg"}
          layout="fill"
          objectFit="cover"
          alt="User Profile Picture"
        />
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-white opacity-75 hover:opacity-100 transition-opacity cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={handleSvgClick}
              style={{ zIndex: 1 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
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
