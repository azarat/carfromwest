/* eslint-disable jsx-a11y/iframe-has-title */
import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/main.scss'
import Header from '../src/components/Header/Header'
import Footer from '../src/components/Footer/Footer'
import NextNprogress from 'nextjs-progressbar'
import { useRouter } from 'next/router'

import store from '../store/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const router = useRouter()
  const shouldShowFooter = router.pathname !== '/order'

  const persistor = persistStore(store)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const initialLink = sessionStorage.getItem('initialLink')
      if (!initialLink) sessionStorage.setItem('initialLink', location.href)
    }
  }, [])
  return (
    <>
      <Head>
        <title>
          Авто из США с Аукционов Копарт, IAAI, Манхейм | CarsFromWest
        </title>
        <link
          rel="shortcut icon"
          href="/assets/images/favicon.ico"
          type="image/x-icon"
        />

        {/*  Global site tag (gtag.js) - Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-215694992-1"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-215694992-1');`,
          }}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MHFMKJC');`,
          }}
        ></script>
        {/* HelpCrunch chat Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d){
  w.HelpCrunch=function(){w.HelpCrunch.q.push(arguments)};w.HelpCrunch.q=[];
  function r(){var s=document.createElement('script');s.async=1;s.type='text/javascript';s.src='https://widget.helpcrunch.com/';(d.body||d.head).appendChild(s);}
  if(w.attachEvent){w.attachEvent('onload',r)}else{w.addEventListener('load',r,false)}
})(window, document)`,
          }}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `HelpCrunch('init', 'carsfromwest', {
    applicationId: 1,
    applicationSecret: 'KHddEJ19qmyTlPTtq9A5G3oT973HnUc80Bv3vBM6kMU4DZIoWxE5oiyXDdcoYNzNEDofv6KvUf92dYQL75dj4g=='
  })

  HelpCrunch('showChatWidget');`,
          }}
        ></script>
        {/* Binotel Code */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
        (function(d, w, s) {
          var widgetHash = '0t662ww5q2blllap6anr', gcw = d.createElement(s); gcw.type = 'text/javascript'; gcw.async = true;
          gcw.src = '//widgets.binotel.com/getcall/widgets/'+ widgetHash +'.js';
          var sn = d.getElementsByTagName(s)[0]; sn.parentNode.insertBefore(gcw, sn);
           })(document, window, 'script');
        `,
          }}
        ></script>
        {/*SmartLook Code */}

        <script
          dangerouslySetInnerHTML={{
            __html: `window.smartlook||(function(d) {
            var o=smartlook=function(){ o.api.push(arguments)},h=d.getElementsByTagName('head')[0];
            var c=d.createElement('script');o.api=new Array();c.async=true;c.type='text/javascript';
            c.charset='utf-8';c.src='https://rec.smartlook.com/recorder.js';h.appendChild(c);
            })(document);
            smartlook('init', '8a4fe5c68e84b37e58c4b8729df3ed278a4ad30a');`,
          }}
          type="text/javascript"
        ></script>
        {/* Facebook pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '2763995213865176');
              fbq('track', 'PageView');
          `,
          }}
        />
        {/* <noscript><img height="1" width="1" style="display:none"
        src="https://www.facebook.com/tr?id=2763995213865176&ev=PageView&noscript=1"
        /></noscript> */}
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Header />
          <main>
            <Component {...pageProps} />
          </main>
          {shouldShowFooter && <Footer />}
        </PersistGate>
      </Provider>
      <NextNprogress
        color="#e02c22"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
      />
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-MHFMKJC"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        ></iframe>
      </noscript>
    </>
  )
}

export default MyApp

// TODO: COOMMENT FOR DEPLOY
