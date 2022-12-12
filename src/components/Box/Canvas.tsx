import { useDraggable } from "react-use-draggable-scroll";
import EntryComponent from "./Components/EntryComponent";
import { Prisma } from "@prisma/client";
import TextComponent from "./Components/TextComponent";
import { useSession } from "next-auth/react";

type Component = Prisma.ComponentGetPayload<{
  include: { text: true; entry: true; divider: true };
}>;

type Props = {
  id: string;
  userId: string;
  canvasRef: React.RefObject<HTMLDivElement>;
  canvasElements: Component[] | undefined;
  shift: boolean;
  setShift: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
};

const Canvas: React.FC<Props> = ({
  userId,
  canvasRef,
  canvasElements,
  shift,
  setShift,
  refetch,
}) => {
  const { data: session } = useSession();
  const { events } = useDraggable(canvasRef as React.MutableRefObject<HTMLInputElement>);

  return (
    // TODO: add right and bottom padding to canvas
    <div
      ref={canvasRef}
      {...events}
      className="relative flex h-full items-center justify-center scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-blue-500"
    >
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
              return <TextComponent key={index} textComponent={canvasElement} refetch={refetch} />;
            case "Entry":
              return (
                <EntryComponent
                  key={index}
                  entryComponent={canvasElement}
                  shift={shift}
                  setShift={setShift}
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
