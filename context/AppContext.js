import { createContext, useContext, useState } from "react";

export const AppContext = createContext("");

// export function AppWrapper({ children }) {
//   const [globalState, setGlobalState] = useState([]);
//   let sharedState = {
//     /* whatever you want */
//     test: "Yooo menz",
//   };

//   return <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>;
// }

// export function useAppContext() {
//   return useContext(AppContext);
// }
