import { useRouter } from 'next/router';
import React from 'react';

// This component is used to display pages that contain lists of items
const ListsPage=({children}:any)=>{
  const {pathname} = useRouter()
    return (
        <>
          <div className='md:container md:mx-auto lg:container xl:mx-auto px-4'>
            <h1 className='text-2xl font-bold text-center capitalize'>{pathname.split('/')[1]}</h1>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2 place-content-center'>
              {children}
            </div>
          </div>
        </>
      );
}

export default ListsPage;