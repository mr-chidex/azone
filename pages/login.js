import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { loginUser } from "../redux/actions/user";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const { redirect } = router.query;

  const { isAuth, loading } = useSelector((state) => state.USER);

  useEffect(() => {
    if (isAuth) {
      router.push(redirect || "/");
    }
  }, [isAuth, router, redirect]);

  const loginHandler = async (e) => {
    e.preventDefault();

    dispatch(loginUser({ email, password }));
  };

  return (
    <>
      <Head>
        <title>Azone | Login</title>
      </Head>

      <Container>
        <main className="default-margin">
          <section className="form-container">
            <Form onSubmit={loginHandler}>
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

              {loading ? (
                <div className="d-grid gap-2">
                  <Button className="btn btn-light  fw-bold">
                    Login in...
                  </Button>
                </div>
              ) : (
                <div className="d-grid gap-2">
                  <Button className="button fw-bold" type="submit">
                    Login
                  </Button>
                </div>
              )}
            </Form>

            <p className="my-2">
              Don&apos;t have an account?{" "}
              <Link href="/signup">
                <a>Signup</a>
              </Link>
            </p>
          </section>
        </main>
      </Container>
    </>
  );
};

export default Login;
