import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CardsPlaceholder from "./CardsPlaceholder";
// Configure Enzyme adapter
configure({ adapter: new Adapter() });

describe("CardsPlaceholder", () => {
  it("should render placeholders correctly", () => {
    const wrapper = shallow(<CardsPlaceholder />);

    // Check if the component contains the expected number of placeholders
    expect(wrapper.find({ "data-test-id": "placeholder" }).length).toEqual(7);
    // it should render One placeholder text
    expect(
      wrapper.find({ "data-test-id": "placeholder", type: "text" }).length
    ).toEqual(6);
    // it should render One placeholder image
    expect(
      wrapper.find({ "data-test-id": "placeholder", type: "image" }).length
    ).toEqual(1);
  });
});
