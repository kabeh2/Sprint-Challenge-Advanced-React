import React from "react";
import App from "./App";

import axios from "axios";
import { shallow } from "enzyme";

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

// jest.mock("axios");
jest.mock("axios", () => {
  const examplePlayers = {
    data: [
      {
        name: "Test Name",
        country: "Test Country",
        searches: 1,
        id: 0
      },
      {
        name: "Name 2",
        country: "Country 2",
        searches: 2,
        id: 1
      }
    ]
  };

  return {
    get: jest.fn(() => Promise.resolve(examplePlayers))
  };
});

describe("App renders", () => {
  test("App renders without crashing", () => {
    const wrapper = setup();
    const appComponent = findByTestAttr(wrapper, "component-app");
    expect(appComponent.length).toBe(1);
  });
});

describe("Test api calls to server", () => {
  it("fetch articles on #componentDidMount fetchPlayers method", async done => {
    const app = setup();
    const getSpy = jest.spyOn(axios, "get");

    app
      .instance()
      // .componentDidMount()
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
          },
          {
            name: "Name 2",
            country: "Country 2",
            searches: 2,
            id: 1
          }
        ]);
        expect(app.find("ol").children().length).toBe(2);
        console.log(
          app
            .find("ol")
            .children()
            .debug()
        );
        expect(app.find("ol").find("li")).toBeTruthy();

        expect(getSpy).toBeCalled();
        getSpy.mockClear();
        done();
      });
  });

  test("Display the player data you receive from the API", () => {
    const wrapper = setup();
    const players = [
      {
        name: "Test Name",
        country: "Test Country",
        searches: 0,
        id: 1
      }
    ];
    wrapper.setState({ players });
    expect(wrapper.state()).toHaveProperty("players", [
      {
        name: "Test Name",
        country: "Test Country",
        searches: 0,
        id: 1
      }
    ]);
    let texts = wrapper
      .find('[data-test="component-players"]')
      .find('[data-test="component-player"]')
      .map(node => node.text());
    expect(texts).toEqual(["Test Name"]);
  });
});
