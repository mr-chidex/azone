import React from "react";
import NextLink from "next/link";

import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar
      className="Header"
      collapseOnSelect
      expand="lg"
      // bg="dark"
      variant="dark"
    >
      <Container fluid>
        <NextLink href="/">
          <a>
            <Navbar.Brand>Azone</Navbar.Brand>
          </a>
        </NextLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" />

          <Nav className="to">
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
  );
};

export default Header;
