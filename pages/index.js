import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { server } from "../config/index";
import React, { useState, useEffect } from "react";
import cookie from "js-cookie";
import { Button } from "semantic-ui-react";

export default function Home(props) {
  const [user, updatetUser] = useState("");
  const [postForm, updatePostForm] = useState({
    title: "",
    hashedSecret: "",
    userId: "",
  });
  const [getForm, updateGetForm] = useState({
    secretId: "",
    userId: "",
  });
  const [secret, updateSecret] = useState("");
  const [secretList, updateList] = useState(props.value != null ? [...props.value] : []);

  useEffect(() => {
    if (cookie.get("session")) {
      updatetUser(JSON.parse(cookie.get("session")).user);
      updatePostForm((oldForm) => {
        return { ...oldForm, userId: JSON.parse(cookie.get("session")).user };
      });
      updateGetForm((oldForm) => {
        return { ...oldForm, userId: JSON.parse(cookie.get("session")).user };
      });
    }
  }, []);

  const inputChangeHandler = (e) => {
    let inId = e.target.id;
    let value = e.target.value;
    // console.log(e.target.parentNode.id);
    if (inId == "user") {
      updatetUser(value);
    }
    if (e.target.parentNode.id === "readForm") {
      updateGetForm((oldForm) => {
        // console.log(getForm);
        return { ...oldForm, [inId]: value };
      });
    } else if (e.target.parentNode.id === "writeForm") {
      updatePostForm((oldForm) => {
        // console.log(postForm);
        return { ...oldForm, [inId]: value };
      });
    }

    // console.log(postForm);
  };
  const readRecord = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({ getForm }),
    };
    fetch(`${server}/api/secrets/?userId=${encodeURIComponent(getForm.userId)}&secretId=${encodeURIComponent(getForm.secretId)}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        updateSecret(data.data[0].hashedSecret);
        updateGetForm({
          secretId: "",
          userId: user,
        });
      });
  };
  const addRecord = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postForm }),
    };
    fetch(`${server}/api/secrets`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        updatePostForm({
          title: "",
          hashedSecret: "",
          userId: user,
        });
        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          // body: JSON.stringify({ getForm }),
        };
        fetch(`${server}/api/secretList/?userId=${user}`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            updateList(data.data);
          });
      });
  };
  const clickHandler = (e) => {
    e.preventDefault();
    console.log(e.target.childNodes[0].textContent);
    updateGetForm((oldForm) => {
      return { ...oldForm, secretId: e.target.childNodes[0].textContent };
    });
  };
  const setUser = (e) => {
    e.preventDefault();
    cookie.set("session", JSON.stringify({ user: user }));
    // updatetUser(JSON.parse(cookie.get("session")).user);
    updatePostForm((oldForm) => {
      return { ...oldForm, userId: user };
    });
    updateGetForm((oldForm) => {
      return { ...oldForm, userId: user };
    });
    // ==========================================================

    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({ getForm }),
    };
    fetch(`${server}/api/secretList/?userId=${user}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        updateList(data.data);
      });
  };
  let Tbody = () => {
    if (secretList.length) {
      return (
        <tbody>
          {secretList.map((dt, k) => {
            return (
              <tr key={k}>
                <td className="tg-amwm">#{k + 1}</td>
                <td className="tg-baqh">{dt.title}</td>
                <td className="tg-baqh selectable" onClick={clickHandler}>
                  {dt._id}
                  <span className="tooltiptext">Select</span>
                </td>
                <td className="tg-baqh">{dt.hashedSecret}</td>
                <td className="tg-baqh">{dt.userId}</td>
              </tr>
            );
          })}
        </tbody>
      );
    } else {
      return <tbody></tbody>;
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>The Crypt</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          You just entered <a>The Crypt!</a>
        </h1>
        <input type="text" value={user} name="user" id="user" onChange={inputChangeHandler} style={{ width: "250px" }} />
        <input type="hidden" name="Alex's User ID" value="61ac9e5106c30a142800b5a1" />
        <input type="button" value="Set User" onClick={setUser} />
        <p className={styles.description}>
          <code className={styles.code}>Add your secrets and secure them</code>
        </p>
        Write:
        <form id="writeForm">
          <label htmlFor="title">Title:</label>
          <input type="text" value={postForm.title} name="title" id="title" onChange={inputChangeHandler} />
          <label htmlFor="secret">Secret:</label>
          <input type="text" value={postForm.hashedSecret} name="hashedSecret" id="hashedSecret" onChange={inputChangeHandler} />
          {/* <label htmlFor="userId">User ID:</label>
          <input type="text" value={postForm.userId} name="userId" id="userId" onChange={inputChangeHandler} /> */}
          <input type="button" value="Add" onClick={addRecord} />
        </form>
        <br />
        Read:
        <form id="readForm">
          <label htmlFor="title">Secret ID:</label>
          <input type="text" value={getForm.secretId} name="secretId" id="secretId" onChange={inputChangeHandler} style={{ width: "250px" }} />
          {/* <label htmlFor="hashedSecret">Secret:</label>
          <input type="text" value={getForm.hashedSecret} name="hashedSecret" id="hashedSecret" onChange={inputChangeHandler} /> */}
          {/* <label htmlFor="userId">User ID:</label>
          <input type="text" value={getForm.userId} name="userId" id="userId" onChange={inputChangeHandler} /> */}
          <input type="button" value="Read" onClick={readRecord} />
        </form>
        <p>Secret is: &quot;{secret}&quot;</p>
        <br />
        User ID: {user}
        <br />
        <table className="tg" style={{ display: secretList.length ? "initial" : "none" }}>
          <thead>
            <tr>
              <th className="tg-t2cw">#</th>
              <th className="tg-t2cw">Title</th>
              <th className="tg-t2cw">Secret ID</th>
              <th className="tg-t2cw">Hashed Secret</th>
              <th className="tg-t2cw">User ID</th>
            </tr>
          </thead>
          <Tbody />
          {/* <tbody>
            {props.value.map((dt, k) => {
              return (
                <tr key={k}>
                  <td className="tg-amwm">#{k + 1}</td>
                  <td className="tg-baqh">{dt.title}</td>
                  <td className="tg-baqh selectable" onClick={clickHandler}>
                    {dt._id}
                    <span className="tooltiptext">Select</span>
                  </td>
                  <td className="tg-baqh">{dt.hashedSecret}</td>
                  <td className="tg-baqh">{dt.userId}</td>
                </tr>
              );
            })}
          </tbody> */}
        </table>
        <br />
        <p>
          Don&apos;t even try to crack/bute-force this shit. You will need to try approximately 110.000.000.000.000.000.000.000.000.000.000.000.000.000.000.000.000.000.000.000.000.000.000.000.000.000 times :)
          <br />
          Stop counting the zeros... It&apos;s{" "}
          <code>
            <b>
              one hundred ten <u>quattuorvigintillion</u>
            </b>
          </code>{" "}
          times.
          <br />
          Want scientific/power notation? →{" "}
          <code>
            <b>
              1.1 x 10<sup>77</sup>
            </b>
          </code>{" "}
          times.
        </p>
        <Button primary>Primary</Button>
        <Button secondary>Secondary</Button>
      </main>

      <footer className={styles.footer}>
        <a>
          Powered by AC{" "}
          {/* <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span> */}
        </a>
      </footer>
    </div>
  );
}

// export const getStaticProps = async (req, ress) => {
//   let cookies = req.cookies;
//   console.log(cookies);
//   const res = await fetch(`http://localhost:3000/api/secretList/?userId=${"61ac9e5106c30a142800b5a1"}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   const posts = await res.json();
//   // console.log(posts);
//   return {
//     props: {
//       value: posts.data,
//     },
//   };
// };
export const getServerSideProps = async ({ req, ress }) => {
  let userCookie = req.cookies.session;
  console.log(userCookie == undefined);
  console.log(userCookie);

  // console.log(user);

  // return { props: {} };
  if (userCookie != undefined) {
    let userFromCookie = JSON.parse(userCookie).user;
    const res = await fetch(`${server}/api/secretList/?userId=${userFromCookie}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const posts = await res.json();
    // console.log(posts);
    return {
      props: {
        value: posts.data,
      },
    };
  }
  return {
    props: {
      value: null,
    },
  };
};
