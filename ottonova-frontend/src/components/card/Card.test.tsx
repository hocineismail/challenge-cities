import Enzyme, { ShallowWrapper } from "enzyme";
import "jest-styled-components";
import Adapter from "enzyme-adapter-react-16";
import { shallow } from "enzyme";
import Card from "./Card";

import { LiaCitySolid } from "react-icons/lia";
// import CardContent from "./CardContent";
import CardHeader from "./CardHeader";
import CardActions from "./CardActions";
import CardContent from "./CardContent";
import Button from "../button/Button";
//import card components

Enzyme.configure({ adapter: new Adapter() });

describe("Render Full Card component", () => {
  const props = {
    name: "Test Title",
    name_native: "Test Subtitle",
    country: "Test City",
    continent: "continent",
    population: "120",
    founded: "100",
    latitude: "100",
    longitude: "100",
    landmarks: ["mark1", "mark2"],
  };

  it("Should render without crashing", () => {
    const wrapper = shallow(<Card {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("Should render the card header", () => {
    const wrapper = shallow(<Card {...props} />);
    expect(wrapper.find(CardHeader)).toHaveLength(1);
  });

  it("Should render the card content", () => {
    const wrapper = shallow(<Card {...props} />);
    expect(wrapper.find(CardContent)).toHaveLength(1);
  });

  it("Should render the card actions", () => {
    const wrapper = shallow(<Card {...props} />);
    expect(wrapper.find(CardActions)).toHaveLength(1);
  });

  it("Should render a button inside the card actions", () => {
    const wrapper = shallow(<Card {...props} />);
    expect(wrapper.find(CardActions).find(Button)).toHaveLength(1);
  });

  it("passes the correct props to the card header", () => {
    const wrapper = shallow(<Card {...props} />);
    const cardHeader = wrapper.find(CardHeader);
    expect(cardHeader.prop("title")).toEqual(props.name);
    expect(cardHeader.prop("subTitle")).toEqual(props.name_native);
  });

  it("passes the correct props to the card content", () => {
    const wrapper = shallow(<Card {...props} />);
    const cardContent = wrapper.find(CardContent);
    let city = `${props.country} | ${props.continent}`;
    expect(cardContent.prop("city")).toEqual(city);
    expect(cardContent.prop("marks")).toEqual(props.landmarks);
  });

  it("passes the correct text prop to the button", () => {
    const wrapper = shallow(<Card {...props} />);
    const button = wrapper.find(CardActions).find(Button);
    expect(button.prop("text")).toEqual("Show");
  });
});
describe("Render: CardHeader:", () => {
  let title: string = "Title Card";
  let subTitle: string = "Title Card";
  const wrapper = shallow(
    <CardHeader title={title} subTitle={subTitle} icon={<LiaCitySolid />} />
  );
  it("Should render HeaderCard", () => {
    expect(
      wrapper.find({
        "data-test-id": "header-card",
      }).length
    ).toBe(1);
  });
  it('should check the title of an element with data-test-id="header-card-title"', () => {
    const wrapper = shallow(
      <CardHeader title={title} subTitle={subTitle} icon={<LiaCitySolid />} />
    );

    const titleElement = wrapper.find({
      "data-test-id": "header-card-title",
    });
    const titleText = titleElement.text();

    expect(titleText).toEqual(title);
  });
  it('should check the title of an element with data-test-id="header-card-sub-title"', () => {
    const wrapper = shallow(
      <CardHeader title={title} subTitle={subTitle} icon={<LiaCitySolid />} />
    );
    const titleElement = wrapper.find({
      "data-test-id": "header-card-subtitle",
    });
    const titleText = titleElement.text();

    expect(titleText).toEqual(subTitle);
  });
});

describe("CardActions", () => {
  let wrapper: ShallowWrapper = shallow(<CardActions>Actions</CardActions>);

  it("renders the children", () => {
    expect(wrapper.text()).toContain("Actions");
  });

  it("renders the children wrapped in a div", () => {
    expect(
      wrapper
        .find({
          "data-test-id": "card-actions",
        })
        .exists()
    ).toBe(true);
  });
});
