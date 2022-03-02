import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useFlutterwave } from "react-flutterwave";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { usePaystackPayment } from "react-paystack";
import { useSelector, useDispatch } from "react-redux";
import ProgressStep from "../components/ProgressStep";
import { toast } from "react-toastify";
import { placeOrderAction } from "../redux/actions/cart";

const PlaceOrder = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.USER);
  const { shippingAddress, paymentMethod, cart } = useSelector(
    (state) => state.CART
  );

  const totalPrice = cart.cartItems.reduce((acc, curVal) => {
    return acc + curVal.price * curVal.qty;
  }, 0);

  const tax = Math.round(totalPrice * 0.05);
  const shippingCost = Math.round(totalPrice * 0.02);

  useEffect(() => {
    if (!isAuth) {
      router.push("/login?redirect=place-order");
    }
  }, [isAuth, router]);

  useEffect(() => {
    if (!shippingAddress?.address) {
      router.push("/login?redirect=shipping");
    }
  }, [router, shippingAddress]);

  useEffect(() => {
    if (!paymentMethod) {
      router.push("/login?redirect=payment");
    }
  }, [router, paymentMethod]);

  const PlaceOrderHandler = () => {
    const orderInfo = {
      orderItems: cart?.cartItems,
      shippingAddress,
      paymentMethod,
      taxPrice: tax,
      totalPrice,
      shippingPrice: shippingCost,
    };
    dispatch(placeOrderAction(orderInfo));
  };

  return (
    <>
      <Head>
        <title>Azone | Place Order</title>
      </Head>

      <Container>
        <main className="default-margin shipping">
          <ProgressStep activeStep={3} />

          <section className="place-order">
            <h1>Place Order</h1>

            <Row>
              <Col xs={12} md={9}>
                <Card className="card">
                  <Card.Body>
                    <Card.Title>Shipping Adress</Card.Title>

                    <Card.Text>
                      {`${shippingAddress?.address}, ${shippingAddress?.pcode}, ${shippingAddress?.city}, ${shippingAddress?.country}.`}
                    </Card.Text>
                  </Card.Body>
                </Card>

                <Card>
                  <Card.Body>
                    <Card.Title>Payment Method</Card.Title>

                    <Card.Text>{`${paymentMethod}`}</Card.Text>
                  </Card.Body>
                </Card>

                <Card>
                  <Card.Body>
                    <Card.Title>Order Items</Card.Title>

                    <Card.Text>
                      <Table responsive hover className="table">
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Qty</th>
                            <th>Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cart?.cartItems?.map((item, ind) => (
                            <tr key={item._id}>
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
                              <td>{item?.qty}</td>
                              <td>
                                {parseInt(item.qty) * parseInt(item.price)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={3} className="checkout mt-2">
                <div className="d-flex  justify-content-between">
                  <span>Items:</span>
                  <p>${totalPrice}</p>
                </div>
                <div className="d-flex  justify-content-between">
                  <span>Tax: </span>
                  <p>${tax}</p>
                </div>
                <div className="d-flex  justify-content-between">
                  <span>Shipping Cost: </span>
                  <p>${shippingCost}</p>
                </div>
                <div className="d-flex fw-bold justify-content-between">
                  <span>Total:</span>
                  <p>${totalPrice + tax + shippingCost}</p>
                </div>
                <div className="d-grid">
                  <Button
                    onClick={PlaceOrderHandler}
                    className="button fw-bolder"
                  >
                    Place Order
                  </Button>
                </div>
              </Col>
            </Row>
          </section>
        </main>
      </Container>
    </>
  );
};

export default PlaceOrder;
