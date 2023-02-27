import React from 'react';
import { TLink } from '@/utils/types';
import Link from 'next/link';
// import '../../styles/global.scss'
const Links = ({ mode, children,style,url }: TLink) => {
  
  const btnMain = (
    <Link href= {url? url:'#'}
      className={`bg-main text-white px-4 py-[.4rem] rounded-md mb-4 hover:bg-green-600 transition duration-300 ease-in-out font-bold'${style}`}
      
    >
      {children}
    </Link>
  )

  const btnOthers= (
    <Link href={url? url:'#'}
    className={`text-txt bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 text-center rounded-lg text-sm px-2 py-[.4rem]  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 font-semibold ${style}`}
    >
      {children}
    </Link>
  )

 return mode === 'others'? btnOthers: btnMain

};

export default Links