import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import useFetchDataFromUrl from "./useFetchDataFromUrl";
import { act } from "react-dom/test-utils";

// Mock the response function
function mockResponse(ok: boolean, data: any) {
  return Promise.resolve({
    ok,
    json: () => Promise.resolve(data),
  });
}

const TestComponent = ({ url }: { url: string }) => {
  const { data, isLoading, errors } = useFetchDataFromUrl({
    url,
    request: "cities",
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (errors) {
    return <div>Oooups!!! Something went Wrong</div>;
  }

  return <div data-testid="data-content">{JSON.stringify(data)}</div>;
};

describe("useFetchDataFromUrl", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });
  it("fetches data from the specified URL", () => {
    const mockData = { test: "data" };
    global.fetch = jest.fn(() =>
      Promise.resolve(mockResponse(true, mockData))
    ) as jest.Mock;

    render(<TestComponent url="https://test.com" />);
    //should render loading component before display data
    expect(screen.getByText("Loading")).toBeInTheDocument();
    setTimeout(async () => {
      await waitFor(() =>
        expect(screen.getByText(JSON.stringify(mockData))).toBeInTheDocument()
      );
    }, 1000);
  });

  it("Get data from cache", () => {
    const mockData = { test: "Hello World" };
    const expiration = Date.now() + 100000;
    const cacheKey = `cache_cities`;
    const cachedItem = { data: mockData, expiration };
    window.localStorage.setItem(cacheKey, JSON.stringify(cachedItem));
    render(<TestComponent url="https://test.com" />);

    expect(screen.getByText("Loading")).toBeInTheDocument();
    setTimeout(async () => {
      waitFor(() =>
        expect(screen.getByText(JSON.stringify(mockData))).toBeInTheDocument()
      );
    }, 1000);
  });

  it("sets errors if the request fails and no cache", () => {
    global.fetch = jest.fn(() =>
      Promise.resolve(mockResponse(false, null))
    ) as jest.Mock;

    render(<TestComponent url="https://test.com" />);

    expect(screen.getByText("Loading")).toBeInTheDocument();
    setTimeout(async () => {
      await waitFor(() =>
        expect(
          screen.getByText("Oooups!!! Something went Wrong")
        ).toBeInTheDocument()
      );
    }, 1000);
  });
});
