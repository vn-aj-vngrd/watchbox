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
