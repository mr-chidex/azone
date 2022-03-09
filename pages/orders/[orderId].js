import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { usePaystackPayment } from "react-paystack";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import mongoose from "mongoose";

import { Order as PayOrder } from "../../models/orders";
import { connectDB, convertObj } from "../../libs/db";
import ProgressStep from "../../components/ProgressStep";
import { makePayment, placeOrderAction } from "../../redux/actions/cart";

const Redirect = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, [router]);
  return null;
};

const Order = ({ order }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuth, userData } = useSelector((state) => state.USER);
  const { orderId } = router.query;
  const [paid, setPaid] = useState(false);
  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    totalPrice,
    shippingPrice,
    taxPrice,
    isPaid,
    paidAt,
  } = order;

  useEffect(() => {
    if (!isAuth) {
      router.push("/login");
    }
  }, [isAuth, router]);

  useEffect(() => {
    dispatch(placeOrderAction());
  }, [dispatch]);

  const paystackConfig = {
    reference: new Date().getTime().toString(),
    email: userData?.email,
    amount: (totalPrice + taxPrice + shippingPrice) * 100,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY,
  };

  const onSuccess = (reference) => {
    dispatch(makePayment(orderId, reference));
    toast.success("payment successful");

    setPaid(true);
  };

  const onClose = () => {
    toast.error("payment canceled");
  };

  const initializePayment = usePaystackPayment(paystackConfig);
  const PlaceOrderHandler = () => {
    if (paymentMethod === "paystack") {
      initializePayment(onSuccess, onClose);
    }

    if (paymentMethod === "cash") {
      toast.success(
        "Thanks for purchasing. Payment details will be forwarded to your email"
      );
    }
  };

  return (
    <>
      <Head>
        <title>Azone | Order</title>
      </Head>

      <Container>
        <main className="default-margin place-order">
          {!order?._id ? (
            <Redirect />
          ) : (
            <>
              {" "}
              <ProgressStep activeStep={3} />
              <h1>Order {orderId}</h1>
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
                      <Card.Text>
                        Status:{" "}
                        {paid || isPaid ? (
                          <span className="text-success fw-bold">Paid</span>
                        ) : (
                          <span className="text-danger fw-bold">Not Paid</span>
                        )}{" "}
                      </Card.Text>
                      {paidAt && <Card.Text>Paid At: {`${paidAt}`}</Card.Text>}
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
                            {orderItems?.map((item, ind) => (
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
                  <h3 className="fw-light mb-4 text-capitalize text-center">
                    Order summary
                  </h3>
                  <div className="d-flex  justify-content-between">
                    <span>Items:</span>
                    <p>${totalPrice}</p>
                  </div>
                  <div className="d-flex  justify-content-between">
                    <span>Tax: </span>
                    <p>${taxPrice}</p>
                  </div>
                  <div className="d-flex  justify-content-between">
                    <span>Shipping Cost: </span>
                    <p>${shippingPrice}</p>
                  </div>
                  <div className="d-flex fw-bold justify-content-between">
                    <span>Total:</span>
                    <p>${totalPrice + taxPrice + shippingPrice}</p>
                  </div>
                  {!(paid || isPaid) && (
                    <div className="d-grid">
                      <Button
                        onClick={PlaceOrderHandler}
                        className="button fw-bolder"
                      >
                        Make Payment
                      </Button>
                    </div>
                  )}
                </Col>
              </Row>
            </>
          )}
        </main>
      </Container>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { orderId } = context.params;

  await connectDB();
  let order = {};
  if (!mongoose.isValidObjectId(orderId)) {
    return {
      props: {
        order: {},
      },
    };
  } else {
    order = await PayOrder.findById(orderId).lean();
    return {
      props: {
        order: convertObj(order),
      },
    };
  }
};

export default Order;
