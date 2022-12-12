import { Prisma } from "@prisma/client";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useRef } from "react";
import { trpc } from "../../../utils/trpc";
import { useLongPress, LongPressDetectEvents } from "use-long-press";
import { motion, PanInfo } from "framer-motion";
import { snap } from "popmotion";
import { calculatePoint, resetCanvasSize, scrollEdge } from "../Helpers";

type Component = Prisma.ComponentGetPayload<{
  include: { text: true; entry: true; divider: true };
}>;

type Props = {
  textComponent: Component;
  removeStateComponent: (id: string) => Promise<void>;
  updateStateComponent: (component: Component) => Promise<void>;
  canvasRef: React.RefObject<HTMLDivElement>;
  canvasSizeRef: React.RefObject<HTMLDivElement>;
  temp: string[];
  shift: boolean;
  setShift: React.Dispatch<React.SetStateAction<boolean>>;
};

const TextComponent = ({
  textComponent,
  removeStateComponent,
  updateStateComponent,
  canvasRef,
  canvasSizeRef,
  temp,
  shift,
  setShift,
}: Props) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  let canvasRect: DOMRect | undefined;
  const snapTo = snap(10);

  const deleteComponent = trpc.useMutation("component.deleteComponent");
  const updateComponent = trpc.useMutation("component.updateComponent");
  const updateText = trpc.useMutation("text.updateText");

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
    removeStateComponent(id).then(() => {
      resetCanvasSize(canvasSizeRef, canvasRef);
    });
    await deleteComponent.mutateAsync({
      id: id,
    });
  };

  const updateTextComponent = async (info: PanInfo) => {
    if (
      canvasRef.current &&
      canvasRect?.x &&
      info.point.x - (canvasRect?.x ?? 0) > 0 &&
      info.point.y - (canvasRect?.y ?? 0) > 0
    ) {
      updateStateComponent(
        Object.assign(textComponent, {
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
        }),
      ).then(() => {
        resetCanvasSize(canvasSizeRef, canvasRef);
      });

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

  const handleBlur = () => {
    const text = spanRef.current?.innerText;

    if (textComponent.text) {
      updateStateComponent(
        Object.assign(textComponent, {
          text: {
            ...textComponent.text,
            content: text || "",
          },
        }),
      );

      updateText.mutateAsync({
        id: textComponent.text.id,
        content: text || "",
      });
    }
  };

  return (
    <motion.div
      drag={shift && !temp.includes(textComponent.id)}
      dragMomentum={false}
      dragSnapToOrigin
      dragElastic={0}
      dragConstraints={canvasRef}
      onDrag={(e, info) => {
        if (canvasRect == null) canvasRect = canvasRef.current?.getBoundingClientRect();
        scrollEdge(info, canvasRect, canvasSizeRef, canvasRef);
      }}
      onDragEnd={(e, info) => {
        // FIXME: Offset needs update
        updateTextComponent(info);
      }}
      {...bind()}
      style={{ top: textComponent?.yAxis - 40, left: textComponent?.xAxis - 144 }}
      className={`absolute flex rounded-md ${
        shift && "outline-2 hover:cursor-move hover:outline hover:outline-blue-500"
      }`}
    >
      {shift && (
        <div className="absolute -right-5 -top-5 z-20">
          <button
            disabled={!shift || temp.includes(textComponent.id)}
            onClick={() => {
              removeComponent(textComponent.id);
            }}
            className="rounded-full bg-gray-200 p-[6px] shadow-md shadow-gray-300 outline-none disabled:opacity-50 dark:bg-darkColor dark:shadow-black/20"
          >
            <TrashIcon className="h-[18px] w-[18px] text-red-500" />
          </button>
        </div>
      )}
      <span
        ref={spanRef}
        // onMouseUp={handleMouseUp}
        onBlur={handleBlur}
        className={`justify-left text-md items-center whitespace-nowrap rounded-md bg-transparent py-1 px-2 outline-none`}
        contentEditable
        spellCheck="false"
        style={{ top: textComponent?.yAxis - 40, left: textComponent?.xAxis - 144 }}
      >
        {textComponent.text?.content || "Add Text"}
      </span>
    </motion.div>
  );
};

export default TextComponent;
