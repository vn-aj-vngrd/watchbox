import { useDraggable } from "react-use-draggable-scroll";
import EntryComponent from "./Components/EntryComponent";
import TextComponent from "./Components/TextComponent";
import { useState } from "react";
import { useHotkeys, isHotkeyPressed } from "react-hotkeys-hook";
import { trpc } from "../../utils/trpc";

type Props = {
  id: string;
  canvasRef: React.RefObject<HTMLDivElement>;
};

const Canvas: React.FC<Props> = ({ id, canvasRef }) => {
  const { events } = useDraggable(canvasRef as React.MutableRefObject<HTMLInputElement>);
  const [shift, setShift] = useState(false);

  const canvasElements = trpc.useQuery(["component.getComponents", { id }]);

  useHotkeys("shift", () => setShift(isHotkeyPressed("shift")), { keydown: true, keyup: true });

  return (
    // TODO: add right and bottom padding to canvas
    <div
      ref={canvasRef}
      {...events}
      className="relative flex h-full select-none items-center justify-center scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-blue-500"
    >
      {canvasElements?.data?.length === 0 ? (
        <span className="text-sm text-gray-500 dark:text-neutral-400">Add your first entry</span>
      ) : (
        canvasElements?.data?.map((canvasElement, index) => {
          switch (canvasElement.componentName) {
            case "Text":
              return <TextComponent key={index} canvasElement={canvasElement} />;
            case "Entry":
              return <EntryComponent key={index} canvasElement={canvasElement} shift={shift} />;
          }
        })
      )}
    </div>
  );
};

export default Canvas;
