import '@/styles/global.scss'
import type { AppProps } from 'next/app'
import Navbar from '@/components/navbar/Navbar'
import NavbarThree from '@/components/navbar/NavProducts'

export default function App({ Component, pageProps }: AppProps) {
  return <>
  <Component {...pageProps} />
  </>
}
