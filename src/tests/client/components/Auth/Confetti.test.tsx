import { render, screen } from "@testing-library/react";
import Confetti from "../../../../components/Auth/Confetti";

jest.mock("next/router", () => ({
  push: jest.fn(),
}));

describe("Confetti component", () => {
  it("renders without crashing", () => {
    render(<Confetti />);
    expect(screen.getByTestId("confetti")).toBeInTheDocument();
  });
});
