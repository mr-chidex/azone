import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";

const Shipping = () => {
  const router = useRouter();
  const auth = true;

  useEffect(() => {
    if (!auth) {
      router.push("/login?ref=shipping");
    }
  }, [auth, router]);

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
