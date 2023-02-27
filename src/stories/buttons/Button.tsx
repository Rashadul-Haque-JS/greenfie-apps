import React from 'react';
import { TButton } from '@/utils/types';
// import '../../styles/global.scss'
const Buttons = ({ mode, children,style, onClick }: TButton) => {
  
  const btnMain = (
    <button type='button'
      className={`bg-main text-white px-4 py-[.4rem] rounded-md mb-4 hover:bg-green-600 transition duration-300 ease-in-out font-bold'${style}`}
      onClick={onClick}
    >
      {children}
    </button>
  )

  const btnOthers= (
    <button type='button'
    className={`text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-2 py-[.4rem] dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 ${style}`}
    onClick={onClick}>
      {children}
    </button>
  )

 return mode === 'others'? btnOthers: btnMain

};

export default Buttons