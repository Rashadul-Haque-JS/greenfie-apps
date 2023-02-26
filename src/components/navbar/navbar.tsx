import React from 'react';
import Image from 'next/image';

const Navbar  = () => {
    return (
       <div className='bg-main xs:px-3 sm:px-3 px-8 py-0'>
         <nav className=' mx-auto flex justify-between py-2 items-center'>
            <div className="h-fit">
            <Image className='w-[36px] h-auto' src='/images/greenfie.png' alt="Greenfie logo" width={500} height={500}/>
            </div>
            <div className="flex w-48 justify-evenly items-center">
                <div className="nav-item login" style={{backgroundColor: 'green'}}>
                    Login
                </div>
                <div className="nav-item signup" style={{backgroundColor: 'red'}}>
                    Signup
                </div>
                <div className="nav-item help" style={{backgroundColor: 'yellow'}}>
                    Help
                </div>
            </div>
        </nav>
       </div>
    );
}

export default Navbar;
