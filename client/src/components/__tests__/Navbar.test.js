import React from "react";
import Navbar from "../Navbar";

import { shallow } from "enzyme";

/**
 * Factory function to create a ShallowWrapper for the App Component.
 * @function setup
 * @param {object} props - Component specific to this setup.
 * @param {object} state - Initial state for setup.
 * @returns {ShallowWrapper}
 */
const setup = (props = {}, state = null) => {
  const wrapper = shallow(<Navbar {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Value of data-test attribute for search
 * @returns {ShallowWrapper}
 */
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

describe("Navbar", () => {
  let wrapper, appComponent, e;
  const setValue = jest.fn();
  const useStateSpy = jest.spyOn(React, "useState");
  useStateSpy.mockImplementation(init => [init, setValue]);

  beforeEach(() => {
    wrapper = setup();
    appComponent = findByTestAttr(wrapper, "component-navbar");
    e = Object.assign(jest.fn(), { preventDefault: () => {} });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Toggle state", () => {
    it("calls setValue with !darkMode", () => {
      const darkMode = false;
      appComponent
        .find('[data-test="component-navbar-toggle"]')
        .simulate("click", e);
      // .onClick();
      //   expect(setValue).toHaveBeenCalledWith(darkMode);
    });
  });

  test("Navbar is rendered", () => {
    expect(appComponent.length).toBe(1);
  });

  //   test("Navbar snapshot", () => {
  //     expect(appComponent.html()).toMatchSnapshot();
  //   });

  describe("Test Navbar Toggle", () => {
    test("Class changes each time clicked", () => {
      //   Use below to mock e.preventDefault()
      const e = Object.assign(jest.fn(), { preventDefault: () => {} });
      const toggle = appComponent.find(`[data-test="component-navbar-toggle"]`);
      expect(toggle.length).toBe(1);
      toggle.simulate("click", e);
      expect(toggle.children().hasClass("toggle toggled"));
      toggle.simulate("click", e);
      expect(toggle.children().hasClass("toggle"));
    });
  });
});
