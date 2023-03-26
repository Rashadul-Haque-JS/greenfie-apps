
import React from 'react';
import axios from 'axios'
import { GetServerSideProps } from 'next';
const GetInfo= ({message}:any) => {
  return (
    <>
    <div className="p-5 text-slate-900">
      <div className='card text-center'>
        <div className='card-header'>Thank you</div>
        <div className='card-body'>{message}</div>
      </div>
      </div>
    </>
  );

};

export const getServerSideProps: GetServerSideProps = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:9000/api/auth/confirm-email');
      const message = res.data;
      return { props: { message } };
    } catch (error:any) {
      console.error(error.message);
      return { props: { message: ''} };
    }
  };
  

export default GetInfo;

