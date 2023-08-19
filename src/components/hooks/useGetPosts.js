import {useState, useEffect} from 'react';
import firebase from "./../../firebase";


// const useGetPosts = () => {
//     const [docs, setdocs] = useState([])

//     useEffect(() => {
//          firebase.firestore().collection("posts").orderBy('timestamp', 'desc').onSnapshot((doc)=>{
//             const quotes = [];
//             doc.docs.forEach(document => {
//               const nb = {
//                 id: document.id,
//                 ...document.data()
//               }
//               quotes.push(nb)
//             })
//             setdocs(quotes)
//          })
//     }, [])
//     return {docs}
// }

const useGetPosts = (initialLoadCount) => {
  const [docs, setDocs] = useState([]);
  const [lastDocument, setLastDocument] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMorePosts = () => {
      if (!lastDocument) return;

      setLoading(true);

      firebase.firestore()
          .collection("posts")
          .orderBy('timestamp', 'desc')
          .startAfter(lastDocument)
          .limit(initialLoadCount) // Change this to the number of posts you want to fetch in each subsequent load
          .get()
          .then((querySnapshot) => {
              const quotes = [];
              querySnapshot.forEach(document => {
                  const nb = {
                      id: document.id,
                      ...document.data()
                  };
                  quotes.push(nb);
              });

              setDocs(prevDocs => [...prevDocs, ...quotes]);
              if (querySnapshot.docs.length > 0) {
                  setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1]);
              } else {
                  setLastDocument(null);
              }
              setLoading(false);
          })
          .catch(error => {
              console.error("Error fetching more posts:", error);
              setLoading(false);
          });
  };

  useEffect(() => {
      const unsubscribe = firebase.firestore()
          .collection("posts")
          .orderBy('timestamp', 'desc')
          .limit(initialLoadCount) // Initial number of posts to fetch
          .onSnapshot((querySnapshot) => {
              const quotes = [];
              querySnapshot.forEach(document => {
                  const nb = {
                      id: document.id,
                      ...document.data()
                  };
                  quotes.push(nb);
              });

              setDocs(quotes);
              if (querySnapshot.docs.length > 0) {
                  setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1]);
              } else {
                  setLastDocument(null);
              }
              setLoading(false);
          });

      return () => unsubscribe();
  }, [initialLoadCount]);

  return { docs, loading, fetchMorePosts };
};


export default useGetPosts;
