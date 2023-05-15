import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../../../../components/Common/Header";
import router from "next/router";

const getISODateString = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toISOString().slice(0, 10);
};

jest.mock("next/router", () => ({
  push: jest.fn(),
}));

jest.mock("../../../../components/common/Search", () => {
  const MockSettings = () => <div data-testid="searchComponent" />;
  return MockSettings;
});

jest.mock("../../../../components/Account/AvatarDropdown", () => {
  const MockSettings = () => <div data-testid="avatarDropdownComponent" />;
  return MockSettings;
});

describe("Header component", () => {
  it("renders the logo and title", () => {
    render(<Header session={null} />);
    expect(screen.getByText("WatchBox")).toBeInTheDocument();
  });

  it("redirects to home page when logo is clicked", () => {
    render(<Header session={null} />);

    fireEvent.click(screen.getByText("WatchBox"));

    expect(router.push).toHaveBeenCalled();
  });

  it("renders the search input when session is available and user is not new", () => {
    const session = {
      user: {
        id: "1",
        isNewUser: false,
        username: "username",
      },
      expires: getISODateString(),
    };

    render(<Header session={session} />);

    const parentElement = screen.getByTestId("searchComponent").parentElement;

    if (parentElement) {
      expect(parentElement.classList.contains("hidden")).toBe(false);
    }
  });

  it("does not render the search input when session is not available", () => {
    render(<Header session={null} />);

    const parentElement = screen.getByTestId("searchComponent").parentElement;

    if (parentElement) {
      expect(parentElement.classList.contains("hidden")).toBe(true);
    }
  });

  it("renders the avatarDropdown when session is available", () => {
    const session = {
      user: {
        id: "1",
        isNewUser: true,
        username: "username",
      },
      expires: getISODateString(),
    };

    render(<Header session={session} />);

    expect(screen.getByTestId("searchComponent")).toBeInTheDocument();
  });

  it("does not render the search input when session is available but user is new", () => {
    const session = {
      user: {
        id: "1",
        isNewUser: true,
        username: "username",
      },
      expires: getISODateString(),
    };

    render(<Header session={session} />);

    jest.mock("../../../../components/common/Search", () => {
      const MockSettings = () => <div data-testid="searchComponent" />;
      return MockSettings;
    });

    const parentElement = screen.getByTestId("searchComponent").parentElement;

    if (parentElement) {
      expect(parentElement.classList.contains("hidden")).toBe(true);
    }
  });

  it("renders the home and avatar buttons when session is available", () => {
    const session = {
      user: {
        id: "1",
        isNewUser: true,
        username: "username",
      },
      expires: getISODateString(),
    };

    render(<Header session={session} />);
    expect(screen.getByText("WatchBox")).toBeInTheDocument();
    expect(screen.getByTestId("avatarDropdownComponent")).toBeInTheDocument();
  });

  it("does not render the home and avatar buttons when session is not available", () => {
    render(<Header session={null} />);

    const parentElement = screen.getByTestId("homeButton").parentElement;

    if (parentElement) {
      expect(parentElement.classList.contains("hidden")).toBe(true);
    }

    const avatarParentElement = screen.getByTestId("avatarDropdownComponent").parentElement;

    if (avatarParentElement) {
      expect(avatarParentElement.classList.contains("hidden")).toBe(true);
    }
  });
});
