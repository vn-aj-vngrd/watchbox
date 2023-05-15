import { PanInfo } from "framer-motion";
import { calculatePoint, resetCanvasSize, scrollEdge } from "../../../../components/Box/Helpers";

describe("calculatePoint", () => {
  it("calculates point correctly", () => {
    const canvasRect = 50;
    const scroll = 20;
    const infoPoint = 50;
    const componentHalf = 10;
    const componentFull = 20;
    const offset = 5;
    const expected = 20;

    const result = calculatePoint(
      canvasRect,
      scroll,
      infoPoint,
      componentHalf,
      componentFull,
      offset,
    );

    expect(result).toEqual(expected);
  });
});

describe("resetCanvasSize", () => {
  it("resets canvas size correctly", () => {
    const canvasSizeRef = {
      current: { style: { width: "auto", height: "auto" } },
    } as React.RefObject<HTMLDivElement>;
    const canvasRef = {
      current: { scrollWidth: 100, clientWidth: 50, scrollHeight: 100, clientHeight: 50 },
    } as React.RefObject<HTMLDivElement>;
    const expected = { current: { style: { width: "116px", height: "116px" } } };

    resetCanvasSize(canvasSizeRef, canvasRef);

    expect(canvasSizeRef).toEqual(expected);
  });
});

describe("scrollEdge", () => {
  it("scrolls edge correctly", () => {
    const info = { point: { x: 100 } } as PanInfo;
    const canvasRect = { width: 100 } as DOMRect;
    const canvasSizeRef = {
      current: { style: { width: "120px", height: "auto" } },
    } as React.RefObject<HTMLDivElement>;
    const canvasRef = {
      current: { scrollWidth: 100, clientWidth: 50, scrollLeft: 0 },
    } as React.RefObject<HTMLDivElement>;
    const expected = { current: { style: { width: "120px", height: "auto" } } };

    scrollEdge(info, canvasRect, canvasSizeRef, canvasRef);

    expect(canvasSizeRef).toEqual(expected);
  });
});
