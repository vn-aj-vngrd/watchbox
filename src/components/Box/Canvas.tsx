// Imports

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
    <div
      ref={canvasRef}
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
                  className="absolute flex h-20 w-72 items-center justify-center rounded-md bg-gray-200 text-sm dark:bg-darkColor"
                  style={{ top: canvasElement.y - 40, left: canvasElement.x - 144 }}
                >
                  <div className="-mr-10 -mb-10 flex h-full w-full items-center justify-center pr-10 pb-10">
                    Text Component
                  </div>
                </div>
              );
            case "entry":
              return (
                <div
                  key={index}
                  className="absolute flex h-20 w-72 items-center justify-center rounded-md bg-gray-200 text-sm dark:bg-darkColor"
                  style={{ top: canvasElement.y - 40, left: canvasElement.x - 144 }}
                >
                  <div className="-mr-10 -mb-10 flex h-full w-full items-center justify-center pr-10 pb-10">
                    Entry Component
                  </div>
                </div>
              );
          }
        })
      )}
    </div>
  );
};

export default Canvas;
