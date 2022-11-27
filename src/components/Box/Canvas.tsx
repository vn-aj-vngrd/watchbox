import EntryComponent from "./Components/EntryComponent";
import TextComponent from "./Components/TextComponent";

type CanvasElement = {
  component: string;
  x: number;
  y: number;
};

type Props = {
  canvasRef: React.RefObject<HTMLDivElement>;
  canvasElements: CanvasElement[];
};

const Canvas: React.FC<Props> = ({ canvasRef, canvasElements }) => {
  return (
    // TODO: add right and bottom padding to canvas
    <div
      ref={canvasRef}
      className="relative flex h-full select-none items-center justify-center scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-blue-500">
    {canvasElements.length === 0 ? (
        <span className="text-sm text-gray-500 dark:text-neutral-400">Add your first entry</span>
    ) : (
        canvasElements.map((canvasElement, index) => {
          switch (canvasElement.component) {
            case "text":
              return (
                <TextComponent key={index} canvasElement={canvasElement} />
              );
            case "entry":
              return (
                <EntryComponent key={index} canvasElement={canvasElement} />
              );
          }
        })
      )}
  </div>
  );
};

export default Canvas;
