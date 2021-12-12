import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
// import { auth } from "../firebase/clientApp";

// app();
// import { useAppContext } from "../context/AppContext";
import React, { useState, useEffect, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { AppContext } from "../context/AppContext";
// import * as firebase from "firebase/app";

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth();
// const provider = new GoogleAuthProvider();

function SignInScreen(props) {
  // const { sharedState } = useContext(useAppContext);
  let { gState, setGState } = useContext(AppContext);
  let { gUser, setGUser } = useContext(AppContext);

  // console.log(gState);
  const [authStatus, updateAuthStatus] = useState(false);

  // let signIn = () => {
  //   console.log("Logging in...");

  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential.accessToken;
  //       // The signed-in user info.
  //       const user = result.user;
  //       // ...
  //       // console.log(user);
  //       setGState(true);
  //       setGUser(user.displayName);
  //       console.log(user.displayName);
  //       console.log("Logged in successful.");
  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // The email of the user's account used.
  //       const email = error.email;
  //       // The AuthCredential type that was used.
  //       const credential = GoogleAuthProvider.credentialFromError(error);
  //       // ...
  //       console.log("Loggin Err");
  //     });
  // };
  // let logOut = async () => {
  //   // const auth = getAuth();
  //   console.log("Logging out...");
  //   signOut(auth)
  //     .then(() => {
  //       // Sign-out successful.
  //       console.log("Logged out successful.");
  //       // console.log("Logged OUT");
  //       setGState(false);
  //       setGUser("NoName");

  //       return;
  //     })
  //     .catch((error) => {
  //       // An error happened.
  //       console.log("An error happened during Sign-out.");
  //     });
  // };
  // useEffect(() => {
  //   // let asdf = sharedState;
  //   console.log(props);
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     // detaching the listener
  //     if (user) {
  //       // ...your code to handle authenticated users.
  //       console.log(user);
  //       setGState(true);
  //       setGUser(user.displayName);

  //       console.log("Hi " + user.displayName + ", you are already Logged IN");
  //     } else {
  //       // No user is signed in...code to handle unauthenticated users.
  //       console.log("Logged OUT");
  //       setGState(false);
  //       setGUser("NoName");
  //       // updateAuthStatus(false);
  //     }
  //   });

  // }, []);
  return (
    <div
      style={{
        maxWidth: "320px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <h1>The Crypt Login</h1>
      <p>{gState ? `Hi ${gUser} you are logged in!` : <span>Please login</span>}</p>
      {/* <StyledFirebaseAuth firebaseAuth={auth.auth()} uiConfig={uiConfig} /> */}
      <button style={{ display: !gState ? "initial" : "none" }}>Sign In</button>
      <button style={{ display: gState ? "initial" : "none" }}>Sign Out</button>
    </div>
  );
}

export default SignInScreen;
