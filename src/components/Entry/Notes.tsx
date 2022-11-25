import { trpc } from "../../utils/trpc";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  note: string;
};

type Props = {
  note: string | undefined;
  refetch: () => void;
  entryId: string | undefined;
};

const Notes = ({ note, refetch, entryId }: Props) => {
  const { register, handleSubmit, watch, reset } = useForm<Inputs>();

  const note_watch = watch("note");

  const updateNote = trpc.useMutation("entry.updateNote", {
    onSuccess: () => {
      refetch();
      document.dispatchEvent(new Event("visibilitychange"));
    },
  });

  useEffect(() => {
    reset({
      note: note || " ",
    });
  }, [reset]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    updateNote.mutateAsync({
      id: entryId as string,
      note: data.note,
    });
  };

  return (
    <>
      <p className="py-2 text-sm">My Notes</p>
      <form onSubmit={handleSubmit(onSubmit)} className="pt-1">
        <div className="mb-4 w-full rounded-lg bg-gray-100 pt-1 dark:border-darkColor dark:bg-darkColor">
          <div className="rounded-t-lg bg-gray-100 px-4 py-2 dark:bg-darkColor">
            <textarea
              {...register("note")}
              rows={4}
              className="w-full bg-gray-100 px-1 py-1 text-sm dark:bg-darkColor dark:text-white dark:placeholder-gray-400"
              placeholder="Write a note..."
            ></textarea>
          </div>
          {note_watch !== note ? (
            <div className="flex items-center justify-end border-t px-3 py-2 dark:border-darkColor">
              <button
                type="submit"
                className="inline-flex items-center rounded-lg bg-blue-600 py-2.5 px-4 text-center text-xs font-medium text-white focus:ring-4 focus:ring-blue-200 hover:bg-blue-700 dark:focus:ring-blue-900"
              >
                Save Note
              </button>
            </div>
          ) : null}
        </div>
      </form>
    </>
  );
};

export default Notes;
