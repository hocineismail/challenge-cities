import { ThemeProvider } from "styled-components";
import { ligthTheme } from "./styles/themes/lightTheme";

import GlobalStyles from "./styles/global";
import Layout from "./components/layout/Layout";
import CitiesSection from "./components/sections/CitiesSection";

function App() {
  return (
    <ThemeProvider theme={ligthTheme}>
      <GlobalStyles />
      <Layout>
        <CitiesSection />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
