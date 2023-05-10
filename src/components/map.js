import { React } from "react";
import Head from "./template/head";
import { Container } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import useGetPosts from "./hooks/useGetPosts";

function Explore(props) {
  const Posts = useGetPosts().docs;

  return (
    <Container fluid>
      <Head />

      <Container className="d-flex justify-content-center my-1">
        <h2 className="display-2">Explore</h2>
      </Container>

      <Container>
        <p className="display-5">Where are your merger's</p>
        <MapContainer
          style={{
            height: "70vh",
            marginTop: "3vh",
            borderRadius: "10px",
          }}
          center={[-15.363402, 28.319056]} //lat, lng
          zoom={10}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {Posts &&
            Posts.map((post) => (
                <Marker
                  key={post.timestamp}
                  position={[post.latitude, post.longitude]}
                >
                  <Popup>
                    <h4 className="text-center">{post.text}</h4>
                    <img
                      src={post.imageUrl}
                      alt="voices"
                      style={{maxWidth: "20vh"}}
                    />
                  </Popup>
                </Marker>
              ))}
        </MapContainer>
      </Container>
    </Container>
  );
}

export default Explore;
