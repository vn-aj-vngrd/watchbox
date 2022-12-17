import { useState } from "react";
import dynamic from "next/dynamic";
import { useDraggable } from "react-use-draggable-scroll";
import EntryComponent from "./Components/EntryComponent";
import { Prisma } from "@prisma/client";
import TextComponent from "./Components/TextComponent";
import { MDEditorProps } from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";

type Component = Prisma.ComponentGetPayload<{
  include: { text: true; entry: true; divider: true };
}>;

type Props = {
  id: string;
  canvasRef: React.RefObject<HTMLDivElement>;
  canvasElements: Component[] | undefined;
  shift: boolean;
  setShift: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
};

const MDEditor = dynamic<MDEditorProps>(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false },
);

const Canvas: React.FC<Props> = ({ canvasRef, canvasElements, shift, setShift, refetch }) => {
  const { events } = useDraggable(canvasRef as React.MutableRefObject<HTMLInputElement>);
  const [text, setText] = useState<string | undefined>(`**Hello world!**`);

  return (
    // TODO: add right and bottom padding to canvas
    <div
      ref={canvasRef}
      {...events}
      className="relative flex h-full flex-col items-center justify-center scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-blue-500"
    >
      {canvasElements?.length === 0 ? (
        <span className="text-sm text-gray-500 dark:text-neutral-400">Add your first entry</span>
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
      <div data-color-mode="dark">
        <MDEditor value={text} onChange={setText} />
      </div>
    </div>
  );
};

export default Canvas;
