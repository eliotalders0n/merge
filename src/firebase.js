import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCo4GmjDiVIdOItrjazj4PaGmNpQ-_cApU",
  authDomain: "merge-bd5de.firebaseapp.com",
  projectId: "merge-bd5de",
  storageBucket: "merge-bd5de.appspot.com",
  messagingSenderId: "740369496649",
  appId: "1:740369496649:web:6ed43c4b6bd98e53965d98"
};

firebase.initializeApp(firebaseConfig);
export default firebase;