import React from 'react';
import pathname from '../misc/pathname';

// This component is used to display pages that contain lists of items
const ListsPage=({children}:any)=>{
  
    return (
        <>
          <div className='md:container md:mx-auto lg:container xl:mx-auto'>
            <h1 className='text-2xl font-bold text-center capitalize'>{pathname().split('/')[1]}</h1>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2 place-content-center'>
              {children}
            </div>
          </div>
        </>
      );
}

export default ListsPage;