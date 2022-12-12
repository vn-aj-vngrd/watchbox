import { useDraggable } from "react-use-draggable-scroll";
import EntryComponent from "./Components/EntryComponent";
import { Prisma } from "@prisma/client";
import TextComponent from "./Components/TextComponent";
import { useEffect } from "react";
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
  refetch: () => void;
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
  refetch,
}) => {
  const { data: session } = useSession();
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
        <span className="text-sm text-gray-500 dark:text-neutral-400">
          {session?.user?.id === userId ? (
            <>Add your first entry.</>
          ) : (
            <>Owner has not added any changes yet.</>
          )}
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
                  setShift={setShift}
                  setTemp={setTemp}
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
                  refetch={refetch}
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
                  setShift={setShift}
                />
              );
          }
        })
      )}
    </div>
  );
};

export default Canvas;
