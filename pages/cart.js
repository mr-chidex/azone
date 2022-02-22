import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeQty, removeFromCart } from "../redux/actions/cart";

const Cart = () => {
  const { cart } = useSelector((state) => state.CART);
  const dispatch = useDispatch();

  const totalPrice = cart.cartItems.reduce((acc, curVal) => {
    return acc + curVal.price * curVal.qty;
  }, 0);

  const totalQty = cart.cartItems.reduce((acc, curVal) => {
    return acc + parseInt(curVal.qty);
  }, 0);

  const selectQtyHandler = (itemId, qty) => {
    dispatch(changeQty(itemId, qty));
  };

  const deleteHandler = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  return (
    <>
      <Head>
        <title>Azone | Shopping Cart</title>
      </Head>

      <Container className="Cart default-margin">
        <main>
          <h2 className="fw-lighter">Shopping Cart</h2>

          <section className="cart-content">
            {cart.cartItems <= 0 ? (
              <div>
                <p>
                  Cart is empty. <Link href="/">Go Shopping</Link>
                </p>
              </div>
            ) : (
              <Row>
                <Col md={9} sm={12}>
                  <Table responsive hover className="table">
                    <thead>
                      <tr>
                        <th>S/N</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart?.cartItems?.map((item, ind) => (
                        <tr key={item._id}>
                          <td>{ind + 1}</td>
                          <td>
                            <Link href={`/products/${item.slug}`}>
                              <a>
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  height={40}
                                  width={40}
                                />
                              </a>
                            </Link>
                          </td>
                          <td>
                            <Link href={`/products/${item.slug}`}>
                              <a>{item.name}</a>
                            </Link>
                          </td>
                          <td>
                            <select
                              className="select form-select"
                              name="qty"
                              id=""
                              onChange={(e) =>
                                selectQtyHandler(item._id, e.target.value)
                              }
                            >
                              {[...Array(item.countInStock)].map((_, ind) => (
                                <option key={ind + 1} value={ind + 1}>
                                  {ind + 1}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>
                            {item.qty} x ${item.price}
                          </td>

                          <td>
                            <Button
                              onClick={() => deleteHandler(item._id)}
                              variant="danger"
                            >
                              &#128473;
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>

                <Col xs={12} md={3} className="checkout mt-2">
                  <div className="d-flex  justify-content-between fw-bold">
                    <span>Subtotal({totalQty} item(s))</span>
                    <p>${totalPrice}</p>
                  </div>

                  <div className="d-grid">
                    <Button className="button fw-bolder">Check Out</Button>
                  </div>
                </Col>
              </Row>
            )}
          </section>
        </main>
      </Container>
    </>
  );
};

export default Cart;
