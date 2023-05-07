import { render, screen, fireEvent } from "@testing-library/react";
import { trpc } from "../../../../utils/trpc";
import Search from "../../../../components/Common/Search";

// Mock trpc
jest.mock("../../../../utils/trpc");
const mockedTrpc = trpc as jest.Mocked<typeof trpc>;

// Mock API calls
const mockedGetGlobalBoxes = mockedTrpc.useMutation(["box.getGlobalBoxes"]);
const mockedGetGlobalBoxesCount = mockedTrpc.useMutation(["box.getGlobalBoxesCount"]);

describe("Search", () => {
    it("renders search input", () => {
        render(<Search />);
        const searchInput = screen.getByPlaceholderText("Search WatchBox");
        expect(searchInput).toBeInTheDocument();
    });

    it("displays search results on input change", async () => {
        render(<Search />);
        const searchInput = screen.getByPlaceholderText("Search WatchBox");
        fireEvent.change(searchInput, { target: { value: "test" } });
        expect(mockedGetGlobalBoxes.mutateAsync).toHaveBeenCalledWith({
            searchInput: "test",
            take: 10,
        });
        expect(mockedGetGlobalBoxesCount.mutateAsync).toHaveBeenCalledWith({
            searchInput: "test",
        });
        await screen.findByText("image1.jpg");
    });

    it("navigates to box page on search result click", async () => {
        render(<Search />);
        const searchInput = screen.getByPlaceholderText("Search WatchBox");
        fireEvent.change(searchInput, { target: { value: "test" } });
        await screen.findByText("image1.jpg");
        const searchResult = screen.getByText("image1.jpg");
        fireEvent.click(searchResult);
        expect(window.location.pathname).toEqual("/box/1");
    });
});
