import SSRProvider from "react-bootstrap/SSRProvider";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useRouter } from "next/router";

import { wrapper } from "../redux/store";
import Layout from "../components/Layout";
import "../styles/all.scss";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const handleStart = (_) => {
    NProgress.start();
  };
  const handleStop = () => {
    NProgress.done();
  };

  useEffect(() => {
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <SSRProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SSRProvider>
  );
}

export default wrapper.withRedux(MyApp);
