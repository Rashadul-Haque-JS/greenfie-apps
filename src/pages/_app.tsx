import React from 'react';
import '@/styles/global.scss';
import type { AppProps } from 'next/app';
import Layout from '@/components/layouts/LayoutMain';
import { wrapper } from '@/store/store';
import pathname from '@/components/misc/pathname';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { useRouter} from 'next/router';
import { useEffect } from 'react';
const unprotectedRoutes = ['/', '/about', '/info', '/blogs'];

const App = ({ Component, pageProps }: AppProps) => {
  const signup = '/api/auth/register';
  const isUser = useSelector((state: RootState) => state.auth.auth.name);
  const currentPath = pathname();
  const isUnprotectedRoute = unprotectedRoutes.includes(currentPath);
  const isAuthenticated = !isUnprotectedRoute && isUser;
  const router = useRouter()

  useEffect(() => {
    const randomString = [...Array(10)].map(() => Math.random().toString(36)[2]).join('');
    if (!isAuthenticated && !isUnprotectedRoute) {
      router.push(`/?login=${randomString}`);
    }
  }, [isAuthenticated, isUnprotectedRoute]);

  return (
    <>
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
