import React from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./styles/themes/lightTheme";

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
import { Theme } from "./utils/helper";
const theme = new Theme();
function App() {
  const [state, dispatch] = React.useReducer(appReducer, appState);

  React.useEffect(() => {
    (() => {
      const currentTheme = theme.getCurrentTheme();
      dispatch({
        type: SET_THEME,
        payload: {
          theme: currentTheme === DARK_THEME ? DARK_THEME : LIGHT_THEME,
        },
      });
    })();
  }, []);
  return state.theme ? (
    <AppContext.Provider value={{ state, dispatch }}>
      <ThemeProvider
        theme={state.theme === DARK_THEME ? darkTheme : lightTheme}
        data-testid={state.theme}
      >
        <Layout>
          <Navbar />
          <div data-testid="cities-section">
            <CitiesSection />
          </div>
          <CityDetailsModal />
        </Layout>
        <GlobalStyles />
      </ThemeProvider>
    </AppContext.Provider>
  ) : (
    <div>loading</div>
  );
}

export default App;
