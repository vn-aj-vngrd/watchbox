import { render, fireEvent, act } from "@testing-library/react";
import Controls from "../../../../components/Box/Controls";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("next-auth/react", () => ({
  useSession: jest.fn().mockReturnValue({
    data: {
      user: {
        id: "1",
        name: "John",
      },
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

describe("Controls", () => {
  const mockControls = {
    bold: false,
    italic: false,
    underline: false,
    alignment: 0,
  };
  const mockSetControls = jest.fn();
  const mockSetSidePanel = jest.fn();
  const mockUpdateComponent = jest.fn();
  const mockSelectedComponent = {
    id: "1",
    boxId: "1",
    componentName: "text",
    xAxis: 0,
    yAxis: 0,
    created_at: new Date(),
    updated_at: new Date(),
    text: {
      id: "1",
      componentId: "1",
      content: "Add a text",
      bold: false,
      italic: false,
      underline: false,
      alignment: 0,
      created_at: new Date(),
      updated_at: new Date(),
    },
    entry: null,
    divider: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should toggle bold when the bold button is clicked", () => {
    const { getByLabelText } = render(
      <Controls
        controls={mockControls}
        setControls={mockSetControls}
        sidePanel={true}
        setSidePanel={mockSetSidePanel}
        selectedComponent={mockSelectedComponent}
        updateComponent={mockUpdateComponent}
      />,
    );

    const boldButton = getByLabelText("Bold");
    fireEvent.click(boldButton);

    expect(mockUpdateComponent).toHaveBeenCalledWith({
      ...mockSelectedComponent,
      text: { ...mockSelectedComponent.text, bold: true, updated_at: expect.any(Date) },
    });
  });

  it("should toggle italic when the italic button is clicked", () => {
    const { getByLabelText } = render(
      <Controls
        controls={mockControls}
        setControls={mockSetControls}
        sidePanel={true}
        setSidePanel={mockSetSidePanel}
        selectedComponent={mockSelectedComponent}
        updateComponent={mockUpdateComponent}
      />,
    );

    const italicButton = getByLabelText("Italic");
    fireEvent.click(italicButton);

    expect(mockUpdateComponent).toHaveBeenCalledWith({
      ...mockSelectedComponent,
      text: { ...mockSelectedComponent.text, italic: true, updated_at: expect.any(Date) },
    });
  });

  it("should toggle underline when the underline button is clicked", () => {
    const { getByLabelText } = render(
      <Controls
        controls={mockControls}
        setControls={mockSetControls}
        sidePanel={true}
        setSidePanel={mockSetSidePanel}
        selectedComponent={mockSelectedComponent}
        updateComponent={mockUpdateComponent}
      />,
    );

    const underlineButton = getByLabelText("Underline");
    fireEvent.click(underlineButton);

    expect(mockUpdateComponent).toHaveBeenCalledWith({
      ...mockSelectedComponent,
      text: { ...mockSelectedComponent.text, underline: true, updated_at: expect.any(Date) },
    });
  });

  it("should update the alignment when the alignment buttons are clicked", async () => {
    const { getByLabelText } = render(
      <Controls
        controls={mockControls}
        setControls={mockSetControls}
        sidePanel={true}
        setSidePanel={mockSetSidePanel}
        selectedComponent={mockSelectedComponent}
        updateComponent={mockUpdateComponent}
      />,
    );

    const alignButton = getByLabelText("Align");

    await act(async () => {
      fireEvent.click(alignButton);
    });
    expect(mockUpdateComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        text: {
          ...mockSelectedComponent.text,
          alignment: 1,
          updated_at: expect.any(Date),
        },
      }),
    );
  });
});
