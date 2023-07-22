import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button"; // Replace './Button' with the actual path to your Button component
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../../styles/themes/lightTheme";

// Mock function for handle click
const mockHandleClick = jest.fn();

describe("Button Component:", () => {
  test("Renders the Button Component correctly with text and type", () => {
    const buttonText = "Click Me";
    const buttonType = "submit";

    render(
      <ThemeProvider theme={lightTheme}>
        <Button
          text={buttonText}
          type={buttonType}
          handleClick={mockHandleClick}
        />
      </ThemeProvider>
    );

    const buttonElement = screen.getByText(buttonText);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement.tagName).toBe("BUTTON");
    expect(buttonElement.getAttribute("type")).toBe(buttonType);

    // Click the button and check if the mockHandleClick function is called
    fireEvent.click(buttonElement);
    expect(mockHandleClick).toHaveBeenCalled();
  });

  test("Renders the Button component correctly without handleClick.", () => {
    const buttonText = "Submit";

    render(
      <ThemeProvider theme={lightTheme}>
        <Button text={buttonText} type="submit" />
      </ThemeProvider>
    );

    const buttonElement = screen.getByText(buttonText);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement.tagName).toBe("BUTTON");
    expect(buttonElement.getAttribute("type")).toBe("submit");
  });
});
