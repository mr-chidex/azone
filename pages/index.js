import Head from "next/head";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { data } from "../utils/data";

export default function Home() {
  return (
    <>
      <Head>
        <title>Azone</title>
      </Head>

      <Container className="Home">
        <h1>Products</h1>

        <Row>
          {data.products.map((prod) => (
            <>
              <Col>
                <Card style={{ width: "18rem" }} className="product-card">
                  <Card.Img variant="top" src={prod.image} />
                  <Card.Body>
                    <Card.Title>{prod.name}</Card.Title>
                    <Card.Text>{prod.description}</Card.Text>
                    <Card.Text>${prod.price}</Card.Text>
                    <Button variant="primary">Add To Cart</Button>
                  </Card.Body>
                </Card>
              </Col>
            </>
          ))}
        </Row>
      </Container>
    </>
  );
}
