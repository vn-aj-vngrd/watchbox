import { useState } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import EntryComponent from "./Components/EntryComponent";
import { Prisma } from "@prisma/client";
import TextComponent from "./Components/TextComponent";
import DividerComponent from "./Components/DividerComponent";
import { useSession } from "next-auth/react";

type Component = Prisma.ComponentGetPayload<{
  include: { text: true; entry: true; divider: true };
}>;

type Props = {
  id: string;
  userId: string;
  canvasRef: React.RefObject<HTMLDivElement>;
  canvasSizeRef: React.RefObject<HTMLDivElement>;
  canvasElements: Component[] | undefined;
  shift: boolean;
  temp: string[];
  setTemp: React.Dispatch<React.SetStateAction<string[]>>;
  removeStateComponent: (id: string) => Promise<void>;
  updateStateComponent: (component: Component) => Promise<void>;
  setShift: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedComponent: React.Dispatch<React.SetStateAction<Component | undefined>>;
};

const Canvas: React.FC<Props> = ({
  userId,
  canvasRef,
  canvasSizeRef,
  canvasElements,
  shift,
  temp,
  setTemp,
  removeStateComponent,
  updateStateComponent,
  setShift,
  setSelectedComponent,
}) => {
  const { data: session } = useSession();
  const { events } = useDraggable(canvasRef as React.MutableRefObject<HTMLInputElement>) || {};
  const [disablePan, setDisablePan] = useState(false);

  return (
    <div
      ref={canvasRef}
      {...(shift || disablePan ? {} : { ...events })}
      className="relative flex h-full items-center justify-center scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-blue-500"
    >
      <div ref={canvasSizeRef} className="absolute top-0 left-0 -z-50" />
      {canvasElements?.length === 0 ? (
        <span className="text-sm text-gray-500 dark:text-neutral-400">
          {session?.user?.id === userId ? "Add your first entry." : "This Box is empty."}
        </span>
      ) : (
        canvasElements?.map((canvasElement: Component, index) => {
          switch (canvasElement.componentName) {
            case "Text":
              return (
                <TextComponent
                  key={index}
                  textComponent={canvasElement}
                  removeStateComponent={removeStateComponent}
                  updateStateComponent={updateStateComponent}
                  canvasRef={canvasRef}
                  canvasSizeRef={canvasSizeRef}
                  temp={temp}
                  shift={shift}
                  setDisablePan={setDisablePan}
                  setShift={setShift}
                  setTemp={setTemp}
                  setSelectedComponent={setSelectedComponent}
                />
              );
            case "Entry":
              return (
                <EntryComponent
                  key={index}
                  entryComponent={canvasElement}
                  removeStateComponent={removeStateComponent}
                  updateStateComponent={updateStateComponent}
                  canvasRef={canvasRef}
                  canvasSizeRef={canvasSizeRef}
                  temp={temp}
                  shift={shift}
                  setShift={setShift}
                  setTemp={setTemp}
                />
              );
            case "Divider":
              return (
                <DividerComponent
                  key={index}
                  dividerComponent={canvasElement}
                  removeStateComponent={removeStateComponent}
                  updateStateComponent={updateStateComponent}
                  canvasRef={canvasRef}
                  canvasSizeRef={canvasSizeRef}
                  temp={temp}
                  shift={shift}
                  setDisablePan={setDisablePan}
                  setShift={setShift}
                  setTemp={setTemp}
                />
              );
          }
        })
      )}
    </div>
  );
};

export default Canvas;
