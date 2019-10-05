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

describe("While Game is over", () => {
  // beforeEach(() => {});
  it("Game over button is rendered and disabled", () => {
    const endState = {
      homeInning: 10
    };
    const wrapper = setup(null, endState);
    const endBtn = findByTestAttr(wrapper, "component-game-over-btn");
    expect(endBtn.text()).toContain("GAME OVER!");
  });

  it("Game over text under button appears", () => {
    const endState = {
      homeInning: 10
    };
    const wrapper = setup(null, endState);
    const endText = findByTestAttr(wrapper, "component-winner");
    expect(endText.text()).toContain("GAME OVER!");
  });

  describe("If Guest Team wins", () => {
    it("Render Winner Guest Team", () => {
      const endState = {
        homeInning: 10,
        guestScore: 1,
        homeScore: 0
      };
      const wrapper = setup(null, endState);
      const guestWinner = findByTestAttr(wrapper, "component-winner");
      expect(guestWinner.text()).toContain("GUEST");
    });
  });

  describe("If Home Team wins", () => {
    it("Render Winner Home Team", () => {
      const endState = {
        homeInning: 10,
        guestScore: 0,
        homeScore: 1
      };
      const wrapper = setup(null, endState);
      const homeWinner = findByTestAttr(wrapper, "component-winner");
      expect(homeWinner.text()).toContain("HOME");
    });
  });

  describe("If Tie Game", () => {
    it("Render Tie Game Text", () => {
      const endState = {
        homeInning: 10,
        guestScore: 1,
        homeScore: 1
      };
      const wrapper = setup(null, endState);
      const tieGame = findByTestAttr(wrapper, "component-winner");
      expect(tieGame.text()).toContain("TIE");
    });
  });
});

describe("the useLocalStorage hook", () => {
  it("should make the api call to fetch the default value and set it in the state", async () => {
    const { darkMode, setValue } = renderHook(() => useDarkMode());
    // await setValue();
    expect(darkMode.current[0]).toEqual("darkMode");
  });
  it("should update the state when the setValue function is called", async () => {
    const { darkMode, setValue } = renderHook(() => useDarkMode());
    // await setValue();
    expect(darkMode.current[0]).toEqual("darkMode");
    act(() => {
      result.darkMode[1]("test-value-2");
    });
    expect(result.current[0]).toEqual("test-value-2");
  });
});
