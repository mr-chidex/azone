import React, { useState } from "react";
import {
  Badge,
  Button,
  Dropdown,
  DropdownButton,
  Form,
  Nav,
  Navbar,
  Offcanvas,
} from "react-bootstrap";
import NextLink from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

import { changeTheme } from "../redux/actions/UI";
import { useDarkMode } from "../utils/UI";
import { logOutUser } from "../redux/actions/user";
import colors from "../utils/colors";

function OffCanvasExample({ ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    handleClose();
    dispatch(logOutUser());
  };

  return (
    <>
      <Button variant="default" onClick={handleShow}>
        <div className="menu-icon"></div>
        <div className="menu-icon"></div>
        <div className="menu-icon"></div>
      </Button>
      <Offcanvas
        style={{ background: "#4b4949" }}
        show={show}
        onHide={handleClose}
        {...props}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title onClick={handleClose}>
            <NextLink href="/">
              <a className="Logo">
                <Navbar.Brand>Azone</Navbar.Brand>
              </a>
            </NextLink>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="to">
            <div className="switch" onClick={handleClose}>
              <Form.Check
                type="switch"
                checked={darkMode}
                onChange={switchHandler}
                id="custom-switch"
              />
            </div>

            <NextLink href="/cart">
              <Nav.Link
                className={
                  router.pathname !== "/cart" ? "inactive" : "link-def"
                }
                href="/cart"
                onClick={handleClose}
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
                  onClick={handleClose}
                  className={
                    router.pathname !== "/login" ? "inactive" : "link-def"
                  }
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
                variant="light"
              >
                {/* <Dropdown.Item href="#/action-1">Profile</Dropdown.Item> */}
                <Dropdown.Item onClick={handleClose}>
                  <NextLink href="/order-history">
                    <a style={{ textDecoration: "none", color: colors.dark }}>
                      Order History
                    </a>
                  </NextLink>
                </Dropdown.Item>
                <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
              </DropdownButton>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

const Drawer = () => {
  return (
    <>
      <OffCanvasExample placement="end" />
    </>
  );
};

export default Drawer;
