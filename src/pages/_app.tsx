import React, { useState } from 'react';
import '@/styles/global.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import Layout from '@/components/layouts/LayoutMain';
import { wrapper } from '@/store/store';
import pathname from '@/components/misc/pathname';
import { useRouter} from 'next/router';
import { useEffect } from 'react';
import axios from 'axios';
import { getCookies } from '@/server/utils/cookies';

const unprotectedRoutes = ['/', '/about', '/info', '/blogs','/contact'];

const App = ({ Component, pageProps }: AppProps) => {
  const [bearerToken,setBearerToken]= useState<string >('')
  const signup = '/api/auth/register';
  const currentPath = pathname();
  const isUnprotectedRoute = unprotectedRoutes.includes(currentPath);
  const isAuthenticated = !isUnprotectedRoute && bearerToken;
  const router = useRouter()

  useEffect(() => {
    const randomString = [...Array(10)].map(() => Math.random().toString(36)[2]).join('');
    const token = getCookies('token');
    if (token) {
      setBearerToken(token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else if (!isAuthenticated && !isUnprotectedRoute) {
      router.push(`/?login=${randomString}`);
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
