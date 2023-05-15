import { act, render, screen } from "@testing-library/react";
import EntryPage from "../../../../components/Entry/EntryPage";

jest.mock("next/router", () => ({
  useRouter: () => ({
    query: { id: "123" },
  }),
}));

jest.mock("../../../../components/Entry/EntryHeader", () => {
  const MockEntryHeader = () => <div data-testid="entry-header" />;
  return MockEntryHeader;
});

jest.mock("../../../../components/Entry/Metadata", () => {
  const MockMetadata = () => <div data-testid="metadata" />;
  return MockMetadata;
});

jest.mock("../../../../utils/trpc", () => ({
  trpc: {
    useQuery: jest.fn().mockReturnValue({
      isLoading: false,
      isError: false,
      isSuccess: true,
      data: {
        include: { entry: true },
        entry: {
          include: { entry: true },
          entry: {
            id: "123",
            componentId: "123",
            movieId: "123",
            image: "",
            title: "This is a title",
            note: "This is a note",
            review: "This is a review",
            status: 1,
            rating: 4,
            created_at: new Date(),
            updated_at: new Date(),
          },
        },
      },
    }),
  },
}));

describe("EntryPage", () => {
  it("renders without crashing", async () => {
    await act(() => render(<EntryPage />));
    expect(screen.getByTestId("entry-page")).toBeInTheDocument();
  });

  it("renders entry header component", async () => {
    await act(() => render(<EntryPage />));
    expect(screen.getByTestId("entry-header")).toBeInTheDocument();
  });

  it("renders entry header component", async () => {
    await act(() => render(<EntryPage />));
    expect(screen.getByTestId("entry-header")).toBeInTheDocument();
  });
});
