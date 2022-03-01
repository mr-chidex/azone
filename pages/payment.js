import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

import ProgressStep from "../components/ProgressStep";

const Payment = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuth, userData } = useSelector((state) => state.USER);
  const { shippingAddress } = useSelector((state) => state.CART);
  const [payMethod, setPayMethod] = useState("paystack");

  useEffect(() => {
    if (!isAuth) {
      router.push("/login?redirect=payment");
    }
  }, [isAuth, router]);

  const paymentHandler = (e) => {
    e.preventDefault();
    console.log(payMethod);
  };

  return (
    <>
      <Head>
        <title>Azone | Payment</title>
      </Head>

      <Container>
        <main className="default-margin payment">
          <ProgressStep activeStep={2} />

          <section>
            <h1>Payment Method</h1>
            <Form onSubmit={paymentHandler}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  id="paystack"
                  value="paystack"
                  defaultChecked
                  onChange={(e) => setPayMethod(e.target.value)}
                />
                <label className="form-check-label" htmlFor="paystack">
                  Pay Stack
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  id="flutterwave"
                  value="flutterwave"
                  onChange={(e) => setPayMethod(e.target.value)}
                />
                <label className="form-check-label" htmlFor="flutterwave">
                  Flutter Wave
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  id="cash"
                  value="cash"
                  onChange={(e) => setPayMethod(e.target.value)}
                />
                <label className="form-check-label" htmlFor="cash">
                  Cash
                </label>
              </div>

              <div className="d-grid gap-2">
                <Button className="button fw-bold" type="submit">
                  CONTINUE
                </Button>
              </div>
              <div className="d-grid gap-2">
                <Button
                  className="button fw-bold"
                  onClick={() => router.push("/shipping")}
                >
                  GO BACK
                </Button>
              </div>
            </Form>
          </section>
        </main>
      </Container>
    </>
  );
};

export default Payment;
