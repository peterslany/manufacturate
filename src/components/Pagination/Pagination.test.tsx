import {
  fireEvent,
  getByText,
  queryByText,
  render,
} from "@testing-library/react";
import { useState } from "react";
import Pagination from ".";

describe("Pagination", () => {
  it("Renders without crashing", () => {
    render(
      <Pagination
        {...{ totalPages: 1, selectedPage: 1, onPageChange: () => null }}
      />
    );
  });

  it("Shows pages correctly", () => {
    const { container } = render(
      <Pagination
        {...{ totalPages: 7, selectedPage: 4, onPageChange: () => null }}
      />
    );
    expect(getByText(container, "1")).toBeInTheDocument();
    expect(getByText(container, "3")).toBeInTheDocument();
    expect(getByText(container, "4")).toBeInTheDocument();
    expect(getByText(container, "5")).toBeInTheDocument();
    expect(getByText(container, "7")).toBeInTheDocument();

    expect(queryByText(container, "2")).not.toBeInTheDocument();
    expect(queryByText(container, "6")).not.toBeInTheDocument();
  });

  it("onPageChange handler is called on page click", () => {
    const handlePageChange = jest.fn();
    const { container } = render(
      <Pagination
        {...{ totalPages: 5, selectedPage: 1, onPageChange: handlePageChange }}
      />
    );
    fireEvent.click(getByText(container, "2"));
    expect(handlePageChange).toBeCalledWith(2);

    fireEvent.click(getByText(container, "5"));
    expect(handlePageChange).toBeCalledWith(5);
  });

  it("Changes pages correctly, when selectedPage prop changes", () => {
    const WrappedPagination = () => {
      const [selected, setSelected] = useState(1);
      return (
        <Pagination
          {...{
            selectedPage: selected,
            totalPages: 7,
            onPageChange: setSelected,
          }}
        />
      );
    };
    const { container } = render(<WrappedPagination />);

    [3, 4, 5, 6].forEach((pageNumber) => {
      expect(queryByText(container, pageNumber)).not.toBeInTheDocument();
      fireEvent.click(getByText(container, pageNumber - 1));
      expect(queryByText(container, pageNumber)).toBeInTheDocument();
    });
  });
});
