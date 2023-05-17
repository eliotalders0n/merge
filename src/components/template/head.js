import { React } from "react";
import { Container, Col, Navbar, Nav } from "react-bootstrap";

function Head(props) {

  return (
    <Navbar fixed="bottom" style={{backgroundColor : "white"}}>
      <Container className="text-center" >
        <Navbar.Collapse className="justify-content-center">
          <Col md={2} className="mx-auto">
            <Nav.Link
              href="/explore"
              style={{
                fontSize: "3vh",
                textDecoration: "underline",
                textDecorationColor: "cyan",
              }}
            >
              <i className="bi bi-map-fill"></i>
            </Nav.Link>
          </Col>
          <Col md={2} className="mx-auto">
            <Nav.Link
              href="/feed"
              style={{
                fontSize: "3vh",
                textDecoration: "underline",
                textDecorationColor: "cyan",
              }}
            >
              {/* <img style={{ borderRadius: "10px", width: "14vh" }} src="/assets/344741779_633096014894033_8998160269009553873_n.jpg" alt="merge logo"/> */}
              <i className="bi bi-house-door-fill"></i>
              
            </Nav.Link>
          </Col>

          <Col md={2} className="mx-auto">
            <Nav.Link
              href="/profile"
              style={{
                fontSize: "3vh",

                textDecoration: "underline",
                textDecorationColor: "cyan",
              }}
            >
              <i className="bi bi-person-fill"></i>
            </Nav.Link>
          </Col>

        </Navbar.Collapse>
      </Container>
      <hr />
    </Navbar>
  );
}

export default Head;
