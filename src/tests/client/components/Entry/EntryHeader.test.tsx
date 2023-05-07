import { render, screen, fireEvent } from "@testing-library/react";
import EntryHeader from "../../../../components/Entry/EntryHeader";
import { trpc } from "../../../../utils/trpc";

jest.mock("../../../../utils/trpc");
const mockedTrpc = trpc as jest.Mocked<typeof trpc>;
const mockedUpdateStatus = mockedTrpc.useMutation("entry.updateStatus");

describe("EntryHeader", () => {

    // Mock trpc

    const mockProps = {
        boxId: "1",
        id: "2",
        title: "Entry Title",
        status: 0,
        updateEntryComponent: jest.fn(),
    };

    it("should render properly", async () => {
        render(<EntryHeader {...mockProps} />);
        const backButton = screen.getByText("Back");
        const entryTitle = screen.getByText("Entry Title");
        const watchStatusButton = screen.getByText("Planned");

        expect(backButton).toBeInTheDocument();
        expect(entryTitle).toBeInTheDocument();
        expect(watchStatusButton).toBeInTheDocument();
    });

    it("should call updateEntryComponent and updateStatus on click of a watch status button", async () => {
        const { container } = render(<EntryHeader {...mockProps} />);
        const watchStatusButton = screen.getByText("Planned");

        fireEvent.click(watchStatusButton);

        const watchingStatusButton = await screen.findByText("Watching");

        fireEvent.click(watchingStatusButton);

        expect(mockProps.updateEntryComponent).toHaveBeenCalledWith({ status: 1 });
        expect(container.querySelector(".bg-blue-500")).toBeInTheDocument();

        fireEvent.click(watchingStatusButton);
        const onHoldStatusButton = await screen.findByText("On Hold");

        expect(mockProps.updateEntryComponent).toHaveBeenCalledWith({ status: 2 });
        expect(container.querySelector(".bg-orange-500")).toBeInTheDocument();

        fireEvent.click(onHoldStatusButton);
        const watchedStatusButton = await screen.findByText("Watched");

        expect(mockProps.updateEntryComponent).toHaveBeenCalledWith({ status: 3 });
        expect(container.querySelector(".bg-green-500")).toBeInTheDocument();

        fireEvent.click(watchedStatusButton);
        const droppedStatusButton = await screen.findByText("Dropped");

        expect(mockProps.updateEntryComponent).toHaveBeenCalledWith({ status: 4 });
        expect(container.querySelector(".bg-red-500")).toBeInTheDocument();

        fireEvent.click(droppedStatusButton);

        expect(mockProps.updateEntryComponent).toHaveBeenCalledWith({ status: 0 });
        expect(container.querySelector(".bg-gray-500")).toBeInTheDocument();

        // expect(mockedUpdateStatus.mutateAsync({ id: "1", status: 1 })).toHaveBeenCalledTimes(1);
    });
});
