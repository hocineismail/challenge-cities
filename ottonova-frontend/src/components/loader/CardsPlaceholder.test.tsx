import { render, screen } from "@testing-library/react";
import CardsPlaceholder from "./CardsPlaceholder";
import { ThemeProvider } from "styled-components";
import { ligthTheme } from "../../styles/themes/lightTheme";

describe("CardsPlaceholder", () => {
  it("Should render correctly with placeholders", () => {
    render(
      <ThemeProvider theme={ligthTheme}>
        <CardsPlaceholder />
      </ThemeProvider>
    );

    // Test placeholders for the card header section
    expect(screen.getByTestId("placeholder-image")).toBeInTheDocument();
    expect(screen.getByTestId("placeholder-text1")).toBeInTheDocument();
    expect(screen.getByTestId("placeholder-text2")).toBeInTheDocument();

    // Test placeholders for the rest of the card section
    expect(screen.getByTestId("placeholder-text3")).toBeInTheDocument();
    expect(screen.getByTestId("placeholder-text4")).toBeInTheDocument();
    expect(screen.getByTestId("placeholder-text5")).toBeInTheDocument();
    expect(screen.getByTestId("placeholder-text6")).toBeInTheDocument();

    // Test the existence of hr element
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });
});
