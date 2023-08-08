import { React, useState, useEffect } from "react";
import Head from "./template/head";
import {
  Container,
  Button,
  ButtonGroup,
  ToggleButton,
  Card,
  Col,
  Row,
  Form,
  Badge,
  Modal,
  InputGroup,
  // Toast
} from "react-bootstrap";
import firebase from "./../firebase";
import useGetPosts from "./hooks/useGetPosts";
import useGetGroup from "./hooks/useGetGroup";
import dayjs from "dayjs";

// fsq3U9h/vWVthiZ0bbPijl4uXjRlr2d0pzyFM3XjgGY2nP4=

function Feed(props) {
  const [body, setBody] = useState("group");
  const [activeFilter, setActiveFilter] = useState("social");
  const [radioValue, setRadioValue] = useState("group");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showShare, setShowShare] = useState(false);

  const handleShareClose = () => setShowShare(false);
  const handleShareShow = () => setShowShare(true);

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
        setUserDetails(doc.data());
      });
  }, []);

  const [postText, setPostText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imagePreview, setImagePreview] = useState(null);
  const [checkboxValue, setCheckboxValue] = useState(false);

  const handleCheckboxChange = (e) => {
    setCheckboxValue(e.target.checked);
  };

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
          maximumAge: 0, // No cache
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
        console.log("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, []);
  // const [show, setShow] = useState(false);

  // const showToast = () => {
  //   setShow(true)
  //   return (
  //     <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
  //         <Toast.Header>
  //           <img
  //             src="holder.js/20x20?text=%20"
  //             className="rounded me-2"
  //             alt=""
  //           />
  //           <strong className="me-auto">Bootstrap</strong>
  //           <small>11 mins ago</small>
  //         </Toast.Header>
  //         <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
  //       </Toast>
  //   )
  // }

  const HandlePostSubmit = async () => {
    // 1. Create a new post document in Firestore
    const postsCollection = firebase.firestore().collection("posts");
    const newPost = {
      text: postText,
      user_id: user_id,
      user_name: user_details.firstName,
      group: Group.GroupNumber,
      groupImage: Group.img,
      imageUrl: "",
      post_status: checkboxValue,
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
          setUploadProgress(0);
        }
      );
    }
    // showToast();
    setCheckboxValue(false);
    setImagePreview("");
    setImageFile(null);
    setPostText("");
    handleClose();
  };

  const Posts = useGetPosts().docs;
  const Group = useGetGroup(user_details.group).docs;

  const deleteItem = (id) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(id)
      .delete()
      .then(() => {
        // showToast();
        alert("Post was deleted successfully");
      })
      .catch((e) => {
        alert(e);
      });
  };

  // Reset form fields

  return (
    <Container
      fluid
      style={{ backgroundColor: "rgb(220,220,220)", marginBottom: "10vh" }}
    >
      <p className="display-3 text-center">
        Hey {user_details.firstName}{" "}
        <Badge
          bg="dark"
          style={{
            padding: "6px 8px",
            marginBottom: "4px",
            marginLeft: "20px",
          }}
        >
          Verified
        </Badge>
      </p>
      <Head />
      <Container className="d-flex justify-content-center my-2">
        <ButtonGroup style={{ width: "100%" }}>
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
          className="mx-1"
          style={{ height: "12vh", width: "20vh" }}
          onClick={() => handleFilterClick("social")}
        >
          Social
        </Button>
        <Button
          variant="outline-dark"
          className="mx-1"
          style={{ height: "12vh", width: "20vh" }}
          onClick={() => handleFilterClick("events")}
        >
          Events
        </Button>
        <Button
          variant="outline-dark"
          className="mx-1"
          style={{ height: "12vh", width: "20vh" }}
          onClick={() => handleFilterClick("serve")}
        >
          Serve
        </Button>
      </Container>

      <Container className="d-flex justify-content-center">
        <Button
          variant="outline-dark"
          style={{ width: "100%" }}
          className="my-3"
          onClick={handleShow}
        >
          Create Post
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h2 className="display-3">Tell us</h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row style={{ maxWidth: " 70vh" }}>
              <Row>
                <Form.Control
                  as="textarea"
                  placeholder="for youtube videos just paste the link url"
                  value={postText}
                  onChange={handleTextChange}
                />
                <Form.Control
                  className="my-1"
                  type="file"
                  onChange={handleImageChange}
                />
                <Form.Check
                  checked={checkboxValue}
                  onChange={handleCheckboxChange}
                  type="checkbox"
                  label="Group Only"
                  id="post-status"
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
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="outline-dark" onClick={HandlePostSubmit}>
              Post
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>

      <Container fluid className="d-flex justify-content-center">
        {body === "group" && activeFilter === "social" && (
          <Row>
            {Posts.filter((post) => post.group === Group.GroupNumber).map(
              (post) => {
                // const jsDate = post.timestamp.toDate();
                const jsDate = post.timestamp?.toDate();
                const formattedTimestamp =
                  dayjs(jsDate).format("YYYY-MM-DD HH:mm");
                const finalTimestamp = formattedTimestamp.substring();
                if (post.text && post.text.startsWith("https://youtu.be")) {
                  const videoUrl = post.text;
                  const videoId = videoUrl.substring(
                    videoUrl.lastIndexOf("/") + 1
                  );
                  console.log("video : " + videoId);
                  return (
                    <Card
                      key={post.id}
                      className="mx-auto my-2 animate__animated animate__bounceInRight animate__slow animate__delay-1s"
                      style={{
                        maxWidth: "30rem",
                        border: "none",
                        padding: "0",
                        boxShadow: "2px 2px 2px 2px rgba(0, 60, 60, 0.3)",
                      }}
                    >
                      <iframe
                        width="100%"
                        height="auto"
                        src={"https://www.youtube.com/embed/" + videoId}
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                      ></iframe>

                      <Card.Body>
                        {post.post_status === true && (
                          <Badge
                            bg="primary"
                            style={{ padding: "8px", marginBottom: "8px" }}
                          >
                            Group {post.group} Only
                          </Badge>
                        )}
                        <Card.Title>{post.user_name}</Card.Title>
                        <Card.Text>
                          <p>{post.text}</p>
                          <p className="lead text-muted">{finalTimestamp}</p>
                        </Card.Text>
                        <img
                          src={post.groupImage}
                          alt="group representation"
                          style={{
                            width: "6vh",
                            borderRadius: "100px",
                            marginRight: "2vh",
                          }}
                        />
                        <Row style={{ marginTop: "14px" }}>
                          <Col>
                            <img
                              src={post.groupImage}
                              alt="group representation"
                              style={{
                                width: "6vh",
                                borderRadius: "100px",
                                marginRight: "2vh",
                              }}
                            />
                          </Col>
                          <Col>
                            <Button
                              variant="outline-dark"
                              style={{ marginTop: "14px" }}
                            >
                              <i class="bi bi-share-fill"></i>
                            </Button>
                          </Col>
                          <Col>
                            <Button
                              variant="outline-dark"
                              style={{ marginTop: "14px" }}
                            >
                              <i class="bi bi-heart-fill"></i>
                            </Button>
                          </Col>
                          <Col>
                            <Button
                              variant="outline-dark"
                              style={{ marginTop: "14px" }}
                            >
                              <i class="bi bi-chat-fill"></i>
                            </Button>
                          </Col>
                          {user_id && user_id === post.user_id && (
                            <Col>
                              <Button
                                variant="outline-dark"
                                onClick={() => deleteItem(post.id)}
                                style={{ marginTop: "14px" }}
                              >
                                <i class="bi bi-trash-fill"></i>
                              </Button>
                            </Col>
                          )}
                        </Row>
                      </Card.Body>
                    </Card>
                  );
                } else
                  return (
                    <Card
                      key={post.id}
                      className="mx-auto my-2 animate__animated animate__bounceInLeft animate__slow animate__delay-1s"
                      style={{
                        maxWidth: "30rem",
                        border: "none",
                        padding: "0",
                        boxShadow: "2px 2px 2px 2px rgba(0, 60, 60, 0.3)",
                      }}
                    >
                      <Card.Img variant="top" src={post.imageUrl} />
                      <Card.Body>
                        {post.post_status === true && (
                          <Badge
                            bg="primary"
                            style={{ padding: "8px", marginBottom: "8px" }}
                          >
                            Group {post.group} Only
                          </Badge>
                        )}
                        <Card.Title>{post.user_name}</Card.Title>
                        <Card.Text>
                          <p>{post.text}</p>
                          <p className="lead text-muted">{finalTimestamp}</p>
                        </Card.Text>

                        <Row style={{ marginTop: "14px" }}>
                          <Col>
                            <img
                              src={post.groupImage}
                              alt="group representation"
                              style={{
                                width: "6vh",
                                borderRadius: "100px",
                                marginRight: "2vh",
                              }}
                            />
                          </Col>
                          <Col>
                            <Button
                              variant="outline-dark"
                              style={{ marginTop: "14px" }}
                              onClick={handleShareShow}
                            >
                              <i class="bi bi-share-fill"></i>
                            </Button>
                          </Col>
                          <Col>
                            <Button
                              variant="outline-dark"
                              style={{ marginTop: "14px" }}
                            >
                              <i class="bi bi-heart-fill"></i>
                            </Button>
                          </Col>
                          <Col>
                            <Button
                              variant="outline-dark"
                              style={{ marginTop: "14px" }}
                            >
                              <i class="bi bi-chat-fill"></i>
                            </Button>
                          </Col>
                          {user_id && user_id === post.user_id && (
                            <Col>
                              <Button
                                variant="outline-dark"
                                onClick={() => deleteItem(post.id)}
                                style={{ marginTop: "14px" }}
                              >
                                <i class="bi bi-trash-fill"></i>
                              </Button>
                            </Col>
                          )}
                        </Row>
                      </Card.Body>
                    </Card>
                  );
              }
            )}
          </Row>
        )}

        {body === "group" && activeFilter === "events" && (
          <Row>
            {Posts.filter(
              (post) =>
                post.postType === "event" && post.group === Group.GroupNumber
            ).map((post) => {
              return (
                <Card
                  key={post.id}
                  className="mx-auto my-2 animate__animated animate__bounceInLeft animate__slow animate__delay-1s"
                  style={{
                    maxWidth: "30rem",
                    border: "none",
                    padding: "0",
                    boxShadow: "2px 2px 2px 2px rgba(0, 60, 60, 0.3)",
                  }}
                >
                  <Card.Img variant="top" src={post.imageUrl} />
                  <Card.Body>
                    {post.post_status === true && (
                      <Badge
                        bg="primary"
                        style={{ padding: "8px", marginBottom: "8px" }}
                      >
                        Group {post.group} Only
                      </Badge>
                    )}
                    <Card.Title>{post.user_name}</Card.Title>
                    <Badge
                      bg="dark"
                      style={{ padding: "8px", marginBottom: "8px" }}
                    >
                      {" "}
                      {post.postType}{" "}
                    </Badge>
                    <Card.Text>
                      <p>{post.text}</p>
                      <p className="text-muted">Date : {post.startDate}</p>
                    </Card.Text>
                    <Row style={{ marginTop: "14px" }}>
                      <Col>
                        <img
                          src={post.groupImage}
                          alt="group representation"
                          style={{
                            width: "6vh",
                            borderRadius: "100px",
                            marginRight: "2vh",
                          }}
                        />
                      </Col>
                      <Col>
                        <Button
                          variant="outline-dark"
                          style={{ marginTop: "14px" }}
                          onClick={handleShareShow}
                        >
                          <i class="bi bi-share-fill"></i>
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          variant="outline-dark"
                          style={{ marginTop: "14px" }}
                        >
                          <i class="bi bi-heart-fill"></i>
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          variant="outline-dark"
                          style={{ marginTop: "14px" }}
                        >
                          <i class="bi bi-chat-fill"></i>
                        </Button>
                      </Col>
                      {user_id && user_id === post.user_id && (
                        <Col>
                          <Button
                            variant="outline-dark"
                            onClick={() => deleteItem(post.id)}
                            style={{ marginTop: "14px" }}
                          >
                            <i class="bi bi-trash-fill"></i>
                          </Button>
                        </Col>
                      )}
                    </Row>
                  </Card.Body>
                </Card>
              );
            })}
          </Row>
        )}

        {body === "group" && activeFilter === "serve" && (
          <Row>
            {Posts.filter(
              (post) =>
                post.postType === "serve" && post.group === Group.GroupNumber
            ).map((post) => {
              return (
                <Card
                  key={post.id}
                  className="mx-auto my-2 animate__animated animate__bounceInLeft animate__slow animate__delay-1s"
                  style={{
                    maxWidth: "30rem",
                    border: "none",
                    padding: "0",
                    boxShadow: "2px 2px 2px 2px rgba(0, 60, 60, 0.3)",
                  }}
                >
                  <Card.Img variant="top" src={post.imageUrl} />
                  <Card.Body>
                    {post.post_status === true && (
                      <Badge
                        bg="primary"
                        style={{ padding: "8px", marginBottom: "8px" }}
                      >
                        Group {post.group} Only
                      </Badge>
                    )}
                    <Card.Title>{post.user_name}</Card.Title>
                    <Badge
                      bg="dark"
                      style={{ padding: "8px", marginBottom: "8px" }}
                    >
                      {" "}
                      {post.postType}{" "}
                    </Badge>
                    <Card.Text>
                      <p>{post.text}</p>
                      <p className="text-muted">Date : {post.startDate}</p>
                    </Card.Text>
                    <Row style={{ marginTop: "14px" }}>
                      <Col>
                        <img
                          src={post.groupImage}
                          alt="group representation"
                          style={{
                            width: "6vh",
                            borderRadius: "100px",
                            marginRight: "2vh",
                          }}
                        />
                      </Col>
                      <Col>
                        <Button
                          variant="outline-dark"
                          style={{ marginTop: "14px" }}
                          onClick={handleShareShow}
                        >
                          <i class="bi bi-share-fill"></i>
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          variant="outline-dark"
                          style={{ marginTop: "14px" }}
                        >
                          <i class="bi bi-heart-fill"></i>
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          variant="outline-dark"
                          style={{ marginTop: "14px" }}
                        >
                          <i class="bi bi-chat-fill"></i>
                        </Button>
                      </Col>
                      {user_id && user_id === post.user_id && (
                        <Col>
                          <Button
                            variant="outline-dark"
                            onClick={() => deleteItem(post.id)}
                            style={{ marginTop: "14px" }}
                          >
                            <i class="bi bi-trash-fill"></i>
                          </Button>
                        </Col>
                      )}
                    </Row>
                  </Card.Body>
                </Card>
              );
            })}
          </Row>
        )}

        {/* Public data */}
        {body === "public" && activeFilter === "social" && (
          <Row>
            {Posts.map((post) => {
              if (!post.post_status) {
                // const jsDate = post.timestamp.toDate();
                const jsDate = post.timestamp?.toDate();
                const formattedTimestamp =
                  dayjs(jsDate).format("YYYY-MM-DD HH:mm");
                const finalTimestamp = formattedTimestamp.substring(
                  formattedTimestamp.indexOf(":") + -2
                );
                return (
                  <Card
                    className="mx-auto my-2 animate__animated animate__bounceInLeft animate__slow animate__delay-1s"
                    style={{
                      maxWidth: "30rem",
                      border: "none",
                      padding: "0",
                      boxShadow: "2px 2px 2px 2px rgba(0, 60, 60, 0.3)",
                    }}
                  >
                    <Card.Img variant="top" src={post.imageUrl} />
                    <Card.Body>
                      {post.post_status === true && (
                        <Badge
                          bg="primary"
                          style={{ padding: "8px", marginBottom: "8px" }}
                        >
                          Group {post.group} Only
                        </Badge>
                      )}
                      <Card.Title>{post.user_name}</Card.Title>
                      <Card.Text>
                        <p>{post.text}</p>
                        <p className="lead text-muted">{finalTimestamp}</p>
                      </Card.Text>
                      <Row style={{ marginTop: "14px" }}>
                        <Col>
                          <img
                            src={post.groupImage}
                            alt="group representation"
                            style={{
                              width: "6vh",
                              borderRadius: "100px",
                              marginRight: "2vh",
                            }}
                          />
                        </Col>
                        <Col>
                          <Button
                            variant="outline-dark"
                            style={{ marginTop: "14px" }}
                            onClick={handleShareShow}
                          >
                            <i class="bi bi-share-fill"></i>
                          </Button>
                        </Col>
                        <Col>
                          <Button
                            variant="outline-dark"
                            style={{ marginTop: "14px" }}
                          >
                            <i class="bi bi-heart-fill"></i>
                          </Button>
                        </Col>
                        <Col>
                          <Button
                            variant="outline-dark"
                            style={{ marginTop: "14px" }}
                          >
                            <i class="bi bi-chat-fill"></i>
                          </Button>
                        </Col>
                        {user_id && user_id === post.user_id && (
                          <Col>
                            <Button
                              variant="outline-dark"
                              onClick={() => deleteItem(post.id)}
                              style={{ marginTop: "14px" }}
                            >
                              <i class="bi bi-trash-fill"></i>
                            </Button>
                          </Col>
                        )}
                      </Row>
                    </Card.Body>
                  </Card>
                );
              } else {
                return null;
              }
            })}
          </Row>
        )}

        {body === "public" && activeFilter === "events" && (
          <Row>
            {Posts.filter((post) => post.postType === "event").map((post) => {
              if (!post.post_status)
                return (
                  <Card
                    key={post.id}
                    className="mx-auto my-2 animate__animated animate__bounceInLeft animate__slow animate__delay-1s"
                    style={{
                      maxWidth: "30rem",
                      border: "none",
                      padding: "0",
                      boxShadow: "2px 2px 2px 2px rgba(0, 60, 60, 0.3)",
                    }}
                  >
                    <Card.Img variant="top" src={post.imageUrl} />
                    <Card.Body>
                      {post.post_status === true && (
                        <Badge
                          bg="primary"
                          style={{ padding: "8px", marginBottom: "8px" }}
                        >
                          Group {post.group} Only
                        </Badge>
                      )}
                      <Card.Title>{post.user_name}</Card.Title>
                      <Badge
                        bg="dark"
                        style={{ padding: "8px", marginBottom: "8px" }}
                      >
                        {" "}
                        {post.postType}{" "}
                      </Badge>
                      <Card.Text>
                        <p>{post.text}</p>
                        <p className="text-muted">Date : {post.startDate}</p>
                      </Card.Text>
                      <Row style={{ marginTop: "14px" }}>
                        <Col>
                          <img
                            src={post.groupImage}
                            alt="group representation"
                            style={{
                              width: "6vh",
                              borderRadius: "100px",
                              marginRight: "2vh",
                            }}
                          />
                        </Col>
                        <Col>
                          <Button
                            variant="outline-dark"
                            style={{ marginTop: "14px" }}
                            onClick={handleShareShow}
                          >
                            <i class="bi bi-share-fill"></i>
                          </Button>
                        </Col>
                        <Col>
                          <Button
                            variant="outline-dark"
                            style={{ marginTop: "14px" }}
                          >
                            <i class="bi bi-heart-fill"></i>
                          </Button>
                        </Col>
                        <Col>
                          <Button
                            variant="outline-dark"
                            style={{ marginTop: "14px" }}
                          >
                            <i class="bi bi-chat-fill"></i>
                          </Button>
                        </Col>
                        {user_id && user_id === post.user_id && (
                          <Col>
                            <Button
                              variant="outline-dark"
                              onClick={() => deleteItem(post.id)}
                              style={{ marginTop: "14px" }}
                            >
                              <i class="bi bi-trash-fill"></i>
                            </Button>
                          </Col>
                          
                        )}
                      </Row>
                    </Card.Body>
                  </Card>
                );
              else {
                return null;
              }
            })}
          </Row>
        )}

        {body === "public" && activeFilter === "serve" && (
          <Row>
            {Posts.filter((post) => post.postType === "serve").map((post) => {
              if (!post.post_status)
                return (
                  <Card
                    key={post.id}
                    className="mx-auto my-2 animate__animated animate__bounceInLeft animate__slow animate__delay-1s"
                    style={{
                      maxWidth: "30rem",
                      border: "none",
                      padding: "0",
                      boxShadow: "2px 2px 2px 2px rgba(0, 60, 60, 0.3)",
                    }}
                  >
                    <Card.Img variant="top" src={post.imageUrl} />
                    <Card.Body>
                      {post.post_status === true && (
                        <Badge
                          bg="primary"
                          style={{ padding: "8px", marginBottom: "8px" }}
                        >
                          Group {post.group} Only
                        </Badge>
                      )}
                      <Card.Title>{post.user_name}</Card.Title>
                      <Badge
                        bg="dark"
                        style={{ padding: "8px", marginBottom: "8px" }}
                      >
                        {" "}
                        {post.postType}{" "}
                      </Badge>
                      <Card.Text>
                        <p>{post.text}</p>
                        <p className="text-muted">Date : {post.startDate}</p>
                      </Card.Text>
                      <Row style={{ marginTop: "14px" }}>
                        <Col>
                          <img
                            src={post.groupImage}
                            alt="group representation"
                            style={{
                              width: "6vh",
                              borderRadius: "100px",
                              marginRight: "2vh",
                            }}
                          />
                        </Col>
                        <Col>
                          <Button
                            variant="outline-dark"
                            style={{ marginTop: "14px" }}
                            onClick={handleShareShow}
                          >
                            <i class="bi bi-share-fill"></i>
                          </Button>
                        </Col>
                        <Col>
                          <Button
                            variant="outline-dark"
                            style={{ marginTop: "14px" }}
                          >
                            <i class="bi bi-heart-fill"></i>
                          </Button>
                        </Col>
                        <Col>
                          <Button
                            variant="outline-dark"
                            style={{ marginTop: "14px" }}
                          >
                            <i class="bi bi-chat-fill"></i>
                          </Button>
                        </Col>
                        {user_id && user_id === post.user_id && (
                          <Col>
                            <Button
                              variant="outline-dark"
                              onClick={() => deleteItem(post.id)}
                              style={{ marginTop: "14px" }}
                            >
                              <i class="bi bi-trash-fill"></i>
                            </Button>
                          </Col>
                        )}
                      </Row>
                    </Card.Body>
                  </Card>
                );
              else {
                return null;
              }
            })}
          </Row>
        )}
      </Container>
      <Modal show={showShare} onHide={handleShareClose}>
        <Modal.Header>
          <Modal.Title>
            <img
              src="assets/344741779_633096014894033_8998160269009553873_n.jpg"
              style={{ width: "100%", borderRadius: "10px" }}
              alt="just a test"
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 className="display-6 text-center">
            Share this with your social Community!
            <br />
            <br />
            <Row>
              <Col>
                <i class="bi bi-facebook"></i>
              </Col>
              <Col>
                <i class="bi bi-whatsapp"></i>
              </Col>
              <Col>
                <i class="bi bi-twitter"></i>
              </Col>
              <Col>
                <i class="bi bi-instagram"></i>
              </Col>
            </Row>
          </h4>
          <br />
          <br />
          <p className="lead">or copy link</p>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="https://mergesocial.web.app/user/ya12rsal"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <Button variant="outline-dark" id="button-addon2">
              Copy
            </Button>
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShareClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Feed;
