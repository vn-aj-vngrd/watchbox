import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { trpc } from "../../utils/trpc";

type Inputs = {
  review: string;
};

type Props = {
  review: string | undefined;
  refetch: () => void;
  entryId: string | undefined;
};

const Review = ({ review, refetch, entryId }: Props) => {
  const { register, handleSubmit, reset } = useForm<Inputs>();

  useEffect(() => {
    reset({
      review: review || "",
    });
  }, [reset, review]);

  const updateReview = trpc.useMutation("entry.updateReview", {
    onSuccess: () => {
      refetch();
      document.dispatchEvent(new Event("visibilitychange"));
    },
  });

  const handleBlur: SubmitHandler<Inputs> = async (data) => {
    updateReview.mutateAsync({
      id: entryId as string,
      review: data.review,
    });
  };

  return (
    <>
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

export default Review;
