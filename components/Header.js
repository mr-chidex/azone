import React from "react";
import NextLink from "next/link";
import { Container, Form, Nav, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

import { changeTheme } from "../redux/actions/UI";
import { useDarkMode } from "../utils/UI";
import colors from "../utils/colors";

const Header = () => {
  const dispatch = useDispatch();
  const darkMode = useDarkMode();

  const switchHandler = () => {
    dispatch(changeTheme(darkMode));

    const newMode = !darkMode;
    Cookies.set("darkMode", newMode ? "ON" : "OFF");
  };

  const mode = {
    background: !darkMode ? colors.dark : colors.light,
  };

  return (
    <>
      <Navbar
        className="Header"
        fixed="top"
        collapseOnSelect
        expand="lg"
        variant="dark"
      >
        <Container fluid>
          <NextLink href="/">
            <a>
              <Navbar.Brand className="logo">Azone</Navbar.Brand>
            </a>
          </NextLink>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" />

            <Nav className="to">
              <div className="switch">
                <Form.Check
                  type="switch"
                  checked={darkMode}
                  onChange={switchHandler}
                  id="custom-switch"
                />
              </div>

              <NextLink href="/cart">
                <Nav.Link href="/cart">Cart</Nav.Link>
              </NextLink>

              <NextLink href="/login">
                <Nav.Link href="/login">Login</Nav.Link>
              </NextLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
