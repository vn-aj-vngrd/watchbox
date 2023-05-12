import { render, screen } from "@testing-library/react";
import Home from "../../../pages/index";
import React from 'react';

jest.mock("next-auth/react", () => ({
  useSession: () => ({ data: { user: { isNewUser: false } } }),
}));

describe("Home page", () => {
  it("should render boxes component when mode is 'boxes'", () => {
    render(<Home />);

    const boxesComponent = screen.getByTestId("boxes-component");
    expect(boxesComponent).toBeInTheDocument();
  });

  it("should render favorites component when mode is 'favorites'", () => {
    jest.spyOn(React, "useState").mockImplementation(() => ["favorites", jest.fn()]);

    render(<Home />);

    const favoritesComponent = screen.getByTestId("favorites-component");
    expect(favoritesComponent).toBeInTheDocument();
  });
});
