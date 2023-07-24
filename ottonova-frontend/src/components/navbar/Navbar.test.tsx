import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "./Navbar";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../../styles/themes/lightTheme";
import { AppContext } from "../../store/context";
import { State } from "../../typed/app";
import { SET_THEME } from "../../constants/store";
import { DARK_THEME, LIGHT_THEME } from "../../constants/theme";
import { darkTheme } from "../../styles/themes/darkTheme";
const mockState: State = {
  city: null,
  isModalVisible: false,
  theme: null,
};
describe("Navbar renders correctly with correct theme icon", () => {
  // Mock the context value to provide the theme state
  const dispatch = jest.fn();
  test("Should render with light theme", () => {
    const state = { ...mockState };
    render(
      <AppContext.Provider value={{ state, dispatch }}>
        <ThemeProvider theme={lightTheme}>
          <Navbar />
        </ThemeProvider>
      </AppContext.Provider>
    );

    // Expecting the text "Ottonova" to be present in the Navbar
    expect(screen.getByTestId("dark_icon")).toBeInTheDocument();
  });
  test("Should render with dark icon", () => {
    const state = { ...mockState, theme: DARK_THEME };
    render(
      <AppContext.Provider value={{ state, dispatch }}>
        <ThemeProvider theme={darkTheme}>
          <Navbar />
        </ThemeProvider>
      </AppContext.Provider>
    );

    // Expecting the text "Ottonova" to be present in the Navbar
    expect(screen.getByTestId("light_icon")).toBeInTheDocument();
  });
  test("Should switch to dark mode", () => {
    const state = { ...mockState, theme: LIGHT_THEME };
    render(
      <AppContext.Provider value={{ state, dispatch }}>
        <ThemeProvider theme={lightTheme}>
          <Navbar />
        </ThemeProvider>
      </AppContext.Provider>
    );
    expect(screen.getByTestId("dark_icon")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("theme-icon"));
    expect(dispatch).toHaveBeenCalledWith({
      type: SET_THEME,
      payload: { theme: DARK_THEME },
    });
  });

  test("Should switch to light mode", () => {
    const state = { ...mockState, theme: DARK_THEME };
    render(
      <AppContext.Provider value={{ state, dispatch }}>
        <ThemeProvider theme={darkTheme}>
          <Navbar />
        </ThemeProvider>
      </AppContext.Provider>
    );
    expect(screen.getByTestId("light_icon")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("theme-icon"));
    expect(dispatch).toHaveBeenCalledWith({
      type: SET_THEME,
      payload: { theme: LIGHT_THEME },
    });
  });
});
