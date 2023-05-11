import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import firebase from "./../../firebase";
import {
  Card,
  ListGroup,
  Row,
  Container,
  Col,
  InputGroup,
  Button,
  Form,
} from "react-bootstrap";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedin, setLoggedin] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log("Successfully logged in!");
      setLoggedin(true);
    } catch (error) {
      console.error("Error logging in: ", error);
    }
  };

  if(loggedin){
    return <Navigate to="/admin" />; // navigate to dashboard
  }

  return (
    <Container fluid>
      <Row className="d-flex justify-content-center my-5">
        <Col md={12} className="text-center">
          <h1 style={{ fontSize: "10vh" }}>
            Mer<span style={{ color: "purple" }}>ge</span>
          </h1>
        </Col>
        <Col className="my-2">
          <Card>
            <Card.Img
              variant="top"
              src="https://img.freepik.com/free-vector/sign-concept-illustration_114360-5267.jpg?w=826&t=st=1682639471~exp=1682640071~hmac=a621b6be08fdf261d744f283bc62d89ea651cdae96620846b39f256d4088261d"
              alt="Image by storyset on Freepik"
            />
            <Card.Body>
              <Card.Title>Sign in</Card.Title>
              <Card.Text>
                Pick up were you left off, update and maintain.
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <form onSubmit={handleLogin}>
                <ListGroup.Item>
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">
                      Email
                    </InputGroup.Text>
                    <Form.Control
                      aria-label="email"
                      aria-describedby="inputGroup-sizing-sm"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </InputGroup>
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">
                      Password
                    </InputGroup.Text>
                    <Form.Control
                      aria-label="password"
                      aria-describedby="inputGroup-sizing-sm"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </InputGroup>
                  <Button type="submit" style={{ width: "100%" }}>
                    Login
                  </Button>
                </ListGroup.Item>
              </form>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
