import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";

describe("App component", () => {
  test("inputs should be initially empty", () => {
    // 1 - Rendering the component we want to test
    render(<App />);

    // 2 - Finding the elements
    const emailInputElement = screen.getByRole("textbox", { name: /email address/i });
    const passwordInputElement = screen.getByLabelText("Password");
    const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i);

    // 3 - Assertions with matcher
    expect(emailInputElement.value).toBe("");
    expect(passwordInputElement.value).toBe("");
    expect(confirmPasswordInputElement.value).toBe("");
  });

  // tests to verify that we able to type text in the input fields
  test("should be able to type an email", () => {
    render(<App />);
    const emailInputElement = screen.getByRole("textbox", { name: /email address/i });
    userEvent.type(emailInputElement, "selena@gmail.com");
    expect(emailInputElement.value).toBe("selena@gmail.com");
  });

  test("should be able to type a password", () => {
    render(<App />);
    const passwordInputElement = screen.getByLabelText("Password");
    userEvent.type(passwordInputElement, "pass123");
    expect(passwordInputElement.value).toBe("pass123");
  });

  test("should be able to type a confirm password", () => {
    render(<App />);
    const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i);
    userEvent.type(confirmPasswordInputElement, "pass123");
    expect(confirmPasswordInputElement.value).toBe("pass123");
  });

  test("should show email error message on invalid email", () => {
    render(<App />);

    const emailInputElement = screen.getByRole("textbox", { name: /email address/i });
    userEvent.type(emailInputElement, "selenagmail.com");

    const submitBtnElement = screen.getByRole("button", { name: /submit/i });
    userEvent.click(submitBtnElement);

    const emailErrorElement = screen.queryByText(/the email you input is invalid/i);
    expect(emailErrorElement).toBeInTheDocument();
  });

  test("should show password error if password is less than 5 characters", () => {
    render(<App />);

    const emailInputElement = screen.getByRole("textbox", { name: /email address/i });
    userEvent.type(emailInputElement, "selena@gmail.com");

    const passwordInputElement = screen.getByLabelText("Password");
    userEvent.type(passwordInputElement, "123");

    const submitBtnElement = screen.getByRole("button", { name: /submit/i });
    userEvent.click(submitBtnElement);

    const passwordErrorElement = screen.queryByText(
      /the password you entered should contain 5 or more characters/i
    );
    expect(passwordErrorElement).toBeInTheDocument();
  });

  test("should show confirm password error if passwords don't match", () => {
    render(<App />);

    const emailInputElement = screen.getByRole("textbox", { name: /email address/i });
    userEvent.type(emailInputElement, "selena@gmail.com");

    const passwordInputElement = screen.getByLabelText("Password");
    userEvent.type(passwordInputElement, "12345");

    const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i);
    userEvent.type(confirmPasswordInputElement, "pass");

    const submitBtnElement = screen.getByRole("button", { name: /submit/i });
    userEvent.click(submitBtnElement);

    const passwordConfirmErrorElement = screen.queryByText(/the passwords don't match. try again/i);
    expect(passwordConfirmErrorElement).toBeInTheDocument();
  });

  /* testing the happy path */
  // test("should show no error message if every input is valid", () => {
  //   render(<App />);

  //   const emailInputElement = screen.getByRole("textbox", { name: /email address/i });
  //   userEvent.type(emailInputElement, "selena@gmail.com");

  //   const passwordInputElement = screen.getByLabelText("Password");
  //   userEvent.type(passwordInputElement, "12345");

  //   const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i);
  //   userEvent.type(confirmPasswordInputElement, "12345");

  //   const submitBtnElement = screen.getByRole("button", { name: /submit/i });
  //   userEvent.click(submitBtnElement);

  //   const emailErrorElement = screen.queryByText(/the email you input is invalid/i);
  //   expect(emailErrorElement).not.toBeInTheDocument();

  //   const passwordErrorElement = screen.queryByText(
  //     /the password you entered should contain 5 or more characters/i
  //   );
  //   expect(passwordErrorElement).not.toBeInTheDocument();

  //   const passwordConfirmErrorElement = screen.queryByText(/the passwords don't match. try again/i);
  //   expect(passwordConfirmErrorElement).not.toBeInTheDocument();
  // });
});
