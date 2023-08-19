import { React, useState, useEffect } from "react";
import Head from "./template/head";
import { Container } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
import useGetPosts from "./hooks/useGetPosts";
import ParticlBg from "./template/particles";

function Explore(props) {
  const Posts = useGetPosts().docs;
  const [points, setPoints] = useState([]);

  useEffect(() => {
    // Fetch points from Firestore
    const fetchPoints = () => {
      const newPoints = Posts.map((post) => ({
        latitude: post.latitude || 0,
        longitude: post.longitude || 0,
        imageUrl: post.imageUrl || "",
      }));
      setPoints(newPoints);
      console.log("Fetching points : " + JSON.stringify(newPoints));
    };

    fetchPoints();
  }, [Posts]);

  // Create an object to track marker positions
  const markerPositions = {};

  // Function to generate a unique key for a marker position
  const generateMarkerKey = (lat, lng) => `${lat}-${lng}`;

  // Function to check if a marker position is already occupied
  const isMarkerOccupied = (lat, lng) => {
    const key = generateMarkerKey(lat, lng);
    return markerPositions.hasOwnProperty(key);
  };

  // Generate a random offset for markers in the same location
  const generateOffset = () => Math.random() * 0.0023 - 0.001; // Adjust the offset range as needed

  console.log('Generating marker positions' + generateOffset);

  return (
    <Container
    fluid
    style={{ backgroundColor: "rgb(220,220,220)" }}
  >
    <ParticlBg/>
      <Head />

      <Container className="d-flex justify-content-center my-1">
        <h2 className="display-2">Explore</h2>
      </Container>

      <Container className="my-3">
        <p className="display-6">Where are your merger's</p>
        <MapContainer
          style={{
            height: "70vh",
            marginTop: "3vh",
            marginBottom: "3vh",
            borderRadius: "10px",
          }}
          center={[-15.363402, 28.319056]} //lat, lng
          zoom={12}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {points &&
            points.map((post, index) => {
              if (post.latitude !== undefined && post.longitude !== undefined) {
                let { latitude, longitude } = post;

                // Check if the marker position is already occupied
                while (isMarkerOccupied(latitude, longitude)) {
                  latitude += generateOffset();
                  longitude += generateOffset();
                }

                const key = generateMarkerKey(latitude, longitude);
                markerPositions[key] = true;

                return (
                  <Marker
                    key={index}
                    position={[latitude, longitude]}
                  >
                    <Popup>
                      <h4 className="text-center">{post.text}</h4>
                      <img
                        src={post.imageUrl}
                        alt="merge voices"
                        style={{ width: "20vh", padding: "0" }}
                      />
                    </Popup>
                  </Marker>
                );
              }
              return null;
            })}
        </MapContainer>
      </Container>
    </Container>
  );
}

export default Explore;
