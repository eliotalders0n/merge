import {useState, useEffect} from 'react';
import Head from "./template/head";
import { Container, Button, Col, Card, Row, Form } from "react-bootstrap";
import firebase from './../firebase' 
import useGetGroup from './hooks/useGetGroup';
import useGetPosts from './hooks/useGetPosts';
import { useNavigate } from "react-router-dom";

function Profile(props) {
  const Posts = useGetPosts().docs;

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

  const Group = useGetGroup(user_.group).docs;
  const user_id = firebase.auth().currentUser.uid

  return (
    <Container fluid>
      <Head />

      <Container fluid className="d-flex justify-content-center">
        <Card
          className="mx-auto my-2"
          style={{
            maxWidth: "30rem",
            border: "none",
            padding: "0",
            boxShadow: "2px 2px 8px 4px rgba(0, 60, 60, 0.3)",
            backgroundColor: "rgb(220,220,220)",
            // backgroundImage: `url("https://images.unsplash.com/photo-1510972527921-ce03766a1cf1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80")`,
            filter: "grayscale(75%)",
            backgroundSize: "cover",
            color: "black",
            height: "70vh",
          }}
        >
          <Card.Body>
            <Card.Title >Update Profile</Card.Title>
            <p className="text-muted">Please contact your group admin to change account details</p>
            <Form className="my-3">
            <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control readonly type="email" placeholder="Enter email" value={user_.firstName + " " +  user_.lastName} />
                </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control readonly type="email" placeholder="Enter email" value={user_.email} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control readonly type="password" placeholder="Password" value={user_.password} />
                </Form.Group>
              </Row>

              <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control readonly placeholder="1234 Main St" value={user_.address} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>Group</Form.Label>
                  <Form.Control readonly placeholder='14' value={Group.name}/>
                </Form.Group>
                </Row>
                
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select defaultValue={user_.gender}>
                    <option>{user_.gender}</option>
                    <option>Male</option>
                    <option>Female</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Age</Form.Label>
                  <Form.Control readonly placeholder='20' value={user_.age}/>
                </Form.Group>
              </Row>

<p className="text-muted">We do not abuse or sell any information on this site. All information is strictly used by the church for record keeping and accountability</p>
              <Button variant="dark" onClick={() => Logout()}>
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <br />
      </Container>

      <Container fluid className="d-flex justify-content-center my-5">
        <Row>
          <h3 className="display-3">History</h3>
          
          {Posts.filter((post) => post.user_id === user_id).map((post) => {
              return (
                <Card
                key={post.id}
                className="mx-auto my-2"
                style={{
                  maxWidth: "30rem",
                  border: "none",
                  padding: "0",
                  boxShadow: "2px 2px 2px 2px rgba(0, 60, 60, 0.3)",
                }}
              >
                  <Card.Img variant="top" src={post.imageUrl} />
                  <Card.Body>
                    <Card.Title>{post.user_name}</Card.Title>
                    <Card.Text>
                      <p>{post.text}</p>
                    </Card.Text>
                    <img src={Group.img} alt="group representation" style={{ width: "6vh", borderRadius: "100px", marginRight: "2vh"}}/>
                      <Button
                        variant="outline-dark"
                        onClick={() => deleteItem(post.id)}
                      >
                        Delete
                      </Button>
                    
                  </Card.Body>
                </Card>
              );
            })}
          </Row>
      </Container>
    </Container>
  );
}

export default Profile;
