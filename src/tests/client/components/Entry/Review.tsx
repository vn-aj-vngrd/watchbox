import { SubmitHandler, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { trpc } from "../../utils/trpc";
import { Entry } from "@prisma/client";

type Inputs = {
  review: string;
};

type Props = {
  entryId: string | undefined;
  review: string | null | undefined;
  updateEntryComponent: (entry: Partial<Entry>) => Promise<void>;
};

const Review = ({ entryId, review, updateEntryComponent }: Props) => {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const [timeoutId, setTimeoutId] = useState<number | undefined>();

  useEffect(() => () => clearTimeout(timeoutId), [timeoutId]);

  useEffect(() => {
    reset({
      review: review || "",
    });
  }, [reset, review]);

  const updateReview = trpc.useMutation("entry.updateReview");

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
      review: data.review || null,
    });

    updateReview.mutateAsync({
      id: entryId as string,
      review: data.review || null,
    });
  };

  return (
    <div className="flex flex-col gap-3 border-t border-gray-200 py-3 dark:border-darkColor">
      <p className="text-lg">My Review</p>
      <div className="w-full rounded-md bg-gray-100 dark:bg-darkColor">
        <textarea
          {...register("review")}
          className="h-full w-full resize-none bg-transparent p-3 text-sm"
          placeholder="Write a review..."
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

export default Review;
