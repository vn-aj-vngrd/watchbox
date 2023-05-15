import { render, fireEvent, waitFor, act, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { trpc } from "../../../../utils/trpc";
import Review from "../../../../components/Entry/Review";

jest.mock("react-hook-form");

jest.mock("../../../../utils/trpc", () => ({
  trpc: {
    useMutation: jest.fn().mockReturnValue({
      mutateAsync: jest.fn(),
    }),
  },
}));

jest.mock("react-hook-form", () => ({
  useForm: jest.fn().mockReturnValue({
    handleSubmit: jest.fn(),
    register: jest.fn(),
    reset: jest.fn(),
  }),
}));

describe("Review", () => {
  const mockUpdateEntryComponent = jest.fn();
  const mockReview = "Lorem ipsum dolor sit amet";
  const mockEntryId = "123";

  const mockProps = {
    entryId: mockEntryId,
    review: mockReview,
    updateEntryComponent: mockUpdateEntryComponent,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call useMutation on component render", async () => {
    await act(() => render(<Review {...mockProps} />));

    expect(trpc.useMutation).toHaveBeenCalled();
  });

  it("should render the component", async () => {
    const { getByPlaceholderText } = render(<Review {...mockProps} />);

    expect(getByPlaceholderText("Write a review...")).toBeInTheDocument();
  });

  it("should call the updateEntryComponent function on blur", async () => {
    render(<Review {...mockProps} />);

    const input = screen.getByPlaceholderText("Write a review...");

    fireEvent.focus(input);

    act(() => {
      fireEvent.change(input, { target: { value: "New review value" } });
    });

    fireEvent.blur(input);

    await waitFor(() => {
      expect(useForm().handleSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
