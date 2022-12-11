import { Prisma } from "@prisma/client";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useRef } from "react";
import { trpc } from "../../../utils/trpc";
import { useLongPress, LongPressDetectEvents } from "use-long-press";
import { motion, PanInfo } from "framer-motion";
import { snap } from "popmotion";
import { calculatePoint } from "../Helpers";

type Component = Prisma.ComponentGetPayload<{
  include: { text: true; entry: true; divider: true };
}>;

type Props = {
  textComponent: Component;
  canvasRef: React.RefObject<HTMLDivElement>;
  shift: boolean;
  setShift: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
};

const TextComponent = ({ textComponent, canvasRef, shift, setShift, refetch }: Props) => {
  const spanRef = useRef(null);
  let canvasRect: DOMRect | undefined;
  const snapTo = snap(10);

  const deleteComponent = trpc.useMutation("component.deleteComponent");
  const updateComponent = trpc.useMutation("component.updateComponent");

  const bind = useLongPress(
    () => {
      setShift(!shift);
    },
    {
      detect: LongPressDetectEvents.TOUCH,
    },
  );

  // TODO: Fix text highlighting
  const handleMouseUp = () => {
    if (spanRef.current) {
      const range = document.createRange();
      range.selectNodeContents(spanRef.current);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  const removeComponent = async (id: string) => {
    await deleteComponent
      .mutateAsync({
        id: id,
      })
      .then(() => {
        refetch();
      });
  };

  const updateTextComponent = async (info: PanInfo) => {
    if (
      canvasRef.current &&
      canvasRect?.x &&
      info.point.x - (canvasRect?.x ?? 0) > 0 &&
      info.point.y - (canvasRect?.y ?? 0) > 0
    ) {
      await updateComponent.mutateAsync({
        id: textComponent.id,
        xAxis: snapTo(
          calculatePoint(
            canvasRect.x,
            canvasRef.current.scrollLeft,
            info.point.x,
            34.5,
            69,
            116,
            100,
          ),
        ),
        yAxis: snapTo(
          calculatePoint(canvasRect.y, canvasRef.current.scrollTop, info.point.y, 18, 36, 40, 30),
        ),
      });
    }
  };

  return (
    <motion.div
      drag={shift}
      dragMomentum={false}
      onDrag={() => {
        if (canvasRect == null) canvasRect = canvasRef.current?.getBoundingClientRect();
      }}
      onDragEnd={(e, info) => {
        updateTextComponent(info);
      }}
      {...bind()}
      style={{ top: textComponent?.yAxis - 40, left: textComponent?.xAxis - 144 }}
      className="absolute"
    >
      {shift && (
        <div className="absolute -right-5 -top-5 z-20">
          <button
            onClick={() => {
              if (!deleteComponent.isLoading) removeComponent(textComponent.id);
            }}
            className="rounded-full bg-gray-200 p-[6px] shadow-md shadow-gray-300 outline-none dark:bg-darkColor dark:shadow-black/20"
          >
            <TrashIcon className="h-[18px] w-[18px] text-red-500" />
          </button>
        </div>
      )}
      <span
        ref={spanRef}
        //onMouseUp={handleMouseUp}
        className={`justify-left text-md items-center whitespace-nowrap rounded-md bg-transparent p-1 focus:outline focus:outline-2 focus:outline-blue-500 ${
          shift && "outline-2 hover:cursor-move hover:outline hover:outline-blue-500"
        }`}
        contentEditable
        style={{ top: textComponent?.yAxis - 40, left: textComponent?.xAxis - 144 }}
      >
        Add a Text...
      </span>
    </motion.div>
  );
};

export default TextComponent;
