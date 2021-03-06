import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { rest } from "msw";
import { setupServer } from "msw/node";

import Pets from "../Pets";
import catsMock from "../../../mocks/cats.json";

/* mock server */
const server = setupServer(
  // NOTE: This Handlers functions determine what will return for any particular url/route - response object
  rest.get("http://localhost:4000/cats", (req, res, ctx) => {
    // Response Resolver function is to specify a Mocked Response
    // Response resolver is a function with (request, response, context) args
    // ctx, a group of functions that help to set a status code, headers, body, etc. of the mocked response
    return res(ctx.status(200), ctx.json(catsMock));
  })

  // rest.post('http://localhost:3030/order', (req, res, ctx) => {
  //   return res(ctx.json({ orderNumber: 123455676 }));
  // })
);

// listen to our server once before all of our tests
beforeAll(() => server.listen());

// reset handlers after each test
afterEach(() => server.restoreHandlers());

// closer server after all tests run
afterAll(() => server.close());

describe("Pets", () => {
  test("should render the correct amount of cards", async () => {
    render(<Pets />);

    const cards = await screen.findAllByRole("article");
    expect(cards.length).toBe(5);
  });

  // Conducting Integration Testing here since this is the Root Component
  describe("Pets integration test", () => {
    test("should filter for male cats", async () => {
      render(<Pets />);

      const cards = await screen.findAllByRole("article");
      // console.log(cards);

      // selecting male option
      userEvent.selectOptions(screen.getByLabelText(/gender/i), "male");

      const maleCards = screen.getAllByRole("article");

      // toStrictEqual - to compare array of object over an array
      expect(maleCards).toStrictEqual([cards[1], cards[3]]);
    });

    test("should filter for female cats", async () => {
      render(<Pets />);

      const cards = await screen.findAllByRole("article");

      // selecting male option
      userEvent.selectOptions(screen.getByLabelText(/gender/i), "female");

      const femaleCards = screen.getAllByRole("article");

      // toStrictEqual - to compare array of object over an array
      expect(femaleCards).toStrictEqual([cards[0], cards[2], cards[4]]);
    });

    test("should filter for Liked cats", async () => {
      render(<Pets />);

      const cards = await screen.findAllByRole("article");

      // note - withing() is to find an element within an element, Querying Within Elements
      // first button
      const btnForFirstCard = within(cards[0]).getByRole("button");
      userEvent.click(btnForFirstCard);

      // fourth button
      const btnForFourthCard = within(cards[3]).getByRole("button");
      userEvent.click(btnForFourthCard);

      // selecting liked option
      userEvent.selectOptions(screen.getByLabelText(/favorite/i), "liked");

      expect(await screen.findAllByRole("article")).toEqual([cards[0], cards[3]]);
    });

    test("should filter for Disliked cats", async () => {
      render(<Pets />);

      const cards = await screen.findAllByRole("article");

      const btnForFirstCard = within(cards[0]).getByRole("button");
      userEvent.click(btnForFirstCard);

      const btnForFourthCard = within(cards[3]).getByRole("button");
      userEvent.click(btnForFourthCard);

      userEvent.selectOptions(screen.getByLabelText(/favorite/i), "disliked");

      expect(await screen.findAllByRole("article")).toEqual([cards[1], cards[2], cards[4]]);
    });
  });
});
