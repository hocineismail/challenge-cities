import React from "react";
// import Logo from "../logo/Logo";
import styled from "styled-components";
import { FaRegMoon } from "react-icons/fa";
import { BsFillSunFill } from "react-icons/bs";
import { AppContext } from "../../store/context";

//import constans

import { SET_THEME } from "../../constants/store";
import { DARK_THEME, LIGHT_THEME } from "../../constants/theme";

const StyledNavbar = styled.nav`
  padding: 25px 0px;
  display: grid;
  grid-template-columns: auto 25px;
`;

const StylledSwitcherTheme = styled.button`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  background-color: transparent;
  border-color: transparent;
`;

export default function Navbar() {
  const {
    state: { theme },
    dispatch,
  } = React.useContext(AppContext);
  return (
    <StyledNavbar>
      {/* <Logo /> */}
      <div style={{ fontSize: "2rem", fontWeight: "bold" }}>Ottonova</div>
      <StylledSwitcherTheme
        onClick={() =>
          dispatch({
            type: SET_THEME,
            payload: {
              theme: theme !== DARK_THEME ? DARK_THEME : LIGHT_THEME,
            },
          })
        }
      >
        {theme === "DARK" ? (
          <BsFillSunFill size={25} />
        ) : (
          <FaRegMoon size={25} />
        )}
      </StylledSwitcherTheme>
    </StyledNavbar>
  );
}
