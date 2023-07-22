import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "./Navbar";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../../styles/themes/lightTheme";
import { AppContext } from "../../store/context";
import { State } from "../../typed/app";
import { SET_THEME } from "../../constants/store";
const mockState: State = {
  city: null,
  isModalVisible: false,
  theme: null,
};
describe("Navbar renders correctly with correct theme icon", () => {
  // Mock the context value to provide the theme state
  const dispatch = jest.fn();
  it("Should render with light icon", () => {
    const state = { ...mockState };
    render(
      <AppContext.Provider value={{ state, dispatch }}>
        <ThemeProvider theme={lightTheme}>
          <Navbar />
        </ThemeProvider>
      </AppContext.Provider>
    );

    // Expecting the text "Ottonova" to be present in the Navbar
    expect(screen.getByTestId("light_icon")).toBeInTheDocument();
  });
  it("Should render with dark icon", () => {
    const state = { ...mockState, theme: "DARK" };
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
  it("Should switch to dark mode", () => {
    const state = { ...mockState, theme: "LIGHT" };
    render(
      <AppContext.Provider value={{ state, dispatch }}>
        <ThemeProvider theme={lightTheme}>
          <Navbar />
        </ThemeProvider>
      </AppContext.Provider>
    );

    // Expecting the text "Ottonova" to be present in the Navbar
    expect(screen.getByTestId("light_icon")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("theme-icon"));
    expect(dispatch).toHaveBeenCalledWith({
      type: SET_THEME,
      payload: { theme: "DARK_THEME" },
    });
  });
  it("Should switch to dark mode", () => {
    const state = { ...mockState, theme: "DARK" };
    render(
      <AppContext.Provider value={{ state, dispatch }}>
        <ThemeProvider theme={lightTheme}>
          <Navbar />
        </ThemeProvider>
      </AppContext.Provider>
    );

    // Expecting the text "Ottonova" to be present in the Navbar
    expect(screen.getByTestId("dark_icon")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("theme-icon"));
    expect(dispatch).toHaveBeenCalledWith({
      type: SET_THEME,
      payload: { theme: "DARK_THEME" },
    });
  });
});
