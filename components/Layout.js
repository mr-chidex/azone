import React from "react";
import Head from "next/head";
import { Container } from "react-bootstrap";

import Header from "./Header";
import Footer from "./footer";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Azone</title>
      </Head>

      <Header />

      <Container>{children}</Container>

      <Footer />
    </>
  );
};

export default Layout;
