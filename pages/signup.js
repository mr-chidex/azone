import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { signupUser } from "../redux/actions/user";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const { isAuth } = useSelector((state) => state.USER);

  if (isAuth) {
    router.push("/");
  }

  const signupHandler = (e) => {
    e.preventDefault();
    dispatch(signupUser({ name, email, password }));
  };

  return (
    <>
      <Head>
        <title>Azone | Signup</title>
      </Head>

      <Container>
        <main className="default-margin">
          <section className="form-container">
            <Form onSubmit={signupHandler}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  size="lg"
                  type="text"
                  placeholder="John doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  size="lg"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="pass">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  size="lg"
                  controlId="pass"
                  type="password"
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button className="button fw-bold" type="submit">
                  Sign Up
                </Button>
              </div>
            </Form>

            <p className="my-2">
              Already have an account?{" "}
              <Link href="/login">
                <a>Login</a>
              </Link>
            </p>
          </section>
        </main>
      </Container>
    </>
  );
};

export default Signup;
