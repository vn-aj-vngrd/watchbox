import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useHotkeys } from "react-hotkeys-hook";
import { trpc } from "../../utils/trpc";
import { Icon } from "@iconify/react";
import { Prisma } from "@prisma/client";
import boldFill from "@iconify/icons-mingcute/bold-fill";
import italicFill from "@iconify/icons-mingcute/italic-fill";
import underlineFill from "@iconify/icons-mingcute/underline-fill";
import alignLeftFill from "@iconify/icons-mingcute/align-left-fill";
import alignCenterFill from "@iconify/icons-mingcute/align-center-fill";
import alignRightFill from "@iconify/icons-mingcute/align-right-fill";

type Component = Prisma.ComponentGetPayload<{
  include: { text: true; entry: true; divider: true };
}>;

type Controls = {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  alignment: number;
};

type Props = {
  controls: Controls;
  setControls: React.Dispatch<React.SetStateAction<Controls>>;
  sidePanel: boolean;
  setSidePanel: React.Dispatch<React.SetStateAction<boolean>>;
  selectedComponent: Component | undefined;
  updateComponent: (component: Component) => Promise<void>;
};

const Controls = ({
  controls,
  // setControls,
  sidePanel,
  setSidePanel,
  selectedComponent,
  updateComponent,
}: Props) => {
  const { bold, italic, underline, alignment } = controls;

  const updateText = trpc.useMutation(["text.updateControls"]);
  const createText = trpc.useMutation("text.createText");

  const updateControls = async (
    bold: boolean,
    italic: boolean,
    underline: boolean,
    alignment: number,
  ) => {
    if (!selectedComponent) return;

    while (selectedComponent.text?.id.includes("tmp-")) {
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    if (!selectedComponent.text) {
      updateComponent(
        Object.assign(selectedComponent, {
          text: {
            componentId: selectedComponent.id,
            content: "Add a text",
            bold,
            italic,
            underline,
            alignment,
            created_at: new Date(),
            updated_at: new Date(),
          },
        }),
      );

      await createText
        .mutateAsync({
          componentId: selectedComponent.id,
          content: "Add a text",
        })
        .then((res) => {
          updateComponent(
            Object.assign(selectedComponent, {
              text: {
                ...selectedComponent.text,
                id: res.id,
                created_at: res.created_at,
                updated_at: res.updated_at,
              },
            }),
          );
          updateText.mutateAsync({ id: res.id, bold, italic, underline, alignment });
        });

      return;
    }

    updateComponent(
      Object.assign(selectedComponent, {
        text: {
          ...selectedComponent.text,
          bold,
          italic,
          underline,
          alignment,
          updated_at: new Date(),
        },
      }),
    );
    updateText.mutateAsync({ id: selectedComponent.text.id, bold, italic, underline, alignment });
  };

  useHotkeys("ctrl+b", () => updateControls(!bold, italic, underline, alignment), {
    preventDefault: true,
    enableOnFormTags: true,
    enableOnContentEditable: true,
  });
  useHotkeys("ctrl+i", () => updateControls(bold, !italic, underline, alignment), {
    preventDefault: true,
    enableOnFormTags: true,
    enableOnContentEditable: true,
  });
  useHotkeys("ctrl+u", () => updateControls(bold, italic, !underline, alignment), {
    preventDefault: true,
    enableOnFormTags: true,
    enableOnContentEditable: true,
  });
  useHotkeys("ctrl+l", () => updateControls(bold, italic, underline, 0), {
    preventDefault: true,
    enableOnFormTags: true,
    enableOnContentEditable: true,
  });
  useHotkeys("ctrl+e", () => updateControls(bold, italic, underline, 1), {
    preventDefault: true,
    enableOnFormTags: true,
    enableOnContentEditable: true,
  });
  useHotkeys("ctrl+r", () => updateControls(bold, italic, underline, 2), {
    preventDefault: true,
    enableOnFormTags: true,
    enableOnContentEditable: true,
  });
  useHotkeys("ctrl+[,ctrl+]", () => setSidePanel((sidePanel) => !sidePanel), {
    preventDefault: true,
    enableOnFormTags: true,
  });

  return (
    <div
      className={`flex h-fit flex-col items-center justify-center gap-3 border-b py-2 transition-all duration-500 ease-in-out dark:border-darkColor ${!sidePanel ? "md:h-fit md:flex-col md:py-2" : "md:h-12 md:flex-row md:py-0"
        }`}
    >
      <button
        onClick={() => {
          updateControls(!bold, italic, underline, alignment);
        }}
        className={`flex h-8 w-8 items-center justify-center rounded-md font-bold focus:outline-none hover:bg-gray-200 dark:border-transparent dark:text-white dark:hover:bg-darkColor ${bold ? "bg-gray-200 dark:bg-darkColor" : ""
          }`}
        aria-label="Bold"
      >
        <Icon icon={boldFill} />
      </button>
      <button
        onClick={() => {
          updateControls(bold, !italic, underline, alignment);
        }}
        className={`flex h-8 w-8 items-center justify-center rounded-md font-bold focus:outline-none hover:bg-gray-200 dark:border-transparent dark:text-white dark:hover:bg-darkColor ${italic ? "bg-gray-200 dark:bg-darkColor" : ""
          }`}
        aria-label="Italic"
      >
        <Icon icon={italicFill} />
      </button>
      <button
        onClick={() => {
          updateControls(bold, italic, !underline, alignment);
        }}
        className={`flex h-8 w-8 items-center justify-center rounded-md font-bold focus:outline-none hover:bg-gray-200 dark:border-transparent dark:text-white dark:hover:bg-darkColor ${underline ? "bg-gray-200 dark:bg-darkColor" : ""
          }`}
        aria-label="Underline"
      >
        <Icon icon={underlineFill} />
      </button>
      <button
        onClick={() => {
          updateControls(bold, italic, underline, alignment < 2 ? alignment + 1 : 0);
        }}
        className="flex h-8 w-8 items-center justify-center rounded-md font-bold focus:outline-none hover:bg-gray-200 dark:border-transparent dark:text-white dark:hover:bg-darkColor"
        aria-label="Align"
      >
        {
          {
            0: <Icon icon={alignLeftFill} />,
            1: <Icon icon={alignCenterFill} />,
            2: <Icon icon={alignRightFill} />,
          }[alignment]
        }
      </button>
      <button
        onClick={() => setSidePanel(!sidePanel)}
        className={`hidden h-8 w-8 items-center justify-center rounded-md border font-bold focus:outline-none hover:bg-gray-200 dark:border-transparent dark:border-grayColor dark:text-white dark:hover:bg-darkColor md:flex ${!sidePanel ? "md:order-first" : "md:order-none"
          }`}
        aria-label="Side Panel"
      >
        <ChevronLeftIcon
          className={`h-4 w-4 fill-black transition-transform ease-in-out dark:fill-white ${!sidePanel ? "rotate-180" : ""
            }`}
        />
      </button>
    </div>
  );
};

export default Controls;
