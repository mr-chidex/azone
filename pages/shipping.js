import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

const Shipping = () => {
  const router = useRouter();

  const { isAuth } = useSelector((state) => state.USER);

  useEffect(() => {
    if (!isAuth) {
      router.push("/login?redirect=shipping");
    }
  }, [isAuth, router]);

  return (
    <>
      <Head>
        <title>Azone | Shipping</title>
      </Head>

      <Container>
        <main className="default-margin">
          <h1>Shipping</h1>
        </main>
      </Container>
    </>
  );
};

export default Shipping;
