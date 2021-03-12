import ProductCategories from ".";
import { render } from "../../test/utils";

describe("Product categories", () => {
  it("Renders without crashing", () => {
    render(
      <ProductCategories
        {...{ categories: undefined, setCategories: () => null }}
      />
    );
  });
});
