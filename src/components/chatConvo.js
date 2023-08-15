import { useState, useRef } from "react";
import Head from "./template/head";
import { Container, Button, Col, Row, Form, InputGroup } from "react-bootstrap";
import firebase from "../firebase";
import { useParams } from "react-router-dom";
import useGetUser from "./hooks/useGetUser";
import useGetMessages from "./hooks/useGetMessages";

function ChatConvo(props) {
  const otherUser = useParams();
  // console.log("user id: " + otherUser.id);
  const user = firebase.auth().currentUser.uid;
  const scroll = useRef();

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

  // console.log("user group" + user_.group);

  // const [messages, setMessages] = useState([]);
  const messages = useGetMessages().docs
  const [newMessage, setNewMessage] = useState("");

  // console.log("texts : " + messages)
  const sendMessage = async () => {
    if (user) {
      await firebase.firestore().collection("messages").add({
        text: newMessage,
        userId: user,
        client: otherUser.id,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setNewMessage("");
      scroll.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getUser = useGetUser(otherUser.id).docs;

  return (
    <Container fluid>
      <Head />
      <Container>
        {/* {Users.filter((user) => user.group === user_.group).map((user) =>  */}
        <div>
          <Row className="fixed-top"
            style={{
              backgroundColor: "black",
              // borderRadius: "5px",
              color: "white",
              margin: "0 0",
            }}
          >
            <Col>
              <img
                src="https://cdn-icons-png.flaticon.com/512/236/236831.png?w=826&t=st=1691568971~exp=1691569571~hmac=f5cce47055864dfab0d2c79e438cf1cf607cb02d3fe0e46a21681be83fd29c67"
                style={{
                  width: "100%",
                  margin: "50% auto",
                  alignItems: "center",
                }}
                alt="expanded"
              ></img>
            </Col>
            <Col xs={10}>
              <p className="lead my-1">{getUser.firstName}</p>
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
                {getUser.email}{" "}
              </p>
            </Col>
          </Row>
          <hr />
        </div>
        {/* )} */}
      </Container>
      <Container style={{ margin:"100px 0"}}>
        <Row>
        {messages.length > 0 ? (
          <Col>
          {/* eslint-disable-next-line */}
          {messages.filter((text) => text.client === user && text.userId === otherUser.id || text.client === otherUser.id && text.userId === user)
            .map((message) => (

              message.client === user ? (<p
                key={message.id}
                style={{
                  padding: "8px 6px",
                  backgroundColor: "lightgreen",
                  borderRadius: "12px",
                  whiteSpace: "normal",
                  width: "60%",
                }}
              >
                <span ref={scroll}></span>
                {message.text}
                <br />
                {/* <span className="text-muted">{message.timestamp}</span> */}
              </p>) : (<p
                key={message.id}
                style={{
                  padding: "8px 6px",
                  backgroundColor: "lightblue",
                  borderRadius: "12px",
                  whiteSpace: "normal",
                  width: "60%",
                  marginLeft: "40%"
                }}
              >
                <span ref={scroll}></span>
                {message.text}
                <br />
                {/* <span className="text-muted">{message.timestamp}</span> */}
              </p>)
            ))}
        </Col>
        ) : (
          <div>No messages sent yet.</div>
        )}
        </Row>
      </Container>

      <Container>
        <Row className="fixed-bottom" style={{ marginBottom: "30px" }}>
          <Col>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="send message..."
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <Button
                variant="dark"
                id="button-addon2"
                onClick={sendMessage}
                scroll={scroll}
              >
                Send
              </Button>
            </InputGroup>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default ChatConvo;
