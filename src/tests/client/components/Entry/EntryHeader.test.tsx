import { render, fireEvent, act, screen } from "@testing-library/react";
import { trpc } from "../../../../utils/trpc";
import EntryHeader from "../../../../components/Entry/EntryHeader";
import { useRouter } from "next/router";

jest.mock("../../../../utils/trpc");

// Mock the useRouter hook
jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

const mockUpdateEntryComponent = jest.fn();

jest.mock("../../../../utils/trpc", () => ({
  trpc: {
    useQuery: jest.fn().mockReturnValue({
      push: jest.fn(),
    }),
    useMutation: jest.fn().mockReturnValue({
      mutateAsync: jest.fn(),
    }),
  },
}));

describe("EntryHeader", () => {
  it("renders correctly", async () => {
    await act(async () =>
      render(
        <EntryHeader
          boxId="123"
          id="12"
          title="This is a title"
          status={2}
          updateEntryComponent={mockUpdateEntryComponent}
        />,
      ),
    );

    expect(screen.getByText("This is a title")).toBeInTheDocument();
    expect(screen.getByText("On Hold")).toBeInTheDocument();
  });

  it("calls updateStatus on watch status change", async () => {
    await act(async () =>
      render(
        <EntryHeader
          boxId="123"
          id="12"
          title="This is a title"
          status={2}
          updateEntryComponent={mockUpdateEntryComponent}
        />,
      ),
    );

    act(() => {
      fireEvent.click(screen.getByTestId("dropdown-menu-button"));
    });

    act(() => {
      fireEvent.click(screen.getByText("Watching"));
    });

    expect(mockUpdateEntryComponent).toHaveBeenCalledWith({ status: 1 });
    expect(trpc.useMutation).toHaveBeenCalledWith("entry.updateStatus");
    const mockUpdateStatus = trpc.useMutation(["entry.updateStatus"]);
    expect(mockUpdateStatus.mutateAsync).toHaveBeenCalledWith({
      id: "12",
      status: 1,
    });
  });

  it("navigates back on back button click", async () => {
    await act(async () =>
      render(
        <EntryHeader
          boxId="123"
          id="12"
          title="This is a title"
          status={2}
          updateEntryComponent={mockUpdateEntryComponent}
        />,
      ),
    );

    fireEvent.click(screen.getByText("Back"));
    const router = useRouter();
    expect(router.push).toHaveBeenCalledWith("/box/123");
  });
});
