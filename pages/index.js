import Head from "next/head";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
import AOS from "aos";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { connectDB, convertObj, disconnectDB } from "../libs/db";
import { Product } from "../models/products";
import Rating from "../components/Ratings";
import { addToCartAction } from "../redux/actions/cart";

export default function Home({ products }) {
  const dispatch = useDispatch();

  const addToCartHandler = (prod) => {
    dispatch(addToCartAction(prod));
  };

  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <>
      <Head>
        <title>Azone</title>
      </Head>

      <Container className="Home">
        <h1 className="fw-bolder mb-3">Our Products</h1>

        <Row>
          {products.map((prod, ind) => (
            <Col key={ind + 1}>
              <Card
                style={{ width: "18rem" }}
                data-aos="fade-up"
                className="product-card"
              >
                <Link href={`/products/${prod.slug}`}>
                  <a title={prod.name}>
                    <Card.Img variant="top" src={prod.image} />
                  </a>
                </Link>
                <Card.Body className="card-body">
                  <Card.Title className="text-capitalize text-center">
                    {prod.name}
                  </Card.Title>
                  <Card.Text className="text-center">
                    <Rating value={prod.rating} />
                  </Card.Text>
                  <Card.Text className="text-center fs-5">
                    ${prod.price}
                  </Card.Text>

                  <Button
                    onClick={() => addToCartHandler(prod)}
                    className="button fw-lighter"
                  >
                    ADD TO CART
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export const getServerSideProps = async () => {
  await connectDB();
  const products = await Product.find().lean();

  await disconnectDB();
  return {
    props: {
      products: products.map(convertObj),
    },
  };
};
