import Head from "next/head";
import Link from "next/link";
import React, { useEffect } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { loginUser } from "../redux/actions/user";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { redirect } = router.query;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isAuth, loading } = useSelector((state) => state.USER);

  useEffect(() => {
    if (isAuth) {
      router.push(redirect || "/");
    }
  }, [isAuth, router, redirect]);

  const loginHandler = async (data) => {
    dispatch(loginUser(data));
  };

  return (
    <>
      <Head>
        <title>Azone | Login</title>
      </Head>

      <Container fluid="xxl">
        <main className="default-margin">
          <section className="form-container">
            <Alert variant="info">
              <Alert.Heading>Test User</Alert.Heading>
              <hr />
              <div>
                <p>Email: johndoe@email.com</p>
                <p>Password: doe123</p>
              </div>
            </Alert>

            <Form onSubmit={handleSubmit(loginHandler)}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  controlId="email"
                  size="lg"
                  type="email"
                  placeholder="name@example.com"
                  name="email"
                  aria-invalid={errors.email ? "true" : "false"}
                  {...register("email", {
                    required: "email is required",
                  })}
                />
              </Form.Group>
              {errors.email && (
                <p className="error">* {errors.email?.message}</p>
              )}

              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  size="lg"
                  controlId="password"
                  name="password"
                  type="password"
                  {...register("password", {
                    required: "password is required",
                  })}
                />
              </Form.Group>
              {errors.password && (
                <p className="error">* {errors.password?.message}</p>
              )}

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
