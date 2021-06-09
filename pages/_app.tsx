import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/main.scss'
import Header from '../src/components/Header/Header'
import Footer from '../src/components/Footer/Footer'
import NextNprogress from 'nextjs-progressbar'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>
          Авто из США с Аукционов Копарт, IAAI, Манхейм | CarsFromWest
        </title>
        {/* Binotel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(d, w, s) {
              var widgetHash = '4v5d5f2mkx39hckkovwn', gcw = d.createElement(s); gcw.type = 'text/javascript';gcw.async = true;
              gcw.src = '//widgets.binotel.com/getcall/widgets/'+ widgetHash +'.js';
              var sn = d.getElementsByTagName(s)[0]; sn.parentNode.insertBefore(gcw, sn);
              })(document, window, 'script');

          `,
          }}
          type="text/javascript"
        />
      </Head>
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

// TODO: COOMMENT FOR DEPLOY
