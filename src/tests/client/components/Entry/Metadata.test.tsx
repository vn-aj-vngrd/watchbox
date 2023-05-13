import { render, screen, act } from "@testing-library/react";
import Metadata from "../../../../components/Entry/Metadata";
import "@prisma/client";
import "../../../../env/client.mjs";
import fetchMock from "jest-fetch-mock";

jest.mock("../../../../utils/trpc", () => ({
    trpc: {
        useMutation: jest.fn().mockReturnValue({
            mutateAsync: jest.fn(),
        }),
    },
}));

describe("Metadata", () => {
    const metaDataProps = {
        entryId: "123",
        movieId: "123",
        review: "This is a review",
        note: "This is a note",
        rating: 5,
        toggleReview: false,
        setToggleReview: jest.fn(),
        toggleNote: false,
        setToggleNote: jest.fn(),
        updateEntryComponent: jest.fn(),
    }

    const mockMovie = {
        adult: false,
        backdrop_path: "/2YcGTyNijKiCk9LjJFkGYSxgMYr.jpg",
        belongs_to_collection: null,
        genres: [{ id: 18, name: "Drama" }],
        homepage: "",
        id: 337404,
        imdb_id: "tt10183406",
        original_language: "en",
        original_title: "Cruella",
        overview:
            "In 1970s London amidst the punk rock revolution, a young grifter named Estella is determined to make a name for herself with her designs. She befriends a pair of young thieves who appreciate her appetite for mischief, and together they are able to build a life for themselves on the London streets. One day, Estella’s flair for fashion catches the eye of the Baroness von Hellman, a fashion legend who is devastatingly chic and terrifyingly haute. But their relationship sets in motion a course of events and revelations that will cause Estella to embrace her wicked side and become the raucous, fashionable and revenge-bent Cruella.",
        popularity: 4955.465,
        poster_path: "/rTh4K5uw9HypmpGslcKd4QfHl93.jpg",
        release_date: "2021-05-26",
        runtime: 134,
        title: "Cruella",
        video: false,
        vote_average: 8.6,
        vote_count: 3123,
    };

    beforeEach(() => {
        fetchMock.doMock()
    })

    it("displays image for a movie", async () => {
        await act(async () => {
            fetchMock.mockResponse(JSON.stringify(mockMovie))
        })

        await act(() => render(<Metadata {...metaDataProps} />));

        expect(screen.getByAltText("Cruella")).toBeInTheDocument();
    });

    it("displays title for a movie", async () => {
        await act(async () => {
            fetchMock.mockResponse(JSON.stringify(mockMovie))
        })

        await act(() => render(<Metadata {...metaDataProps} />));

        expect(screen.getByRole("heading", { name: "Cruella" })).toBeInTheDocument();
    });

    it("displays genres for a movie", async () => {
        await act(async () => {
            fetchMock.mockResponse(JSON.stringify(mockMovie))
        })

        const { container } = await act(() => render(<Metadata {...metaDataProps} />));

        const pElement = container.querySelector('p.select-text');

        expect(pElement?.textContent).toContain('Drama');
    });

    it("displays running time for a movie", async () => {
        await act(async () => {
            fetchMock.mockResponse(JSON.stringify(mockMovie))
        })

        const { container } = await act(() => render(<Metadata {...metaDataProps} />));

        const pElement = container.querySelector('p.select-text');

        expect(pElement?.textContent).toContain('2h 14m');
    });

    it("displays year showing for a movie", async () => {
        await act(async () => {
            fetchMock.mockResponse(JSON.stringify(mockMovie))
        })
        
        const { container } = await act(() => render(<Metadata {...metaDataProps} />));

        const pElement = container.querySelector('p.select-text');

        expect(pElement?.textContent).toContain('2021');
    });
});