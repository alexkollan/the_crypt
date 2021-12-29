import { Menu, Sticky, Image, Dropdown, Header, Button, Segment, Grid } from "semantic-ui-react";
import { createContext, useContext, useState, useEffect, useRef } from "react";
import Link from "next/link";
import CButton from "./cbutton";
import CColor from "./ccolor";
// import { AppContext } from "../../context/AppContext";
const styles = {
  header: { color: "rgb(50 50 50 / 95%)" },
  p: {
    color: "gray",
  },
};
function CSection(props) {
  return (
    <Segment>
      <Grid stackable verticalAlign="middle" divided="vertically">
        <Grid.Row columns={2}>
          <Grid.Column only="mobile">
            <Image
              size="medium"
              centered
              rounded
              src="https://images.thdstatic.com/productImages/20573975-83ec-475f-89d2-5c3b0b52f3ca/svn/colfax-ekena-millwork-moulding-samples-pnucnco-mat-sample-64_1000.jpg"
            />
          </Grid.Column>
          <Grid.Column>
            <Header style={styles.header} as="h1">
              Initial Left <CColor color="green">my color</CColor>!
            </Header>
            <p style={styles.p}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed bibendum arcu, vitae placerat turpis. Vestibulum at lacinia lorem. Vestibulum quis porttitor eros. In cursus lobortis
              dui, sit amet tristique risus efficitur in. Quisque efficitur fringilla mi, nec semper felis dictum sit amet. Donec congue massa a vehicula ornare.
            </p>
            <CButton text="Button Text" color="green" />
          </Grid.Column>
          <Grid.Column only="tablet computer">
            <Image
              size="medium"
              centered
              rounded
              src="https://images.thdstatic.com/productImages/20573975-83ec-475f-89d2-5c3b0b52f3ca/svn/colfax-ekena-millwork-moulding-samples-pnucnco-mat-sample-64_1000.jpg"
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}

export default CSection;
