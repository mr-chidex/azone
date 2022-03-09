import React from "react";
import NextLink from "next/link";
import {
  Badge,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Nav,
  Navbar,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

import { changeTheme } from "../redux/actions/UI";
import { useDarkMode } from "../utils/UI";
import { logOutUser } from "../redux/actions/user";

const Header = () => {
  const dispatch = useDispatch();
  const darkMode = useDarkMode();
  const router = useRouter();

  const { isAuth, userData } = useSelector((state) => state.USER);
  const { cart } = useSelector((state) => state.CART);

  const totalQty = cart.cartItems.reduce((acc, curVal) => {
    return acc + parseInt(curVal.qty);
  }, 0);
  const switchHandler = () => {
    dispatch(changeTheme(darkMode));

    const newMode = !darkMode;
    Cookies.set("darkMode", newMode ? "ON" : "OFF");
  };

  const logoutHandler = () => {
    dispatch(logOutUser());
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
                <Nav.Link
                  className={router.pathname === "/" && "inactive"}
                  href="/cart"
                >
                  Cart
                  {cart?.cartItems?.length > 0 && (
                    <Badge pill bg="light">
                      {totalQty}
                    </Badge>
                  )}
                </Nav.Link>
              </NextLink>

              {!isAuth && (
                <NextLink href="/login">
                  <Nav.Link
                    className={router.pathname === "/" && "inactive"}
                    href="/login"
                  >
                    Login
                  </Nav.Link>
                </NextLink>
              )}

              {isAuth && (
                <DropdownButton
                  id="dropdown-basic-button"
                  className="dropdown"
                  title={userData?.name}
                >
                  <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                  <Dropdown.Item>
                    <NextLink href="/order-history">
                      <a>Order History</a>
                    </NextLink>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
                </DropdownButton>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
