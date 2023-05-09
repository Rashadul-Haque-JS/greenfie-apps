import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  color?: "blue" | "red" | "green" | "yellow" | "gray" | "#000";
  textColor?: "white" | "black";
  type?: "submit" | "reset" | "button";
  handleAct?: () => void;
  disabled?: boolean;
}

const Button = ({
  children,
  className = "rounded-lg",
  size = "lg",
  color = "#000",
  textColor = "white",
  type = "button",
  disabled= false
}: ButtonProps) => {
  let bgColorClass = "";
  switch (color) {
    case "blue":
      bgColorClass = "bg-blue-500 hover:bg-blue-700";
      break;
    case "red":
      bgColorClass = "bg-red-500 hover:bg-red-700";
      break;
    case "green":
      bgColorClass = "bg-green-500 hover:bg-green-700";
      break;
    case "yellow":
      bgColorClass = "bg-yellow-500 hover:bg-yellow-700";
      break;
    case "gray":
      bgColorClass = "bg-gray-500 hover:bg-gray-700";
      break;
    default:
      bgColorClass = "bg-main transition-colors text-white hover:bg-green-600";
      break;
  }
  const sizeClass = {
    sm: "py-1 px-2 text-xs",
    md: "py-2 px-4 text-sm",
    lg: "py-3 px-6 text-lg",
  }[size];

  const textColorClass = textColor === "white" ? "text-white" : "text-black";

  return (
    <button
      type={type}
      className={`${bgColorClass} ${textColorClass} font-bold rounded ${sizeClass} ${className}`} disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
