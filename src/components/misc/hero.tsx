import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
const Hero = () => {
  return (
    <div className='w-full h-auto md:w-2/4 md:h-[164px] lg:w-[440px] xl:w-2/5 bg-gray-900 rounded '>
     <div className='relative '>
     <div className='overlay-two rounded-b-none '></div>
      <Image src='/images/tomatos.jpg' alt='Hero image' className='object-cover h-full w-full md:h-[164px] rounded-lg rounded-b-none ' width={500} height={500} />
      <div className='absolute inset-0 flex items-center justify-center text-white'>
       <Link href='/deshboard'> <h1 className='text-2xl md:text-3xl lg:text-4xl font-medium px-4 '>Dashboard</h1></Link>
      </div>
     </div>
      <div className='bg-main text-white p-5 md:px-2 md:pt-3 lg:p-10 xl:p-10 z-20 rounded-b-lg'>
        <h2 className='text-xl text-black'>lorem</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
      </div>
    </div>
  )
}

export default Hero;


