import Alert from "./Alert";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

describe("Alert component", () => {
  //mock data for props
  const testText = "Test Alert";
  const testType = "danger";
  test("renders with correct text and type", () => {
    render(<Alert text={testText} type={testType} />);
    //check the text if exist
    expect(screen.getByText(testText)).toBeInTheDocument();
    const alertElement = screen.getByTestId("alert");
    expect(screen.getByTestId("alert")).toBeInTheDocument();
    expect(alertElement.getAttribute("type")).toBe(testType);
  });

  test("renders with default type", () => {
    render(<Alert text={testText} />);
    const alertElement = screen.getByTestId("alert");
    expect(screen.getByTestId("alert")).toBeInTheDocument();
    expect(alertElement.getAttribute("type")).toBe("default");
  });
});
