import Head from "next/head";
import React from "react";
import { Container } from "react-bootstrap";

const Order = ({ data }) => {
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
