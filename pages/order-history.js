import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";

import { connectDB, convertObj } from "../libs/db";
import { Order } from "../models/orders";
import { toast } from "react-toastify";

const OrderHistory = ({ orders }) => {
  const router = useRouter();
  const [allOrders, setAllOrders] = useState(orders);

  const { isAuth } = useSelector((state) => state.USER);

  useEffect(() => {
    if (!isAuth) {
      router.push("/");
    }
  }, [isAuth, router]);

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`/api/orders/${id}`);
      setAllOrders((prev) =>
        prev.filter((order) => order._id?.toString() !== id.toString())
      );
    } catch (err) {
      toast.error("error deleting order");
    }
  };

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
                  {allOrders?.map((order, ind) => (
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
                          className="mx-2 my-2"
                        >
                          ...
                        </Button>

                        {order?.isPaid && (
                          <Button
                            className="mx-2 my-2"
                            onClick={() => deleteHandler(order._id)}
                            variant="danger"
                          >
                            &#128473;
                          </Button>
                        )}
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
