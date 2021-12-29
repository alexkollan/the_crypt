import { Menu, Sticky, Image, Dropdown, Header, Button } from "semantic-ui-react";
import { createContext, useContext, useState, useEffect, useRef } from "react";
import Link from "next/link";
// import { AppContext } from "../../context/AppContext";

function CButton(props) {
  return (
    <Button color={props.color} basic={props.bordered} onClick={props.onClick}>
      {props.text}
    </Button>
  );
}

export default CButton;
