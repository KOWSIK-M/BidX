import { useEffect, useState } from "react";
import './ap1.css';
import PhoneVerify from "./PhoneVerify";
import firebase from "firebase/compat/app";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyB-MzKEbyEMyb-WtDER3-QQ4Oaf8lJgIMY",
    authDomain: "bidx-41239.firebaseapp.com",
    projectId: "bidx-41239",
    storageBucket: "bidx-41239.appspot.com",
    messagingSenderId: "37214878278",
    appId: "1:37214878278:web:b57d71ed20d710c3e86847",
    measurementId: "G-7L7ZZ9RTYH"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unSubscriber = onAuthStateChanged(firebase.auth(), (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    });

    return () => unSubscriber();
  }, []);

  return (
    <div className="Ap1b">
      <h1>Verify Phone Number with OTP</h1>
      <PhoneVerify auth={firebase.auth()}></PhoneVerify>
    </div>
  );
}

export default App;