import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { wrapper } from "../redux/store";
import Layout from "../components/Layout";
import "../styles/all.scss";
import NoSsr from "../components/NoSsr";
import {
  logOutUser,
  setAuthorizationHeader,
  setUser,
} from "../redux/actions/user";
import { USER_TOKEN } from "../redux/constants/user";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (Cookies.get(USER_TOKEN)) {
      setAuthorizationHeader(Cookies.get(USER_TOKEN));
      try {
        const decodedToken = jwtDecode(Cookies.get(USER_TOKEN));

        if (decodedToken !== undefined) {
          dispatch(setUser(decodedToken));

          if (decodedToken.exp < new Date().getTime() / 1000) {
            dispatch(logOutUser());
          }
        }
      } catch (error) {
        console.log(error);
        dispatch(logOutUser());
      }
    }
  });

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
