import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { trpc } from "../../../../utils/trpc";
import Welcome from "../../../../components/Auth/Welcome";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("../../../../utils/trpc", () => ({
  trpc: {
    useMutation: jest.fn(),
  },
}));

describe("Welcome", () => {
  const routerPushMock = jest.fn();
  const useSessionMock = useSession as jest.MockedFunction<typeof useSession>;
  const getStartedMutationMock = jest.fn();
  const resetMock = jest.fn();

  beforeEach(() => {
    useRouter.mockReturnValue({
      push: routerPushMock,
    });

    useSessionMock.mockReturnValue({
      data: {
        user: {
          name: "John Doe",
        },
      },
    });

    trpc.useMutation = jest.fn(() => ({
      mutateAsync: getStartedMutationMock,
      isLoading: false,
      error: null,
    }));

    resetMock.mockReset();
  });

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
      expect(screen.getByText("Username must be at least 5 characters long and contain only letters and numbers.")).toBeInTheDocument()
    );
  });

  it("calls getStarted mutation with the entered username", async () => {
    render(<Welcome />);

    const usernameInput = screen.getByPlaceholderText("Type your username here...");
    fireEvent.change(usernameInput, { target: { value: "validusername123" } });

    const submitButton = screen.getByRole("button", { name: /get started/i });
    fireEvent.click(submitButton);

    await waitFor(() => expect(getStartedMutationMock).toHaveBeenCalledTimes(1));
    expect(getStartedMutationMock).toHaveBeenCalledWith({ username: "validusername123" });
  });

  it("navigates to home page on successful submission", async () => {
    trpc.useMutation = jest.fn(() => ({
      mutateAsync: () => Promise.resolve(),
      isLoading: false,
      error: null,
    }));

    render(<Welcome />);

    const usernameInput = screen.getByPlaceholderText("Type your username here...");
    fireEvent.change(usernameInput, { target: { value: "validusername123" } });

    const submitButton = screen.getByRole("button", { name: /get started/i });
    fireEvent.click(submitButton);

    await waitFor(() => expect(routerPushMock).toHaveBeenCalledTimes(1));
    expect(routerPushMock).toHaveBeenCalledWith("/");
  });

  it("resets the form on mount", () => {
    render(<Welcome />);

    expect(resetMock).toHaveBeenCalledTimes(1);
  });
});