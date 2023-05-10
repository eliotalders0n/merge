import { useState, useEffect } from "react";
import firebase from "../../firebase";

const useGetUser = (id) => {
  const [docs, setdocs] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(id)
      .onSnapshot((doc) => {
        setdocs(doc.data());
      });
  }, [id]);
  return { docs };
};

export default useGetUser;
