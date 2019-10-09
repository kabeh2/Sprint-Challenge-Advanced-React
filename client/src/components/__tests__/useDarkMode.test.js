import React from "react";
import { shallow } from "enzyme";
import useDarkMode from "../useDarkMode";

const HookWrapper = props => {
  const hook = props.hook ? props.hook() : undefined;
  return <div hook={hook} />;
};

describe("useDarkMode", () => {
  test("should render", () => {
    let wrapper = shallow(<HookWrapper />);

    expect(wrapper.exists()).toBeTruthy();
  });

  test("should set initial value", () => {
    let wrapper = shallow(<HookWrapper hook={() => useDarkMode(false)} />);

    let { hook } = wrapper.find("div").props();
    let [darkMode] = hook;
    expect(darkMode).toEqual(false);
  });
});
