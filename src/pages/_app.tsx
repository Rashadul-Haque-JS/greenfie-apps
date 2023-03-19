import '@/styles/global.scss'
import type { AppProps } from 'next/app'
import Layout from '@/components/layouts/LayoutMain'
import { wrapper } from '@/store/store'

const App = ({ Component, pageProps }: AppProps) => {
  const signup = '/api/users'
  
  return <>
  <Layout signup={signup}>
  <Component {...pageProps} />
  </Layout>
  </>
}
export default wrapper.withRedux(App);