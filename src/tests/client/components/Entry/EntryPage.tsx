import { render, screen } from "@testing-library/react";
import EntryPage from "../../../../components/Entry/EntryPage";

jest.mock("next/router", () => ({
    useRouter: () => ({
        query: { id: "entry-id" },
    }),
}));

jest.mock("../../../../utils/trpc", () => ({
    trpc: {
        useQuery: jest.fn().mockReturnValue({
            isLoading: false,
            isError: false,
            isSuccess: true,
            data: {
                entry: {
                    id: "entry-id",
                    boxId: "box-id",
                    title: "Test Entry",
                    status: "watched",
                    review: "Test review",
                    note: "Test note",
                    rating: 5,
                    movieId: "movie-id",
                },
            },
        }),
        useMutation: jest.fn().mockReturnValue({
            mutateAsync: jest.fn(),
        }),
    },
}));

describe("EntryPage", () => {
    it("renders without crashing", () => {
        render(<EntryPage />);
        expect(screen.getByTestId("entry-page")).toBeInTheDocument();
    });

    it("shows a spinner while loading entry data", () => {
        jest.mock("../../../../utils/trpc", () => ({
            trpc: {
                useQuery: jest.fn().mockReturnValue({
                    isLoading: true,
                    isError: false,
                    isSuccess: false,
                    data: undefined,
                }),
            },
        }));

        render(<EntryPage />);
        expect(screen.getByTestId("spinner")).toBeInTheDocument();
    });

    it("shows a 404 page alert if entry data is not found", () => {
        jest.mock("../../../../utils/trpc", () => ({
            trpc: {
                useQuery: jest.fn().mockReturnValue({
                    isLoading: false,
                    isError: false,
                    isSuccess: true,
                    data: undefined,
                }),
            },
        }));

        render(<EntryPage />);
        expect(screen.getByText("404")).toBeInTheDocument();
        expect(screen.getByText("Page not found")).toBeInTheDocument();
        expect(screen.getByText("The page you are looking for does not exist.")).toBeInTheDocument();
        expect(screen.getByText("Please check the URL and try again.")).toBeInTheDocument();
        expect(screen.getByText("Go back to home")).toBeInTheDocument();
    });

    it("shows a 'Something went wrong' page alert if there is an error loading the entry data", () => {
        jest.mock("../../../../utils/trpc", () => ({
            trpc: {
                useQuery: jest.fn().mockReturnValue({
                    isLoading: false,
                    isError: true,
                    isSuccess: false,
                    data: undefined,
                }),
            },
        }));

        render(<EntryPage />);
        expect(screen.getByText("Something went wrong")).toBeInTheDocument();
        expect(screen.getByText("There's a problem on our side. Please try again.")).toBeInTheDocument();
        expect(screen.getByText("Go back to home")).toBeInTheDocument();
    });
})