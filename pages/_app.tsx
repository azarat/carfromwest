import type { AppProps } from 'next/app'
import '../styles/main.scss'
import Header from '../src/components/Header/Header'
import Footer from '../src/components/Footer/Footer'
import NextNprogress from 'nextjs-progressbar'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
      <NextNprogress
        color="#e02c22"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
      />
    </>
  )
}

export default MyApp
