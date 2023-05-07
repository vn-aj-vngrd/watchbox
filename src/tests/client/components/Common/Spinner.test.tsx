import { render } from "@testing-library/react";
import Spinner from "../../../../components/Common/Spinner";

describe("Spinner component", () => {
  it("should render the spinner component", () => {
    const { getByRole } = render(<Spinner />);
    const spinnerElement = getByRole("status");
    expect(spinnerElement).toBeInTheDocument();
  });
});
