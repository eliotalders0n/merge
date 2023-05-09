import { React } from "react";
import Head from "./template/head";
import {
  Container,
  Button,
  Col,
  Card,
  Row,
  Form,
} from "react-bootstrap";

function Profile(props) {
  return (
    <Container fluid>
      <Head />

      <Container fluid className="d-flex justify-content-center">
        <Card
          className="mx-auto my-2"
          style={{
            maxWidth: "30rem",
            border: "none",
            padding: "0",
            boxShadow: "2px 2px 8px 4px rgba(0, 60, 60, 0.3)",
            backgroundImage: `url("https://images.unsplash.com/photo-1510972527921-ce03766a1cf1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80")`,
            filter: "grayscale(75%)",
            backgroundSize: "cover",
            color: "white",
            height: "70vh",
          }}
        >
          <Card.Body>
            <Card.Title>Update Profile</Card.Title>
            <Form className="my-5">
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder="1234 Main St" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control placeholder="Apartment, studio, or floor" />
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <Form.Select defaultValue="Choose...">
                    <option>Choose...</option>
                    <option>...</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control />
                </Form.Group>
              </Row>

              <Button variant="dark" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <br />
      </Container>

      <Container fluid className="d-flex justify-content-center my-5">
        <Row>
        <h3 className="display-3">History</h3>
        <Card
          className="mx-auto my-2"
          style={{
            maxWidth: "30rem",
            border: "none",
            padding: "0",
            boxShadow: "2px 2px 2px 2px rgba(0, 60, 60, 0.3)",
          }}
        >
          <Card.Img
            variant="top"
            src="https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
          />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="dark">Go somewhere</Button>
          </Card.Body>
        </Card>
        <br />
        <Card className="mx-auto my-2" style={{ maxWidth: "30rem", border: "none", padding: "0", boxShadow: "2px 2px 2px 2px rgba(0, 60, 60, 0.3)" }}>
            <Card.Img
              variant="top"
              src="https://images.unsplash.com/photo-1527525443983-6e60c75fff46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=685&q=80"
            />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="dark">Go somewhere</Button>
            </Card.Body>
          </Card>
          <br />
          <Card className="mx-auto my-2" style={{ maxWidth: "30rem", border: "none", padding: "0", boxShadow: "2px 2px 2px 2px rgba(0, 60, 60, 0.3)" }}>
            <Card.Img
              variant="top"
              src="https://images.unsplash.com/photo-1510972527921-ce03766a1cf1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="dark">Go somewhere</Button>
            </Card.Body>
          </Card>
          <br />
          </Row>
      </Container>
    </Container>
  );
}

export default Profile;
