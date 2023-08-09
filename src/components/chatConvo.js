import { useState, useEffect } from "react";
import Head from "./template/head";
import { Container, Button, Col, Row, Form, InputGroup } from "react-bootstrap";
import firebase from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import useGetUser from "./hooks/useGetUser";

function ChatConvo(props) {
  const [user_, setdocs] = useState([]);
  const navigate = useNavigate();
  const otherUser = useParams();
  console.log("user id: " + otherUser.id);
  const user = firebase.auth().currentUser.uid;

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

  console.log("user group" + user_.group);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    firebase
      .firestore()
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        const messagesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(messagesData);
      });
  }, []);

  const sendMessage = async () => {
    if (user) {
      await firebase.firestore().collection("messages").add({
        text: newMessage,
        userId: user,
        client: otherUser.id,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setNewMessage("");
    }
  };

  const getUser = useGetUser(otherUser.id).docs;

  return (
    <Container fluid>
      <Head />
      <Container>
        {/* {Users.filter((user) => user.group === user_.group).map((user) =>  */}
        <div>
          <Row
            style={{
              backgroundColor: "black",
              borderRadius: "5px",
              color: "white",
              margin: "10px 0",
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
                Last Seen today at 10:12{" "}
              </p>
            </Col>
          </Row>
          <hr />
        </div>
        {/* )} */}
      </Container>
      <Container style={{ marginBottom:"100px"}}>
        <Row>
          <Col>
            {messages
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
                  {message.text}
                  <br />
                  {/* <span className="text-muted">{message.timestamp}</span> */}
                </p>)
                // <p
                //   key={message.id}
                //   style={{
                //     padding: "8px 6px",
                //     backgroundColor: "lightgreen",
                //     borderRadius: "12px",
                //     whiteSpace: "normal",
                //   }}
                // >
                //   {message.text}
                //   <br />
                //   {/* <span className="text-muted">{message.timestamp}</span> */}
                // </p>
              ))}
          </Col>
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
