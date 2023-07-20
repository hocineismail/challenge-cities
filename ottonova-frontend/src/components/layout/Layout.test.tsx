import Layout from "./Layout";
import Enzyme, { shallow } from "enzyme";
import "jest-styled-components";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("Render: Layout component", () => {
  it("Should render Layout", () => {
    const child = <div data-test-id="child" />;
    const wrapper = shallow(<Layout>{child}</Layout>);
    expect(
      wrapper.find({
        "data-test-id": "layout",
      }).length
    ).toBe(1);
  });
});
