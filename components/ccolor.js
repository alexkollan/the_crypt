import { Menu, Sticky, Image, Dropdown, Header, Button } from "semantic-ui-react";
import { createContext, useContext, useState, useEffect, useRef } from "react";
import Link from "next/link";
// import { AppContext } from "../../context/AppContext";

function CColor(props) {
  return (
    <Header as="h1" style={{ display: "inline" }} color={props.color}>
      {props.children}
    </Header>
  );
}

export default CColor;
