import React from "react";
import { ThemeProvider } from "styled-components";
import { ligthTheme } from "./styles/themes/lightTheme";

import GlobalStyles from "./styles/global";
import Layout from "./components/layout/Layout";
import CitiesSection from "./components/sections/CitiesSection";
import { appState, appReducer } from "./store/reducer";
import { AppContext } from "./store/context";
import CityDetailsModal from "./components/modal/CityDetailsModal";
import Navbar from "./components/navbar/Navbar";
import { darkTheme } from "./styles/themes/darkTheme";

function App() {
  const [state, dispatch] = React.useReducer(appReducer, appState);

  React.useEffect(() => {
    (() => {
      const currentTheme = localStorage.getItem("theme");
      if (currentTheme === "DARK") {
        dispatch({ type: "SWITCH_THEME", payload: "DARK" });
      }
    })();
  }, []);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <ThemeProvider theme={state.theme === "DARK" ? darkTheme : ligthTheme}>
        <GlobalStyles />
        <Layout>
          <Navbar />
          <CitiesSection />
          <CityDetailsModal />
        </Layout>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
