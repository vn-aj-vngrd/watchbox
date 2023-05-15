import { render, screen, act, fireEvent } from "@testing-library/react";
import Information from "../../../../components/Box/Information";

describe("Information component", () => {
  const box = {
    id: "1",
    name: "testuser",
    username: "testuser",
    email: null,
    emailVerified: null,
    image: null,
    isNewUser: false,
    created_at: new Date(2022, 4, 1, 8, 0, 0),
    updated_at: new Date(2022, 4, 1, 8, 0, 0),
    boxes: [
      {
        id: "1",
        userId: "1",
        boxTitle: "My Box",
        isPublic: false,
        created_at: new Date(2022, 4, 1, 8, 0, 0),
        updated_at: new Date(2022, 4, 1, 8, 0, 0),
      },
    ],
  };

  it("displays the owner's username", async () => {
    render(<Information box={box} />);

    const menuButton = screen.getByRole("button");
    await act(async () => {
      fireEvent.click(menuButton);
    });

    expect(screen.getByText(/Owner:/).nextSibling).toHaveTextContent("testuser");
  });

  it("displays the box's creation time", async () => {
    render(<Information box={box} />);

    const menuButton = screen.getByRole("button");
    await act(async () => {
      fireEvent.click(menuButton);
    });

    expect(screen.getByText(/Created at:/).nextSibling).toHaveTextContent(
      "May 1st 2022, 8:00:00 am",
    );
  });

  it("displays the box's update time", async () => {
    render(<Information box={box} />);

    const menuButton = screen.getByRole("button");
    await act(async () => {
      fireEvent.click(menuButton);
    });

    expect(screen.getByText(/Updated at:/).nextSibling).toHaveTextContent(
      "May 1st 2022, 8:00:00 am",
    );
  });
});
