import {useState, useEffect} from 'react';
import firebase from "../../firebase";


const useGetMessages = () => {
    const [docs, setDocs] = useState([]);
  
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
          setDocs(messagesData);
        });
    }, []);
    return { docs };
  };

export default useGetMessages;
