import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
// import { auth } from "../firebase/clientApp";
const CryptoJS = require("crypto-js");
// app();
// import { useAppContext } from "../context/AppContext";
import React, { useState, useEffect, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { AppContext } from "../context/AppContext";
import { Container, Header, Form, TextArea, Divider, Button } from "semantic-ui-react";
import encrypt from "../lib/encrypt";
import { server } from "../config/index";
function SignInScreen(props) {
  // const { sharedState } = useContext(useAppContext);
  let { gState, setGState } = useContext(AppContext);
  let { gUser, setGUser } = useContext(AppContext);

  const [authStatus, updateAuthStatus] = useState(false);

  const [secret, setSecret] = useState("");
  const [encryptedSecret, setEncryptedSecret] = useState("");
  const [url, setUrl] = useState("");

  let handleChange = (e) => {
    setSecret(e.target.value);
  };

  let handleClick = (e) => {
    // let secret = e.target.parentNode.firstChild.firstChild.value;
    let encryptedMsg = encrypt.hashIt(secret, "1");
    setEncryptedSecret(encryptedMsg);
    let url = encrypt.hash(new Date().toString() + crypto.getRandomValues(new Uint8Array(16)).toString());
    setUrl(url);
    addOtSecret({ hashedSecret: encryptedMsg, url: url });
    // console.log(encryptedSecret);
  };
  const addOtSecret = (otSecret) => {
    console.log();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(otSecret),
    };
    fetch(`${server}/api/otsecret`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };
  // let showDecrypted = (e) => {
  //   console.log(encrypt.reveal(encryptedSecret, "1"));
  // };

  return (
    <Container style={{ marginTop: "70px" }}>
      <Header as="h1" textAlign="center">
        One Time Secret
        <br />
        <br />
        <Header.Subheader>
          Type in a secret. We will generate a{" "}
          <strong>
            one time <u>only</u>
          </strong>{" "}
          link for you. After this link is opened, the message will be deleted.
        </Header.Subheader>
      </Header>
      <Header as="h1" textAlign="center"></Header>
      <Divider horizontal>
        <Header as="h4" textAlign="center">
          Secret
        </Header>
      </Divider>
      <Form>
        <Form.Field>
          <TextArea id="secret" placeholder="Type your One Time Secret here..." onChange={handleChange} />
        </Form.Field>
        <Form.Field style={{ display: encryptedSecret.length ? "initial" : "none" }}>
          <Divider horizontal>
            <Header as="h4" textAlign="center">
              Encrypted secret
            </Header>
          </Divider>
          <TextArea disabled id="secret" placeholder="Type your One Time Secret here..." onChange={handleChange} value={encryptedSecret} />
        </Form.Field>
        <br />
        <br />
        <Header as="h3" textAlign="center" style={{ display: encryptedSecret.length ? "block" : "none" }}>
          Your 1 time url: <br />
          <br />
          <Header.Subheader>
            {server}/revealOtSecret/?ots={url}
          </Header.Subheader>
        </Header>
        <Button primary floated="right" onClick={handleClick}>
          Generate One Time Link
        </Button>
        {/* <Button primary onClick={showDecrypted}>
          Show Decryped Secret
        </Button> */}
      </Form>
    </Container>
  );
}

export default SignInScreen;
