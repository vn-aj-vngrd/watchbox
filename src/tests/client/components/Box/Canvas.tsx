import { render, screen } from "@testing-library/react";
import Canvas from "../../../../components/Box/Canvas";

describe("Canvas component", () => {
  const mockCanvasElements = [
    {
      id: "1",
      boxId: "1",
      componentName: "Text",
      xAxis: 0,
      yAxis: 0,
      created_at: new Date(),
      updated_at: new Date(),
      text: {
        id: "1",
        componentId: "1",
        content: "Hello World!",
        bold: false,
        italic: false,
        underline: false,
        alignment: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      entry: null,
      divider: null,
    },
  ];

  test("renders Canvas component with elements", () => {
    render(
      <Canvas
        id="1"
        userId="testUserId"
        canvasRef={{ current: document.createElement("div") }}
        canvasSizeRef={{ current: document.createElement("div") }}
        canvasElements={mockCanvasElements}
        shift={false}
        temp={[]}
        setTemp={jest.fn()}
        removeStateComponent={jest.fn()}
        updateStateComponent={jest.fn()}
        setShift={jest.fn()}
        setSelectedComponent={jest.fn()}
      />
    );
    expect(screen.getByText("Hello World!")).toBeInTheDocument();
  });
});