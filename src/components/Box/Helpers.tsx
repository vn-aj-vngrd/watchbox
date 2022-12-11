export const calculatePoint = (
  canvasRect: number | undefined = 0,
  scroll: number | undefined = 0,
  infoPoint: number | undefined = 0,
  componentHalf: number | undefined = 0,
  componentFull: number | undefined = 0,
  edgeOffset: number | undefined = 0,
  offset: number | undefined = 0,
) => {
  return canvasRect + scroll - infoPoint < componentHalf && canvasRect - infoPoint > -componentHalf
    ? infoPoint - componentFull + (componentFull - (infoPoint - canvasRect + edgeOffset))
    : infoPoint - (canvasRect ?? 0) + scroll + offset;
};

export const resetCavasSize = (
  canvasSizeRef: React.RefObject<HTMLDivElement>,
  canvasRef: React.RefObject<HTMLDivElement>,
) => {
  if (canvasSizeRef.current && canvasRef.current) {
    canvasSizeRef.current.style.width = "auto";
    canvasSizeRef.current.style.height = "auto";
    canvasSizeRef.current.style.width =
      canvasRef.current.scrollWidth +
      (canvasRef.current.scrollWidth > canvasRef.current.clientWidth ? 16 : 0) +
      "px";
    canvasSizeRef.current.style.height =
      canvasRef.current.scrollHeight +
      (canvasRef.current.scrollHeight > canvasRef.current.clientHeight ? 16 : 0) +
      "px";
  }
};

import { PanInfo } from "framer-motion";

// TODO: Optimize for mobile
export const scrollEdge = (
  info: PanInfo,
  canvasRect: DOMRect | undefined,
  canvasSizeRef: React.RefObject<HTMLDivElement>,
  canvasRef: React.RefObject<HTMLDivElement>,
) => {
  // right
  if (canvasRect && canvasRef.current && info.point.x > canvasRect.width + 200) {
    if (canvasSizeRef.current)
      canvasSizeRef.current.style.width =
        canvasRef.current?.scrollWidth <=
        canvasRef.current?.clientWidth + canvasRef.current.scrollLeft
          ? canvasSizeRef.current?.clientWidth + 20 + "px"
          : canvasSizeRef.current.style.width;
    canvasRef.current.scrollLeft += 20;
  }
  // left
  if (
    canvasRect &&
    canvasRef.current &&
    canvasRect.x - info.point.x < 0 &&
    canvasRect.x - info.point.x > -200
  ) {
    if (canvasSizeRef.current)
      canvasSizeRef.current.style.width =
        parseInt(canvasSizeRef.current.style.width) === canvasRef.current.scrollWidth
          ? canvasSizeRef.current?.clientWidth - 20 + "px"
          : canvasRef.current?.scrollWidth + "px";

    canvasRef.current.scrollLeft -= 20;
  }
  // bottom
  if (canvasRect && canvasRef.current && info.point.y > canvasRect.height + 40) {
    if (canvasSizeRef.current)
      canvasSizeRef.current.style.height =
        canvasRef.current?.scrollHeight <=
        canvasRef.current?.clientHeight + canvasRef.current.scrollTop
          ? canvasSizeRef.current?.clientHeight + 20 + "px"
          : canvasSizeRef.current.style.height;
    canvasRef.current.scrollTop += 15;
  }
  // top
  if (
    canvasRect &&
    canvasRef.current &&
    canvasRect.y - info.point.y < 0 &&
    canvasRect.y - info.point.y > -40
  ) {
    if (canvasSizeRef.current)
      canvasSizeRef.current.style.height =
        parseInt(canvasSizeRef.current.style.height) === canvasRef.current.scrollHeight
          ? canvasSizeRef.current?.clientHeight - 15 + "px"
          : canvasRef.current?.scrollHeight + "px";

    canvasRef.current.scrollTop -= 15;
  }
};
