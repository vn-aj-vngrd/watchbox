import { SubmitHandler, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { trpc } from "../../utils/trpc";
import { Entry } from "@prisma/client";

type Inputs = {
  note: string;
};

type Props = {
  entryId: string | undefined;
  note: string | null | undefined;
  updateEntryComponent: (entry: Partial<Entry>) => Promise<void>;
};

const Note = ({ entryId, note, updateEntryComponent }: Props) => {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const [timeoutId, setTimeoutId] = useState<number | undefined>();

  useEffect(() => () => clearTimeout(timeoutId), [timeoutId]);

  useEffect(() => {
    reset({
      note: note || "",
    });
  }, [reset, note]);

  const updateNote = trpc.useMutation("entry.updateNote");

  const handleInput = () => {
    if (timeoutId) clearTimeout(timeoutId);

    const newTimeoutId = setTimeout(() => {
      handleSubmit(handleBlur)();
    }, 1000);

    setTimeoutId(Number(newTimeoutId));
  };

  const handleBlur: SubmitHandler<Inputs> = (data) => {
    if (timeoutId) clearTimeout(timeoutId);

    updateEntryComponent({
      note: data.note || null,
    });

    updateNote.mutateAsync({
      id: entryId as string,
      note: data.note || null,
    });
  };

  return (
    <div className="flex flex-col gap-3 border-t border-gray-200 py-3 dark:border-darkColor">
      <p className="text-lg">My Notes</p>
      <div className="w-full rounded-md bg-gray-100 dark:bg-darkColor">
        <textarea
          {...register("note")}
          className="h-full w-full resize-none bg-transparent p-3 text-sm"
          placeholder="Write a note..."
          rows={5}
          spellCheck="false"
          onInput={(e) => {
            handleInput();
            e.currentTarget.style.height = "auto";
            e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
          }}
          onBlur={handleSubmit(handleBlur)}
        />
      </div>
    </div>
  );
};

export default Note;
