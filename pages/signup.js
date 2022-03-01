import Head from "next/head";
import Link from "next/link";
import React, { useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { signupUser } from "../redux/actions/user";
import { useForm } from "react-hook-form";

const Signup = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isAuth, loading } = useSelector((state) => state.USER);

  useEffect(() => {
    if (isAuth) {
      router.push("/");
    }
  }, [isAuth, router]);

  const signupHandler = (data) => {
    dispatch(signupUser(data));
  };

  return (
    <>
      <Head>
        <title>Azone | Signup</title>
      </Head>

      <Container>
        <main className="default-margin">
          <section className="form-container">
            <Form onSubmit={handleSubmit(signupHandler)}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  size="lg"
                  type="text"
                  placeholder="John doe"
                  {...register("name", {
                    required: "full name is required",
                    minLength: { value: 4, message: " min of 4 characters" },
                  })}
                />
              </Form.Group>
              {errors.name && <p className="error">* {errors.name?.message}</p>}

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  size="lg"
                  type="email"
                  placeholder="name@example.com"
                  {...register("email", {
                    required: "email is required",
                  })}
                />
              </Form.Group>
              {errors.email && (
                <p className="error">* {errors.email?.message}</p>
              )}

              <Form.Group className="mb-3" controlId="pass">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  size="lg"
                  controlId="pass"
                  type="password"
                  {...register("password", {
                    required: "password is required",
                    minLength: { value: 5, message: " min of 5 characters" },
                  })}
                />
              </Form.Group>
              {errors.password && (
                <p className="error">* {errors.password?.message}</p>
              )}

              {loading ? (
                <div className="d-grid gap-2">
                  <Button className="btn btn-light  fw-bold">
                    Signing up...
                  </Button>
                </div>
              ) : (
                <div className="d-grid gap-2">
                  <Button className="button fw-bold" type="submit">
                    Sign Up
                  </Button>
                </div>
              )}
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
