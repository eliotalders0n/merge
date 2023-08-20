import { useState, useEffect } from "react";
import Head from "./template/head";
import { Container, Button, Col, Card, Row, Spinner } from "react-bootstrap";
import firebase from "./../firebase";
import useGetGroup from "./hooks/useGetGroup";
import useGetPosts from "./hooks/useGetPosts";
import { useNavigate } from "react-router-dom";
import ParticlBg from "./template/particles";

function Profile(props) {
  // const Posts = useGetPosts().docs;
  const { docs, loading, fetchMorePosts } = useGetPosts(5);

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
  const user_id = firebase.auth().currentUser.uid;

  console.log("user group" + Group);

  return (
    <Container fluid
    style={{ backgroundColor: "rgb(220,220,220)", marginBottom: "10vh" }}>
      <Head />

      <Container>
        <ParticlBg/>
        <Row>
          <Col>
            <img
              src="assets/344741779_633096014894033_8998160269009553873_n.jpg"
              alt="user profile pic"
              style={{
                width: "20vh",
                height: "auto",
                margin: "50px 25%",
                borderRadius: "5px",
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <p className="lead">Name(s)</p>
          </Col>
          <Col xs={8}>
            <p className="lead text-muted">
              {user_.firstName} {user_.lastName}
            </p>
          </Col>
        </Row>

        <Row>
          <Col>
            <p className="lead">Address(s)</p>
          </Col>
          <Col xs={8}>
            <p className="lead text-muted">{user_.address}</p>
          </Col>
        </Row>

        <Row>
          <Col>
            <p className="lead">Age</p>
          </Col>
          <Col xs={8}>
            <p className="lead text-muted">{user_.age}</p>
          </Col>
        </Row>

        <Row>
          <Col>
            <p className="lead">Email(s)</p>
          </Col>
          <Col xs={8}>
            <p className="lead text-muted">{user_.email}</p>
          </Col>
        </Row>

        <Row>
          <Col>
            <p className="lead">Gender</p>
          </Col>
          <Col xs={8}>
            <p className="lead text-muted">{user_.gender}</p>
          </Col>
        </Row>

        <Row>
          <Col>
            <p className="lead">Group</p>
          </Col>
          <Col xs={8}>
            <p className="lead text-muted">{user_.group}</p>
          </Col>
        </Row>

        <Row>
          <Col>
            <p className="lead">Password</p>
          </Col>
          <Col xs={8}>
            <input
              type="password"
              className="lead"
              value="{user_.password}"
              style={{ border: "none", backgroundColor: "transparent" }}
            />
            <Button onClick={() => Logout()} variant="outline-dark">Logout</Button>
          </Col>
        </Row>
        <br />
      </Container>

      <Container fluid className="d-flex justify-content-center my-5">
        <Row>
          <h3 className="display-3">History</h3>

          {docs.filter((post) => post.user_id === user_id).map((post) => {
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
                  <img
                    src={Group.img}
                    alt="group representation"
                    style={{
                      width: "6vh",
                      borderRadius: "100px",
                      marginRight: "2vh",
                    }}
                  />
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

          {loading && (
            <div className="loading-overlay">
              <Spinner animation="grow" role="status" variant="dark">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}

          {!loading && docs.length > 0 && (
            <Button
              variant="dark"
              onClick={fetchMorePosts}
              disabled={!fetchMorePosts}
            >
              Load More Posts
            </Button>
          )}
        </Row>
      </Container>
    </Container>
  );
}

export default Profile;
