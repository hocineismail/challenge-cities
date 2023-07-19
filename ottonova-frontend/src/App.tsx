import { ThemeProvider } from "styled-components";
import { ligthTheme } from "./styles/themes/lightTheme";
function App() {
  return (
    <ThemeProvider theme={ligthTheme}>
      <div>app</div>
    </ThemeProvider>
  );
}

export default App;
