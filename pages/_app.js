import { AppProvider } from "../context/AppContext";
import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import NavBar from "../components/global/navBar";

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <NavBar />
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp;
