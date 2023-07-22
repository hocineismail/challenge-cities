import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import useFetchDataFromUrl from "./useFetchDataFromUrl";

// Mock the response function
function mockResponse(ok: boolean, data: any) {
  return Promise.resolve({
    ok,
    json: () => Promise.resolve(data),
  });
}

const TestComponent = ({ url }: { url: string }) => {
  const { data, isLoading, errors } = useFetchDataFromUrl({ url });

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (errors) {
    return <div>Oooups!!! Something went Wrong</div>;
  }

  return <div data-testid="data-content">{JSON.stringify(data)}</div>;
};

describe("useFetchDataFromUrl", () => {
  it("fetches data from the specified URL", async () => {
    const mockData = { test: "data" };
    global.fetch = jest.fn(() =>
      Promise.resolve(mockResponse(true, mockData))
    ) as jest.Mock;

    render(<TestComponent url="https://test.com" />);

    // Wait for the component to load and then get the displayed data
    expect(screen.getByText("Loading")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByText(JSON.stringify(mockData))).toBeInTheDocument()
    );
  });

  it("sets errors if the request fails", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve(mockResponse(false, null))
    ) as jest.Mock;

    render(<TestComponent url="https://test.com" />);

    expect(screen.getByText("Loading")).toBeInTheDocument();

    await waitFor(() =>
      expect(
        screen.getByText("Oooups!!! Something went Wrong")
      ).toBeInTheDocument()
    );
  });
});
