import Head from "next/head";
// import Image from "next/image";
import { AppContext } from "../context/AppContext";
import styles from "../styles/Home.module.css";
import { server } from "../config/index";
import React, { useState, useEffect, useContext } from "react";
import cookie from "js-cookie";
import { Button, Container, Sticky, Dropdown, Divider, Grid, Header, Icon, Image, List, Menu, Segment, Sidebar, Visibility } from "semantic-ui-react";
import Link from "next/link";
export default function Why(props) {
  const { navRev, setNavRev } = useContext(AppContext);
  const updateInverseTrue = () => {
    setNavRev(true);
  };
  const updateInverseFalse = () => {
    setNavRev(false);
  };
  return (
    <div>
      <Segment style={{ padding: "8em 0em" }} vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as="h3" style={{ fontSize: "2em" }}>
                Triple AES-256 Encryption
              </Header>
              <p style={{ fontSize: "1.33em" }}>The Advanced Encryption Standard (AES) is a symmetric block cipher chosen by the U.S. government to protect classified information.</p>
              <Header as="h3" style={{ fontSize: "2em" }}>
                Is AES-256 Safe?
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                <u>
                  <b>AES has never been cracked</b>
                </u>{" "}
                yet and is safe against any brute force attacks contrary to belief and arguments.
              </p>
            </Grid.Column>
            <Grid.Column floated="right" width={6}>
              <Image rounded size="large" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMZSrh7hmwL0VOZDfOQWudFK4FuEkytYLR2Q&usqp=CAU" />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Button size="huge">Learn more</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment style={{ padding: "0em" }} vertical>
        <Grid celled="internally" columns="equal" stackable>
          <Grid.Row textAlign="center">
            <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
              <Header as="h3" style={{ fontSize: "2em" }}>
                &quot;What it would take to crack AES-256 encrypted messages?&quot;
                <br />
                Let&apos;s assume the following:
              </Header>

              <p style={{ fontSize: "1.33em" }}>
                <List style={{ width: "50%", margin: "auto", textAlign: "left" }}>
                  <Divider />
                  <List.Item>
                    <List.Icon name="hand point right" />
                    <List.Content>There are 7 billion people on the planet.</List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name="hand point right" />
                    <List.Content>Every person on the planet owns 10 computers. (PC/Laptop/Tablet/Phone/etc, Everything is a cmoputer :) )</List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name="hand point right" />
                    <List.Content>Each of these computers can test 1 billion key combinations per second.</List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name="hand point right" />
                    <List.Content>On average, you can crack the key after testing 50% of the possibilities.</List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name="hand point right" />
                    <List.Content>Everyone person on the planet want&apos;s to hack you and uses all personal computing power that exists around them.</List.Content>
                  </List.Item>
                  <Divider />
                  <List.Item>
                    <List.Icon name="long arrow alternate right" />
                    <List.Content>
                      Then the earth&apos;s population can crack one encryption key in <b>77,000,000,000,000,000,000,000,000 years</b> (just to see your precious encrypted note :) .
                    </List.Content>
                  </List.Item>
                </List>
              </p>
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
              <Header as="h3" style={{ fontSize: "2em" }}>
                &quot;How long would it take to crack The Crypt&apos;s messages?&quot;
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                Well...
                <br />
                We encrypt your secrets at least in <b>3 layers using AES-256</b>.
                <br />
                So we can at least assume it would take x3 the time it would take using 1 layer of AES-256 encrytion.
                <br />
                ... which means: ~<b>231,000,000,000,000,000,000,000,000 years</b>.
                <br />
                <Header as="h1" style={{ fontSize: "13em" }}>
                  x3
                </Header>
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      {/* <Segment style={{ padding: "8em 0em" }} vertical>
        <Container text>
          <Header as="h3" style={{ fontSize: "2em" }}>
            Breaking The Grid, Grabs Your Attention
          </Header>
          <p style={{ fontSize: "1.33em" }}>Instead of focusing on content creation and hard work, we have learned how to master the art of doing nothing by providing massive amounts of whitespace and generic content that can seem massive, monolithic and worth your attention.</p>
          <Button as="a" size="large">
            Read More
          </Button>

          <Divider as="h4" className="header" horizontal style={{ margin: "3em 0em", textTransform: "uppercase" }}>
            <a href="#">Case Studies</a>
          </Divider>

          <Header as="h3" style={{ fontSize: "2em" }}>
            Did We Tell You About Our Bananas?
          </Header>
          <p style={{ fontSize: "1.33em" }}>Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but it's really true. It took years of gene splicing and combinatory DNA research, but our bananas can really dance.</p>
          <Button as="a" size="large">
            I'm Still Quite Interested
          </Button>
        </Container>
      </Segment> */}

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
