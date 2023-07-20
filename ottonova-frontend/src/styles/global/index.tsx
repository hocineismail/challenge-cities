import { createGlobalStyle } from "styled-components";
import { Theme } from "../../typed/theme";

interface ThemeProps {
  theme: Theme;
}

// interface GlobalStylesProps {
//   theme: DefaultTheme; // Import DefaultTheme from styled-components
// }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GlobalStyles = createGlobalStyle<ThemeProps | any>`
 html, body {
    margin: 0;
    padding: 0;
    // transition: 0.3s;
    font-family: 'Noto Sans', sans-serif;
    background-color: ${({ theme }) => theme.colors.secondaryBackground};
    color: ${({ theme }) => theme.colors.primaryText};
    }
   
  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primaryText};
  }
`;

export default GlobalStyles;
