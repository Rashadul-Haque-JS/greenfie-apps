import '@/styles/global.scss'
import type { AppProps } from 'next/app'
import Navbar from '@/components/navbar/navbar'

export default function App({ Component, pageProps }: AppProps) {
  return <>
  <Navbar />
  <Component {...pageProps} />

  {/* Footer will be component */}
  <footer className="bg-black text-light h-48 md:hidden lg:hidden xl:hidden mx-6 mb-6 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] mt-12 rounded">
        <p className="px-4">Greenfie</p>
      </footer>
  </>
}
