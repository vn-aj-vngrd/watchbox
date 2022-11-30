import { useDraggable } from "react-use-draggable-scroll";
import EntryComponent from "./Components/EntryComponent";
import TextComponent from "./Components/TextComponent";
import { Prisma } from "@prisma/client";

type Component = Prisma.ComponentGetPayload<{
  include: { text: true; entry: true; divider: true };
}>;

type Props = {
  id: string;
  canvasRef: React.RefObject<HTMLDivElement>;
  canvasElements: Component[] | undefined;
  shift: boolean;
  deleteComponent: (id: string) => void;
  refetch: () => void;
};

const Canvas: React.FC<Props> = ({
  canvasRef,
  canvasElements,
  shift,
  deleteComponent,
  refetch,
}) => {
  const { events } = useDraggable(canvasRef as React.MutableRefObject<HTMLInputElement>);

  return (
    // TODO: add right and bottom padding to canvas
    <div
      ref={canvasRef}
      {...events}
      className="relative flex h-full items-center justify-center scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-blue-500"
    >
      {canvasElements?.length === 0 ? (
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
