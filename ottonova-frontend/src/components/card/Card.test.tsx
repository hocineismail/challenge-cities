import * as React from "react";

import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Card from "./Card";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../../styles/themes/lightTheme";

const props = {
  name: "Test Title",
  name_native: "Test Subtitle",
  country: "Test City",
  continent: "continent",
  population: "120",
  founded: "100",
  latitude: "100",
  longitude: "100",
  landmarks: ["mark1", "mark2"],
};

describe("Card component", () => {
  it("renders with correct text and type", () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Card {...props} />
      </ThemeProvider>
    );
    // Use getByText to find the element containing the testText
    expect(screen.getByTestId("card")).toBeInTheDocument();
  });

  it("Component should display the correct information provded by props:", () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Card {...props} />
      </ThemeProvider>
    );
    // Test the display of title, subtitle, city, founded, and population
    expect(screen.getByTestId("header-card-title").textContent).toBe(
      props.name
    );
    expect(screen.getByTestId("header-card-subtitle").textContent).toBe(
      props.name_native
    );
    expect(screen.getByTestId("card-city").textContent).toBe(
      `${props.country} | ${props.continent}`
    );
    expect(screen.getByTestId("card-founded").textContent).toBe(
      `Founded: ${props.founded}`
    );
    expect(screen.getByTestId("card-population").textContent).toBe(
      `Population: ${props.population}`
    );
    const listItems = screen.getAllByTestId("card-mark-item");
    listItems.forEach((item, index) => {
      expect(item.textContent).toBe(props.landmarks[index]);
    });
  });
});
