import React from "react";
import Head from "next/head";

import { data } from "../../utils/data";
import { Breadcrumb, Button, Col, Row } from "react-bootstrap";
import Link from "next/link";
import Image from "react-bootstrap/Image";

export const getStaticPaths = async () => {
  const paths = data.products.map((prod) => ({ params: { slug: prod.slug } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const slug = context.params.slug;
  const product = data.products.filter((prod) => prod.slug === slug)[0];

  return {
    props: {
      product: product,
    },
  };
};

const Product = ({ product }) => {
  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>

      <main>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href="/">
              <a>Back</a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link href={`/products/${product.slug}`}>
              <a className="active">{product.name}</a>
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>

        <Row>
          <Col md={6} sm={12}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>

          <Col md={6} sm={12}>
            <Row>
              <Col xs={12} md={6}>
                <p>
                  <strong>{product.name}</strong>
                </p>
                <p>
                  <strong>Category</strong>: {product.category}
                </p>
                <p>
                  <strong>Brand</strong>: {product.brand}
                </p>
                <p>
                  <strong>Ratings</strong>: {product.rating} stars (
                  {product.numReviews} reviews)
                </p>
                <p>
                  <strong>Description</strong>: {product.description}
                </p>
              </Col>

              <Col xs={12} md={6}>
                <div className="d-flex justify-content-between">
                  <strong>Price</strong>
                  <p>${product.price}</p>
                </div>

                <div className="d-flex justify-content-between">
                  <strong>Status</strong>
                  <p>
                    {product.countInStock > 1 ? "In stock" : "Not in stock"}
                  </p>
                </div>

                <div className="d-grid">
                  <Button variant="dark">Add To Cart</Button>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </main>
    </>
  );
};

export default Product;
