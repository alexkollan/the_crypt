import Head from "next/head";
// import Image from "next/image";
import { AppContext } from "../context/AppContext";
import styles from "../styles/Home.module.css";
import { server } from "../config/index";
import React, { useState, useEffect, useContext } from "react";
import cookie from "js-cookie";
import { Button, Container, Sticky, Dropdown, Divider, Grid, Header, Icon, Image, List, Menu, Segment, Sidebar, Visibility } from "semantic-ui-react";
import Link from "next/link";
export default function Home(props) {
  const { navRev, setNavRev } = useContext(AppContext);
  const updateInverseTrue = () => {
    setNavRev(true);
  };
  const updateInverseFalse = () => {
    setNavRev(false);
  };
  return (
    <div>
      <Head>
        <title>The Crypt</title>
        <meta name="The Crypt" content="The Crypt" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Visibility onOffScreen={updateInverseTrue} onBottomVisibleReverse={updateInverseFalse}>
        <Segment inverted textAlign="center" style={{ height: 700 }} vertical>
          <Container text>
            <Header
              as="h1"
              content="You've just entered The Crypt"
              style={{
                fontSize: "3em",
                fontWeight: "bold",
                marginBottom: 0,
                marginTop: "3em",
              }}
              inverted
            />
            <Header
              as="h2"
              style={{
                fontSize: "1.5em",
                fontWeight: "normal",
                marginTop: "1.5em",
                marginBottom: "1.5em",
              }}
              inverted>
              Create secure encrypted messages or notes. <br />
              <br />
              Don&apos;t worry, nobody can read them. <br />
              <u>
                <b>Not even us.</b>
              </u>
            </Header>
            <Link href="/createotsecret">
              <Button primary size="huge">
                Create your One Time Secret
                <Icon name="right arrow" />
              </Button>
            </Link>
          </Container>
        </Segment>
      </Visibility>

      <Segment vertical style={{ padding: "5em 0em" }}>
        <Container>
          <Grid divided stackable>
            <Grid.Row>
              <Grid.Column width={3}>
                <Header as="h4" content="About" />
                <List link>
                  <List.Item as="a">Sitemap</List.Item>
                  <List.Item as="a">Contact Us</List.Item>
                  <List.Item as="a">Religious Ceremonies</List.Item>
                  <List.Item as="a">Gazebo Plans</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header as="h4" content="Services" />
                <List link>
                  <List.Item as="a">Banana Pre-Order</List.Item>
                  <List.Item as="a">DNA FAQ</List.Item>
                  <List.Item as="a">How To Access</List.Item>
                  <List.Item as="a">Favorite X-Men</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={7}>
                <Header as="h4">Footer Header</Header>
                <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
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
