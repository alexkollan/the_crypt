import { AppContext } from "../context/AppContext";
import { useState, useContext } from "react";
import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";

function MyApp({ Component, pageProps }) {
  const [gState, setGState] = useState(false);
  const [gUser, setGUser] = useState();

  return (
    <AppContext.Provider value={{ gState, setGState, gUser, setGUser }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp;
