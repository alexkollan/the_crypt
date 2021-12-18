import { createContext, useContext, useState } from "react";

export const AppContext = createContext();
export const AppProvider = (props) => {
  const [gState, setGState] = useState(false);
  const [gUser, setGUser] = useState({});
  const [uAvatar, setUAvatar] = useState("");
  const [uid, setUId] = useState("");
  const [navRev, setNavRev] = useState(false);
  return <AppContext.Provider value={{ gState, setGState, gUser, setGUser, uAvatar, setUAvatar, navRev, setNavRev }}>{props.children}</AppContext.Provider>;
};
