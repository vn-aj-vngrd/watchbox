import { Component } from "@prisma/client";

type Props = {
  textComponent: Component;
  deleteComponent: (id: string) => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
};

const TextComponent = ({ textComponent, deleteComponent, setIsLoading, refetch }: Props) => {
  return (
    <div
      className="absolute flex h-20 w-72 items-center justify-center rounded-md bg-gray-200 text-sm dark:bg-darkColor"
      style={{ top: textComponent?.yAxis - 40, left: textComponent?.xAxis - 144 }}
    >
      <div className="flex h-full w-full items-center justify-center">Text Component</div>
    </div>
  );
};

export default TextComponent;
