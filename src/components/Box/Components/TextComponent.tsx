import { Component } from "@prisma/client";

type Props = {
  canvasElement: Component;
};

const TextComponent = ({ canvasElement }: Props) => {
  return (
    <div
      className="absolute flex h-20 w-72 items-center justify-center rounded-md bg-gray-200 text-sm dark:bg-darkColor"
      style={{ top: canvasElement?.yAxis - 40, left: canvasElement?.xAxis - 144 }}
    >
      <div className="flex h-full w-full items-center justify-center">Text Component</div>
    </div>
  );
};

export default TextComponent;
