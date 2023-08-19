import { useState, useEffect } from "react";
import Head from "./template/head";
import { Container, Col, Row, Form, InputGroup } from "react-bootstrap";
import firebase from "../firebase";
import useGetUsers from "./hooks/useGetUsers";
import { Link } from "react-router-dom";

function Chat(props) {
  const [user_, setdocs] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot((doc) => {
        setdocs(doc.data());
      });
  }, []);

  // const deleteItem = (id) => {
  //   firebase
  //     .firestore()
  //     .collection("posts")
  //     .doc(id)
  //     .delete()
  //     .then(() => {
  //       alert("Post was deleted successfully");
  //     })
  //     .catch((e) => {
  //       alert(e);
  //     });
  // };

  const Users = useGetUsers().docs;

  return (
    <Container fluid>
      <Head />
      <Container>
        <h3 className="display-3">Chats</h3>
        <i className="bi bi-arrow-right-square-fill"></i> Communication is the bond that connects souls.{" "}
        <div className="my-3">
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
            key={user.id}
            to={"/chatConvo/" + user.id}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <div>
              <Row
                style={{
                  // backgroundColor: "rgb(50,50,50)",
                  color: "black",
                  margin: "10px 0",
                }}
              >
                <Col>
                  <img
                   alt=""
                    src="assets/user.png"
                    style={{
                      width: "100%",
                      margin: "50% auto",
                      alignItems: "center",
                    }}
                  ></img>
                </Col>
                <Col xs={8}>
                  <p className="display-5 my-3">{user.firstName}</p>
                  <br />
                </Col>
                <Col>
                  <p className="lead text-muted" style={{ margin: "50% 0" }}>
                  <i className="bi bi-chat-fill"></i>
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
