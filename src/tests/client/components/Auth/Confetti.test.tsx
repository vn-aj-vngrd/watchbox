import { render, screen } from "@testing-library/react";
import Confetti from "../../../../components/Auth/Confetti";
import ResizeObserver from "resize-observer-polyfill";

window.ResizeObserver = ResizeObserver;

jest.mock("next/router", () => ({
    push: jest.fn(),
}));

describe("Confetti component", () => {
  it("renders without crashing", () => {
    render(<Confetti />);
    expect(screen.getByTestId("confetti")).toBeInTheDocument();
  });
});