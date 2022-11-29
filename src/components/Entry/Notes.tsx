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
      note: note || "",
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
      <div className="border-t dark:border-darkColor">
        <p className="pt-3 text-lg">My Notes</p>
        <form onSubmit={handleSubmit(onSubmit)} className="pt-3">
          <div className="mb-4 w-full rounded-lg bg-gray-100 dark:border-darkColor dark:bg-darkColor">
            <div
              className={`bg-gray-100 px-4 py-2 dark:bg-neutral-700 ${
                note_watch !== note ? "rounded-t-lg" : "rounded-lg"
              }`}
            >
              <textarea
                {...register("note")}
                rows={4}
                className="w-full bg-gray-100 py-1 text-sm dark:bg-neutral-700 dark:text-white"
                placeholder="Write a note..."
              ></textarea>
            </div>
            <div className="dark:bg-dark flex items-center justify-end border-t px-3 py-2 dark:border-neutral-500">
              <button
                type="submit"
                disabled={note_watch === note}
                className="inline-flex w-28 items-center justify-center rounded-lg bg-blue-600 py-2.5 px-4 text-center text-xs font-medium focus:ring-4 focus:ring-blue-200 enabled:text-white disabled:bg-blue-600/60 disabled:text-white/60 enabled:hover:bg-blue-700 dark:focus:ring-blue-900"
              >
                Save Note
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Notes;
