import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { trpc } from "../../utils/trpc";

type Inputs = {
  note: string;
};

type Props = {
  note: string | undefined;
  refetch: () => void;
  entryId: string | undefined;
};

const Note = ({ note, refetch, entryId }: Props) => {
  const { register, handleSubmit, reset } = useForm<Inputs>();

  useEffect(() => {
    reset({
      note: note || "",
    });
  }, [reset, note]);

  const updateNote = trpc.useMutation("entry.updateNote", {
    onSuccess: () => {
      refetch();
      document.dispatchEvent(new Event("visibilitychange"));
    },
  });

  const handleBlur: SubmitHandler<Inputs> = async (data) => {
    updateNote.mutateAsync({
      id: entryId as string,
      note: data.note,
    });
  };

  return (
    <>
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
              e.currentTarget.style.height = "auto";
              e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
            }}
            onBlur={handleSubmit(handleBlur)}
          />
        </div>
      </div>
    </>
  );
};

export default Note;
