import React from "react";
import { Container } from "react-bootstrap";
import { useRouter } from "next/router";

import Header from "./Header";
import Footer from "./Footer";
import { useDarkMode } from "../utils/UI";
import colors from "../utils/colors";
import Hero from "./Hero";

const Layout = ({ children }) => {
  const darkMode = useDarkMode();
  const router = useRouter();

  const mode = {
    background: darkMode ? colors.dark : colors.light,
    color: darkMode ? colors.white : colors.black,
  };

  return (
    <>
      <Header />

      {router.pathname === "/" && <Hero />}

      <Container fluid className="main-container" style={mode}>
        {children}

        <Footer />
      </Container>
    </>
  );
};

export default Layout;
