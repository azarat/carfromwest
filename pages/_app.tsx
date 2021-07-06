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
        <link
          rel="shortcut icon"
          href="/assets/images/favicon.ico"
          type="image/x-icon"
        />

        {/*  Global site tag (gtag.js) - Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-26Q9M74LEJ"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-26Q9M74LEJ');`,
          }}
        />
        {/* Jivosite Code */}
        <script src="//code.jivosite.com/widget/UvLnO8ySQi" async></script>
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
        <noscript><img height="1" width="1" style="display:none"
        src="https://www.facebook.com/tr?id=2763995213865176&ev=PageView&noscript=1"
        /></noscript>
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
