import Layout from "./Layout";
import { render, screen } from "@testing-library/react";

describe("Render: Layout component", () => {
  it("Should render correctly with children", () => {
    const mockChild = (
      <div data-testid="child">Hello, this is a child component</div>
    );

    render(<Layout>{mockChild}</Layout>);

    const layoutElement = screen.getByTestId("layout");
    expect(layoutElement).toBeInTheDocument();

    expect(layoutElement).toHaveTextContent("Hello, this is a child component");
  });
});
