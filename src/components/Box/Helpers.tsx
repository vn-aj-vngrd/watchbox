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
