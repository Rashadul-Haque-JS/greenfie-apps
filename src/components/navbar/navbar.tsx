import React from 'react';

interface Props {
}

const Navbar: React.FC<Props> = () => {
    return (
       <div className='bg-lightBG px-2'>
         <nav className='container mx-auto flex justify-between py-3 items-center'>
            <div className="h-fit">
                <img className='w-[36px] h-auto' src='/images/greenfie.png' alt="Greenfie logo" />
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
