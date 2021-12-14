import { Menu, Sticky, Image, Dropdown, Header } from "semantic-ui-react";
import { createContext, useContext, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { AppContext } from "../../context/AppContext";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
export default function NavBar() {
  const inputRef = useRef();
  const { gState, setGState } = useContext(AppContext);
  const { gUser, setGUser } = useContext(AppContext);
  const { uAvatar, setUAvatar } = useContext(AppContext);
  const { uid, setUId } = useContext(AppContext);
  const [localUser, setLocalUser] = useState(gUser);
  const [activeItem, setActiveItem] = useState();
  const [isLogged, setIsLogged] = useState(false);

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
  let handleItemClick = (e, test) => {
    // console.log(e.target.textContent);
    // console.log(test);
    setActiveItem(e.target.textContent);
  };

  let handleLogin = (e) => {};
  let handleLogout = (e) => {};
  return (
    <Sticky>
      <Menu style={{ height: "65px" }}>
        <Link href="/" name="home">
          <Menu.Item name="home" active={activeItem === "Home"} onClick={handleItemClick}>
            Home
          </Menu.Item>
        </Link>
        <Link href="/createotsecret" name="home">
          <Menu.Item name="createotsecret" active={activeItem === "One Time Secret"} onClick={handleItemClick}>
            One Time Secret
          </Menu.Item>
        </Link>
        <Menu.Item name="addaSecret" active={activeItem === "Add a Secret"} onClick={handleItemClick}>
          Add a Secret
        </Menu.Item>

        <Menu.Item name="mySecrets" active={activeItem === "My Secrets"} onClick={handleItemClick}>
          My Secrets
        </Menu.Item>
        <Link href="/auth">
          <Menu.Item name="testScreen" active={activeItem === "Test Screen"} onClick={handleItemClick}>
            Test Screen
          </Menu.Item>
        </Link>
        {/* <Menu.Menu position="right"> */}
        <Menu.Item name="signin" position="right" style={{ display: !gState ? "flex" : "none", height: "100%" }} onClick={signIn}>
          Sign In
        </Menu.Item>

        <Menu.Item name="signout" position="right" style={{ display: gState ? "flex" : "none", height: "100%" }}>
          <Image src={gUser.photoURL || ""} avatar />
        </Menu.Item>

        <Dropdown item text={gUser.displayName || ""} position="right" style={{ display: gState ? "flex" : "none", height: "100%" }}>
          <Dropdown.Menu>
            {/* <Dropdown.Header>Text Size</Dropdown.Header> */}
            <Dropdown.Item onClick={logOut} style={{ color: "red!important" }}>
              <Header size="tiny" color="red">
                Log out
              </Header>
            </Dropdown.Item>
            {/* <Dropdown.Item>Medium</Dropdown.Item> */}
            {/* <Dropdown.Item>Large</Dropdown.Item> */}
          </Dropdown.Menu>
        </Dropdown>
        {/* </Menu.Menu> */}
      </Menu>
    </Sticky>
  );
}
