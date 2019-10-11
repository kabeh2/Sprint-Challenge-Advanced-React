import React from "react";
import { act } from "react-dom/test-utils";
import { shallow, mount } from "enzyme";
import useDarkMode from "../useDarkMode";
import App from "../../App";

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

  test("should toggle class correctly", () => {
    let wrapper = shallow(<HookWrapper hook={() => useDarkMode(false)} />);
    let appWrapper = shallow(<App />);

    let { hook } = wrapper.find("div").props();
    let [darkMode, setValue] = hook;
    expect(darkMode).toEqual(false);

    expect(appWrapper.hasClass("App")).toEqual(true);

    setValue(true);

    ({ hook } = wrapper.find("div").props());
    [darkMode, setValue] = hook;

    expect(darkMode).toEqual(true);

    expect(appWrapper.hasClass("App")).toEqual(true);
  });
});
