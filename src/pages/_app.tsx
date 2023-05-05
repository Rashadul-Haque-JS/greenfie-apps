import React, { useState } from 'react';
import '@/styles/global.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import Layout from '@/components/layouts/LayoutMain';
import { wrapper } from '@/store/store';
import { useRouter} from 'next/router';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch} from 'react-redux';
import { AppDispatch} from '@/store/store';
import { setAuth } from '@/store/features/auth';
import { getCookies } from '@/utils/cookies';

const unprotectedRoutes = ['/', '/about', '/info', '/blogs','/contact'];

const App = ({ Component, pageProps }: AppProps) => {
  const [bearerToken, setBearerToken] = useState<string | null>(null);
  const signup = '/api/auth/register';
  const router = useRouter()
  const currentPath = router.pathname
  const isUnprotectedRoute = unprotectedRoutes.includes(currentPath);
  const isAuthenticated = !isUnprotectedRoute && bearerToken;
  const dispatch = useDispatch() as AppDispatch

  useEffect(() => {
    const randomString = [...Array(10)].map(() => Math.random().toString(36)[2]).join('');
    const token = getCookies('token');
    if (token) {
      setBearerToken(token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser(dispatch)
    } else if (!isAuthenticated && !isUnprotectedRoute) {
      router.push(`/?login=${randomString}`);
    }else{
      setBearerToken(null);
      dispatch(setAuth({}))
    }
  }, [bearerToken, isAuthenticated, isUnprotectedRoute, router]);
  

  return (
    <>
     <ToastContainer />
      {isAuthenticated && (
        <Layout signup={signup}>
          <Component {...pageProps} />
        </Layout>
      )}
      {isUnprotectedRoute && (
        <Layout signup={signup}>
          <Component {...pageProps} />
        </Layout>
      )}
    </>
  );
};

export default wrapper.withRedux(App);


const fetchUser = async (dispatch:AppDispatch) => {
  try {
    const res = await axios.get(`http://127.0.0.1:9000/api/users/authUser`);
    const { user } = res.data;
    const newData = {_id:user?._id, name:user?.name}
    dispatch(setAuth(newData))
  } catch (error: any) {
    console.error(error.message);
  }
}