import React from "react";
import { shallow, ShallowWrapper } from "enzyme";

import Enzyme from "enzyme";

import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });
import Button from "./Button";

describe("Render Button Component", () => {
  const handleClickMock = jest.fn();
  let wrapper: ShallowWrapper = shallow(
    <Button text="Click me" handleClick={handleClickMock} />
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Renders the button with text", () => {
    expect(wrapper.text()).toContain("Click me");
  });

  it("Calls the handleClick function when clicked", () => {
    wrapper.simulate("click");
    expect(handleClickMock).toHaveBeenCalled();
  });

  it("Should render the button with the specified type (style)", () => {
    const type = "primary";
    wrapper.setProps({ type });
    expect(wrapper.prop("type")).toBe(type);
  });

  it("Should render the button without type when not specified", () => {
    wrapper.setProps({ type: undefined });
    expect(wrapper.prop("type")).toBeUndefined();
  });
});
