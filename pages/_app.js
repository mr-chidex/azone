import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { wrapper } from "../redux/store";
import Layout from "../components/Layout";
import "../styles/all.scss";
import NoSsr from "../components/NoSsr";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  NProgress.configure({ trickle: false });
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
    <NoSsr>
      <Layout>
        <ToastContainer autoClose={3000} position="top-right" closeOnClick />
        <Component {...pageProps} />
      </Layout>
    </NoSsr>
  );
}

export default wrapper.withRedux(MyApp);
