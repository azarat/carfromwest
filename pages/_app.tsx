// import App from "next/app";
import type { AppProps } from 'next/app'
import '../styles/main.scss'
import Header from '../src/components/Header/Header'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
    </>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp
