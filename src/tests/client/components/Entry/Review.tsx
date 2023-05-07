import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Review from "../../../../components/Entry/Review";
import React from "react";

describe("Review component", () => {
    const entryId = "123";
    const reviewText = "This is my review.";
    const updateEntryComponent = jest.fn();

    // it("renders a textarea with the given review text", async () => {

    //     render(<Review
    //         entryId={entryId}
    //         review={reviewText}
    //         updateEntryComponent={updateEntryComponent}
    //     />
    //     );

    //     const textarea = screen.getByRole("textbox");
    //     expect(textarea).toHaveValue(reviewText);
    // });

    it("calls the updateEntryComponent and updateReview functions when the review text is changed", async () => {
        const mutateAsync = jest.fn(() => Promise.resolve());

        jest.mock("../../../../utils/trpc", () => ({
            trpc: {
                useMutation: jest.fn().mockImplementation(() => {
                    const mutateAsync = jest.fn();
                    return { mutateAsync };
                })
            }
        }));

        render(<Review
            entryId={"1"}
            review={reviewText}
            updateEntryComponent={updateEntryComponent}
        />
        );

        const textarea = screen.getByRole("textbox");

        // Change the review text
        fireEvent.change(textarea, { target: { value: '23' } })
        // userEvent.type(textarea, "New review text");

        // Wait for the debounce timer to expire
        await waitFor(() => expect(mutateAsync).toHaveBeenCalledTimes(1));

        // Expect that the update functions were called with the correct arguments
        expect(updateEntryComponent).toHaveBeenCalledWith({
            review: "New review text",
        });
        expect(mutateAsync).toHaveBeenCalledWith({
            id: entryId,
            review: "New review text",
        });
    });
});
