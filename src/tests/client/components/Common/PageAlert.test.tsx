import { render, screen } from "@testing-library/react";
import PageAlert from "../../../../components/Common/PageAlert";

describe("PageAlert", () => {
  test("renders the default welcome message when no title prop is passed", () => {
    render(<PageAlert />);
    const welcomeMessage = screen.getByText(/welcome to watchbox!/i);
    expect(welcomeMessage).toBeInTheDocument();
  });

  test("renders the provided title prop", () => {
    const title = "Custom Title";
    render(<PageAlert title={title} />);
    const customTitle = screen.getByText(title);
    expect(customTitle).toBeInTheDocument();
  });

  test("renders the provided description prop", () => {
    const description = ["Line 1", "Line 2"];
    render(<PageAlert description={description} />);
    const line1 = screen.getByText("Line 1");
    const line2 = screen.getByText("Line 1");
    expect(line1).toBeInTheDocument();
    expect(line2).toBeInTheDocument();
  });

  test("does not render the button when btnTitle prop is not provided", () => {
    render(<PageAlert />);
    const button = screen.queryByRole("button");
    expect(button).not.toBeInTheDocument();
  });
});
