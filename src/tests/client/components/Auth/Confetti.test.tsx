import { render, screen } from "@testing-library/react";
import Confetti from "../../../../components/Auth/Confetti";

describe("Confetti component", () => {
  it("renders without crashing", () => {
    render(<Confetti />);
    expect(screen.getByTestId("confetti")).toBeInTheDocument();
  });
});