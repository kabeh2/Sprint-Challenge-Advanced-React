import React from "react";
import { shallow } from "enzyme";
import useLocalStorage from "../useLocalStorage";

function HookWrapper(props) {
  const hook = props.hook ? props.hook() : undefined;
  return <div hook={hook} />;
}

describe("useLocalStorage", () => {
  test("should set init value", () => {
    let wrapper = shallow(
      <HookWrapper hook={() => useLocalStorage("darkMode", true)} />
    );

    let { hook } = wrapper.find("div").props();
    let [storedValue] = hook;
    expect(storedValue).toEqual(true);
  });

  test("should set the right value in setValue function", () => {
    //arrange
    let wrapper = shallow(
      <HookWrapper hook={() => useLocalStorage("darkMode", true)} />
    );
    let { hook } = wrapper.find("div").props();
    let [storedValue, setValue] = hook;

    // act
    setValue(false);

    // destructuring objects - {} should be inside brackets - () to avoid
    // syntax error
    ({ hook } = wrapper.find("div").props());
    [storedValue, setValue] = hook;

    // assert
    expect(storedValue).toEqual(false);
  });

  test("should read and update localStorage", () => {
    let initialValue = false;
    window.localStorage.setItem("darkMode", initialValue);
    //arrange
    let wrapper = shallow(
      <HookWrapper hook={() => useLocalStorage("darkMode", initialValue)} />
    );
    let { hook } = wrapper.find("div").props();
    let [storedValue, setValue] = hook;

    // act
    setValue(!initialValue);

    // destructuring objects - {} should be inside brackets - () to avoid
    // syntax error
    ({ hook } = wrapper.find("div").props());
    [storedValue, setValue] = hook;

    // assert
    expect(storedValue).toEqual(true);
    expect(window.localStorage.getItem("darkMode")).toBe("true");
  });
});
