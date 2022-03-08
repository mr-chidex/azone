import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useFlutterwave } from "react-flutterwave";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { usePaystackPayment } from "react-paystack";
import { useSelector, useDispatch } from "react-redux";
import { Order as PayOrder } from "../../models/orders";

import { toast } from "react-toastify";
import { connectDB, convertObj, disconnectDB } from "../../libs/db";
import ProgressStep from "../../components/ProgressStep";
import { makePayment } from "../../redux/actions/cart";

const Order = ({ order }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuth, userData } = useSelector((state) => state.USER);
  const { orderId } = router.query;
  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    totalPrice,
    shippingPrice,
    taxPrice,
  } = order;

  useEffect(() => {
    if (!isAuth) {
      router.push("/login");
    }
  }, [isAuth, router]);

  const paystackConfig = {
    reference: new Date().getTime().toString(),
    email: userData?.email,
    amount: totalPrice * 100,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY,
  };

  // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    // console.log(reference);
    dispatch(makePayment(orderId));
    toast.success("payment successful");
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    // console.log("closed");
    toast.error("payment canceled");
  };

  // const initializePayment = usePaystackPayment(paystackConfig);
  const PlaceOrderHandler = () => {
    if (paymentMethod === "paystack") {
      initializePayment(onSuccess, onClose);
    }
    if (paymentMethod === "flutterwave") {
      handleFlutterPayment({
        callback: (response) => {
          // console.log(response);
          dispatch(makePayment(orderId));
          toast.success("message payment successful");
        },
        onClose: () => {
          toast.error("payment canceled");
          router.push("/place-order");
        },
      });
    }
    if (paymentMethod === "cash") {
      toast.success(
        "Thanks for purchasing. Payment details will be forwarded to your email"
      );
    }
  };

  const flutterConfig = {
    public_key: process.env.NEXT_PUBLIC_FLUTTER_KEY,
    tx_ref: Date.now(),
    amount: totalPrice + taxPrice + shippingPrice,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: userData?.email,
      name: userData?.name,
    },
    customizations: {
      title: "My store",
      description: "Payment for items in cart",
      logo: "https://avatars.githubusercontent.com/u/61011030?v=4",
    },
  };

  const handleFlutterPayment = useFlutterwave(flutterConfig);

  return (
    <>
      <Head>
        <title>Azone | Order</title>
      </Head>

      <Container>
        <main className="default-margin place-order">
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
                            <td>{parseInt(item.qty) * parseInt(item.price)}</td>
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
              <div className="d-grid">
                <Button
                  onClick={PlaceOrderHandler}
                  className="button fw-bolder"
                >
                  Make Payment
                </Button>
              </div>
            </Col>
          </Row>
        </main>
      </Container>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { orderId } = context.params;

  await connectDB();
  const order = await PayOrder.findById(orderId).lean();

  // disconnectDB();

  return {
    props: {
      order: convertObj(order),
    },
  };
};

export default Order;
