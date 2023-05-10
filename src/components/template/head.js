import { React, useEffect, useState } from "react";
import { Button, Container, Col, Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import firebase from "./../../firebase";

function Head(props) {
  const navigate = useNavigate();
  const [user, setuser] = useState(null);

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snap) => {
        console.log(" currentUser.uid " + firebase.auth().currentUser.email);
        setuser(firebase.auth().currentUser);
      });
  }, []);

  const Logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigate("/", { replace: true });
        window.location.reload(false);
      });
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container className="text-center" style={{ backgroundColor: "white" }}>
        <Navbar.Brand href="/" className="mx-auto">
          <h1>
            <span style={{ color: "black", fontSize: "7vh" }}>Merge</span>
          </h1>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Col md={2}>
            <Nav.Link
              href="/explore"
              style={{
                fontSize: "4vh",
                textDecoration: "underline",
                textDecorationColor: "cyan",
              }}
            >
              Explore
            </Nav.Link>
          </Col>
          <Col md={2}>
            <Nav.Link
              href="/feed"
              style={{
                fontSize: "4vh",
                textDecoration: "underline",
                textDecorationColor: "cyan",
              }}
            >
              Feed
            </Nav.Link>
          </Col>

          <Col md={2}>
            <Nav.Link
              href="/profile"
              style={{
                fontSize: "4vh",
                textDecoration: "underline",
                textDecorationColor: "cyan",
              }}
            >
              Profile
            </Nav.Link>
          </Col>

          <Col md={2}>
            <Nav.Link
              style={{
                fontSize: "4vh",
                textDecoration: "underline",
                textDecorationColor: "cyan",
              }}
              onClick={() => Logout()}
            >
                Logout
            </Nav.Link>
          </Col>

          <Col md={2}>
            <Nav.Link
              href="/feed"
              style={{ fontSize: "2vh", color: "grey", padding: "2vh" }}
            >
              {user && user.email}
            </Nav.Link>
          </Col>
        </Navbar.Collapse>
      </Container>
      <hr />
    </Navbar>
  );
}

export default Head;
