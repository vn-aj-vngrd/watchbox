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
  setDisablePan: React.Dispatch<React.SetStateAction<boolean>>;
  setShift: React.Dispatch<React.SetStateAction<boolean>>;
  setTemp: React.Dispatch<React.SetStateAction<string[]>>;
};

const TextComponent = ({
  textComponent,
  removeStateComponent,
  updateStateComponent,
  canvasRef,
  canvasSizeRef,
  temp,
  shift,
  setDisablePan,
  setShift,
  setTemp,
}: Props) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  let canvasRect: DOMRect | undefined;
  const snapTo = snap(10);

  const deleteComponent = trpc.useMutation("component.deleteComponent");
  const updateComponent = trpc.useMutation("component.updateComponent");
  const createText = trpc.useMutation("text.createText");
  const updateText = trpc.useMutation("text.updateText");

  const bind = useLongPress(
    () => {
      setShift(!shift);
    },
    {
      detect: LongPressDetectEvents.TOUCH,
    },
  );

  const removeComponent = async (id: string) => {
    setTemp((prev) => [...prev, textComponent.id]);

    removeStateComponent(id).then(() => {
      resetCanvasSize(canvasSizeRef, canvasRef);
    });

    await deleteComponent
      .mutateAsync({
        id: id,
      })
      .then(() => {
        setTemp((prev) => prev.filter((item) => item !== textComponent.id));
      });
  };

  const updateTextComponent = async (info: PanInfo) => {
    if (
      canvasRef.current &&
      canvasRect?.x &&
      info.point.x - (canvasRect?.x ?? 0) > 0 &&
      info.point.y - (canvasRect?.y ?? 0) > 0
    ) {
      setTemp((prev) => [...prev, textComponent.id]);

      updateStateComponent(
        Object.assign(textComponent, {
          xAxis: snapTo(
            calculatePoint(canvasRect.x, canvasRef.current.scrollLeft, info.point.x, 48, 96, 210),
          ),
          yAxis: snapTo(
            calculatePoint(canvasRect.y, canvasRef.current.scrollTop, info.point.y, 14, 28, 70),
          ),
        }),
      ).then(() => {
        resetCanvasSize(canvasSizeRef, canvasRef);
      });

      await updateComponent
        .mutateAsync({
          id: textComponent.id,
          xAxis: snapTo(
            calculatePoint(canvasRect.x, canvasRef.current.scrollLeft, info.point.x, 48, 96, 210),
          ),
          yAxis: snapTo(
            calculatePoint(canvasRect.y, canvasRef.current.scrollTop, info.point.y, 14, 28, 70),
          ),
        })
        .then(() => {
          setTemp((prev) => prev.filter((item) => item !== textComponent.id));
        });
    }
  };

  const handleBlur = async (event: React.FocusEvent<HTMLSpanElement>) => {
    if (!spanRef.current?.contains(event.relatedTarget)) window.getSelection()?.removeAllRanges();
    if (temp.includes(textComponent.id)) return;
    const text = spanRef.current?.innerText || "";
    if (text === textComponent.text?.content) return;
    if (text.trim().length === 0) return removeComponent(textComponent.id);

    if (!textComponent.text) {
      setTemp((prev) => [...prev, textComponent.id]);

      updateStateComponent(
        Object.assign(textComponent, {
          text: {
            componentId: textComponent.id,
            content: text,
          },
        }),
      );

      await createText
        .mutateAsync({
          componentId: textComponent.id,
          content: text,
        })
        .then((res) => {
          updateStateComponent(
            Object.assign(textComponent, {
              text: {
                ...textComponent.text,
                id: res.id,
                created_at: res.created_at,
                updated_at: res.updated_at,
              },
            }),
          );
        })
        .then(() => {
          setTemp((prev) => prev.filter((item) => item !== textComponent.id));
        });

      return;
    }

    setTemp((prev) => [...prev, textComponent.text?.id ?? textComponent.id]);

    updateStateComponent(
      Object.assign(textComponent, {
        text: {
          ...textComponent.text,
          content: text,
          updated_at: new Date(),
        },
      }),
    );

    updateText
      .mutateAsync({
        id: textComponent.text.id,
        content: text,
      })
      .then(() => {
        setTemp((prev) =>
          prev.filter((item) => item !== textComponent.text?.id ?? textComponent.id),
        );
      });
  };

  return (
    <motion.div
      drag={shift && !temp.includes(textComponent.id.startsWith("tmp-") ? textComponent.id : "")}
      dragMomentum={false}
      dragSnapToOrigin
      dragElastic={0}
      dragConstraints={canvasRef}
      onDrag={(e, info) => {
        if (canvasRect == null) canvasRect = canvasRef.current?.getBoundingClientRect();
        scrollEdge(info, canvasRect, canvasSizeRef, canvasRef);
      }}
      onDragEnd={(e, info) => {
        updateTextComponent(info);
      }}
      {...bind()}
      style={{ top: textComponent?.yAxis - 14, left: textComponent?.xAxis - 48 }}
      className="absolute flex items-center justify-center"
    >
      {shift && (
        <button
          disabled={!shift || temp.includes(textComponent.id)}
          onClick={() => {
            removeComponent(textComponent.id);
          }}
          className="absolute -right-5 -top-5 z-20 h-7 w-7 rounded-full bg-gray-200 p-1.5 shadow-md shadow-gray-300 outline-none disabled:opacity-50 dark:bg-darkColor dark:shadow-black/20"
        >
          <TrashIcon className="h-4 w-4 text-red-500" />
        </button>
      )}
      <span
        ref={spanRef}
        onBlur={handleBlur}
        onMouseEnter={() => setDisablePan(true)}
        onMouseLeave={() => setDisablePan(false)}
        className={`justify-left cursor-text items-center whitespace-nowrap rounded-md bg-transparent px-1 text-lg outline-none focus:outline-2 focus:outline-blue-500 ${
          shift && "outline-2 hover:cursor-move hover:outline hover:outline-blue-500"
        }`}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            spanRef.current?.blur();
          }
        }}
        spellCheck="false"
        contentEditable={!shift}
        suppressContentEditableWarning
      >
        {textComponent.text && textComponent.text?.content.trim().length > 0
          ? textComponent.text?.content
          : "Add a Text"}
      </span>
    </motion.div>
  );
};

export default TextComponent;
