import { Menu, Sticky, Image, Dropdown, Header } from "semantic-ui-react";
import { createContext, useContext, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { AppContext } from "../../context/AppContext";

function NavBtn(props) {
  const [activeItem, setActiveItem] = useState();
  let handleItemClick = (e, test) => {
    setActiveItem(true);
  };

  return (
    <Link href={props.href} name={props.name}>
      <Menu.Item name={props.name} active={props.active === props.href} onClick={props.onClick} style={{ display: props.display ? "flex" : "none", height: "100%" }}>
        {props.text}
      </Menu.Item>
    </Link>
  );
}

export default NavBtn;
