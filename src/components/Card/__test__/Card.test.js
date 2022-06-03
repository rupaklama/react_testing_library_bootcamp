import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Card from "../Card";

/* declaring default props outside here as we might want to pass different props */
const defaultProps = {
  name: "Tinku",
  phone: "111-111-1111",
  email: "pak@hotmail.com",
  image: {
    url: "https://images.unsplash.com/photo-1618826411640-d6df44dd3f7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    alt: "cute cat",
  },
  favoured: false,
};

describe("Card", () => {
  test("should show name of cat", () => {
    render(<Card {...defaultProps} />);

    // screen.debug();
    expect(screen.getByRole("heading", { name: /tinku/i })).toBeInTheDocument();
  });

  test("should show contact number", () => {
    // NOTE - overriding default name prop with new prop, this is the way to do it
    // render(<Card {...defaultProps} name="different prop" />);
    render(<Card {...defaultProps} />);
    expect(screen.getByText(/111-111-1111/i)).toBeInTheDocument();
  });

  test("should show an email", () => {
    render(<Card {...defaultProps} />);
    expect(screen.getByText(/pak@hotmail.com/i)).toBeInTheDocument();
  });

  test("should display an image", () => {
    render(<Card {...defaultProps} />);
    // img url
    expect(screen.getByAltText(/cute cat/i).src).toBe(defaultProps.image.url);
  });

  test("should show outlined heart", () => {
    render(<Card {...defaultProps} />);
    expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument();
  });

  test("should show filled heart", () => {
    render(<Card {...defaultProps} favoured={true} />);
    expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument();
  });

  test("should toggle heart status", () => {
    render(<Card {...defaultProps} />);

    userEvent.click(screen.getByRole("button"));
    expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument();

    userEvent.click(screen.getByRole("button"));
    expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument();
  });
});
