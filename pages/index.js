import Head from "next/head";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";

import { data } from "../utils/data";

export default function Home() {
  const router = useRouter();

  const getProductHandler = (slug) => {
    router.push(`/products/${slug}`);
  };

  return (
    <>
      <Head>
        <title>Azone</title>
      </Head>

      <Container className="Home">
        <h1 className="fw-bolder">Our Products</h1>

        <Row>
          {data.products.map((prod, ind) => (
            <Col key={ind + 1}>
              <Card style={{ width: "18rem" }} className="product-card">
                <Link href={`/products/${prod.slug}`}>
                  <a title={prod.name}>
                    <Card.Img variant="top" src={prod.image} />
                  </a>
                </Link>
                <Card.Body className="card-body">
                  <Card.Title className="text-capitalize text-center">
                    {prod.name}
                  </Card.Title>
                  <Card.Text className="text-center">${prod.price}</Card.Text>
                  <Button
                    onClick={() => getProductHandler(prod.slug)}
                    className="button fw-bold"
                  >
                    View Details
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
