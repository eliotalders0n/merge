import { useState, useEffect } from "react";
import Head from "./template/head";
import { Container, Button, Col, Row, Form, InputGroup } from "react-bootstrap";
import firebase from "../firebase";
import { useNavigate } from "react-router-dom";
import useGetUsers from "./hooks/useGetUsers";
import { Link, Link as RouterLink } from "react-router-dom";

function Chat(props) {
  const [user_, setdocs] = useState([]);
  const navigate = useNavigate();

  const Logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigate("/", { replace: true });
        window.location.reload(false);
      });
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot((doc) => {
        setdocs(doc.data());
      });
  }, []);

  const deleteItem = (id) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(id)
      .delete()
      .then(() => {
        alert("Post was deleted successfully");
      })
      .catch((e) => {
        alert(e);
      });
  };

  const Users = useGetUsers().docs;

  console.log("user group" + user_.group);

  return (
    <Container fluid>
      <Head />
      <Container>
        <h3 className="display-3">Chats</h3>
        <div>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <i className="bi bi-search"></i>
            </InputGroup.Text>
            <Form.Control
              placeholder="Search"
              aria-label="Search"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </div>
        {Users.filter((user) => user.group === user_.group).map((user) => (
          <Link
            to={"/chatConvo/" + user.id}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <div key={user.id}>
              <Row
                style={{
                  // backgroundColor: "rgb(50,50,50)",
                  color: "black",
                  margin: "10px 0",
                }}
              >
                <Col>
                  <img
                    src="assets/user.png"
                    style={{
                      width: "100%",
                      margin: "50% auto",
                      alignItems: "center",
                    }}
                  ></img>
                </Col>
                <Col xs={8}>
                  <p className="lead my-1">{user.firstName}</p>
                  <br />
                  <p
                    className=""
                    style={{
                      margin: "-25px 0",
                      fontSize: "1rem",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "100%",
                    }}
                  >
                    <i className="bi bi-check-all"></i> Auto-layout for flexbox
                    grid columns also means you can set the width of one column
                    and have the sibling columns automatically resize around{" "}
                  </p>
                </Col>
                <Col>
                  <p className="lead text-muted" style={{ margin: "50% 0" }}>
                    04:31
                  </p>
                </Col>
              </Row>
              <hr />
            </div>
          </Link>
        ))}
      </Container>
    </Container>
  );
}

export default Chat;
