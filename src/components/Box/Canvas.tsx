// Imports

type CanvasElement = {
  component: string;
  x: number;
  y: number;
};

type Props = {
  canvasDiv: React.RefObject<HTMLDivElement>;
  canvasElements: CanvasElement[];
};

const Canvas: React.FC<Props> = ({ canvasDiv, canvasElements }) => {
  return (
    <div
      ref={canvasDiv}
      className="relative flex h-full select-none items-center justify-center scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-blue-500"
    >
      {canvasElements.length === 0 ? (
        <span className="text-sm text-gray-500 dark:text-neutral-400">Add your first entry</span>
      ) : (
        canvasElements.map((canvasElement, index) => {
          switch (canvasElement.component) {
            case "text":
              return (
                <div
                  key={index}
                  className="absolute flex h-20 w-64 items-center justify-center rounded-md bg-darkColor text-sm"
                  style={{ top: canvasElement.y - 40, left: canvasElement.x - 128 }}
                >
                  {canvasElement.component}
                </div>
              );
            case "entry":
              return (
                <div
                  key={index}
                  className="absolute flex h-20 w-64 items-center justify-center rounded-md bg-darkColor text-sm"
                  style={{ top: canvasElement.y - 40, left: canvasElement.x - 128 }}
                >
                  {canvasElement.component}
                </div>
              );
          }
        })
      )}
    </div>
  );
};

export default Canvas;
