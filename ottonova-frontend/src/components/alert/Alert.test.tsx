import Enzyme from "enzyme";
import "jest-styled-components";
import Adapter from "enzyme-adapter-react-16";
import { shallow } from "enzyme";
import Alert from "./Alert";

Enzyme.configure({ adapter: new Adapter() });

describe("Render: Alert component", () => {
  const props = {
    text: "This is an alert",
    type: "default",
  };

  it("Should render without crashing", () => {
    const wrapper = shallow(<Alert {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("Should render the text prop", () => {
    const wrapper = shallow(<Alert {...props} />);
    expect(wrapper.text()).toEqual(props.text);
  });
});
