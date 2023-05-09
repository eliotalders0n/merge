import React from "react";
import { Container, Col, Navbar, Nav } from "react-bootstrap";

function Head(props) {
  return (
    <Navbar bg="light" expand="lg">
      <Container
        className="text-center"
        style={{ backgroundColor: "white" }}
      >
        <Navbar.Brand href="/" className="mx-auto">
          <h1>
            <span style={{ color: "black", fontSize: "7vh" }}>Merge</span>
          </h1>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Col md={2}>
            <Nav.Link
              href="/logout"
              style={{ fontSize: "4vh", textDecoration: "underline", textDecorationColor: "cyan" }}
            >
              Logout
            </Nav.Link>
          </Col>
          <Col md={2}>
            <Nav.Link
              href="/explore"
              style={{ fontSize: "4vh", textDecoration: "underline", textDecorationColor: "cyan" }}
            >
              Explore
            </Nav.Link>
          </Col>
          <Col md={2}>
            <Nav.Link
              href="/profile"
              style={{ fontSize: "4vh", textDecoration: "underline", textDecorationColor: "cyan" }}
            >
              Profile
            </Nav.Link>
          </Col>
          <Col md={2}>
            <Nav.Link
              href="/feed"
              style={{ fontSize: "4vh", textDecoration: "underline", textDecorationColor: "cyan"}}
            >
              Feed
            </Nav.Link>
          </Col>

          <Col md={2}>
            <Nav.Link
              href="/feed"
              style={{ fontSize: "2vh", color: "grey", padding: "2vh" }}
            >
            Pukuta Mwanza
            </Nav.Link>
          </Col>
        </Navbar.Collapse>
      </Container>
      <hr />
    </Navbar>
  );
}

export default Head;
