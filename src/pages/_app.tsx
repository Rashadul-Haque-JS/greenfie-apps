import '@/styles/global.scss'
import type { AppProps } from 'next/app'
import Layout from '@/components/layouts/LayoutMain'

export default function App({ Component, pageProps }: AppProps) {
  
  return <>
  <Layout >
  <Component {...pageProps} />
  </Layout>
  </>
}
