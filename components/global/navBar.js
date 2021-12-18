// import { Menu, Sticky, Image, Dropdown, Header } from "semantic-ui-react";
import { Button, Container, Sticky, Dropdown, Divider, Grid, Header, Icon, Image, List, Menu, Segment, Sidebar, Visibility, Label } from "semantic-ui-react";

import { createContext, useContext, useState, useEffect, useRef, createRef } from "react";
import Link from "next/link";
import { AppContext } from "../../context/AppContext";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import NavBtn from "./navButton";
import { Router, useRouter } from "next/router";
export default function NavBar() {
  const inputRef = useRef();
  const router = useRouter();
  const currPage = router.pathname;
  const { gState, setGState } = useContext(AppContext);
  const { gUser, setGUser } = useContext(AppContext);
  const { uAvatar, setUAvatar } = useContext(AppContext);
  const { uid, setUId } = useContext(AppContext);
  const [localUser, setLocalUser] = useState(gUser);
  const [activeItem, setActiveItem] = useState();
  const [isLogged, setIsLogged] = useState(false);
  const [fixed, setFixed] = useState(false);
  const [navRev, setNavRev] = useContext(AppContext);
  const options = [
    { key: 1, text: "Choice 1", value: 1 },
    { key: 2, text: "Choice 2", value: 2 },
    { key: 3, text: "Choice 3", value: 3 },
  ];
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  let signIn = () => {
    console.log("Logging in...");

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        // console.log(user);
        setGState(true);
        setGUser(user);
        // setUAvatar(user.photoURL);
        // console.log(user.displayName);
        // console.log("Logged in successful.");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log("Loggin Err");
      });
  };
  let logOut = async () => {
    console.log("Logging out...");
    signOut(auth)
      .then(() => {
        console.log("Logged out successful.");
        setGState(false);
        setGUser("NoName");
        setLocalUser(gUser);
        return;
      })
      .catch((error) => {
        // An error happened.
        console.log("An error happened during Sign-out.");
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setGState(true);
        setGUser(user);

        console.log("Hi " + user.displayName + ", you are already Logged IN");
      } else {
        console.log("Logged OUT");
        setGState(false);
        setGUser("NoName");
      }
    });
  }, [inputRef]);
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  let handleItemClick = (e) => {
    // setActiveItem(false);
    setActiveItem(e.target.textContent);
  };

  let handleLogin = (e) => {};
  let handleLogout = (e) => {};
  return (
    <Visibility
      offset={() => {
        setFixed(true);
      }}>
      <Segment inverted={currPage === "/" ? true : false} textAlign="center" style={{ height: 70 }} vertical>
        <Menu fixed={"top"} inverted={currPage === "/" ? true : false} pointing secondary size="large" style={{ height: 60, marginTop: "0", background: currPage === "/" ? "#1b1c1d" : "white" }}>
          <Container>
            {/* <Menu.Item as="a" active>
              Home
            </Menu.Item>
            <Menu.Item as="a">Work</Menu.Item>
            <Menu.Item as="a">Company</Menu.Item>
            <Menu.Item as="a">Careers</Menu.Item> */}
            <NavBtn href="/" name="home" display={true} active={currPage} text="Home" onClick={handleItemClick} />
            <NavBtn href="/createotsecret" name="createOts" display={true} active={currPage} text="One Time Secret" onClick={handleItemClick} />
            <NavBtn href="" name="addaSecret" display={gState} active={currPage} text="Add a Secret" onClick={handleItemClick} />
            <NavBtn href="" name="mySecrets" display={gState} active={currPage} text="My Secrets" onClick={handleItemClick} />
            <NavBtn href="/auth" name="testScreen" display={gState} active={currPage} text="Test Screen" onClick={handleItemClick} />
            <Menu.Item position="right">
              <Label pointing="right" color={currPage === "/" ? "black" : "blue"} basic={currPage === "/" ? true : true} style={{ display: gState ? "inline-block" : "none" }}>
                <Image src={gUser.photoURL || ""} avatar />
                {gUser.displayName || ""}
              </Label>
              <Button size="tiny" inverted={currPage === "/" ? true : false} basic={currPage === "/" ? false : true} color={gState ? "red" : "blue"} onClick={gState ? logOut : signIn}>
                {gState ? "Logout" : "Login"}
              </Button>
            </Menu.Item>
          </Container>
        </Menu>
        {/* <HomepageHeading /> */}
      </Segment>
    </Visibility>
  );
}
