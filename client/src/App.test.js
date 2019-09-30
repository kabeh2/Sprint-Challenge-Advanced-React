import React from "react";
import { shallow } from "enzyme";
import axios from "axios";
import App from "./App";

/**
 * Factory function to create a ShallowWrapper for the App Component.
 * @function setup
 * @param {object} props - Component specific to this setup.
 * @param {object} state - Initial state for setup.
 * @returns {ShallowWrapper}
 */
const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />);
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

jest.mock("axios", () => {
  const examplePlayers = [
    {
      name: "Test Name",
      country: "Test Country",
      searches: 1,
      id: 0
    }
  ];

  return {
    get: jest.fn(() => Promise.resolve(examplePlayers))
  };
});

it("fetch players on #componentDidMount", () => {
  const app = setup();
  app
    .instance()
    .fetchPlayers()
    .then(() => {
      expect(axios.get).toHaveBeenCalled();
      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:5000/api/players"
      );
      expect(app.state()).toHaveProperty("players", [
        {
          name: "Test Name",
          country: "Test Country",
          searches: 1,
          id: 0
        }
      ]);
      done();
    });
});

test("App renders without crashing", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});

describe("Test api calls to server", () => {
  test("Class component that fetches data from server", () => {});

  test("Display the player data you receive from the API", () => {});
});
