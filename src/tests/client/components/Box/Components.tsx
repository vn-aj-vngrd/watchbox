import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Components from "../../../../components/Box/Components";

jest.mock("../../../../utils/trpc", () => ({
  trpc: {
    useMutation: jest.fn().mockReturnValue({
      mutateAsync: jest.fn(),
    }),
  },
}));

describe("Components", () => {
  const mockAddStateComponent = jest.fn();
  const mockUpdateStateComponent = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should add a Text component when dragged to canvas", async () => {

    render(
      <Components
        id={"1"}
        canvasRef={React.createRef()}
        canvasSizeRef={React.createRef()}
        addStateComponent={mockAddStateComponent}
        updateStateComponent={mockUpdateStateComponent}
        sidePanel={true}
        setTemp={jest.fn()}
      />
    );
    const textComponent = screen.getByLabelText("Text Component");

    fireEvent.drag(textComponent, { clientX: 100, clientY: 200 });
    fireEvent.dragEnd(textComponent, { clientX: 100, clientY: 200 });

    expect(mockAddStateComponent).toHaveBeenCalledWith(expect.any(Object));
    expect(mockUpdateStateComponent).toHaveBeenCalled();
  });

  it("should add an Entry component when dragged to canvas", () => {
    render(
      <Components
        id={"1"}
        canvasRef={React.createRef()}
        canvasSizeRef={React.createRef()}
        addStateComponent={mockAddStateComponent}
        updateStateComponent={mockUpdateStateComponent}
        sidePanel={true}
        setTemp={jest.fn()}
      />
    );
    const entryComponent = screen.getByLabelText("Entry Component");

    fireEvent.drag(entryComponent, { clientX: 150, clientY: 250 });
    fireEvent.dragEnd(entryComponent, { clientX: 150, clientY: 250 });

    expect(mockAddStateComponent).toHaveBeenCalled();
    expect(mockUpdateStateComponent).toHaveBeenCalled();
  });

  it("should add a Divider component when dragged to canvas", () => {
    render(
      <Components
        id={"1"}
        canvasRef={React.createRef()}
        canvasSizeRef={React.createRef()}
        addStateComponent={mockAddStateComponent}
        updateStateComponent={mockUpdateStateComponent}
        sidePanel={true}
        setTemp={jest.fn()}
      />
    );
    const dividerComponent = screen.getByLabelText("Divider Component");

    fireEvent.drag(dividerComponent, { clientX: 200, clientY: 300 });
    fireEvent.dragEnd(dividerComponent, { clientX: 200, clientY: 300 });

    expect(mockAddStateComponent).toHaveBeenCalledWith(expect.any(Object));
    expect(mockUpdateStateComponent).toHaveBeenCalled();
  });
});