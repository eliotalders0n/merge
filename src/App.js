import React, {useState, useEffect} from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
// User Interface
import Router from './routes';
import LoginRoutes from './loginroutes';
import firebase from './firebase'

const App = () => {
  const [state, setstate] = useState(false)  

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){         
       setstate(true)   
      }
      else{
        setstate(false)
      }
      
        })
  }, [state])

  return (
    <>
    {!state && <LoginRoutes />}     
      {state && <Router />}
      </>
  );
};

export default App;
