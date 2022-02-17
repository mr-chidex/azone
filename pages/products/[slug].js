import React from "react";
import Head from "next/head";
import { Breadcrumb, Button, Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";

import { Product as Prod } from "../../models/products";
import { connectDB, convertObj, disconnectDB } from "../../libs/db";

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

const Product = ({ product }) => {
  return (
    <>
      <Head>
        <title>{product.name}</title>
        <meta name="description" content={product.description} />
      </Head>

      <Container>
        <main className="product def-mag">
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
                    <span className="fw-bolder">Ratings</span>: {product.rating}{" "}
                    stars ({product.numReviews} reviews)
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
                    <Button className="button fw-bolder">Add To Cart</Button>
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

export default Product;
