import React, { useState } from "react";
import Head from "next/head";
import {
  Alert,
  Breadcrumb,
  Button,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";

import { Product as Prod } from "../../models/products";
import { connectDB, convertObj, disconnectDB } from "../../libs/db";
import Rating from "../../components/Ratings";
import { addToCartAction } from "../../redux/actions/cart";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const [alert, setAlert] = useState(false);

  const addToCartHandler = () => {
    if (product.countInStock <= 0) {
      setAlert(true);

      setTimeout(() => {
        setAlert(false);
      }, 4000);

      return;
    }

    dispatch(addToCartAction(product));
  };

  return (
    <>
      <Head>
        <title>{product.name}</title>
        <meta name="description" content={product.description} />
      </Head>

      <Container>
        <main className="product default-margin">
          {alert && (
            <Alert variant="info" onClose={() => setAlert(false)} dismissible>
              <Alert.Heading>Sorry! Product out of stock!</Alert.Heading>
              <p>Please, check back later</p>
            </Alert>
          )}

          <Breadcrumb>
            <Link href="/" passHref={true}>
              <Breadcrumb.Item>Back</Breadcrumb.Item>
            </Link>
            <Link href={`/products/${product.slug}`} passHref={true}>
              <Breadcrumb.Item>
                <span className="active">{product.name}</span>
              </Breadcrumb.Item>
            </Link>
          </Breadcrumb>

          <Row>
            <Col md={6} sm={12}>
              <Image
                src={product.image}
                alt={product.name}
                width={640}
                height={640}
                layout="responsive"
              />
            </Col>

            <Col md={6} sm={12} className="mt-2">
              <Row>
                <Col xs={12} md={6}>
                  <h1 className="name">{product.name}</h1>
                  <p>
                    <span className="fw-bolder">Category</span>:{" "}
                    {product.category}
                  </p>
                  <p>
                    <span className="fw-bolder">Brand</span>: {product.brand}
                  </p>
                  <p>
                    <span className="fw-bolder">Ratings</span>:{" "}
                    <Rating value={product.rating} />
                  </p>
                  <p>
                    <span className="fw-bolder">No. of reviews</span>:{" "}
                    {product.numReviews}
                  </p>
                  <p>
                    <span className="fw-bolder">Description</span>:{" "}
                    {product.description}
                  </p>
                </Col>

                <Col xs={12} md={6} className="price mt-2">
                  <div className="d-flex justify-content-between fw-bold">
                    <span>Price</span>
                    <p>${product.price}</p>
                  </div>

                  <div className="d-flex justify-content-between fw-bold">
                    <span>Status</span>
                    <p>
                      {product.countInStock > 1 ? "In stock" : "Not in stock"}
                    </p>
                  </div>

                  <div className="d-grid">
                    <Button
                      className="button fw-bolder"
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </Button>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </main>
      </Container>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { slug } = context.params;
  await connectDB();
  const product = await Prod.findOne({ slug }).lean();

  await disconnectDB();
  return {
    props: {
      product: convertObj(product),
    },
  };
};

export default Product;
