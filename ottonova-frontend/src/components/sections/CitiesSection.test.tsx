import { render, screen } from "@testing-library/react";

import useFetchDataFromUrl from "../../hooks/useFetchDataFromUrl";
import { City } from "../../typed/cities";
import { ThemeProvider } from "styled-components";
import { ligthTheme } from "../../styles/themes/lightTheme";
import CitiesSection from "./CitiesSection";

jest.mock("../../hooks/useFetchDataFromUrl");

const mockCities: City[] = [
  {
    name: "Sydney2",
    name_native: "Syd3ney",
    country: "Australia",
    continent: "Australia",
    latitude: "-33.865143",
    longitude: "151.209900",
    population: "5312000",
    founded: "1788",
    landmarks: [
      "Sydney Opera House",
      "Sydney Harbour Bridge",
      "Queen Victoria Building",
    ],
  },
  {
    name: "Sydne4y",
    name_native: "Syd4ney",
    country: "Australia",
    continent: "Australia",
    latitude: "-33.865143",
    longitude: "151.209900",
    population: "5312000",
    founded: "1788",
    landmarks: [
      "Sydney Opera House",
      "Sydney Harbour Bridge",
      "Queen Victoria Building",
    ],
  },
];

describe("CitiesSection", () => {
  beforeEach(() => {
    (useFetchDataFromUrl as jest.Mock).mockReturnValue({
      data: { cities: mockCities },
      isLoading: false,
      errors: null,
    });
  });

  it("renders a grid of city cards", () => {
    render(
      <ThemeProvider theme={ligthTheme}>
        <CitiesSection />
      </ThemeProvider>
    );

    expect(screen.getAllByTestId("card").length).toBe(2);
  });

  it("renders placeholders when loading", () => {
    (useFetchDataFromUrl as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      errors: null,
    });

    render(
      <ThemeProvider theme={ligthTheme}>
        <CitiesSection />
      </ThemeProvider>
    );

    expect(screen.getByTestId("loading-section")).toBeInTheDocument();
  });

  it("Should render the alert component if there are errors", () => {
    (useFetchDataFromUrl as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      errors: "Something went wrong",
    });

    render(
      <ThemeProvider theme={ligthTheme}>
        <CitiesSection />
      </ThemeProvider>
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });
});
