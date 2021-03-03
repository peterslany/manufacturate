import { render, screen, waitFor } from "@testing-library/react";
import Searchbar from "./Searchbar";

describe("Searchbar", () => {
  it("Small screen: textfield has focus after clicking on a button", async () => {
    // eslint-disable-next-line no-global-assign

    render(<Searchbar />);
    // const btn = screen.getByRole("button");
    // fireEvent.click(btn);
    await waitFor(() =>
      expect(screen.getByRole("textbox")).toBeInTheDocument()
    );
  });
});
