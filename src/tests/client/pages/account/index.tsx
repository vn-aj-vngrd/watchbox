import { render, screen } from "@testing-library/react";
import Index from "../../../../pages/account/index";

describe("Settings page", () => {
  test('renders correct title', () => {
    render(<Index />);
    const titleElement = screen.getByTitle("Account Settings | WatchBox");
    expect(titleElement).toBeInTheDocument();
  });
});