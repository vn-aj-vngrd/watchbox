import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Favorites from "../../../../components/Dashboard/Favorites";

jest.mock("../../../../utils/trpc", () => ({
  trpc: {
    useMutation: jest.fn().mockReturnValue({
      mutateAsync: jest.fn(),
    }),
    useQuery: jest.fn().mockReturnValue({
      data: [
        {
          id: "1",
          userId: "1",
          boxTitle: "My Favorite",
          isPublic: false,
          created_at: new Date(2022, 4, 1, 8, 0, 0),
          updated_at: new Date(2022, 4, 1, 8, 0, 0),
          components: [],
        }
      ],
    }),
  },
}));

describe("Favorites component", () => {
  test("should render the 'Boxes' and 'Favorites' buttons", () => {
    render(<Favorites setMode={jest.fn()} />);
    expect(screen.getByRole("button", { name: "Favorites" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Favorites" })).toBeInTheDocument();
  });

  test("should open and close the sort dropdown menu", () => {
    render(<Favorites setMode={jest.fn()} />);
    const sortButton = screen.getByRole("button", { name: "Sort" });
    fireEvent.click(sortButton);
    expect(screen.getByText("Newest")).toBeInTheDocument();
    fireEvent.click(sortButton);
    expect(screen.queryByText("Newest")).not.toBeInTheDocument();
  });
});
