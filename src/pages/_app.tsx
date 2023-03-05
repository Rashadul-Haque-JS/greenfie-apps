import '@/styles/global.scss'
import type { AppProps } from 'next/app'
import Layout from '@/components/layouts/LayoutMain'

export default function App({ Component, pageProps }: AppProps) {

  const signup = '/api/users'
  
  return <>
  <Layout signup={signup}>
  <Component {...pageProps} />
  </Layout>
  </>
}
