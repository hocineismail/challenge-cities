import React from "react";
import { ThemeProvider } from "styled-components";
import { ligthTheme } from "./styles/themes/lightTheme";

import GlobalStyles from "./styles/global";
import Layout from "./components/layout/Layout";
import CitiesSection from "./components/sections/CitiesSection";
import { appState, appReducer } from "./store/reducer";
import { AppContext } from "./store/context";

import Navbar from "./components/navbar/Navbar";
import { darkTheme } from "./styles/themes/darkTheme";
import { SET_THEME } from "./constants/store";
import CityDetailsModal from "./components/modal/CityDetailsModal";
import { DARK_THEME, LIGHT_THEME } from "./constants/theme";

function App() {
  const [state, dispatch] = React.useReducer(appReducer, appState);

  React.useEffect(() => {
    (() => {
      const currentTheme = localStorage.getItem("theme");

      dispatch({
        type: SET_THEME,
        payload: {
          theme: currentTheme === DARK_THEME ? DARK_THEME : LIGHT_THEME,
        },
      });
    })();
  }, []);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <ThemeProvider
        theme={state.theme === DARK_THEME ? darkTheme : ligthTheme}
      >
        <Layout>
          <Navbar />
          <CitiesSection />
          <CityDetailsModal />
        </Layout>
        <GlobalStyles />
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
