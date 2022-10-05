export const refresh = () => {
  const event = new Event("visibilitychange");
  document.dispatchEvent(event);
};
