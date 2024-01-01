import "../styles/globals.css";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import UserContext from "@/context/userContext";
import NavBar from "../components/Navbar";
import NProgress from 'nprogress';
import '../public/nprogress.css';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Script from 'next/script';

export default function App({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);
  const [UserData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {

    const handleStart = () => {
      setIsLoading(true);
      NProgress.start();
    };
    const handleComplete = () => {
      setIsLoading(false);
      NProgress.done();
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, []);

  return (
    <>
      <Head>
        <meta property="og:title" content="Linksync - Your Ultimate Links Manager" />
        <meta property="og:description" content="Seamlessly manage and share multiple links with Linksync. Elevate your online presence effortlessly." />
        <meta property="og:image" content="https://linksync-psi.vercel.app/images/linksync-prev.png" />
        <meta property="og:url" content={`https://linksync-psi.vercel.app${router.asPath}`} />
        <meta property="og:type" content="website" />
      </Head>

      <NavBar />
      <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=G-WYTYXQXVK6`} />
      <Script strategy="lazyOnload">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-WYTYXQXVK6', {
                    page_path: window.location.pathname,
                    });
                `}
      </Script>
      <UserContext.Provider value={{ UserData, setUserData }}>
        <Component {...pageProps} />
      </UserContext.Provider>
      <ToastContainer />
      {isLoading && <div className="nprogress-custom-parent"><div className="nprogress-custom-bar" /></div>}


    </>
  )
}
