import { useDraggable } from "react-use-draggable-scroll";
import EntryComponent from "./Components/EntryComponent";
import TextComponent from "./Components/TextComponent";
import { useState } from "react";
import { useHotkeys, isHotkeyPressed } from "react-hotkeys-hook";
import { Prisma } from "@prisma/client";
import Spinner from "../Common/Spinner";

type Component = Prisma.ComponentGetPayload<{
  include: { text: true; entry: true; divider: true };
}>;

type Props = {
  id: string;
  canvasRef: React.RefObject<HTMLDivElement>;
  canvasElements: Component[] | undefined;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  deleteComponent: (id: string) => void;
  refetch: () => void;
};

const Canvas: React.FC<Props> = ({
  canvasRef,
  canvasElements,
  isLoading,
  setIsLoading,
  deleteComponent,
  refetch,
}) => {
  const { events } = useDraggable(canvasRef as React.MutableRefObject<HTMLInputElement>);
  const [shift, setShift] = useState(false);

  useHotkeys("shift", () => setShift(isHotkeyPressed("shift")), { keydown: true, keyup: true });

  return (
    // TODO: add right and bottom padding to canvas
    <div
      ref={canvasRef}
      {...events}
      className="relative flex h-full select-none items-center justify-center scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-blue-500"
    >
      {isLoading && (
        <div className="pointer-events-none absolute z-50">
          <Spinner />
        </div>
      )}
      {canvasElements?.length === 0 && !isLoading ? (
        <span className="text-sm text-gray-500 dark:text-neutral-400">Add your first entry</span>
      ) : (
        canvasElements?.map((canvasElement: Component, index) => {
          switch (canvasElement.componentName) {
            case "Text":
              return (
                <TextComponent
                  key={index}
                  textComponent={canvasElement}
                  deleteComponent={deleteComponent}
                  setIsLoading={setIsLoading}
                  refetch={refetch}
                />
              );
            case "Entry":
              return (
                <EntryComponent
                  key={index}
                  entryComponent={canvasElement}
                  shift={shift}
                  deleteComponent={deleteComponent}
                  setIsLoading={setIsLoading}
                  refetch={refetch}
                />
              );
          }
        })
      )}
    </div>
  );
};

export default Canvas;
