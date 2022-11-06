// Imports

type Props = {
  canvasDiv: React.RefObject<HTMLDivElement>;
};

const Canvas: React.FC<Props> = ({ canvasDiv }) => {
  return (
    <div ref={canvasDiv} className="relative flex h-full select-none items-center justify-center">
      <span className="text-sm text-gray-500 dark:text-neutral-400">Add your first entry</span>
    </div>
  );
};

export default Canvas;
