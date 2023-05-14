import { render, fireEvent, screen, waitFor, act } from "@testing-library/react";
import Note from "../../../../components/Entry/Notes";

jest.mock("../../../../utils/trpc");
jest.mock("react-hook-form");

const mockUpdateEntryComponent = jest.fn();

const NoteProps = {
    entryId: "123",
    note: "This is a note",
    updateEntryComponent: mockUpdateEntryComponent
};

jest.mock("react-hook-form", () => ({
    useForm: jest.fn().mockReturnValue({
        handleSubmit: jest.fn(),
        register: jest.fn(),
        reset: jest.fn()
    })
}))

jest.mock("../../../../utils/trpc", () => ({
    trpc: {
        useQuery: jest.fn().mockReturnValue({
            push: jest.fn()
        }),
        useMutation: jest.fn().mockReturnValue({
            mutateAsync: jest.fn(),
        }),
    }
}))

describe("Note component", () => {

    it("should render", async () => {
        await act(async () => render(<Note {...NoteProps} />));

        const noteTextarea = screen.getByPlaceholderText("Write a note...");

        expect(noteTextarea).toBeInTheDocument();
    });

    it("should update the note value when typing in the textarea", async () => {
        await act(async () => render(<Note {...NoteProps} />));

        const noteTextarea = screen.getByPlaceholderText("Write a note...");

        act(() => {
            fireEvent.change(noteTextarea, { target: { value: "New note value" } });
        })

        await waitFor(() => expect(noteTextarea).toHaveValue("New note value"));
    });

});