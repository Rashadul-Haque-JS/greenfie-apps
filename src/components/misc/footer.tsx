import React from 'react';
import Link from 'next/link';
const Footer = () => {
  return (
    <footer className='bg-black text-light h-72 md:hidden lg:hidden xl:hidden mx-6 mb-6 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] mt-12 rounded'>
      <div className='flex flex-col justify-evenly h-full px-4'>
        <div className='py-2'>
          <p className='text-2xl font-semibold'>Greenfie</p>
          <p className='mt-2 text-sm'>123 Green Street, Greenfield, MA 01301</p>
          <p className='mt-2 text-sm'>contact@greenfie.com</p>
        </div>
        <div className='py-2'>
          <p className='text-sm'>Follow us on social media:</p>
          <div className='flex mt-2'>
            <Link href='#' className='text-lg mr-4'>
              <i className='fab fa-facebook-square'>Facebook</i>
            </Link>
            <Link href='#' className='text-lg mr-4'>
              <i className='fab fa-twitter-square'>Twitter</i>
            </Link>
            <Link href='#' className='text-lg mr-4'>
              <i className='fab fa-instagram-square'>Instagram</i>
            </Link>
          </div>
        </div>
        <p className='text-center text-sm font-medium'>
          &copy; {new Date().getFullYear()} Greenfie
        </p>
      </div>
    </footer>
  );
};

export default Footer;
