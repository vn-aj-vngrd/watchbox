import { render, screen, fireEvent, act } from '@testing-library/react';
import EntryComponent from '../../../../../components/Box/Components/EntryComponent';
import { trpc } from '../../../../../utils/trpc';
import { snap } from "popmotion"

jest.mock("popmotion", () => ({
    snap: jest.fn()
}))

jest.mock("use-long-press", () => ({
    useLongPress: jest.fn().mockReturnValue(jest.fn()),
    LongPressDetectEvents: jest.fn(),
}));

jest.mock("next/router", () => ({
    push: jest.fn(),
}));

jest.mock("../../../../../utils/trpc", () => ({
    trpc: {
        useMutation: jest.fn().mockReturnValue({
            mutateAsync: jest.fn().mockResolvedValue(jest.fn())
        }),
    },
}));

describe('EntryComponent', () => {
    const entryComponent = {
        id: '1',
        xAxis: 100,
        yAxis: 200,
        boxId: "1",
        componentName: "Component Name",
        created_at: new Date(),
        updated_at: new Date(),
        text: {
            id: "1",
            componentId: "1",
            content: "This is a content",
            bold: false,
            italic: false,
            underline: false,
            alignment: 1,
            created_at: new Date(),
            updated_at: new Date(),
        },
        entry: {
            id: "1",
            componentId: "1",
            movieId: "1",
            image: "",
            title: "Entry Title",
            note: "This is a note",
            review: "This is a review",
            status: 1,
            rating: 4,
            created_at: new Date(),
            updated_at: new Date(),
        },
        divider: {
            componentId: '1',
            orientation: 'horizontal',
            height: 100,
            width: 2,
            id: '2',
            created_at: new Date(),
            updated_at: new Date(),
        }
    }

    const removeStateComponent = jest.fn().mockResolvedValue(jest.fn());
    const updateStateComponent = jest.fn().mockResolvedValue(jest.fn());

    const props = {
        entryComponent,
        removeStateComponent: removeStateComponent,
        updateStateComponent: updateStateComponent,
        canvasRef: { current: document.createElement('div') },
        canvasSizeRef: { current: document.createElement('div') },
        shift: true,
        temp: [],
        setShift: jest.fn(),
        setTemp: jest.fn(),
    };

    it('should render correctly', () => {
        render(<EntryComponent {...props} />);
        expect(screen.getByTestId('entryComponent')).toBeInTheDocument();
    });

    it('should call pop on render', () => {
        render(<EntryComponent {...props} />);
        expect(snap).toHaveBeenCalledWith(10);
    });

    it('should call the trpc use mutations', async () => {
        render(<EntryComponent {...props} />);
        expect(screen.getByTestId('entryComponent')).toBeInTheDocument();

        expect(trpc.useMutation).toHaveBeenCalledWith("entry.createEntry");
        expect(trpc.useMutation).toHaveBeenCalledWith("component.deleteComponent");
        expect(trpc.useMutation).toHaveBeenCalledWith("component.updateComponent");
    })

    it('should call removeStateComponent when clicking trash icon', () => {
        render(<EntryComponent {...props} />);

        act(() => {
            fireEvent.click(screen.getByTestId('removeButton'));
        })

        expect(removeStateComponent).toHaveBeenCalledWith('1');
    });
});