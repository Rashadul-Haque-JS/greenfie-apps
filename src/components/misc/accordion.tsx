import { useState } from "react";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen(value: boolean): void;
}

const Accordion = ({isOpen,setIsOpen, title, children }: AccordionProps) => {
 
  return (
    <div className="border-none rounded-lg mb-4">
      <div
        className="flex justify-between items-center cursor-pointer p-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-sm font-semibold">{title}</h3>
        <svg
          className={`w-4 h-4 ${isOpen ? "transform rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      <hr />
      {isOpen && <div className="p-4 bg-gray-100">{children ? children :'Nothing to display'}</div>}
    </div>
  );
};

export default Accordion;
