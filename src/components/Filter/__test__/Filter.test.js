import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Filter from "../Filter";

describe("Filter", () => {
  test("should be able to change default option value of Favorite Select", () => {
    render(<Filter />);

    const select = screen.getByLabelText(/favorite/i);
    expect(select.value).toBe("any");

    userEvent.selectOptions(select, "liked");
    expect(select.value).toBe("liked");

    userEvent.selectOptions(select, "disliked");
    expect(select.value).toBe("disliked");
  });

  test("should be able to change default option value of Gender Select", () => {
    render(<Filter />);

    const select = screen.getByLabelText(/gender/i);
    expect(select.value).toBe("any");

    userEvent.selectOptions(select, "male");
    expect(select.value).toBe("male");

    userEvent.selectOptions(select, "female");
    expect(select.value).toBe("female");
  });
});
