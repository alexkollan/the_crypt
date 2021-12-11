import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React, { useState, useEffect } from "react";

export default function Home(props) {
  const [postForm, updatePostForm] = useState({
    title: "",
    hashedSecret: "",
    userId: "",
  });
  const [getForm, updateGetForm] = useState({
    secretId: "61b457c8b2e2500b36e0dfb4",
    userId: "61ac9e5106c30a142800b5a1",
  });
  const [secret, updateSecret] = useState("");
  const inputChangeHandler = (e) => {
    let inId = e.target.id;
    let value = e.target.value;
    console.log(e.target.parentNode.id);
    updateGetForm((oldForm) => {
      return { ...oldForm, [inId]: value };
    });
    // switch (inId) {
    //   case "title":
    //     updateGetForm((oldForm) => {
    //       return { ...oldForm, title: value };
    //     });
    //     break;
    //   case "hashedSecret":
    //     updateGetForm((oldForm) => {
    //       return { ...oldForm, hashedSecret: value };
    //     });
    //     break;
    //   case "userId":
    //     updateGetForm((oldForm) => {
    //       return { ...oldForm, userId: value };
    //     });
    //     break;
    //   default:
    //     break;
    // }
    console.log(getForm);
  };
  const readRecord = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({ getForm }),
    };
    fetch(`http://localhost:3000/api/secrets/?userId=${getForm.userId}&secretId=${getForm.secretId}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.data[0].userId === getForm.userId && data.data[0]._id === getForm.secretId) {
          updateSecret(data.data[0].hashedSecret);
          updateGetForm({
            secretId: "",
            userId: "",
          });
        } else {
          updateSecret("Something went wrong! :O");
        }
      });
  };
  const addRecord = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ getForm }),
    };
    fetch("http://localhost:3000/api/secrets", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        updateGetForm({
          title: "",
          hashedSecret: "",
          userId: "",
        });
      });
  };

  // function addRecord() {
  //   useEffect(() => {
  //     // POST request using fetch inside useEffect React hook
  //     const requestOptions = {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({}),
  //     };
  //     fetch("http://localhost:3000/api/secrets", requestOptions)
  //       .then((response) => response.json())
  //       .then((data) => setPostId(data.id));

  //     // empty dependency array means this effect will only run once (like componentDidMount in classes)
  //   }, []);
  // }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <p className={styles.description}>
          Get started by editing <code className={styles.code}>pages/index.js</code>
        </p>
        Read:
        <form id="readForm">
          <label htmlFor="title">Secret ID:</label>
          <input type="text" value={getForm.secretId} name="secretId" id="secretId" onChange={inputChangeHandler} />
          {/* <label htmlFor="hashedSecret">Secret:</label>
          <input type="text" value={getForm.hashedSecret} name="hashedSecret" id="hashedSecret" onChange={inputChangeHandler} /> */}
          <label htmlFor="userId">User ID:</label>
          <input type="text" value={getForm.userId} name="userId" id="userId" onChange={inputChangeHandler} />
          <input type="button" value="Read" onClick={readRecord} />
        </form>
        <p>Secret is: "{secret}"</p>
        Write:
        {/* <form id="writeForm>
          <label htmlFor="title">Title:</label>
          <input type="text" value={postForm.title} name="title" id="title" onChange={inputChangeHandler} />
          <label htmlFor="secret">Secret:</label>
          <input type="text" value={postForm.hashedSecret} name="secret" id="secret" onChange={inputChangeHandler} />
          <label htmlFor="userId">User ID:</label>
          <input type="text" value={postForm.userId} name="userId" id="userId" onChange={inputChangeHandler} />
          <input type="button" value="Add" onClick={addRecord} />
        </form> */}
      </main>

      <footer className={styles.footer}>
        <a href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app" target="_blank" rel="noopener noreferrer">
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

// export const getStaticProps = async () => {
//   const res = await fetch("http://localhost:3000/api/secrets", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: {},
//   });
//   const posts = await res.json();
//   return {
//     props: {
//       value: posts.data[0].hashedSecret || null,
//     },
//   };
// };
