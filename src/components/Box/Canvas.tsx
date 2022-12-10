import { useDraggable } from "react-use-draggable-scroll";
import EntryComponent from "./Components/EntryComponent";
import { Prisma } from "@prisma/client";
import TextComponent from "./Components/TextComponent";
import { useEffect } from "react";
import DividerComponent from "./Components/DividerComponent";

type Component = Prisma.ComponentGetPayload<{
  include: { text: true; entry: true; divider: true };
}>;

type Props = {
  id: string;
  canvasRef: React.RefObject<HTMLDivElement>;
  canvasSizeRef: React.RefObject<HTMLDivElement>;
  canvasElements: Component[] | undefined;
  deleteComponent: (id: string) => void;
  shift: boolean;
  setShift: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
};

const Canvas: React.FC<Props> = ({
  canvasRef,
  canvasSizeRef,
  canvasElements,
  deleteComponent,
  shift,
  setShift,
  refetch,
}) => {
  const { events } = useDraggable(canvasRef as React.MutableRefObject<HTMLInputElement>) || {};

  useEffect(() => {
    if (canvasSizeRef.current && canvasRef.current) {
      canvasSizeRef.current.style.width =
        canvasRef.current.scrollWidth +
        (canvasRef.current.scrollWidth > canvasRef.current.clientWidth ? 16 : 0) +
        "px";
      canvasSizeRef.current.style.height =
        canvasRef.current.scrollHeight +
        (canvasRef.current.scrollHeight > canvasRef.current.clientHeight ? 16 : 0) +
        "px";
    }
  }, [canvasSizeRef, canvasRef]);

  return (
    <div
      ref={canvasRef}
      {...(shift ? {} : { ...events })}
      className="relative flex h-full items-center justify-center scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-blue-500"
    >
      <div ref={canvasSizeRef} className="absolute top-0 left-0 -z-50" />
      {canvasElements?.length === 0 ? (
        <span className="text-sm text-gray-500 dark:text-neutral-400">Add your first entry</span>
      ) : (
        canvasElements?.map((canvasElement: Component, index) => {
          switch (canvasElement.componentName) {
            case "Text":
              return (
                <TextComponent
                  key={index}
                  shift={shift}
                  setShift={setShift}
                  textComponent={canvasElement}
                  canvasRef={canvasRef}
                  refetch={refetch}
                />
              );
            case "Entry":
              return (
                <EntryComponent
                  key={index}
                  entryComponent={canvasElement}
                  removeEntry={deleteComponent}
                  canvasRef={canvasRef}
                  shift={shift}
                  setShift={setShift}
                  refetch={refetch}
                />
              );
            case "Divider":
              return (
                <DividerComponent
                  key={index}
                  shift={shift}
                  setShift={setShift}
                  dividerComponent={canvasElement}
                  canvasRef={canvasRef}
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
