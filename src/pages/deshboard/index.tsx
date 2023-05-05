import { useRouter } from 'next/router';
import React from 'react';
// import axios from 'axios';
// import { GetServerSideProps } from 'next';


const Deshboard = () => {
  const {pathname} = useRouter()
  return (
    <div className='w-full flex flex-col items-center'>
       <h1 className='text-2xl font-bold text-center capitalize'>{pathname.split('/')[1]}</h1>
      
     
    </div>



  );
}


// export const getServerSideProps: GetServerSideProps = async () => {
//   try {
//     const res = await axios.get('http://127.0.0.1:9000/api/fav-apps');
//     const apps = res.data;
//     return { props: { apps } };
//   } catch (error: any) {
//     console.error(error.message);
//     return { props: { apps: [] } };
//   }
// }
export default Deshboard