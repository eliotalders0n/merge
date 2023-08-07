import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// User Interface
import Router from "./routes";
import LoginRoutes from "./loginroutes";
import firebase from "./firebase";
import "animate.css";
import { Container, Row, Spinner, Col } from "react-bootstrap";

const App = () => {
  const [state, setstate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true); // Set isLoading to true when the component mounts

    const authStateChanged = (user) => {
      if (user) {
        setstate(true);
        setIsLoading(false); // Set isLoading to false when the user state changes
      } else {
        setstate(false);
        setIsLoading(false); // Set isLoading to false when the user state changes
      }
    };

    const unsubscribe = firebase.auth().onAuthStateChanged(authStateChanged);

    // Clean up the subscription when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      {!state && <LoginRoutes />}
      {state && <Router />}
      {isLoading && (
        <Container>
          <Row md={1} xs={1} className="g4">
            <Col>
              <div className="loading-overlay">
                <Spinner animation="grow" role="status" variant="dark">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default App;
