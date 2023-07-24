import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import CityDetailsModal from "./CityDetailsModal";
import { AppContext } from "../../store/context";
import { TOGGLE_MODAL } from "../../constants/store";
import { State } from "../../typed/app";
import { lightTheme } from "../../styles/themes/lightTheme";

const mockState: State = {
  city: {
    name: "Test City",
    name_native: "Test City Native",
    founded: "1000",
    population: "1000000",
    country: "Test Country",
    continent: "Test Continent",
    landmarks: ["Landmark 1", "Landmark 2"],
    latitude: "0",
    longitude: "0",
  },
  isModalVisible: true,
  theme: "LIGHT",
};
describe("CityDetailsModal", () => {
  test("renders CityDetailsModal component", () => {
    const dispatch = jest.fn();
    render(
      <AppContext.Provider value={{ state: mockState, dispatch }}>
        <ThemeProvider theme={lightTheme}>
          <CityDetailsModal />
        </ThemeProvider>
      </AppContext.Provider>
    );
    expect(screen.getByText("Test City")).toBeInTheDocument();
    expect(screen.getByText("Test City Native")).toBeInTheDocument();
    expect(screen.getByText("1000")).toBeInTheDocument();
    expect(screen.getByText("1000000")).toBeInTheDocument();
    expect(
      screen.getByText("Test Country | Test Continent")
    ).toBeInTheDocument();
    expect(screen.getByText("Landmark 1")).toBeInTheDocument();
    expect(screen.getByText("Landmark 2")).toBeInTheDocument();
  });
  test("calls dispatch with TOGGLE_MODAL action when close button is clicked", () => {
    const dispatch = jest.fn();
    const { getByTestId } = render(
      <AppContext.Provider value={{ state: mockState, dispatch }}>
        <ThemeProvider theme={lightTheme}>
          <CityDetailsModal />
        </ThemeProvider>
      </AppContext.Provider>
    );
    fireEvent.click(getByTestId("close-button"));
    expect(dispatch).toHaveBeenCalledWith({ type: TOGGLE_MODAL });
  });
});
