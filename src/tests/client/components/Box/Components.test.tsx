import { render } from "@testing-library/react";
import Components from "../../../../components/Box/Components";
import { RefObject } from "react";

jest.mock("../../../../utils/trpc", () => ({
  trpc: {
    useMutation: jest.fn().mockReturnValue({
      mutateAsync: jest.fn(),
    }),
  },
}));

const canvasRef = { current: { scrollLeft: 0, scrollTop: 0 } } as RefObject<HTMLDivElement>;
const canvasSizeRef = { current: { scrollWidth: 0, scrollHeight: 0 } } as RefObject<HTMLDivElement>;
const addStateComponent = jest.fn();
const updateStateComponent = jest.fn();
const setTemp = jest.fn();
const sidePanel = true;

describe("Components", () => {
  test("renders components", () => {
    const { getByLabelText } = render(
      <Components
        id="1"
        canvasRef={canvasRef}
        canvasSizeRef={canvasSizeRef}
        addStateComponent={addStateComponent}
        updateStateComponent={updateStateComponent}
        setTemp={setTemp}
        sidePanel={sidePanel}
      />,
    );

    expect(getByLabelText("Text Component")).toBeInTheDocument();
    expect(getByLabelText("Entry Component")).toBeInTheDocument();
    expect(getByLabelText("Divider Component")).toBeInTheDocument();
  });
});
