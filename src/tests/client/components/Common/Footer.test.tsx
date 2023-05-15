import React from "react";
import { render } from "@testing-library/react";
import Footer from "../../../../components/Common/Footer";

describe("Footer", () => {
  test("renders the correct year and company name", () => {
    const { getByText } = render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(getByText(`${currentYear} © NextDevs`)).toBeInTheDocument();
  });

  test("has the correct class name for the footer", () => {
    const { container } = render(<Footer />);
    expect(container.firstChild).toHaveClass("py-2");
  });
});
