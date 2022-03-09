import Head from "next/head";
import Link from "next/link";
import React, { useEffect } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { signupUser } from "../redux/actions/user";
import { useForm } from "react-hook-form";
import Image from "next/image";

import { connectDB, convertObj, disconnectDB } from "../libs/db";
import { Order } from "../models/orders";

const OrderHistory = ({ orders }) => {
  const router = useRouter();

  const { isAuth } = useSelector((state) => state.USER);

  useEffect(() => {
    if (!isAuth) {
      router.push("/");
    }
  }, [isAuth, router]);

  return (
    <>
      <Head>
        <title>Azone | Order History</title>
      </Head>

      <Container>
        <main className="default-margin order-history">
          <h1>Order History</h1>

          <section>
            {orders?.length === 0 ? (
              <h3 className="mt-3 text-center">No order history</h3>
            ) : (
              <Table responsive hover className="table">
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Paid</th>
                    <th>Delivered</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((order, ind) => (
                    <tr key={order._id}>
                      <td>{ind + 1}</td>
                      <td>{order?.createdAt}</td>
                      <td>
                        $
                        {order?.totalPrice +
                          order?.taxPrice +
                          order?.shippingPrice}
                      </td>
                      <td>
                        {order?.isPaid ? (
                          <span className="text-success f">Paid</span>
                        ) : (
                          <span className="text-danger ">Not Paid</span>
                        )}
                      </td>
                      <td>{order?.isDelivered ? "Yes" : "No"}</td>
                      <td>
                        <Button
                          onClick={() => router.push(`orders/${order._id}`)}
                          variant="default"
                        >
                          ...
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </section>
        </main>
      </Container>
    </>
  );
};

export const getServerSideProps = async () => {
  await connectDB();
  const orders = await Order.find().lean().sort("-_id");

  return {
    props: {
      orders: orders.map(convertObj),
    },
  };
};

export default OrderHistory;
