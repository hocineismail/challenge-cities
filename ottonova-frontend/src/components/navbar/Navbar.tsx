import React from "react";
// import Logo from "../logo/Logo";
import styled from "styled-components";
import { FaRegMoon } from "react-icons/fa";
import { BsFillSunFill } from "react-icons/bs";
import { AppContext } from "../../store/context";

//import constans

import { SET_THEME } from "../../constants/store";
import { DARK_THEME, LIGHT_THEME } from "../../constants/theme";

// Create the style of navbar using styled-components
const StyledNavbar = styled.nav`
  padding: 25px 0px;
  display: grid;
  grid-template-columns: auto 25px;
`;
// Create the style of button using styled-components
const StylledSwitcherTheme = styled.button`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  background-color: transparent;
  border-color: transparent;
`;

export default function Navbar() {
  // use theme from Global state
  //  dispatch allows to update the theme with SET_THEME
  const {
    state: { theme },
    dispatch,
  } = React.useContext(AppContext);
  return (
    <StyledNavbar data-testid="navbar">
      {/* <Logo /> */}
      <div style={{ fontSize: "2rem", fontWeight: "bold" }}>Ottonova</div>
      <StylledSwitcherTheme
        data-testid="theme-icon"
        onClick={() =>
          dispatch({
            type: SET_THEME,
            payload: {
              theme: theme !== DARK_THEME ? DARK_THEME : LIGHT_THEME,
            },
          })
        }
      >
        {theme === DARK_THEME ? (
          <BsFillSunFill size={25} data-testid="light_icon" />
        ) : (
          <FaRegMoon size={25} data-testid="dark_icon" />
        )}
      </StylledSwitcherTheme>
    </StyledNavbar>
  );
}
