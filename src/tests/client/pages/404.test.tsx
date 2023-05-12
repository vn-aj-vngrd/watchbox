import { render, screen } from "@testing-library/react";
import Custom404 from "../../../pages/404";

describe("Custom404", () => {
  it("renders the correct title", () => {
    render(<Custom404 />);
    const title = screen.getByText("404");
    expect(title).toBeInTheDocument();
  });

  it("renders the correct page alert message", () => {
    render(<Custom404 />);
    const message = screen.getByText("Page not found");
    expect(message).toBeInTheDocument();
  });

  it("renders the 'Go back to home' button", () => {
    render(<Custom404 />);
    const button = screen.getByRole("button", { name: "Go back to home" });
    expect(button).toBeInTheDocument();
  });
});