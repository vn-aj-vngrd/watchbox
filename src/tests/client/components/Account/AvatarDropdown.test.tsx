import { render, screen, fireEvent, act } from "@testing-library/react";
import AvatarDropdown from "../../../../components/Account/AvatarDropdown";
import router from "next/router";

jest.mock("next/router", () => ({
  push: jest.fn(),
}));

describe("AvatarDropdown", () => {
  const session = {
    user: {
      id: "123",
      username: "horebgwapo404",
      email: "test@example.com",
      image: "/../../../public/tumaponnikolai.jpg",
      name: "Test User",
      isNewUser: true,
    },
    expires: "2d",
  };

  test("displays user email address", async () => {
    render(<AvatarDropdown session={session} />);
    const menuButton = screen.getByRole("button");

    await act(async () => {
      fireEvent.click(menuButton);
    });

    const emailElement = screen.getByText(session.user.email);

    expect(emailElement).toBeInTheDocument();
  });

  test("opens menu when button is clicked", async () => {
    render(<AvatarDropdown session={session} />);
    const buttonElement = screen.getByRole("button");

    await act(async () => {
      fireEvent.click(buttonElement);
    });

    const menuElement = screen.getByRole("menu");
    expect(menuElement).toBeInTheDocument();
  });

  test("redirects to account page when account settings button is clicked", async () => {
    render(<AvatarDropdown session={session} />);
    const menuButton = screen.getByRole("button");

    await act(async () => {
      fireEvent.click(menuButton);
    });
    const accountSettingsButton = screen.getByText("Account Settings");

    await act(async () => {
      fireEvent.click(accountSettingsButton);
    });
    expect(router.push).toHaveBeenCalledWith("/account");
  });
});
