import { React, useState } from "react";
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
  const [body, setBody] = useState("group");
  const [activeFilter, setActiveFilter] = useState("social");
  const [radioValue, setRadioValue] = useState("group");

  const radios = [
    { name: "Group", value: "group" },
    { name: "Public", value: "public" },
  ];

  const handleToggleChange = (event) => {
    setBody(event.target.value);
    setRadioValue(event.target.value);
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

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
              onChange={handleToggleChange}
              //   onChange={(e) => setRadioValue(e.currentTarget.value)}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </Container>

      <Container className="d-flex justify-content-center">
        <Button
          variant="outline-dark"
          className="mx-2"
          onClick={() => handleFilterClick("social")}
        >
          Social
        </Button>
        <Button
          variant="outline-dark"
          className="mx-2"
          onClick={() => handleFilterClick("events")}
        >
          Events
        </Button>
        <Button
          variant="outline-dark"
          className="mx-2"
          onClick={() => handleFilterClick("serve")}
        >
          Serve
        </Button>
      </Container>

      <Container fluid className="d-flex justify-content-center">
        {body === "group" && activeFilter === "social" && (
          <Row>
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
                src="https://images.unsplash.com/photo-1510972527921-ce03766a1cf1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  <p>Test 1</p>
                </Card.Text>
                <Button variant="dark">Go somewhere</Button>
              </Card.Body>
            </Card>
            <br />

            <Card
              className="mx-auto my-2"
              border="dark"
              style={{
                maxWidth: "30rem",
                border: "none",
                boxShadow: "2px 2px 2px 2px rgba(0, 80, 80, 0.4)",
              }}
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
        )}

        {body === "group" && activeFilter === "events" && (
          <Row>
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
                src="https://images.unsplash.com/photo-1600096194534-95cf5ece04cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
              />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  <p>Test 1</p>
                </Card.Text>
                <Button variant="dark">Go somewhere</Button>
              </Card.Body>
            </Card>
            <br />

            <Card
              className="mx-auto my-2"
              border="dark"
              style={{
                maxWidth: "30rem",
                border: "none",
                boxShadow: "2px 2px 2px 2px rgba(0, 80, 80, 0.4)",
              }}
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
        )}

        {body === "group" && activeFilter === "serve" && (
          <Row>
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
                src="https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
              />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  <p>Test 1</p>
                </Card.Text>
                <Button variant="dark">Go somewhere</Button>
              </Card.Body>
            </Card>
            <br />

            <Card
              className="mx-auto my-2"
              border="dark"
              style={{
                maxWidth: "30rem",
                border: "none",
                boxShadow: "2px 2px 2px 2px rgba(0, 80, 80, 0.4)",
              }}
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
        )}

{/* Public data */}
{body === "public" && activeFilter === "social" && (
          <Row>
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
                src="https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
              />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  <p>Test 2</p>
                </Card.Text>
                <Button variant="dark">Go somewhere</Button>
              </Card.Body>
            </Card>
            <br />

            <Card
              className="mx-auto my-2"
              border="dark"
              style={{
                maxWidth: "30rem",
                border: "none",
                boxShadow: "2px 2px 2px 2px rgba(0, 80, 80, 0.4)",
              }}
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
        )}

        {body === "public" && activeFilter === "events" && (
          <Row>
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
                src="https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
              />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  <p>Test 2</p>
                </Card.Text>
                <Button variant="dark">Go somewhere</Button>
              </Card.Body>
            </Card>
            <br />

            <Card
              className="mx-auto my-2"
              border="dark"
              style={{
                maxWidth: "30rem",
                border: "none",
                boxShadow: "2px 2px 2px 2px rgba(0, 80, 80, 0.4)",
              }}
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
        )}

        {body === "public" && activeFilter === "serve" && (
          <Row>
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
                src="https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
              />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  <p>Test 2</p>
                </Card.Text>
                <Button variant="dark">Go somewhere</Button>
              </Card.Body>
            </Card>
            <br />

            <Card
              className="mx-auto my-2"
              border="dark"
              style={{
                maxWidth: "30rem",
                border: "none",
                boxShadow: "2px 2px 2px 2px rgba(0, 80, 80, 0.4)",
              }}
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
        )}

        
      </Container>
    </Container>
  );
}

export default Feed;
