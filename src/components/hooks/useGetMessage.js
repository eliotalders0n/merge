import {useState, useEffect} from 'react';
import firebase from "../../firebase";


const useGetMessage = (id) => {
    const [docs, setDocs] = useState([]);
  
    useEffect(() => {
      firebase
        .firestore()
        .collection("messages")
        .where("userId","===", id)
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          const messagesData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setDocs(messagesData);
        });
    }, [id]);
    return { docs };
  };

export default useGetMessage;
