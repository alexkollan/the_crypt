import { AppContext } from "../context/AppContext";
import { useState, useContext } from "react";
import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import NavBar from "../components/global/navBar";

function MyApp({ Component, pageProps }) {
  const [gState, setGState] = useState(false);
  const [gUser, setGUser] = useState({});
  const [uAvatar, setUAvatar] = useState("");
  const [uid, setUId] = useState("");
  // console.log("Current user: ", gUser);
  return (
    <AppContext.Provider value={{ gState, setGState, gUser, setGUser, uAvatar, setUAvatar }}>
      <NavBar />
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp;
