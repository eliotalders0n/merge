import { React, useState, useEffect } from "react";
import Head from "./template/head";
import {
  Container,
  Button,
  ButtonGroup,
  ToggleButton,
  Card,
  Row,
  Form,
} from "react-bootstrap";
import firebase from "./../firebase";
import useGetPosts from "./hooks/useGetPosts";

// fsq3U9h/vWVthiZ0bbPijl4uXjRlr2d0pzyFM3XjgGY2nP4=

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

  // Post to merge

  const [user_id, setUserID] = useState([]);
  const [user_details, setUserDetails] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot((doc) => {
        setUserID(firebase.auth().currentUser.uid);
        setUserDetails(doc.data())
      });
  }, []);

  const [postText, setPostText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imagePreview, setImagePreview] = useState(null);

  const handleTextChange = (e) => {
    setPostText(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };


  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // Get device location
  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        const options = {
          enableHighAccuracy: true, // Request high-accuracy positioning
          timeout: 5000, // Timeout in milliseconds
          maximumAge: 0 // No cache
        };

        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          (error) => {
            console.log(error.message);
          },
          options
        );
      } else {
        console.log('Geolocation is not supported by this browser.');
      }
    };

    getLocation();
  }, []);

  const HandlePostSubmit = async () => {    
    // 1. Create a new post document in Firestore
    const postsCollection = firebase.firestore().collection("posts");
    const newPost = {
      text: postText,
      user_id: user_id,
      user_name: user_details.firstName,
      group: user_details.group,
      imageUrl: "",
      longitude: longitude,
      latitude: latitude,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };
    const postRef = await postsCollection.add(newPost);

    // 2. Upload the image file to Firebase Storage (if selected)
    if (imageFile) {
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(`postImages/${postRef.id}`);
      const uploadTask = imageRef.put(imageFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploadProgress(progress);
          console.log(progress);
        },
        (error) => {
          console.error("Error uploading image:", error);
        },
        () => {
          // 3. Get the download URL of the uploaded image and update the post document in Firestore
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            postRef.update({
              imageUrl: downloadURL,
            });
          });
        }
      );
    }

    // Reset form fields
    setPostText("");
    setImageFile(null);
    setUploadProgress(0);
  };

  const Posts = useGetPosts().docs;

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

      <Container className="d-flex justify-content-center">
        <Row style={{ maxWidth: " 70vh" }}>
          <h2>Tell us</h2>
          <Row>
            <Form.Control
              as="textarea"
              placeholder="Enter your post text"
              value={postText}
              onChange={handleTextChange}
            />
            <Form.Control
              className="my-1"
              type="file"
              onChange={handleImageChange}
            />
            <br />
            {imagePreview && (
              <img
                style={{ maxWidth: " 30vh" }}
                src={imagePreview}
                alt=" post state"
              />
            )}
          </Row>
          <div className="progress my-2">
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              aria-valuenow="0"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: uploadProgress + "%" }}
            ></div>
          </div>
          {/* <progress value={uploadProgress} max="100" /> */}
          <br />
          <Button variant="outline-dark" onClick={HandlePostSubmit}>
            Submit
          </Button>
          <br />
        </Row>
      </Container>

      <Container fluid className="d-flex justify-content-center">
        {body === "group" && activeFilter === "social" && (
          <Row>
            {Posts.filter((post) => post.group === user_details.group).map((post) => {
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
                    {user_id && user_id === post.user_id && (
                      <Button
                        variant="outline-dark"
                        onClick={() => deleteItem(post.id)}
                      >
                        Delete
                      </Button>
                    )}
                    
                  </Card.Body>
                </Card>
              );
            })}
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
          {Posts.map((post) => {
            return (
              <Card
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
                  {user_id && user_id === post.user_id && (
                    <Button
                      variant="outline-dark"
                      onClick={() => deleteItem(post.id)}
                    >
                      Delete
                    </Button>
                  )}
                  
                </Card.Body>
              </Card>
            );
          })}
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
