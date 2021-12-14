const CryptoJS = require("crypto-js");

import React, { useState, useEffect, useContext, useRef } from "react";
import { AppContext } from "../context/AppContext";
import { Container, Header, Form, TextArea, Divider, Button } from "semantic-ui-react";
import encrypt from "../lib/encrypt";
import { Router, useRouter } from "next/router";
import { server } from "../config/index";

function SignInScreen(props) {
  const mountRef = useRef(false);

  let { gState, setGState } = useContext(AppContext);
  let { gUser, setGUser } = useContext(AppContext);
  const [secret, setSecret] = useState("");
  const [encryptedSecret, setEncryptedSecret] = useState("");
  const [decryptedOtSecret, setDecryptedOtSecret] = useState("");
  const router = useRouter();
  const [visualErr, setVisualErr] = useState("");
  const urlParams = router.query;

  useEffect(() => {
    if (!mountRef.current) {
      mountRef.current = true;
      return;
    }
    console.log(router);
    if (Object.keys(urlParams).length) {
      console.log(urlParams);
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      fetch(`${server}/api/otsecret/?ots=${urlParams.ots}`, requestOptions)
        .then((response) => {
          if (!response.ok) {
            // setVisualErr(err);

            throw Error("The message you are trying to search does not exist!");
          }
          return response.json();
        })
        .then((msg) => {
          console.log(msg);
          setDecryptedOtSecret(msg.data);
        })
        .catch((err) => {
          console.log(err);
          setVisualErr(err.toString());
        });
    }
  }, [urlParams]);

  let handleChange = (e) => {
    setSecret(e.target.value);
  };

  return (
    <Container style={{ marginTop: "70px" }}>
      <Header as="h1" textAlign="center">
        One Time Secret
        <br />
        <br />
        <Header.Subheader style={{ display: visualErr.length === 0 ? "initial" : "none" }}>
          WARNING: <br />
          The secret bellow was decrypted once and at the time you read this message it has already been deleted from our databases. <br />
          This url will not be valid after you close it.
        </Header.Subheader>
      </Header>
      <Header as="h1" textAlign="center"></Header>
      <Divider horizontal>
        <Header as="h4" textAlign="center">
          {visualErr.length === 0 ? "This is what's been shared" : visualErr}
        </Header>
      </Divider>
      <Form>
        <Form.Field>
          <TextArea id="secret" placeholder="Type your One Time Secret here..." value={decryptedOtSecret.toString()} />
        </Form.Field>
      </Form>
    </Container>
  );
}

export default SignInScreen;
