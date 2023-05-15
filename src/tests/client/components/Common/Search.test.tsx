import { act, fireEvent, render, screen } from '@testing-library/react'
import Search from '../../../../components/Common/Search'
import { trpc } from '../../../../utils/trpc';

jest.mock("next/router", () => ({
    useRouter: () => ({
        router: {
            asPath: "testRoute"
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

describe('Search', () => {

    it('should render the search component with search input', async () => {
        render(<Search />)
        const searchInput = screen.getByPlaceholderText("Search WatchBox");
        expect(searchInput).toBeInTheDocument();
    })

    it("should call the trpc use mutations", async () => {
        render(<Search />);
        expect(trpc.useMutation).toHaveBeenCalledWith(["box.getGlobalBoxes"]);
        expect(trpc.useMutation).toHaveBeenCalledWith(["box.getGlobalBoxesCount"]);
    })

    it("should call the trpc mutate async of getGlobalBoxes when search field value changes", async () => {
        render(<Search />);
        const { mutateAsync } = trpc.useMutation(["box.getGlobalBoxes"]);

        const searchInput = screen.getByPlaceholderText("Search WatchBox");
        const searchValue = "New search value"

        act(() => {
            fireEvent.change(searchInput, { target: { value: searchValue } });
        })

        expect(mutateAsync).toHaveBeenCalledWith({
            searchInput: searchValue,
            take: 10,
        });
    })

    it("should call the trpc mutate async of getGlobalBoxesCount when search field value changes", async () => {
        render(<Search />);
        const { mutateAsync } = trpc.useMutation(["box.getGlobalBoxesCount"]);

        const searchInput = screen.getByPlaceholderText("Search WatchBox");
        const searchValue = "New search value"

        act(() => {
            fireEvent.change(searchInput, { target: { value: searchValue } });
        })

        expect(mutateAsync).toHaveBeenCalledWith({
            searchInput: searchValue,
        });
    })
})