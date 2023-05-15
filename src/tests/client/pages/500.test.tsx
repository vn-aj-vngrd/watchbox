import { render, screen } from "@testing-library/react";
import Custom500 from "../../../pages/500";

describe("Custom500", () => {
  it("should render the 500 error message", () => {
    render(<Custom500 />);
    const errorMessage = screen.getByText(/500/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it("should render the title", () => {
    render(<Custom500 />);
    const title = screen.getByText(/server-side error/i);
    expect(title).toBeInTheDocument();
  });

  it("should render the description", () => {
    render(<Custom500 />);
    const description = screen.getByText(/something went wrong on our end/i);
    expect(description).toBeInTheDocument();
    const description2 = screen.getByText(/please try again later/i);
    expect(description2).toBeInTheDocument();
  });

  it("should render the go back button", () => {
    render(<Custom500 />);
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent(/go back to home/i);
  });
});
