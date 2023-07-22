import { screen, render } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  it("Should render correctly Navbar, CitiesSection, and CityDetailsModal", () => {
    render(<App />);

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getAllByTestId("navbar").length).toBe(1);

    expect(screen.getByTestId("cities-section")).toBeInTheDocument();
    expect(screen.getAllByTestId("cities-section").length).toBe(1);

    expect(screen.getByTestId("city-details-modal")).toBeInTheDocument();
    expect(screen.getAllByTestId("city-details-modal").length).toBe(1);
  });
});
