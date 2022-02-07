import React from "react";
import Head from "next/head";
import { Container } from "react-bootstrap";

import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />

      <Container className="main-container">{children}</Container>

      <Footer />
    </>
  );
};

export default Layout;
