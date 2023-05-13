import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Welcome from "../../../../components/Auth/Welcome";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("next-auth/react", () => ({
  useSession: jest.fn().mockReturnValue({
    data: {
      user: {
        name: "John",
      },
    },
  }),
}));

jest.mock("../../../../utils/trpc", () => ({
  trpc: {
    useMutation: jest.fn().mockReturnValue({
      mutateAsync: jest.fn(),
    }),
  },
}));

describe("Welcome", () => {
  it("renders the welcome message with user's name", () => {
    render(<Welcome />);

    expect(screen.getByText("Welcome, John!")).toBeInTheDocument();
  });

  it("displays an error message if no username is entered", async () => {
    render(<Welcome />);

    const submitButton = screen.getByRole("button", { name: /get started/i });
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(screen.getByText("Enter a username to continue.")).toBeInTheDocument()
    );
  });

  it("displays an error message if the entered username is invalid", async () => {
    render(<Welcome />);

    const usernameInput = screen.getByPlaceholderText("Type your username here...");
    fireEvent.change(usernameInput, { target: { value: "invalid username" } });

    const submitButton = screen.getByRole("button", { name: /get started/i });
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(
        screen.getByText(
          "Username must be at least 5 characters long and contain only letters and numbers."
        )
      ).toBeInTheDocument()
    );
  });

  it("displays an error message if the entered username is invalid", async () => {
    render(<Welcome />);

    const usernameInput = screen.getByPlaceholderText("Type your username here...");
    fireEvent.change(usernameInput, { target: { value: "invalid username" } });

    const submitButton = screen.getByRole("button", { name: /get started/i });
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(
        screen.getByText(
          "Username must be at least 5 characters long and contain only letters and numbers."
        )
      ).toBeInTheDocument()
    );
  });
});