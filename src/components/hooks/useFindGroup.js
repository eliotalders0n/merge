import { useState, useEffect } from "react";
import firebase from "../../firebase";

const useGetDocuments = (collectionName) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const collectionRef = firebase.firestore().collection(collectionName);

    const unsubscribe = collectionRef.onSnapshot(
      (querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          const documentData = doc.data();
          docs.push({ id: doc.id, ...documentData });
        });
        setDocuments(docs);
      },
      (error) => {
        console.error("Error getting documents:", error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [collectionName]);

  return documents;
};

export default useGetDocuments;
