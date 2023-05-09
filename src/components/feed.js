import {React , useState} from "react";
import Head from "./template/head";
import {
  Container,
  Button,
  ButtonGroup,
  ToggleButton,
  Card,
  Row,
} from "react-bootstrap";

function Feed(props) {
  const [radioValue, setRadioValue] = useState("1");

  const radios = [
    { name: "Group", value: "1" },
    { name: "Public", value: "2" },
  ];

  return (
    <Container fluid>
      <Head />

      <Container className="d-flex justify-content-center my-2">
        <ButtonGroup>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant={"outline-dark"}
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => setRadioValue(e.currentTarget.value)}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </Container>

      <Container className="d-flex justify-content-center">
        <Button variant="outline-dark" className="mx-2">
          Events
        </Button>
        <Button variant="outline-dark" className="mx-2">
          Anouncments
        </Button>
        <Button variant="outline-dark" className="mx-2">
          Serve
        </Button>
      </Container>

      <Container fluid className="d-flex justify-content-center">
        <Row>
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

          <Card
            className="mx-auto my-2"
            border="dark"
            style={{ maxWidth: "30rem", border:"none", boxShadow: "2px 2px 2px 2px rgba(0, 80, 80, 0.4)" }}
          >
            <Card.Header>Header</Card.Header>
            <Card.Body>
              <Card.Title>Dark Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
          <br />
        </Row>
      </Container>
    </Container>
  );
}

export default Feed;
