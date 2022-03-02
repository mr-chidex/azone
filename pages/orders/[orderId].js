import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useFlutterwave } from "react-flutterwave";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { usePaystackPayment } from "react-paystack";
import { useSelector, useDispatch } from "react-redux";
// import ProgressStep from "../components/ProgressStep";
import { toast } from "react-toastify";

const Order = ({ data }) => {
  // const paystackConfig = {
  //   reference: new Date().getTime().toString(),
  //   email: userData?.email,
  //   amount: totalPrice * 100,
  //   publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY,
  // };

  // you can call this function anything
  // const onSuccess = (reference) => {
  //   // Implementation for whatever you want to do with reference and after success call.
  //   // console.log(reference);
  //   toast.success("message payment successful");
  // };

  // you can call this function anything
  // const onClose = () => {
  //   // implementation for  whatever you want to do when the Paystack dialog closed.
  //   // console.log("closed");
  //   toast.error("payment canceled");
  // };

  // const initializePayment = usePaystackPayment(paystackConfig);
  const PlaceOrderHandler = () => {
    // if (paymentMethod === "paystack") {
    //   initializePayment(onSuccess, onClose);
    // }
    // if (paymentMethod === "flutterwave") {
    //   handleFlutterPayment({
    //     callback: (response) => {
    //       // console.log(response);
    //       toast.success("message payment successful");
    //     },
    //     onClose: () => {
    //       toast.error("payment canceled");
    //       router.push("/place-order");
    //     },
    //   });
    // }
    // if (paymentMethod === "cash") {
    //   toast.success(
    //     "Thanks for purchasing. Payment details will be forwarded to your email"
    //   );
    // }
  };

  // const flutterConfig = {
  //   public_key: process.env.NEXT_PUBLIC_FLUTTER_KEY,
  //   tx_ref: Date.now(),
  //   amount: totalPrice + tax + shippingCost,
  //   currency: "NGN",
  //   payment_options: "card,mobilemoney,ussd",
  //   customer: {
  //     email: userData?.email,
  //     name: userData?.name,
  //   },
  //   customizations: {
  //     title: "My store",
  //     description: "Payment for items in cart",
  //     logo: "https://avatars.githubusercontent.com/u/61011030?v=4",
  //   },
  // };

  // const handleFlutterPayment = useFlutterwave(flutterConfig);

  return (
    <>
      <Head>
        <title>Azone | Order</title>
      </Head>

      <Container>
        <main className="default-margin">
          <h1>Order</h1>
        </main>
      </Container>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { orderId } = context.params;

  return {
    props: {
      data: {},
    },
  };
};

export default Order;
