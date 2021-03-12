import { fireEvent, getByRole, screen } from "@testing-library/react";
import { render } from "../../test/utils";
import Searchbar from "./Searchbar";

describe("Searchbar", () => {
  it("Redirects to /ratings after button click", async () => {
    const push = jest.fn();
    render(<Searchbar />, { router: { push } });

    const btn = screen.getByRole("button");

    fireEvent.click(btn);

    expect(push).toHaveBeenCalledWith(
      {
        pathname: "/ratings",
        query: {},
      },
      undefined,
      { scroll: true }
    );
  });

  it("Redirects with correct 'search' URL parameter", () => {
    const push = jest.fn();
    const { container } = render(<Searchbar />, { router: { push } });

    const searchQuery = "testing";

    const inputField = getByRole(container, "textbox");

    fireEvent.change(inputField, { target: { value: searchQuery } });

    fireEvent.click(getByRole(container, "button"));

    expect(push).toBeCalledWith(
      {
        pathname: "/ratings",
        query: { search: searchQuery },
      },
      undefined,
      { scroll: true }
    );
  });
});
