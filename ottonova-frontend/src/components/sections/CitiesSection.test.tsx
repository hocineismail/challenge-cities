import CitiesSection from "./CitiesSection";
import * as useFetchDataFromUrlModule from "../../hooks/useFetchDataFromUrl";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Configure Enzyme adapter
configure({ adapter: new Adapter() });

describe("Render: Cities Section", () => {
  beforeEach(() => {
    // Mock the hook implementation for each test
    jest.spyOn(useFetchDataFromUrlModule, "default").mockReturnValue({
      data: [
        { name: "City A", population: 1000000 },
        { name: "City B", population: 2000000 },
      ],
      isLoading: false,
      errors: null,
    });
  });

  afterEach(() => {
    // Restore the original implementation after each test
    jest.restoreAllMocks();
  });

  it("Should render placeholders while loading", () => {
    // Simulate loading state
    jest.spyOn(useFetchDataFromUrlModule, "default").mockReturnValueOnce({
      data: null,
      isLoading: true,
      errors: null,
    });

    const wrapper = shallow(<CitiesSection />);
    expect(wrapper.find("CardsSectionPlaceholder").length).toBe(8);
  });

  it("renders error message if there are errors", () => {
    // Simulate error state
    jest.spyOn(useFetchDataFromUrlModule, "default").mockReturnValueOnce({
      data: null,
      isLoading: false,
      errors: "Failed to fetch data",
    });

    const wrapper = shallow(<CitiesSection />);
    expect(wrapper.find("Alert").prop("type")).toBe("danger");
    expect(wrapper.find("Alert").prop("text")).toBe("Failed to fetch data");
  });

  it("Should render city cards if data is available", () => {
    const wrapper = shallow(<CitiesSection />);
    expect(wrapper.find("Card").length).toBe(2);
    expect(wrapper.find("Card").at(0).prop("name")).toBe("City A");
    expect(wrapper.find("Card").at(1).prop("name")).toBe("City B");
  });
});
