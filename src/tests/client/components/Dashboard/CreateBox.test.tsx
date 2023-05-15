import { render, screen, fireEvent, act } from "@testing-library/react";
import CreateBox from "../../../../components/Dashboard/CreateBox";
import { useForm } from "react-hook-form";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("../../../../utils/trpc", () => ({
  trpc: {
    useMutation: jest.fn().mockReturnValue({
      mutateAsync: jest.fn(),
    }),
    isLoading: false,
  },
}));

jest.mock("react-hook-form", () => ({
  useForm: jest.fn().mockReturnValue({
    handleSubmit: jest.fn(),
    register: jest.fn(),
    reset: jest.fn(),
    formState: {
      errors: jest.fn(),
    },
  }),
}));

describe("CreateBox component", () => {
  const mockProps = {
    onBoxCreated: jest.fn(),
    isFirstBox: true,
  };

  test("should render create box button", () => {
    render(<CreateBox {...mockProps} />);
    const buttonElement = screen.getByRole("button", {
      name: /create your first box/i,
    });
    expect(buttonElement).toBeInTheDocument();
  });

  test("should open dialog on button click", async () => {
    render(<CreateBox {...mockProps} />);
    const buttonElement = screen.getByRole("button", {
      name: /create your first box/i,
    });
    fireEvent.click(buttonElement);
    const dialogElement = await screen.findByRole("dialog");
    expect(dialogElement).toBeInTheDocument();
  });

  test("should submit form on create box button click", async () => {
    const onBoxCreated = jest.fn();

    render(<CreateBox onBoxCreated={onBoxCreated} isFirstBox={true} />);

    const buttonElement = screen.getByRole("button", {
      name: /create your first box/i,
    });

    await act(async () => {
      fireEvent.click(buttonElement);
    });

    const titleInputElement = screen.getByTestId("title");

    await act(async () => {
      fireEvent.change(titleInputElement, { target: { value: "Test Box" } });
    });

    const submitButtonElement = screen.getByTestId("create-button");

    await act(async () => {
      fireEvent.submit(submitButtonElement);
    });

    expect(useForm().handleSubmit).toHaveBeenCalled();
  });
});
